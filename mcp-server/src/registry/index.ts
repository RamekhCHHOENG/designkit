import { loadBlocks } from "./blocks.ts";
import { loadExampleComponents } from "./example-components.ts";
import { loadLibComponents } from "./lib-components.ts";
import { loadUiPrimitives } from "./ui-components.ts";
import type { RegistryItem, RegistryItemSummary, RegistryKind } from "./types.ts";

export * from "./types.ts";
export { readItemFiles } from "./content.ts";

type Entry = { key: string; item: RegistryItem };

let cache: { items: RegistryItem[]; byKey: Map<string, Entry[]> } | null = null;

function build() {
  const items = [...loadLibComponents(), ...loadUiPrimitives(), ...loadExampleComponents(), ...loadBlocks()];

  const byKey = new Map<string, Entry[]>();
  for (const item of items) {
    const qualified = `${item.kind}:${item.name}`;
    const entry: Entry = { key: qualified, item };
    pushKey(byKey, qualified, entry);
    // Bare name always resolves too; findItem() reports ambiguity when
    // it's shared across more than one kind (byKey will have >1 entries).
    pushKey(byKey, item.name, entry);
  }

  cache = { items, byKey };
  return cache;
}

function pushKey(map: Map<string, Entry[]>, key: string, entry: Entry) {
  const list = map.get(key);
  if (list) list.push(entry);
  else map.set(key, [entry]);
}

/** Cached in-memory registry, built once per process. Call refreshRegistry()
 * in dev if the underlying source files change and you want to re-scan. */
export function getRegistry() {
  return cache ?? build();
}

export function refreshRegistry() {
  return build();
}

export function listItems(filter?: { kind?: RegistryKind; category?: string; query?: string }): RegistryItem[] {
  let items = getRegistry().items;
  if (filter?.kind) items = items.filter((i) => i.kind === filter.kind);
  if (filter?.category) items = items.filter((i) => i.category === filter.category || i.categories?.includes(filter.category!));
  if (filter?.query) {
    const q = filter.query.toLowerCase();
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q),
    );
  }
  return items;
}

export function toSummary(item: RegistryItem): RegistryItemSummary {
  const { name, kind, type, title, description, category, categories } = item;
  return { name, kind, type, title, description, category, categories, fileCount: item.files.length };
}

export type LookupResult =
  | { status: "found"; item: RegistryItem }
  | { status: "ambiguous"; candidates: string[] }
  | { status: "not_found" };

/** Resolve a name that may be a bare item name ("button") or a
 * kind-qualified key ("ui:button") when the bare name is ambiguous. */
export function findItem(name: string): LookupResult {
  const entries = getRegistry().byKey.get(name);
  if (!entries || entries.length === 0) return { status: "not_found" };
  if (entries.length === 1) return { status: "found", item: entries[0]!.item };
  // Multiple kinds share this bare name — request disambiguation, unless the
  // caller already passed a kind-qualified key (which is always length 1).
  return { status: "ambiguous", candidates: entries.map((e) => `${e.item.kind}:${e.item.name}`) };
}
