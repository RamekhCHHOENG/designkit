import { readItemFiles } from "./content.ts";
import type { RegistryItem } from "./types.ts";

export const REGISTRY_HOMEPAGE = "https://designkit-smoky.vercel.app";

export function toRegistryItemJson(item: RegistryItem) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    files: readItemFiles(item).map((f) => ({
      path: f.path,
      target: f.target,
      type: f.type,
      content: f.content,
    })),
  };
}

export function toRegistryIndexEntry(item: RegistryItem) {
  return {
    name: item.name,
    kind: item.kind,
    type: item.type,
    title: item.title,
    description: item.description,
    category: item.category,
  };
}
