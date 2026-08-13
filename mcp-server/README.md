# designkit-mcp

A remote MCP server, and a [shadcn](https://ui.shadcn.com)-compatible component
registry, exposing every DesignKit component from one place:

- **lib** (6) — the zero-dependency components actually published as
  [`@ramekhchhoeng/designkit`](https://www.npmjs.com/package/@ramekhchhoeng/designkit):
  Button, Badge, Card, DataTable, Drawer, Input.
- **ui** (65) — the shadcnspace UI primitives vendored under `src/space/components/ui`
  (Base UI + Tailwind), auto-indexed with their real dependencies.
- **component** (~311) — every numbered gallery example/variant from the docs site
  (`button-01`, `hero`-flavored animated lists, date pickers, etc).
- **block** (51) — full-page blocks (heroes, pricing sections, dashboards, auth
  flows, ...).

It reads component source straight out of `../src/lib` and `../src/space` at
request time — there is no build step or generated snapshot to go stale.

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
| `GET /r/:kind/:name.json` | Same, disambiguated by kind (`ui`, `component`, `block`, `lib`) |

### Install a component with the shadcn CLI

Any item is directly installable once this server is reachable:

```bash
npx shadcn add https://<your-deployment>/r/ui/button.json
npx shadcn add https://<your-deployment>/r/block/hero-01.json
```

### Use it as an MCP server

Point any MCP client at `https://<your-deployment>/mcp` (Streamable HTTP
transport). Tools exposed:

- `list_components({ kind?, category?, limit? })`
- `search_components({ query, kind?, limit? })`
- `get_component({ name })` — full file contents + dependencies + install command
- `get_install_command({ name })`
- `list_blocks({ category? })`
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

`src/registry/index.ts` merges four loaders into one in-memory catalog on
first request (no build step):

- `lib-components.ts` scans `src/lib/components/*.tsx`.
- `ui-components.ts` scans `src/space/components/ui/*.tsx` and parses each
  file's own `import` statements to derive `dependencies` (npm packages) and
  `registryDependencies` (sibling ui primitives) — there's no separate
  metadata file for these upstream, so this is the source of truth.
- `example-components.ts` and `blocks.ts` import the vendored
  `src/space/registry/index.ts` / `src/space/registry/blocks/index.ts` data
  arrays directly (these already carry shadcn-shaped metadata) and rewrite
  their `src/components/...` / `src/assets/...` paths to where those files
  actually live in this repo (`src/space/components/...`).

Item names are unique across all 433 items today (verified by
`registry:stats`), so `get_component("button")` resolves unambiguously to the
`ui` primitive. If a future vendored sync introduces a name shared across
kinds, `findItem()` reports the collision and asks for a kind-qualified name
(`ui:button` vs `component:button-01`) instead of guessing.
