---
type: "query"
date: "2026-08-08T06:25:04.421150+00:00"
question: "so when i redeploy will vercel show docs pages. can u run this project local as well."
contributor: "graphify"
outcome: "useful"
source_nodes: ["vercel.json", "package.json"]
---

# Q: so when i redeploy will vercel show docs pages. can u run this project local as well.

## Answer

Expanded from original query via graph vocab: [vercel, docs, build, vite, config, output, directory, local, preview, dist]. The committed vercel.json sets buildCommand to npm run build:docs and outputDirectory to docs-dist, so a Vercel redeploy from the latest main branch should publish the documentation site when the project root is the repository root. The local Vite server started at http://127.0.0.1:5173/ and returned HTTP 200 with the DesignKit React Web Components page title.

## Outcome

- Signal: useful

## Source Nodes

- vercel.json
- package.json