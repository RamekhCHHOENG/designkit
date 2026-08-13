export const PORT = Number(process.env.PORT ?? 8787);

/** Public URL this server is reachable at once deployed — used to build
 * copy-pasteable `npx shadcn add <url>` install commands. Set this env var
 * on the Coolify deployment (see README). Falls back to localhost for dev. */
export const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL ?? `http://localhost:${PORT}`).replace(/\/$/, "");
