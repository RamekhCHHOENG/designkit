---
type: "query"
date: "2026-08-08T06:34:18.527237+00:00"
question: "can u test test https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.0"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "verify-release-version.mjs", "publishConfig"]
---

# Q: can u test test https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.0

## Answer

Expanded from original query via graph vocab: [package, release, publish, version, build, verify, test, npm, exports, dist, react, styles]. GitHub release v1.1.0 exists and targets main, but the tag contains package version 0.1.0 while the release workflow requires tag and package version equality. The npm registry returns 404 for @ramekhchhoeng/designkit, so v1.1.0 is not installable from npm. The Vercel documentation URL returns HTTP 200. Local typecheck, 7 tests, library build, package export verification, and tarball check pass.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- verify-release-version.mjs
- publishConfig