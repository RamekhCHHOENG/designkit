import { fileURLToPath } from "node:url";
import path from "node:path";

// mcp-server/src/registry/paths.ts -> tipkit-react/ (repo root)
export const REPO_ROOT = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "../../..");

/** Vendored registry data (src/space/registry/*) records file paths as
 * `src/components/...` / `src/assets/...`, matching upstream shadcnspace's
 * own repo layout. In this repo those files actually live under `src/space/`. */
export function toRepoPath(registryPath: string): string {
  return registryPath.replace(/^src\/(components|assets)\//, "src/space/$1/");
}

export function absolutePath(repoRelativePath: string): string {
  return path.join(REPO_ROOT, repoRelativePath);
}
