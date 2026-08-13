import { Hono } from "hono";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createMcpServer } from "../mcp/server.ts";

export const mcpRoutes = new Hono();

// Stateless mode: one MCP server + transport per request, JSON responses
// (no SSE). Tools are pure registry reads with no server-initiated
// notifications, so there's nothing streaming ever needs to push — this
// keeps request handling simple and safe to run as multiple replicas behind
// a load balancer.
mcpRoutes.all("/", async (c) => {
  const server = createMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  const response = await transport.handleRequest(c.req.raw);
  await transport.close();
  await server.close();
  return response;
});
