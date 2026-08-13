# DesignKit

Apple-inspired, accessible React components for web applications. DesignKit combines the clarity and polish of Apple interfaces with practical patterns learned from shadcn/ui and the wider web component ecosystem.

> DesignKit is an independent project. It is not affiliated with or endorsed by Apple Inc. or shadcn.

**Live documentation:** [designkit-smoky.vercel.app](https://designkit-smoky.vercel.app/)

## Install

```bash
npm install @ramekhchhoeng/designkit
```

Import the component styles once near the root of your application:

```tsx
import "@ramekhchhoeng/designkit/styles.css";
```

## Quick start

```tsx
import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@ramekhchhoeng/designkit";
import "@ramekhchhoeng/designkit/styles.css";

export function WorkspaceCard() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <Badge tone="violet">New</Badge>
        <CardTitle>Analytics workspace</CardTitle>
        <CardDescription>
          Keep metrics, reports, and team decisions in one place.
        </CardDescription>
      </CardHeader>

      <Input
        type="email"
        label="Invite a teammate"
        placeholder="name@example.com"
        description="We will send them a secure invitation."
      />

      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button color="blue">Send invite</Button>
      </CardFooter>
    </Card>
  );
}
```

## Public components

The first package release includes:

- `Button` — primary, secondary, outline, ghost, and destructive variants; four sizes; semantic colors; loading and disabled states.
- `Badge` — soft, solid, and outline variants with six semantic tones.
- `Input` — label, help text, error state, adornments, and three sizes.
- `Card` — default, elevated, and interactive surfaces with compound layout components.
- `Drawer` — left, right, and bottom placement with focus trapping, Escape handling, focus restoration, and a portal.
- `DataTable` — search, sorting, row selection, pagination, custom rendering, and accessible table semantics.

The documentation app also explores a larger web-only catalog. Those previews are a roadmap, not package exports, until their APIs and accessibility behavior are production-ready.

## Button examples

```tsx
<Button size="small">Small</Button>
<Button size="medium" color="blue">Medium</Button>
<Button size="large" color="green">Large</Button>

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

<Button loading>Saving</Button>
<Button disabled>Unavailable</Button>
```

## Theming

DesignKit uses prefixed CSS custom properties. Override them at the application root when you need to match your product:

```css
:root {
  --dk-blue: #0066cc;
  --dk-text: #1d1d1f;
  --dk-surface: #ffffff;
  --dk-border: rgba(29, 29, 31, 0.13);
}
```

Set `data-dk-theme="dark"` on the root element to use the included dark tokens. The package deliberately leaves generic attributes such as `data-theme` alone so it does not take ownership of a host application's theme system.

## MCP server

[`mcp-server/`](./mcp-server) exposes the full component catalog — the 6 published lib components plus the vendored ui primitives, gallery examples, and blocks — as a remote MCP server and a shadcn-compatible registry (`npx shadcn add <url>/r/<name>.json`). See [`mcp-server/README.md`](./mcp-server/README.md).

## Framework compatibility

The package ships ESM, CommonJS, and TypeScript declarations. Its public entry keeps a React `"use client"` boundary, so interactive components can be imported safely by Next.js App Router client trees. Vite and other React bundlers can import the same entry normally.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm test
npm run verify
```

`npm run build:lib` creates ESM, CommonJS, CSS, and TypeScript declaration files in `dist/`. `npm run build:docs` creates the documentation site in `docs-dist/`. The included `vercel.json` directs Vercel to publish `docs-dist/`, not the repository source.

## Release

This project follows semantic versioning with Changesets. Add a changeset to each pull request that changes the public package API or behavior:

```bash
npm run changeset
```

After changes land on `main`, the release workflow opens or updates a **Version Packages** pull request. Merging that pull request runs the full verification suite, publishes `@ramekhchhoeng/designkit` to npm, and creates the matching Git tag and GitHub release. Do not create package releases or version tags manually.

## Credits

The documentation site's extended example gallery (`src/space/`) vendors components,
examples, and blocks from [Shadcn Space](https://github.com/shadcnspace/shadcnspace)
(MIT © 2026 Shadcn Space, see [src/space/LICENSE](./src/space/LICENSE)), adapted to
run in this Vite docs app. The published `@ramekhchhoeng/designkit` npm package does
not include these files and remains dependency-free.

## License

[MIT](./LICENSE) © 2026 Ramekh CHHOENG
