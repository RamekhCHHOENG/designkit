---
type: "query"
date: "2026-08-08T06:44:55.873499+00:00"
question: "how about vue or react?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "index.ts", "styles.d.ts"]
---

# Q: how about vue or react?

## Answer

Expanded from original query via graph vocab: [react, vue, nuxt, next, package, components, framework, typescript, styles, exports, vite]. The current DesignKit public entry exports React TSX components and declares React and React DOM peer dependencies, so it supports React, Vite React, and Next.js but not Vue or Nuxt. Recommended architecture before first npm publication: keep DesignKit as the product name, publish framework-specific packages @ramekhchhoeng/designkit-react and @ramekhchhoeng/designkit-vue, and share prefixed CSS design tokens and component specifications between them. Stabilize React first, then port stable APIs to Vue and document both with framework tabs.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- index.ts
- styles.d.ts