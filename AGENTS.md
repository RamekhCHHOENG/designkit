# DesignKit contributor guide

DesignKit is a web-only React component library and documentation site.

## Commands

- `npm run dev` — start the documentation site.
- `npm run typecheck` — check the full TypeScript project.
- `npm run build:lib` — build package JavaScript, CSS, and declarations into `dist/`.
- `npm run build:docs` — build the documentation site into `docs-dist/`.
- `npm run build` — build both deliverables.
- `npm run pack:check` — inspect the npm tarball contents.

## Source layout

- `src/components/ui/*.tsx` contains the vendored shadcn/ui (Base UI, Nova preset) primitives.
- `src/components/*-example.tsx` contains one demo file per primitive, paired by slug.
- `src/catalog.ts` builds the docs catalog from those two globs (`import.meta.glob`).
- `src/lib/index.ts` is the only public JavaScript and type entrypoint — it re-exports the vendored primitives.
- `src/lib/utils.ts` provides the shared `cn()` helper.
- `src/main.tsx` is the documentation site's shell, router, and page templates.

## Conventions

- Keep the library web-only, accessible, responsive, and TypeScript-strict.
- Prefix public CSS classes and variables with `dk-` / `--dk-`.
- Keep React and React DOM as peer dependencies.
- Do not label a documentation preview as a public package export until it has a reusable API, keyboard behavior, accessibility checks, and exported types.
- Never commit `.env` files, npm tokens, credentials, build directories, or package tarballs.

## Graphify

This project has a knowledge graph at `graphify-out/`.

- For codebase questions, run `graphify query "<question>"` first when `graphify-out/graph.json` exists.
- Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts.
- After modifying code, run `graphify update .`.
