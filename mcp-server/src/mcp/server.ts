import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { findItem, listItems } from "../registry/index.ts";
import { installCommand } from "../registry/install.ts";
import { REGISTRY_HOMEPAGE, toRegistryIndexEntry, toRegistryItemJson } from "../registry/shape.ts";
import type { RegistryKind } from "../registry/types.ts";

const KIND_ENUM = z.enum(["lib", "ui", "component", "block"]);

function text(value: unknown) {
  return { content: [{ type: "text" as const, text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] };
}

function ambiguousText(candidates: string[], name: string) {
  return text(
    `"${name}" matches more than one kind. Call again with one of: ${candidates.join(", ")}`,
  );
}

export function createMcpServer(): McpServer {
  const server = new McpServer(
    { name: "designkit", version: "0.1.0" },
    {
      instructions:
        "Discover and install DesignKit components: the 6 zero-dependency components published as " +
        "@ramekhchhoeng/designkit, plus the full vendored shadcnspace catalog (65 ui primitives, " +
        "~311 gallery examples, 51 full-page blocks) used by the docs site. Use list_components or " +
        "search_components to browse, then get_component for full source + an install command.",
    },
  );

  server.registerTool(
    "list_components",
    {
      title: "List DesignKit components",
      description:
        "List components in the DesignKit registry, optionally filtered by kind " +
        "(lib = published npm package, ui = shadcnspace primitive, component = gallery example/variant, " +
        "block = full-page block) and/or category.",
      inputSchema: {
        kind: KIND_ENUM.optional().describe("Restrict to one kind of item."),
        category: z.string().optional().describe("Restrict to items tagged with this category."),
        limit: z.number().int().positive().max(500).optional().describe("Max items to return (default 100)."),
      },
    },
    async ({ kind, category, limit }) => {
      const items = listItems({ kind: kind as RegistryKind | undefined, category }).slice(0, limit ?? 100);
      return text(items.map(toRegistryIndexEntry));
    },
  );

  server.registerTool(
    "search_components",
    {
      title: "Search DesignKit components",
      description: "Full-text search over item name, title, and description across the whole registry.",
      inputSchema: {
        query: z.string().min(1).describe("Search text, e.g. \"date picker\" or \"hero\"."),
        kind: KIND_ENUM.optional(),
        limit: z.number().int().positive().max(200).optional().describe("Max results (default 25)."),
      },
    },
    async ({ query, kind, limit }) => {
      const items = listItems({ query, kind: kind as RegistryKind | undefined }).slice(0, limit ?? 25);
      return text(items.map(toRegistryIndexEntry));
    },
  );

  server.registerTool(
    "get_component",
    {
      title: "Get a DesignKit component's full source",
      description:
        "Fetch one registry item by name: full file contents, dependencies, and a ready-to-run install " +
        "command. Accepts a bare name (\"button\") or a kind-qualified name (\"ui:button\") when the bare " +
        "name is shared across kinds.",
      inputSchema: {
        name: z.string().describe('Item name, e.g. "Button", "button", "ui:button", or "hero-01".'),
      },
    },
    async ({ name }) => {
      const result = findItem(name);
      if (result.status === "not_found") return text(`No registry item named "${name}".`);
      if (result.status === "ambiguous") return ambiguousText(result.candidates, name);
      return text({ ...toRegistryItemJson(result.item), install: installCommand(result.item) });
    },
  );

  server.registerTool(
    "get_install_command",
    {
      title: "Get the install command for a component",
      description:
        "Return just the copy-pasteable install command for a registry item (npm install for published " +
        "lib components, npx shadcn add <url> for everything else).",
      inputSchema: { name: z.string() },
    },
    async ({ name }) => {
      const result = findItem(name);
      if (result.status === "not_found") return text(`No registry item named "${name}".`);
      if (result.status === "ambiguous") return ambiguousText(result.candidates, name);
      return text(installCommand(result.item));
    },
  );

  server.registerTool(
    "list_blocks",
    {
      title: "List DesignKit full-page blocks",
      description: "List the vendored shadcnspace full-page blocks (heroes, pricing sections, dashboards, ...).",
      inputSchema: { category: z.string().optional() },
    },
    async ({ category }) => text(listItems({ kind: "block", category }).map(toRegistryIndexEntry)),
  );

  server.registerTool(
    "list_categories",
    {
      title: "List registry categories",
      description: "List distinct category tags present in the registry, with item counts, per kind.",
      inputSchema: {},
    },
    async () => {
      const byKind = new Map<string, Map<string, number>>();
      for (const item of listItems()) {
        const cats = item.categories?.length ? item.categories : item.category ? [item.category] : [];
        for (const cat of cats) {
          const forKind = byKind.get(item.kind) ?? new Map<string, number>();
          forKind.set(cat, (forKind.get(cat) ?? 0) + 1);
          byKind.set(item.kind, forKind);
        }
      }
      const result = Object.fromEntries(
        [...byKind.entries()].map(([kind, cats]) => [kind, Object.fromEntries(cats)]),
      );
      return text(result);
    },
  );

  server.registerResource(
    "registry-index",
    "registry://designkit/index",
    {
      title: "DesignKit registry index",
      description: "Every item in the DesignKit registry (name, kind, title, description) in one shot.",
      mimeType: "application/json",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            { name: "designkit", homepage: REGISTRY_HOMEPAGE, items: listItems().map(toRegistryIndexEntry) },
            null,
            2,
          ),
        },
      ],
    }),
  );

  return server;
}
