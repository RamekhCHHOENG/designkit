import { blocks } from "../../../src/space/registry/blocks/index.ts";
import { toRepoPath } from "./paths.ts";
import type { RegistryItem } from "./types.ts";

type SourceBlock = {
  name: string;
  title: string;
  description: string;
  type?: string;
  categories: { name?: string; title?: string }[];
  masterCategory: { name?: string; title?: string };
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; target?: string; type?: string }[];
};

export function loadBlocks(): RegistryItem[] {
  return (blocks as SourceBlock[]).map((block) => ({
    name: block.name,
    kind: "block",
    type: block.type ?? "registry:block",
    title: block.title,
    description: block.description,
    category: block.masterCategory?.name,
    categories: block.categories?.map((c) => c.name).filter((n): n is string => Boolean(n)),
    dependencies: block.dependencies ?? [],
    registryDependencies: block.registryDependencies ?? [],
    files: block.files.map((f) => ({
      path: toRepoPath(f.path),
      target: f.target,
      type: f.type,
    })),
  }));
}
