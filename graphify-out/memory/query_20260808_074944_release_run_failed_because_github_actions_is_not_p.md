---
type: "query"
date: "2026-08-08T07:49:44.002121+00:00"
question: "Release run failed because GitHub Actions is not permitted to create or approve pull requests. What next?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["package.json", "scripts", "publishConfig", "version", "changeset", "release"]
---

# Q: Release run failed because GitHub Actions is not permitted to create or approve pull requests. What next?

## Answer

Expanded from original query via graph vocab: [action, actions, changeset, github, package, publish, release, token, version]. The local Release workflow already requests contents: write and pull-requests: write and Changesets successfully completed version-packages. The remaining blocker is the repository Actions policy. Enable Settings > Actions > General > Workflow permissions > Allow GitHub Actions to create and approve pull requests, save, then re-run the failed Release job. Changesets should create the version PR; merge that PR to trigger npm publication and the GitHub release.

## Outcome

- Signal: useful

## Source Nodes

- package.json
- scripts
- publishConfig
- version
- changeset
- release