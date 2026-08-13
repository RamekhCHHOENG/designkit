import { readFileSync, readdirSync } from "node:fs";
import { absolutePath } from "./paths.ts";
import type { RegistryFileRef, RegistryItem } from "./types.ts";

const UI_DIR = "src/components/ui";
const IGNORED_DEPENDENCIES = new Set(["react", "react-dom", "react/jsx-runtime"]);

const humanize = (slug: string) =>
  slug
    .split("-")
    .map((word) => (word.length <= 3 && word !== "otp" ? word.toUpperCase() : word[0]!.toUpperCase() + word.slice(1)))
    .join(" ")
    .replace(/\bOtp\b/, "OTP");

function npmPackageName(specifier: string): string {
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? `${parts[0]}/${parts[1]}` : parts[0]!;
}

const KNOWN_UI_SLUGS = new Set(
  readdirSync(absolutePath(UI_DIR))
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => f.replace(/\.tsx$/, "")),
);

function classifyImports(source: string, ownSlug: string) {
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  const extraFiles = new Map<string, RegistryFileRef>();

  const importRegex = /(?:import|export)\s+(?:[^;'"]*?\s+from\s+)?["']([^"']+)["']/g;
  for (const match of source.matchAll(importRegex)) {
    const specifier = match[1]!;

    if (specifier.startsWith(".")) {
      const slug = specifier.replace(/^\.*\/?(ui\/)?/, "").replace(/\.[tj]sx?$/, "");
      if (slug !== ownSlug && KNOWN_UI_SLUGS.has(slug)) registryDependencies.add(slug);
      continue;
    }

    if (specifier.startsWith("@/")) {
      const inner = specifier.slice(2); // e.g. "components/ui/button" | "lib/utils" | "hooks/use-mobile"
      const uiMatch = inner.match(/^components\/ui\/([a-z0-9-]+)$/);
      if (uiMatch && uiMatch[1] !== ownSlug) {
        registryDependencies.add(uiMatch[1]!);
        continue;
      }
      if (inner === "lib/utils") {
        extraFiles.set("src/lib/utils.ts", {
          path: "src/lib/utils.ts",
          target: "lib/utils.ts",
          type: "registry:lib",
        });
        continue;
      }
      const hooksMatch = inner.match(/^hooks\/([a-z0-9-]+)$/);
      if (hooksMatch) {
        const hooksDir = absolutePath("src/hooks");
        const found = readdirSync(hooksDir).find((f) => f.startsWith(`${hooksMatch[1]}.`));
        if (found) {
          extraFiles.set(`src/hooks/${found}`, {
            path: `src/hooks/${found}`,
            target: `hooks/${found}`,
            type: "registry:hook",
          });
        }
      }
      continue;
    }

    const pkg = npmPackageName(specifier);
    if (!IGNORED_DEPENDENCIES.has(pkg)) dependencies.add(pkg);
  }

  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
    extraFiles: [...extraFiles.values()],
  };
}

export function loadUiPrimitives(): RegistryItem[] {
  const files = readdirSync(absolutePath(UI_DIR)).filter((f) => f.endsWith(".tsx"));

  return files.map((file) => {
    const slug = file.replace(/\.tsx$/, "");
    const source = readFileSync(absolutePath(`${UI_DIR}/${file}`), "utf8");
    const { dependencies, registryDependencies, extraFiles } = classifyImports(source, slug);
    const title = humanize(slug);

    return {
      name: slug,
      kind: "ui",
      type: "registry:ui",
      title,
      description: `${title} UI primitive vendored from shadcn/ui (Base UI + Tailwind).`,
      category: "ui-primitive",
      dependencies,
      registryDependencies,
      files: [
        { path: `${UI_DIR}/${file}`, target: `components/ui/${file}`, type: "registry:ui" },
        ...extraFiles,
      ],
    } satisfies RegistryItem;
  });
}
