import { StrictMode, useEffect, useMemo, useState, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "next-themes";
import { CheckIcon, CopyIcon, GithubIcon, MonitorIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { catalog, catalogGroups, type CatalogEntry, type CatalogExample } from "@/catalog";
import { ExamplesSection } from "@/ExamplesSection";
import "./index.css";

// Lazy glob maps for Origin UI examples
const compModules = import.meta.glob("./registry/default/components/comp-*.tsx") as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;
const compSources = import.meta.glob("./registry/default/components/comp-*.tsx", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

function useHashSlug() {
  const read = () => window.location.hash.replace(/^#/, "");
  const [slug, setSlug] = useState(read);
  useEffect(() => {
    const onChange = () => setSlug(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return slug;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = { light: "dark", dark: "system", system: "light" } as const;
  const icon = { light: <SunIcon className="size-4" />, dark: <MoonIcon className="size-4" />, system: <MonitorIcon className="size-4" /> };
  const current = (theme as keyof typeof next) ?? "system";
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Appearance: ${current}`}
      title={`Appearance: ${current}`}
      onClick={() => setTheme(next[current])}
    >
      {icon[current]}
    </Button>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Clipboard API unavailable (insecure context, permissions) -- best effort only.
  }
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <pre className="max-h-[32rem] overflow-auto rounded-lg border bg-muted p-4 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
      <Button
        variant="outline"
        size="icon-sm"
        className="absolute top-2 right-2"
        aria-label={copied ? "Copied" : "Copy code"}
        onClick={async () => {
          await copyText(code);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        }}
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </Button>
    </div>
  );
}

function ExampleViewer({ example, showTitle }: { example: CatalogExample; showTitle: boolean }) {
  const { Component } = example;
  return (
    <section className="flex flex-col gap-2">
      {showTitle && <h3 className="text-sm font-medium text-muted-foreground">{example.title}</h3>}
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {/* `contain: layout` gives fixed-position descendants (some demos,
              e.g. sidebar, dock a real app shell with `position: fixed`) a
              containing block here instead of the viewport, so they stay
              inside this scroll frame instead of covering the real page. */}
          <div className="relative max-h-[36rem] overflow-auto rounded-lg border" style={{ contain: "layout" }}>
            <Component />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={example.source} />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function ComponentPage({ entry }: { entry: CatalogEntry }) {
  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted-foreground">{entry.group}</span>
        <h1 className="text-3xl font-semibold tracking-tight">{entry.title}</h1>
        <p className="text-sm text-muted-foreground">
          Vendored from shadcn/ui &mdash; <code className="rounded bg-muted px-1 py-0.5 text-xs">src/components/ui/{entry.slug}.tsx</code>
        </p>
      </header>
      {entry.examples.length > 0 ? (
        <div className="flex flex-col gap-10">
          {entry.examples.map((example) => (
            <ExampleViewer key={example.slug} example={example} showTitle={entry.examples.length > 1} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No example yet for {entry.title}.
        </p>
      )}
    </article>
  );
}

const INSTALLATION_SLUG = "installation";

const PACKAGE_MANAGERS = [
  { id: "npm", label: "npm", command: "npm install @ramekhchhoeng/designkit" },
  { id: "pnpm", label: "pnpm", command: "pnpm add @ramekhchhoeng/designkit" },
  { id: "yarn", label: "yarn", command: "yarn add @ramekhchhoeng/designkit" },
  { id: "bun", label: "bun", command: "bun add @ramekhchhoeng/designkit" },
];

const QUICK_START_SNIPPET = `import {
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
}`;

function InstallationPage() {
  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Installation</h1>
        <p className="text-sm text-muted-foreground">
          DesignKit vendors real shadcn/ui source (Base UI, Nova preset) instead of wrapping it, so every primitive in the catalog ships as a package export you can install today.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">1. Install the package</h2>
        <Tabs defaultValue="npm">
          <TabsList>
            {PACKAGE_MANAGERS.map((pm) => (
              <TabsTrigger key={pm.id} value={pm.id}>{pm.label}</TabsTrigger>
            ))}
          </TabsList>
          {PACKAGE_MANAGERS.map((pm) => (
            <TabsContent key={pm.id} value={pm.id}>
              <CodeBlock code={pm.command} />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">2. Import the styles</h2>
        <p className="text-sm text-muted-foreground">Once, near the root of your application:</p>
        <CodeBlock code={'import "@ramekhchhoeng/designkit/styles.css";'} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">3. Quick start</h2>
        <CodeBlock code={QUICK_START_SNIPPET} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">4. Theming</h2>
        <p className="text-sm text-muted-foreground">
          DesignKit uses the same OKLCH CSS custom properties as shadcn/ui &mdash;{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--background</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--primary</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">--border</code>, and so on. Override them at your
          application root to match your product, and add a{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">.dark</code> class to the root element to switch to
          the included dark tokens &mdash; this site does that with next-themes&apos;{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">{'<ThemeProvider attribute="class">'}</code>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Framework compatibility</h2>
        <p className="text-sm text-muted-foreground">
          The package ships ESM, CommonJS, and TypeScript declarations. Its public entry keeps a React{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">&quot;use client&quot;</code> boundary, so
          interactive components can be imported safely by Next.js App Router client trees. Vite and other React
          bundlers can import the same entry normally.
        </p>
      </section>

      <footer className="flex items-center gap-4 border-t pt-6 text-sm">
        <a
          href="https://github.com/RamekhCHHOENG/designkit"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          View on GitHub
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground">
          Browse the catalog
        </a>
      </footer>
    </article>
  );
}

function Overview() {
  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">DesignKit</h1>
        <p className="text-sm text-muted-foreground">
          {catalog.length} components vendored from shadcn/ui (Base UI, Nova preset). Pick one from the sidebar.
        </p>
      </header>
      {catalogGroups.map((group) => (
        <section key={group.name} className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">{group.name}</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {group.entries.map((entry) => (
              <a
                key={entry.slug}
                href={`#${entry.slug}`}
                className="rounded-lg border p-3 text-sm hover:bg-muted"
              >
                {entry.title}
              </a>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}

function Sidebar({ query, setQuery, activeSlug }: { query: string; setQuery: (v: string) => void; activeSlug: string }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogGroups;
    return catalogGroups
      .map((group) => ({ ...group, entries: group.entries.filter((entry) => entry.title.toLowerCase().includes(q)) }))
      .filter((group) => group.entries.length > 0);
  }, [query]);

  return (
    <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-4 py-6 md:block">
      <label className="mb-4 flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm text-muted-foreground">
        <SearchIcon className="size-4" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter components..."
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </label>
      <a
        href={`#${INSTALLATION_SLUG}`}
        className={`mb-4 block rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted ${activeSlug === INSTALLATION_SLUG ? "bg-muted text-foreground" : "text-muted-foreground"}`}
      >
        Installation
      </a>
      <nav className="flex flex-col gap-5">
        {filtered.map((group) => (
          <div key={group.name} className="flex flex-col gap-1">
            <span className="px-2 text-xs font-medium text-muted-foreground">{group.name}</span>
            {group.entries.map((entry) => (
              <a
                key={entry.slug}
                href={`#${entry.slug}`}
                className={`rounded-md px-2 py-1.5 text-sm hover:bg-muted ${activeSlug === entry.slug ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}
              >
                {entry.title}
              </a>
            ))}
          </div>
        ))}
        {filtered.length === 0 && <p className="px-2 text-sm text-muted-foreground">No matches.</p>}
      </nav>
    </aside>
  );
}

function Header({ mode, setMode }: { mode: "components" | "examples"; setMode: (m: "components" | "examples") => void }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur">
      <a href="#" className="text-sm font-semibold" onClick={() => setMode("components")}>
        DesignKit
      </a>
      {/* Framework switcher: shadcn/ui | shadcn-vue */}
      <div className="flex items-center gap-0.5 rounded-full border bg-muted/50 p-0.5">
        <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
          shadcn/ui
        </span>
        <a
          href={`http://localhost:3312/${typeof window !== "undefined" ? window.location.hash : ""}`}
          className="rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          shadcn-vue
        </a>
      </div>
      {/* Mode switcher: Components | Examples */}
      <div className="flex items-center gap-0.5 rounded-full border bg-muted/50 p-0.5">
        <button
          onClick={() => setMode("components")}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            mode === "components"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Components
        </button>
        <button
          onClick={() => setMode("examples")}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            mode === "examples"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Examples
        </button>
      </div>
      <div className="flex-1" />
      <a
        href="https://github.com/RamekhCHHOENG/designkit"
        target="_blank"
        rel="noreferrer"
        aria-label="DesignKit on GitHub"
        className="text-muted-foreground hover:text-foreground"
      >
        <GithubIcon className="size-4" />
      </a>
      <ThemeToggle />
    </header>
  );
}

function App() {
  const slug = useHashSlug();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"components" | "examples">("components");
  const entry = catalog.find((item) => item.slug === slug);

  return (
    <div className="flex min-h-svh flex-col">
      <Header mode={mode} setMode={setMode} />
      {mode === "examples" ? (
        <ExamplesSection compModules={compModules} compSources={compSources} />
      ) : (
        <div className="mx-auto flex w-full flex-1">
          <Sidebar query={query} setQuery={setQuery} activeSlug={slug} />
          <main className="min-w-0 flex-1">
            {slug === INSTALLATION_SLUG ? (
              <InstallationPage />
            ) : entry ? (
              <ComponentPage entry={entry} />
            ) : (
              <Overview />
            )}
          </main>
        </div>
      )}
      <Toaster />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
