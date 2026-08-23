---
type: "query"
date: "2026-08-08T08:02:31.174293+00:00"
question: "Please verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.2 and https://www.npmjs.com/package/@ramekhchhoeng/designkit?activeTab=readme"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "publishConfig", "scripts", "index.ts", "styles.d.ts", "verify-release-version.mjs", "version", "release"]
---

# Q: Please verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.2 and https://www.npmjs.com/package/@ramekhchhoeng/designkit?activeTab=readme

## Answer

Expanded from original query via graph vocab: [build, exports, github, npm, package, publish, react, release, styles, test, verify, version]. Verified GitHub release v1.1.2 is latest, not draft or prerelease, and its tag points to merge commit 9aa6730. Release workflow 31247254363 completed successfully. npm latest is 1.1.2; metadata exposes ESM, CommonJS, TypeScript, styles.css, React 18/19 peers, 21 files, signatures, and SLSA provenance. A clean npm install by package name succeeded, then ESM and CJS imports, all 11 exports, CSS resolution, and React SSR passed. Initial npm .org package-index requests returned 404 for a few minutes while metadata propagated, then resolved normally.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- publishConfig
- scripts
- index.ts
- styles.d.ts
- verify-release-version.mjs
- version
- release