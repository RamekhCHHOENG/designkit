---
type: "query"
date: "2026-08-08T07:23:10.143095+00:00"
question: "what we need to do now?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "publishConfig", "verify-release-version.mjs", "scripts"]
---

# Q: what we need to do now?

## Answer

Expanded from original query via graph vocab: [release, publish, version, verify, package, npm, provenance, tag, test, token, build, actions]. Immediate plan: do not create another manual GitHub release. First update package and lockfile to 1.1.2, add Changesets and a release PR workflow, preserve required CI/package checks, add release concurrency, and prepare an npm-production environment. Because @ramekhchhoeng/designkit still returns npm E404, bootstrap the first publication using a one-time npm token through the automated workflow. After the package exists, configure npm trusted publishing for the workflow, remove the token, and verify installation from a clean React consumer. Future releases then come only from Changesets Version PRs.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- publishConfig
- verify-release-version.mjs
- scripts