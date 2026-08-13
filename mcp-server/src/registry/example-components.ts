import { components } from "../../../src/space/registry/index.ts";
import { toRepoPath } from "./paths.ts";
import type { RegistryItem } from "./types.ts";

type SourceItem = {
  name: string;
  title: string;
  description: string;
  type?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; target?: string; type?: string }[];
  category?: { name?: string; title?: string };
};

export function loadExampleComponents(): RegistryItem[] {
  return (components as SourceItem[]).map((item) => ({
    name: item.name,
    kind: "component",
    type: item.type ?? "registry:component",
    title: item.title,
    description: item.description,
    category: item.category?.name,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files: item.files.map((f) => ({
      path: toRepoPath(f.path),
      target: f.target,
      type: f.type,
    })),
  }));
}
