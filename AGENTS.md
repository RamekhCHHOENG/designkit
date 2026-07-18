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

- `src/lib/components/` contains production package components.
- `src/lib/index.ts` is the only public JavaScript and type entrypoint.
- `src/lib/styles/designkit.css` is the public stylesheet.
- `src/WebCatalog.tsx` contains documentation previews and roadmap components.
- `src/componentDocs.tsx` provides documentation metadata and examples.

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
