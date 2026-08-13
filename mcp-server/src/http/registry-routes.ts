import { Hono, type Context } from "hono";
import { findItem, listItems } from "../registry/index.ts";
import { REGISTRY_HOMEPAGE, toRegistryIndexEntry, toRegistryItemJson } from "../registry/shape.ts";
import type { RegistryKind } from "../registry/types.ts";

export const registryRoutes = new Hono();

registryRoutes.get("/registry.json", (c) => {
  const kind = c.req.query("kind") as RegistryKind | undefined;
  const items = listItems({ kind }).map(toRegistryIndexEntry);
  return c.json({
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "designkit",
    homepage: REGISTRY_HOMEPAGE,
    items,
  });
});

function resolveAndRespond(c: Context, name: string) {
  const result = findItem(name);
  if (result.status === "not_found") return c.json({ error: `no registry item named "${name}"` }, 404);
  if (result.status === "ambiguous") {
    return c.json(
      { error: `"${name}" is ambiguous across kinds`, candidates: result.candidates },
      409,
    );
  }
  return c.json(toRegistryItemJson(result.item));
}

// Kind-qualified form for disambiguating names shared across kinds, e.g.
// /r/ui/button.json vs /r/component/button-01.json. Registered before the
// flat form so a two-segment path can't be swallowed by it.
registryRoutes.get("/:kind{[^/]+}/:name{[^/]+\\.json$}", (c) => {
  const kind = c.req.param("kind");
  const name = c.req.param("name").replace(/\.json$/, "");
  return resolveAndRespond(c, `${kind}:${name}`);
});

// Flat form used by `npx shadcn add <host>/r/<name>.json`.
registryRoutes.get("/:name{[^/]+\\.json$}", (c) => {
  const name = c.req.param("name").replace(/\.json$/, "");
  return resolveAndRespond(c, name);
});
