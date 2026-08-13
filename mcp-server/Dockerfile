# Build context MUST be the tipkit-react repo root, e.g.:
#   docker build -f mcp-server/Dockerfile -t designkit-mcp .
# This server reads component source straight out of src/lib and src/space
# at request time, so the image needs that source tree alongside its own code.

FROM oven/bun:1-slim

WORKDIR /app

COPY mcp-server/package.json mcp-server/bun.lock* ./mcp-server/
RUN cd mcp-server && bun install --frozen-lockfile --production

COPY src ./src
COPY mcp-server ./mcp-server

ENV NODE_ENV=production
ENV PORT=8787
EXPOSE 8787

WORKDIR /app/mcp-server
USER bun
CMD ["bun", "run", "src/index.ts"]
