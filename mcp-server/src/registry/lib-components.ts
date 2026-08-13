import { readdirSync } from "node:fs";
import { absolutePath } from "./paths.ts";
import type { RegistryItem } from "./types.ts";

// Short blurbs lifted from README.md's "Public components" list — the only
// place these descriptions are written down in prose.
const DESCRIPTIONS: Record<string, string> = {
  Badge: "Soft, solid, and outline badge variants with six semantic tones.",
  Button:
    "Primary, secondary, outline, ghost, and destructive button variants; four sizes; semantic colors; loading and disabled states.",
  Card: "Default, elevated, and interactive surfaces with compound layout components (Header, Title, Description, Footer, Content).",
  DataTable:
    "Search, sorting, row selection, pagination, custom rendering, and accessible table semantics.",
  Drawer:
    "Left, right, and bottom placement with focus trapping, Escape handling, focus restoration, and a portal.",
  Input: "Label, help text, error state, adornments, and three sizes.",
};

const LIB_DIR = "src/lib/components";

export function loadLibComponents(): RegistryItem[] {
  const files = readdirSync(absolutePath(LIB_DIR)).filter((f) => f.endsWith(".tsx"));

  return files.map((file) => {
    const name = file.replace(/\.tsx$/, "");
    return {
      name,
      kind: "lib",
      type: "registry:lib",
      title: name,
      description:
        DESCRIPTIONS[name] ?? `DesignKit ${name} component (published in @ramekhchhoeng/designkit).`,
      category: "published-package",
      dependencies: ["react", "react-dom"],
      registryDependencies: [],
      files: [
        {
          path: `${LIB_DIR}/${file}`,
          target: `${LIB_DIR}/${file}`,
          type: "registry:lib",
        },
      ],
    } satisfies RegistryItem;
  });
}
