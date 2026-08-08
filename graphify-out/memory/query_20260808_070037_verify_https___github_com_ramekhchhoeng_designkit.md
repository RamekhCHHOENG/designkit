---
type: "query"
date: "2026-08-08T07:00:37.478228+00:00"
question: "verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.1"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "scripts/verify-release-version.mjs", "publishConfig"]
---

# Q: verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.1

## Answer

Expanded tokens: package, release, publish, version, verify, test, npm, exports, dist, styles, react, build. GitHub release v1.1.1 exists at commit 72e61d7840b7a0d70205c5a1d23ab05ba7a9cc45, but tagged package.json is version 0.1.0. Publish workflow run 31244973331 failed at release:verify; npm install, tests, build, packaging, and publish were skipped. npm registry returns E404 for @ramekhchhoeng/designkit and @ramekhchhoeng/designkit@1.1.1. Independent tag-source verification passed typecheck, 7 tests, library build, package artifact verification with 11 runtime exports, and npm pack dry-run for package 0.1.0.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- scripts/verify-release-version.mjs
- publishConfig