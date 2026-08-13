import { getRegistry } from "./index.ts";

const { items } = getRegistry();
const byKind = new Map<string, number>();
for (const item of items) byKind.set(item.kind, (byKind.get(item.kind) ?? 0) + 1);

console.log(`total items: ${items.length}`);
for (const [kind, count] of byKind) console.log(`  ${kind}: ${count}`);
console.log("\nsample:", JSON.stringify(items[0], null, 2));
