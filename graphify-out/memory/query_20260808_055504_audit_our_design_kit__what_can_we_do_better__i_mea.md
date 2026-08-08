---
type: "query"
date: "2026-08-08T05:55:04.434077+00:00"
question: "audit our design kit. what can we do better. i mean engineering behind and structure"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "index.ts", "componentDocs.tsx", "WebCatalog.tsx", "styles.d.ts", "Drawer.tsx"]
---

# Q: audit our design kit. what can we do better. i mean engineering behind and structure

## Answer

Expanded from original query via graph vocab: [package, components, exports, public, build, dist, scripts, types, typescript, styles, dependencies, docs]. Audit outcome: the six-component React package has a clean public index, correct React peer dependencies, successful ESM and CommonJS builds, working declaration output, a small npm tarball, and basic SSR rendering. Before a stable release, separate the docs app and vendored gallery from the package workspace; fix documentation status because 74 catalog previews are marked ready while only six are public exports; add unit, accessibility, keyboard, SSR, hydration, visual, and packed-consumer tests; gate publishing on Git tag and package version equality; preserve Next.js client boundaries for hook-based modules; scope global theme CSS; replace or thoroughly test the custom Drawer focus manager; reduce the 17 MB and 1393-file docs build; and move toward workspaces for tokens, React, Vue, docs, and framework fixtures.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- index.ts
- componentDocs.tsx
- WebCatalog.tsx
- styles.d.ts
- Drawer.tsx