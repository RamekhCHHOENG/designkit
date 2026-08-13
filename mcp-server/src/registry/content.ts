import { readFileSync } from "node:fs";
import { absolutePath } from "./paths.ts";
import type { RegistryFileContent, RegistryFileRef, RegistryItem } from "./types.ts";

export function readItemFiles(item: RegistryItem): RegistryFileContent[] {
  return item.files.map((file) => readFile(file));
}

function readFile(file: RegistryFileRef): RegistryFileContent {
  try {
    return { ...file, content: readFileSync(absolutePath(file.path), "utf8") };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ...file, content: `// unable to read ${file.path}: ${message}` };
  }
}
