import { fileURLToPath } from "node:url";
import path from "node:path";

// mcp-server/src/registry/paths.ts -> tipkit-react/ (repo root)
export const REPO_ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../..");

export function absolutePath(repoRelativePath: string): string {
  return path.join(REPO_ROOT, repoRelativePath);
}
