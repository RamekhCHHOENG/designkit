import { PUBLIC_BASE_URL } from "../config.ts";
import type { RegistryItem } from "./types.ts";

export function installCommand(item: RegistryItem): string {
  if (item.kind === "lib") {
    return [
      "npm install @ramekhchhoeng/designkit",
      `# then: import { ${item.name} } from "@ramekhchhoeng/designkit";`,
    ].join("\n");
  }
  return `npx shadcn add ${PUBLIC_BASE_URL}/r/${item.kind}/${item.name}.json`;
}
