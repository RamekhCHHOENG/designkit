---
type: "query"
date: "2026-08-08T07:04:38.705714+00:00"
question: "any way to better release"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "publishConfig", "verify-release-version.mjs", "scripts"]
---

# Q: any way to better release

## Answer

Expanded from original query via graph vocab: [release, publish, version, verify, package, npm, provenance, tag, test, token, build]. Recommended replacing manual GitHub-release-triggered publishing with Changesets: PR changesets feed an automated Version Packages PR; merging that PR runs CI, publishes npm, then creates the tag, changelog, and GitHub release. Keep CI required on PRs, add publish concurrency and an optional protected npm-production environment, use npm trusted publishing via OIDC instead of a long-lived NPM_TOKEN after the one-time first publish, use latest for stable and next for prereleases, and enable immutable GitHub releases only after the automated flow is proven. Immediate recovery: use 1.1.2 if retaining public v1.1.x history, or clean invalid tags/releases and start at 0.1.0 if the API is still pre-stable.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- publishConfig
- verify-release-version.mjs
- scripts