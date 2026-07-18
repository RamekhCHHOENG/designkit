# DesignKit

Apple-inspired, accessible React components for web applications. DesignKit combines the clarity and polish of Apple interfaces with practical patterns learned from shadcn/ui and the wider web component ecosystem.

> DesignKit is an independent project. It is not affiliated with or endorsed by Apple Inc. or shadcn.

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

Set `data-dk-theme="dark"` on the root element to use the included dark tokens. The stylesheet also recognizes an existing `data-theme="dark"` attribute.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run build
npm run pack:check
```

`npm run build:lib` creates ESM, CommonJS, CSS, and TypeScript declaration files in `dist/`. `npm run build:docs` creates the documentation site in `docs-dist/`.

## Release

This project follows semantic versioning. A GitHub release triggers the npm publishing workflow after the package builds successfully. The npm package name is `@ramekhchhoeng/designkit`.

## License

[MIT](./LICENSE) © 2026 Ramekh CHHOENG
