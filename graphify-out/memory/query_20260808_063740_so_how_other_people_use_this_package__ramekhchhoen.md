---
type: "query"
date: "2026-08-08T06:37:40.582808+00:00"
question: "so how other people use this package @ramekhchhoeng/designkit ?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "index.ts", "publishConfig"]
---

# Q: so how other people use this package @ramekhchhoeng/designkit ?

## Answer

Expanded from original query via graph vocab: [install, package, npm, imports, styles, exports, publish, release, version, react, button, input]. The npm registry currently returns 404, so external users cannot install @ramekhchhoeng/designkit yet. After publishing a correctly versioned release, consumers install it with npm install @ramekhchhoeng/designkit, import @ramekhchhoeng/designkit/styles.css once, and import the stable React exports Badge, Button, Card, DataTable, Drawer, and Input from the package root. Publishing requires an npm account that owns the ramekhchhoeng scope, an NPM_TOKEN repository secret, matching package and GitHub release versions, and the existing publish workflow.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- index.ts
- publishConfig