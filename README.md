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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@ramekhchhoeng/designkit";
import "@ramekhchhoeng/designkit/styles.css";

export function WorkspaceCard() {
  return (
    <Card>
      <CardHeader>
        <Badge>New</Badge>
        <CardTitle>Analytics workspace</CardTitle>
        <CardDescription>
          Keep metrics, reports, and team decisions in one place.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-1.5">
        <Label htmlFor="invite-email">Invite a teammate</Label>
        <Input id="invite-email" type="email" placeholder="name@example.com" />
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Send invite</Button>
      </CardFooter>
    </Card>
  );
}
```

See [`#installation`](https://designkit-smoky.vercel.app/#installation) for the full setup guide, or browse the live catalog at the root of the docs site.

## Public components

Every primitive vendored under `src/components/ui/` is a real package export — there is no separate curated subset. That's the full shadcn/ui (Base UI, Nova preset) catalog: `Accordion`, `Alert`, `AlertDialog`, `Avatar`, `Badge`, `Breadcrumb`, `Button`, `Calendar`, `Card`, `Carousel`, `Checkbox`, `Command`, `ContextMenu`, `Dialog`, `Drawer`, `DropdownMenu`, `Field`, `Input`, `Menubar`, `NavigationMenu`, `Popover`, `RadioGroup`, `Select`, `Sheet`, `Sidebar`, `Table`, `Tabs`, `Toast`, `Toaster`, `Tooltip`, and more — see the sidebar in the docs app for the complete, current list.

## Theming

DesignKit uses the same OKLCH CSS custom properties as shadcn/ui — `--background`, `--foreground`, `--primary`, `--card`, `--border`, `--ring`, and so on (see `src/index.css` for the full token set). Override them at the application root when you need to match your product:

```css
:root {
  --primary: oklch(0.55 0.2 260);
  --primary-foreground: oklch(0.98 0 0);
}
```

Add a `.dark` class to the root element to switch to the included dark tokens — DesignKit's own docs site does this via [`next-themes`](https://github.com/pacocoursey/next-themes)'s `<ThemeProvider attribute="class">`, and any class-based theme toggler works the same way.

## MCP server

[`mcp-server/`](./mcp-server) exposes the full component catalog — every published lib primitive plus gallery examples and blocks — as a remote MCP server and a shadcn-compatible registry (`npx shadcn add <url>/r/<name>.json`). See [`mcp-server/README.md`](./mcp-server/README.md).

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
