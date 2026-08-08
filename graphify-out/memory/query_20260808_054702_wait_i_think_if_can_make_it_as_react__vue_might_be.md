---
type: "query"
date: "2026-08-08T05:47:02.742990+00:00"
question: "wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "index.ts", "styles.d.ts", "WebCatalog.tsx", "componentDocs.tsx"]
---

# Q: wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?

## Answer

Expanded from original query via graph vocab: [react, package, component, components, css, styles, exports, index, peer, dependencies, vite, web]. Yes: build two framework packages, React and Vue. Next.js consumes the React package, while Nuxt consumes the Vue package. Vite is only the build and development tool. Share design tokens, CSS, component specifications, and accessibility behavior, but implement framework bindings separately. A dedicated Next or Nuxt package is unnecessary initially; add a thin integration package later only for auto-imports, SSR configuration, or framework-specific conveniences. The current package is React-specific and needs SSR and React Server Component compatibility checks before claiming Next.js support.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- index.ts
- styles.d.ts
- WebCatalog.tsx
- componentDocs.tsx