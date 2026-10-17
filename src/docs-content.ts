// Documentation content, authored as data so the page only needs a tiny renderer.
// Inline text supports `code` and [links](url).

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "code"; code: string; title?: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; text: string }

export interface DocPage {
  slug: string
  title: string
  description: string
  blocks: Block[]
}

const REGISTRY = "https://designkit-smoky.vercel.app"

const changelog: Block[] = [
  { type: "h2", text: "Unreleased" },
  { type: "h3", text: "Added" },
  {
    type: "list",
    items: [
      "**Blocks** — 65 copy-and-paste blocks: 16 sidebars, 5 logins, 5 signups, 5 OTP forms, 32 calendars, a dashboard and a products table.",
      "**Charts** — 70 Recharts examples (area, bar, line, pie, radar, radial, tooltip) with a Code view for each.",
      "**One-command installs** — every component, block and chart is a shadcn registry item served from `/r/<name>.json` (544 items). Install commands appear on component pages and in each block's and chart's Code view.",
      "**ECharts examples** — 344 examples from the Apache ECharts gallery (290 regular and 54 3D/WebGL) on the Charts page (a second tab next to Recharts), searchable by category, each with a Code view and an install command, plus the new `echart` component that runs them.",
      "**Themes** — pick an accent color, base gray and radius, preview it on real components in light and dark, and copy the CSS variables.",
      "**Form** — `form.tsx` built on `react-hook-form` and zod (copy-in registry component).",
      "**Docs** — Theming, Dark mode, CLI & Registry, Forms and this changelog.",
    ],
  },
  { type: "h3", text: "Changed" },
  {
    type: "list",
    items: [
      "Recharts is now 3.10; chart examples were updated for its stricter types.",
      "Registry items pin each npm dependency to the version range DesignKit is built with, so a new major release of a dependency can't break an install.",
      "The header is driven by a section list (Blocks, Charts, Themes, Docs).",
    ],
  },
  { type: "h3", text: "Fixed" },
  {
    type: "list",
    items: [
      "`@tanstack/react-table` 9 broke the dashboard block on install — the block is written for v8 and the item now pins `^8.21.3`.",
      "Legend and label typings in six chart examples and one block under the latest Recharts.",
    ],
  },
  { type: "h2", text: "1.1.3" },
  {
    type: "list",
    items: ["Complete React and Vue parity, the full UI primitive suite, the `styles.css` export and hard test suites across 1,980 components and examples."],
  },
  { type: "h2", text: "1.1.2" },
  {
    type: "list",
    items: ["Published the verified React package to npm with automated versioning, changelog generation and GitHub releases."],
  },
  { type: "h2", text: "0.1.0 — 2026-07-18" },
  {
    type: "list",
    items: [
      "Initial public React package structure with ESM, CommonJS, CSS and TypeScript declarations.",
      "Apple-inspired Button, Badge, Input, Card, Drawer and DataTable components.",
      "Web documentation catalog with interactive component stories.",
    ],
  },
]

export const docs: DocPage[] = [
  {
    slug: "theming",
    title: "Theming",
    description: "How DesignKit's colors and radius work, and how to change them.",
    blocks: [
      {
        type: "p",
        text: "DesignKit styles everything with CSS variables in OKLCH, the same convention as shadcn/ui. Components never hard-code colors; they read semantic tokens such as `--primary` and `--background`. Re-theming is changing variables, not editing components.",
      },
      { type: "h2", text: "The fastest way" },
      {
        type: "p",
        text: "Open the [Themes page](#themes), pick an accent color, a base gray and a radius, check it on real components, then copy the CSS. Paste it over the `:root` and `.dark` blocks in your global stylesheet (`src/index.css` in a Vite app).",
      },
      { type: "h2", text: "Tokens" },
      {
        type: "table",
        head: ["Token", "Used for"],
        rows: [
          ["`--background` / `--foreground`", "The page background and default text."],
          ["`--card` / `--card-foreground`", "Card surfaces."],
          ["`--popover` / `--popover-foreground`", "Dropdowns, popovers, tooltips and other floating panels."],
          ["`--primary` / `--primary-foreground`", "Main actions: default buttons, checked controls, progress bars."],
          ["`--secondary` / `--secondary-foreground`", "Secondary buttons and badges."],
          ["`--muted` / `--muted-foreground`", "Subdued surfaces and helper text."],
          ["`--accent` / `--accent-foreground`", "Hover and selected backgrounds, e.g. menu items."],
          ["`--destructive`", "Destructive buttons and error text."],
          ["`--border`, `--input`, `--ring`", "Borders, input outlines and focus rings."],
          ["`--chart-1` … `--chart-5`", "Series colors in charts."],
          ["`--sidebar`, `--sidebar-*`", "The Sidebar component."],
          ["`--radius`", "The base corner radius; every rounded size derives from it."],
        ],
      },
      { type: "h2", text: "How tokens reach components" },
      {
        type: "code",
        title: "src/index.css",
        code: `@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) * 0.8);
}

:root {
  --primary: oklch(0.205 0 0);
  --radius: 0.625rem;
}

.dark {
  --primary: oklch(0.922 0 0);
}`,
      },
      {
        type: "p",
        text: "Because the theme is declared with `@theme inline`, a utility such as `bg-primary` compiles to `var(--primary)` directly. Overriding a variable on any element therefore re-themes everything inside it, which is how the Themes preview works without touching the rest of the page.",
      },
      { type: "h2", text: "Radius" },
      {
        type: "p",
        text: "One variable, `--radius`, drives the whole scale: `rounded-sm` is 0.6×, `rounded-md` 0.8×, `rounded-lg` 1×, `rounded-xl` 1.4×, `rounded-2xl` 1.8×, `rounded-3xl` 2.2× and `rounded-4xl` 2.6×. Set it to `0` for square corners or `1rem` for very round ones.",
      },
      { type: "h2", text: "Scoped themes" },
      {
        type: "code",
        title: "A branded section",
        code: `<section style={{ "--primary": "oklch(0.586 0.222 17.6)" } as React.CSSProperties}>
  <Button>Uses the section's primary color</Button>
</section>`,
      },
      { type: "h2", text: "Adding your own color" },
      {
        type: "code",
        code: `:root { --success: oklch(0.62 0.17 150); }
.dark { --success: oklch(0.7 0.17 150); }

@theme inline {
  --color-success: var(--success);
}

/* now available as bg-success, text-success, border-success … */`,
      },
      {
        type: "note",
        text: "The default `--chart-1` to `--chart-5` tokens are grays, so charts look monochrome until you choose a colored theme. On the Themes page, pick *Accent ramp* or *Multicolor* to get a real palette.",
      },
    ],
  },
  {
    slug: "dark-mode",
    title: "Dark mode",
    description: "Class-based dark mode, with and without a library.",
    blocks: [
      {
        type: "p",
        text: "Dark mode is class-based: put the `dark` class on an ancestor (normally `<html>`) and every component switches to the `.dark` token values. The variant is declared once in your stylesheet:",
      },
      { type: "code", title: "src/index.css", code: `@custom-variant dark (&:is(.dark *));` },
      { type: "h2", text: "With next-themes (what this site uses)" },
      {
        type: "code",
        code: `npm install next-themes`,
      },
      {
        type: "code",
        title: "src/main.tsx",
        code: `import { ThemeProvider } from "next-themes"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>,
)`,
      },
      {
        type: "code",
        title: "A theme toggle",
        code: `import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const next = { light: "dark", dark: "system", system: "light" } as const

  return (
    <Button variant="ghost" onClick={() => setTheme(next[(theme as keyof typeof next) ?? "system"])}>
      Theme: {theme}
    </Button>
  )
}`,
      },
      {
        type: "p",
        text: "`next-themes` also follows the operating system setting when the theme is `system`, remembers the choice, and avoids the flash of the wrong theme on first paint.",
      },
      { type: "h2", text: "Without a library" },
      {
        type: "code",
        title: "index.html (in <head>, before your app)",
        code: `<script>
  const stored = localStorage.getItem("theme")
  const dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches
  document.documentElement.classList.toggle("dark", dark)
</script>`,
      },
      {
        type: "code",
        title: "Toggle",
        code: `function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark")
  localStorage.setItem("theme", dark ? "dark" : "light")
}`,
      },
      { type: "h2", text: "Writing dark-aware styles" },
      {
        type: "list",
        items: [
          "Prefer tokens (`bg-background`, `text-muted-foreground`) over `dark:` utilities; they switch automatically.",
          "When a component needs a one-off tweak, use the variant: `dark:bg-input/30`.",
          "To preview dark mode for a single subtree, add the `dark` class to that element. The Themes page does exactly this.",
        ],
      },
    ],
  },
  {
    slug: "cli",
    title: "CLI & Registry",
    description: "Install any component, block or chart with the shadcn CLI.",
    blocks: [
      {
        type: "p",
        text: "Every DesignKit component, block and chart is published as a [shadcn registry](https://ui.shadcn.com/docs/registry) item. One command copies the source into your project together with the DesignKit components and npm packages it depends on.",
      },
      { type: "h2", text: "Prerequisites" },
      {
        type: "list",
        items: [
          "A React project with Tailwind CSS v4 and a `@/*` path alias.",
          "A `components.json` file. If you don't have one, run `npx shadcn@latest init`.",
        ],
      },
      { type: "h2", text: "Install an item" },
      { type: "code", code: `npx shadcn@latest add ${REGISTRY}/r/login-01.json` },
      {
        type: "p",
        text: "That writes the block's files plus the components it uses (`button`, `card`, `field`, …) and installs any missing packages. Items you already have are skipped unless you pass `--overwrite`.",
      },
      { type: "h2", text: "Register a namespace" },
      {
        type: "p",
        text: "Add DesignKit to `components.json` once, then refer to items by name, several at a time if you like:",
      },
      {
        type: "code",
        title: "components.json",
        code: `{
  "registries": {
    "@designkit": "${REGISTRY}/r/{name}.json"
  }
}`,
      },
      { type: "code", code: `npx shadcn@latest add @designkit/button @designkit/login-01 @designkit/chart-area-default` },
      { type: "h2", text: "Preview before writing" },
      { type: "code", code: `npx shadcn@latest add @designkit/login-01 --dry-run` },
      { type: "p", text: "`--dry-run` lists every file that would be created or changed and writes nothing." },
      { type: "h2", text: "What's in an item" },
      {
        type: "code",
        title: `${REGISTRY}/r/login-01.json (trimmed)`,
        code: `{
  "name": "login-01",
  "type": "registry:block",
  "registryDependencies": [
    "${REGISTRY}/r/button.json",
    "${REGISTRY}/r/card.json"
  ],
  "files": [
    { "path": "src/blocks/login-01/page.tsx", "type": "registry:component", "content": "…" }
  ]
}`,
      },
      {
        type: "list",
        items: [
          "`registryDependencies` are full URLs, so the CLI pulls DesignKit's own components rather than looking names up in the default shadcn registry.",
          "`dependencies` are pinned to the version ranges DesignKit is built and tested with (for example `recharts@^3.10.1`).",
          "The catalogue of every item is at `/r/index.json`.",
        ],
      },
      { type: "h2", text: "Item types" },
      {
        type: "table",
        head: ["Type", "Installs to", "Contents"],
        rows: [
          ["`registry:ui`", "`components/ui/`", "The 64 UI components, e.g. `button`, `sidebar`, `chart`, `echart`."],
          ["`registry:hook`", "`hooks/`", "Shared hooks such as `use-mobile`."],
          ["`registry:block`", "`src/blocks/<name>/` for blocks, `components/` for charts", "The 65 blocks, 70 Recharts charts and 344 ECharts examples."],
        ],
      },
      { type: "h2", text: "Publishing your own build" },
      {
        type: "code",
        code: `npm run registry:build

# for a deployment on another host:
REGISTRY_URL=https://ui.example.com npm run registry:build`,
      },
      {
        type: "p",
        text: "The script regenerates `registry.json` from the files under `src/`, derives each item's dependencies from its real imports, and runs `shadcn build` to write `public/r/*.json`. On Vercel it runs automatically before every docs build.",
      },
      {
        type: "note",
        text: "`form` needs `react-hook-form`. It is a copy-in component and is not part of the published package entry, which bundles all of its other dependencies.",
      },
    ],
  },
  {
    slug: "forms",
    title: "Forms",
    description: "Validated forms with react-hook-form and zod.",
    blocks: [
      {
        type: "p",
        text: "For layout-only forms, the `Field` components are enough. When you need validation, install `form`: a thin layer over [react-hook-form](https://react-hook-form.com) that wires ids and `aria-*` attributes for you.",
      },
      { type: "h2", text: "Install" },
      {
        type: "code",
        code: `npx shadcn@latest add ${REGISTRY}/r/form.json
npm install react-hook-form @hookform/resolvers zod`,
      },
      { type: "h2", text: "A validated form" },
      {
        type: "code",
        title: "profile-form.tsx",
        code: `import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  username: z.string("Username is required.").min(2, "At least 2 characters."),
  email: z.email("Enter a valid email address."),
})

export function ProfileForm() {
  const form = useForm<z.input<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => console.log(values))} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}`,
      },
      { type: "h2", text: "How the pieces fit" },
      {
        type: "list",
        items: [
          "`FormField` connects one field to the form and provides its name to the parts below.",
          "`FormItem` groups a label, control, description and message, and generates their ids.",
          "`FormControl` sets `id`, `aria-describedby` and `aria-invalid` on the single control it wraps.",
          "`FormMessage` shows the field's validation error, and nothing when the field is valid.",
        ],
      },
      { type: "h2", text: "Checkboxes and selects" },
      {
        type: "p",
        text: "DesignKit's controls are built on Base UI, which reports changes through `onCheckedChange` and `onValueChange` instead of a DOM event. Pass the value to `field.onChange`:",
      },
      {
        type: "code",
        code: `<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex items-start gap-3">
      <FormControl>
        <Checkbox checked={field.value === true} onCheckedChange={(checked) => field.onChange(checked)} />
      </FormControl>
      <FormLabel>Accept terms and conditions</FormLabel>
    </FormItem>
  )}
/>`,
      },
      { type: "h2", text: "Server errors" },
      {
        type: "code",
        code: `form.setError("email", { message: "That email is already registered." })`,
      },
      { type: "p", text: "The message appears in the matching `FormMessage` and the control is marked `aria-invalid`." },
    ],
  },
  {
    slug: "echarts",
    title: "ECharts examples",
    description: "Use and install the Apache ECharts examples in a DesignKit app.",
    blocks: [
      {
        type: "p",
        text: "The [Charts page](#charts/echarts) has a second tab with 344 examples from the [Apache ECharts gallery](https://echarts.apache.org/examples/en/index.html), from basic lines to maps, matrices, custom series and 3D charts. Each one is adapted to DesignKit and installs with a single command.",
      },
      { type: "h2", text: "Install an example" },
      { type: "code", code: `npx shadcn@latest add ${REGISTRY}/r/echarts-line-simple.json` },
      {
        type: "p",
        text: "Item names are `echarts-` plus the example's id in the official gallery (the `c=` parameter of its editor URL). The command also installs the `echart` component and the `echarts` package; the 3D examples add `echarts-gl`, and the regression and clustering ones add `echarts-stat`.",
      },
      { type: "h2", text: "The EChart component" },
      {
        type: "p",
        text: "`EChart` runs an ECharts option for you. You give it a `setup` function that returns the option; it creates the chart, keeps it sized to its box, follows the `dark` class, and disposes it (and any timers) on unmount. Charts are created only while they are near the viewport, so a page can hold many of them. Define `setup` outside your component, or memoize it with `useCallback`: a new function on every render re-creates the chart.",
      },
      {
        type: "code",
        title: "weekly-line.tsx",
        code: `import { EChart, type EChartSetup } from "@/components/ui/echart"

const setup: EChartSetup = () => ({
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  yAxis: { type: "value" },
  series: [{ type: "line", data: [150, 230, 224, 218, 135, 147, 260] }],
})

export function WeeklyLine() {
  return <EChart setup={setup} />
}`,
      },
      { type: "h3", text: "Size" },
      {
        type: "p",
        text: "The chart fills its width and is 400px tall by default. Override the height with a class, or with the `--echart-height` variable on any ancestor:",
      },
      {
        type: "code",
        code: `<EChart setup={setup} className="h-80" />

<div style={{ "--echart-height": "60vh" } as React.CSSProperties}>
  <EChart setup={setup} />
</div>`,
      },
      { type: "h2", text: "How the examples are written" },
      {
        type: "p",
        text: "The official examples are scripts that expect a few variables to exist. Each installed example keeps its original code inside `setup`, which receives the same things:",
      },
      {
        type: "table",
        head: ["Name", "What it is"],
        rows: [
          ["`myChart`", "The ECharts instance, for `setOption`, `on`, `dispatchAction` and so on."],
          ["`app`", "A scratch object. `app.config` and `app.configParameters` become a small controls panel over the chart."],
          ["`setTimeout`, `setInterval`", "Timers that are cleared when the chart unmounts."],
          ["return value", "The option to apply. Examples that build their option later (after loading data) call `myChart.setOption` themselves."],
        ],
      },
      {
        type: "p",
        text: "Examples that load data use the four jQuery calls the official ones use (`$.get`, `$.getJSON`, `$.getScript`, `$.when`). They come from `@/components/ui/echart` as a small `fetch`-based helper, so jQuery is not a dependency.",
      },
      { type: "h2", text: "Sample data" },
      {
        type: "p",
        text: "110 examples load data files (maps, datasets, images). They read them from a copy of the official repository pinned to one commit and served by jsDelivr. The address is the `ROOT_PATH` constant at the top of each such example, so you can point it at your own host. The `china` and `world` map outlines, which the official gallery preloads, come from `registerBuiltinMap`: ECharts 5 and later no longer bundle them, so it fetches them once from the last release that did (4.9.0).",
      },
      { type: "h2", text: "Dark mode" },
      {
        type: "p",
        text: "When the `dark` class is on `<html>`, charts are created with ECharts' built-in dark theme and re-created when the class changes. That theme paints its own dark background. A few 3D examples are drawn for a dark background, so they pass `theme=\"dark\"` to always use it.",
      },
      { type: "h2", text: "3D examples" },
      {
        type: "p",
        text: "The 3D examples (bar, scatter, surface, globe and map charts) use [ECharts GL](https://github.com/ecomfe/echarts-gl), which needs a browser with WebGL. They import `echarts-gl` at the top of the file, and each one creates a WebGL context, so keep the number on one page modest.",
      },
      { type: "h2", text: "What is not included" },
      {
        type: "list",
        items: [
          "Nine examples that need the Baidu Maps API (`bmap`), which requires an account key.",
          "Twelve 3D examples that draw on a Mapbox map and need a Mapbox access token.",
          "One 3D example that needs an audio source.",
          "Three 3D examples that load image files missing from the official examples repository.",
        ],
      },
      { type: "h2", text: "Regenerating from the official repository" },
      {
        type: "code",
        code: `git clone --depth 1 https://github.com/apache/echarts-examples ../echarts-examples
node scripts/build-echarts-examples.mjs ../echarts-examples
node scripts/echarts-type-ignores.mjs ../echarts-examples`,
      },
      {
        type: "p",
        text: "The script converts every example into `src/echarts/echarts-<id>.tsx` (and the Vue components when the sibling site is present). The examples are © The Apache Software Foundation, licensed under the [Apache License 2.0](https://github.com/apache/echarts-examples/blob/master/LICENSE).",
      },
      {
        type: "note",
        text: "Some examples use options that the typings in ECharts 6.1 don't describe yet, or are plain JavaScript. 40 of them carry a `// @ts-ignore` above the lines concerned, so all of them compile in a strict project.",
      },
    ],
  },
  {
    slug: "changelog",
    title: "Changelog",
    description: "What changed in DesignKit.",
    blocks: changelog,
  },
]
