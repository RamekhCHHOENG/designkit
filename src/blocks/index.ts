import type { ComponentType } from "react"

export * from "./meta"

const pages = import.meta.glob("./*/page.tsx") as Record<
  string,
  () => Promise<{ default: ComponentType }>
>

const sources = import.meta.glob(["./*/**/*.tsx", "./*/**/*.ts", "./*/**/*.json"], {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>

export function loadBlockPage(name: string) {
  return pages[`./${name}/page.tsx`]
}

/** All source files of a block, page first, as [path, loader] pairs. */
export function blockSourceFiles(name: string) {
  return Object.entries(sources)
    .filter(([path]) => path.startsWith(`./${name}/`))
    .map(([path, load]) => [path.slice(2), load] as const)
    .sort(([a], [b]) => (a.endsWith("/page.tsx") ? -1 : b.endsWith("/page.tsx") ? 1 : a.localeCompare(b)))
}
