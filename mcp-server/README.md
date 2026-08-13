# designkit-mcp

A remote MCP server, and a [shadcn](https://ui.shadcn.com)-compatible component
registry, for DesignKit.

The component catalog is being redesigned on top of shadcn/ui. Right now this
indexes the **61 vendored shadcn/ui primitives** under `../src/components/ui`
(Base UI + Tailwind, `nova` preset), auto-derived with their real dependencies
— there's no separate metadata file upstream, so parsing each file's own
`import` statements is the source of truth. Published lib components, gallery
examples, and full-page blocks will come back as `kind`s here once that
redesign lands (see `src/registry/types.ts`).

It reads component source straight out of `../src/components/ui` and
`../src/lib/utils.ts` at request time — there is no build step or generated
snapshot to go stale.

## Run it locally

```bash
cd mcp-server
bun install
bun run dev          # http://localhost:8787
```

`bun run registry:stats` prints item counts per kind, useful after touching a
loader in `src/registry/`.

## Endpoints

| Endpoint | What |
|---|---|
| `GET /health` | `{ status, items }` liveness check |
| `POST /mcp` | MCP Streamable HTTP endpoint (stateless, JSON responses) |
| `GET /r/registry.json` | Full registry index (shadcn `registry.json` shape) |
| `GET /r/:name.json` | One item's full source, shadcn `registry-item.json` shape |
| `GET /r/:kind/:name.json` | Same, disambiguated by kind (only `ui` today) |

### Install a component with the shadcn CLI

Any item is directly installable once this server is reachable:

```bash
npx shadcn add https://<your-deployment>/r/ui/button.json
```

### Use it as an MCP server

Point any MCP client at `https://<your-deployment>/mcp` (Streamable HTTP
transport). Tools exposed:

- `list_components({ kind?, category?, limit? })`
- `search_components({ query, kind?, limit? })`
- `get_component({ name })` — full file contents + dependencies + install command
- `get_install_command({ name })`
- `list_categories()`

Plus one resource, `registry://designkit/index`, with the full catalog in one shot.

Claude Code (`.mcp.json` or `claude mcp add`):

```json
{
  "mcpServers": {
    "designkit": {
      "type": "http",
      "url": "https://<your-deployment>/mcp"
    }
  }
}
```

## Deploying (Coolify)

This is a plain Bun HTTP server with a Dockerfile, so it deploys like any other
service in the monorepo's `services/` layer.

1. In Coolify, create a new **Dockerfile** application pointing at this repo.
2. **Build context: the repo root** (`tipkit-react/`), not `mcp-server/` — the
   server reads `../src` at runtime, so the image needs both.
   **Dockerfile path:** `mcp-server/Dockerfile`.
3. Set `PUBLIC_BASE_URL` to the app's public URL (e.g.
   `https://designkit-mcp.ramekhchhoeng.com`) — this is only used to print
   correct `npx shadcn add <url>` install commands from `get_component` /
   `get_install_command`; nothing else depends on it.
4. Expose port `8787` (or set `PORT` and update the Coolify port mapping to match).
5. No database, cache, or other shared service is required — this is a stateless
   reader of the repo's own source tree.

```bash
# Manual build/run, for reference:
docker build -f mcp-server/Dockerfile -t designkit-mcp .
docker run -p 8787:8787 -e PUBLIC_BASE_URL=https://designkit-mcp.ramekhchhoeng.com designkit-mcp
```

## How the registry is built

`src/registry/index.ts` merges the active loaders into one in-memory catalog
on first request (no build step):

- `ui-components.ts` scans `src/components/ui/*.tsx` and parses each file's
  own `import` statements to derive `dependencies` (npm packages) and
  `registryDependencies` (sibling ui primitives).

Item names are unique today (verified by `registry:stats`), so
`get_component("button")` resolves unambiguously. If a future kind (lib,
example, block) introduces a name shared with an existing `ui` item,
`findItem()` reports the collision and asks for a kind-qualified name
(`ui:button` vs `lib:button`) instead of guessing.
