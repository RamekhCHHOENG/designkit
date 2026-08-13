import { Hono } from "hono";
import { cors } from "hono/cors";
import { PORT } from "./config.ts";
import { mcpRoutes } from "./http/mcp-route.ts";
import { registryRoutes } from "./http/registry-routes.ts";
import { getRegistry } from "./registry/index.ts";

const app = new Hono();

app.use("*", cors());

app.get("/health", (c) => {
  const { items } = getRegistry();
  return c.json({ status: "ok", items: items.length });
});

app.get("/", (c) =>
  c.json({
    name: "designkit-mcp",
    description: "Remote MCP server + shadcn-compatible registry for @ramekhchhoeng/designkit.",
    endpoints: {
      mcp: "/mcp",
      registryIndex: "/r/registry.json",
      registryItem: "/r/:name.json (or /r/:kind/:name.json)",
      health: "/health",
    },
  }),
);

app.route("/mcp", mcpRoutes);
app.route("/r", registryRoutes);

console.log(`designkit-mcp listening on http://localhost:${PORT} (${getRegistry().items.length} registry items)`);

export default {
  port: PORT,
  fetch: app.fetch,
};
