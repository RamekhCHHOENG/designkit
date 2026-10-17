// Where the shadcn-compatible registry (public/r/*.json) is served from.
// Set VITE_REGISTRY_URL when deploying somewhere other than the default host,
// and build the registry with the same REGISTRY_URL (see scripts/build-registry.mjs).
export const REGISTRY_URL = (import.meta.env.VITE_REGISTRY_URL ?? "https://designkit-smoky.vercel.app").replace(/\/$/, "")

export const registryItemUrl = (name: string) => `${REGISTRY_URL}/r/${name}.json`

/** One-line install command for a component, block or chart. */
export const installCommand = (name: string) => `npx shadcn@latest add ${registryItemUrl(name)}`
