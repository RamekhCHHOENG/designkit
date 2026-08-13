import { PUBLIC_BASE_URL } from "../config.ts";
import type { RegistryItem } from "./types.ts";

export function installCommand(item: RegistryItem): string {
  return `npx shadcn add ${PUBLIC_BASE_URL}/r/${item.kind}/${item.name}.json`;
}
