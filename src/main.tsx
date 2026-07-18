import { StrictMode, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createRoot } from "react-dom/client";
import { componentDocs, componentGroups, readyComponentCount, type ComponentDoc } from "./componentDocs";
import "./demo.css";

type Appearance = "light" | "dark" | "system";
type DetailTab = "preview" | "code";

const appearanceIcons: Record<Appearance, string> = { light: "☀", dark: "◐", system: "◑" };

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>(() => (localStorage.getItem("appearance") as Appearance) || "system");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.dataset.theme = appearance === "system" ? (media.matches ? "dark" : "light") : appearance;
    };
    apply();
    localStorage.setItem("appearance", appearance);
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [appearance]);

  const cycleAppearance = () => setAppearance((current) => current === "light" ? "dark" : current === "dark" ? "system" : "light");
  return { appearance, cycleAppearance };
}

function useSelectedSlug() {
  const readHash = () => window.location.hash.replace(/^#/, "") || "overview";
  const [slug, setSlug] = useState(readHash);

  useEffect(() => {
    const handleHash = () => setSlug(readHash());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return slug;
}

function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
}

function Header({ query, setQuery, onMenu, appearance, cycleAppearance, searchRef }: {
  query: string;
  setQuery: (value: string) => void;
  onMenu: () => void;
  appearance: Appearance;
  cycleAppearance: () => void;
  searchRef: RefObject<HTMLInputElement | null>;
}) {
  return <header className="docs-header">
    <button className="mobile-menu" type="button" aria-label="Open navigation" onClick={onMenu}>☰</button>
    <a className="docs-brand" href="#overview"><BrandMark /><span>DesignKit</span><b>web</b></a>
    <nav className="top-nav" aria-label="Primary navigation">
      <a href="#overview">Docs</a>
      <a className="active" href="#overview">Components</a>
      <a href="#typography">Foundations</a>
      <a href="#tipkit">Patterns</a>
    </nav>
    <label className="global-search">
      <SearchIcon />
      <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search components..." aria-label="Search components" />
      <kbd>⌘K</kbd>
    </label>
    <a className="header-icon" href="https://github.com/RamekhCHHOENG/designkit" target="_blank" rel="noreferrer" aria-label="DesignKit on GitHub">⌘</a>
    <button className="header-icon" type="button" onClick={cycleAppearance} aria-label={`Appearance: ${appearance}`} title={`Appearance: ${appearance}`}>
      {appearanceIcons[appearance]}
    </button>
  </header>;
}

function Sidebar({ query, docs, open, onClose }: { query: string; docs: ComponentDoc[]; open: boolean; onClose: () => void }) {
  return <>
    <button className={`sidebar-scrim ${open ? "visible" : ""}`} aria-label="Close navigation" onClick={onClose} />
    <aside className={`docs-sidebar ${open ? "open" : ""}`}>
      <nav aria-label="Documentation navigation">
        <section>
          <small>Get started</small>
          <a className={!window.location.hash || window.location.hash === "#overview" ? "active" : ""} href="#overview">Overview</a>
          <a href="#typography">Foundations</a>
          <a href="#tipkit">Patterns</a>
        </section>
        {componentGroups.map((group) => {
          const items = docs.filter((component) => component.group === group);
          if (!items.length) return null;
          return <section key={group}>
            <small>{group}</small>
            {items.map((component) => <a href={`#${component.slug}`} key={component.slug}>
              <span>{component.name}</span>
              {component.status === "planned" && <i title="Planned" />}
            </a>)}
          </section>;
        })}
        {query && !docs.length && <p className="sidebar-empty">No components match “{query}”.</p>}
      </nav>
    </aside>
  </>;
}

function StatusBadge({ status }: { status: ComponentDoc["status"] }) {
  return <span className={`status-badge status-badge--${status}`}>{status === "ready" ? "Ready" : "Planned"}</span>;
}

function Overview({ docs }: { docs: ComponentDoc[] }) {
  const newComponents = docs.filter((component) => ["Data Table", "Drawer", "Form", "Payment Button", "Navigation Bar"].includes(component.name));

  return <article className="docs-page overview-page">
    <div className="page-eyebrow"><span>Components</span><b>{readyComponentCount} ready</b></div>
    <div className="page-heading-row">
      <div>
        <h1>Web components</h1>
        <p>Browse every available component, inspect its states, and use the examples as a living reference for the design system.</p>
      </div>
      <a className="copy-page" href="#button">Start exploring <span>→</span></a>
    </div>

    {newComponents.length > 0 && <section className="catalog-section" id="new-components">
      <div className="section-heading"><div><small>Recently added</small><h2>New components</h2></div><p>Fresh patterns ready for review.</p></div>
      <div className="featured-grid">
        {newComponents.map((component, index) => <a className={`featured-card featured-card--${index + 1}`} href={`#${component.slug}`} key={component.slug}>
          <span className="featured-icon" aria-hidden="true">{["↟", "◒", "⌖", "✦", "↧"][index]}</span>
          <div><strong>{component.name}</strong><small>{component.group}</small></div>
          <span>→</span>
        </a>)}
      </div>
    </section>}

    <section className="catalog-section" id="all-components">
      <div className="section-heading"><div><small>Library index</small><h2>All components</h2></div><p>{docs.length} results</p></div>
      <div className="component-index">
        {docs.map((component) => <a href={`#${component.slug}`} key={component.slug}>
          <span>{component.name}</span>
          <StatusBadge status={component.status} />
          <small>{component.group}</small>
          <b>↗</b>
        </a>)}
      </div>
    </section>
  </article>;
}

function ExampleCard({ example }: { example: ComponentDoc["examples"][number] }) {
  const [copied, setCopied] = useState(false);

  const copyExample = async () => {
    await copyText(example.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return <article className="example-card">
    <header className="example-label">
      <div><strong>{example.label}</strong><span>{example.description}</span></div>
      <button type="button" onClick={copyExample} aria-label={copied ? `${example.label} example copied` : `Copy ${example.label} example`}>{copied ? "✓" : "▢"}</button>
    </header>
    <div className="example-stage">{example.render()}</div>
  </article>;
}

function ComponentDetail({ component }: { component: ComponentDoc }) {
  const [tab, setTab] = useState<DetailTab>("preview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTab("preview");
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [component.slug]);

  const copyCode = async () => {
    await copyText(component.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return <article className="docs-page component-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="#overview">Components</a><span>/</span><span>{component.group}</span><span>/</span><strong>{component.name}</strong></nav>
    <div className="component-heading">
      <div>
        <div className="component-kicker"><StatusBadge status={component.status} /><span>{component.source}</span></div>
        <h1>{component.name}</h1>
        <p>{component.description}</p>
      </div>
      <button className="copy-page" type="button" onClick={copyCode}>{copied ? "Copied" : "Copy example"}<span>{copied ? "✓" : "▢"}</span></button>
    </div>

    {component.status === "ready" ? <>
      <section className="component-section" id="preview">
        <div className="detail-tabs" role="tablist" aria-label="Component example">
          <button className={tab === "preview" ? "active" : ""} onClick={() => setTab("preview")} role="tab" aria-selected={tab === "preview"}>Preview</button>
          <button className={tab === "code" ? "active" : ""} onClick={() => setTab("code")} role="tab" aria-selected={tab === "code"}>Code</button>
          <span />
          <small>Interactive example</small>
        </div>
        {tab === "preview" ? <div className="primary-preview">{component.examples[0].render()}</div> : <pre className="code-block"><code>{component.code}</code></pre>}
      </section>

      <section className="component-section" id="examples">
        <div className="section-heading"><div><small>Stories</small><h2>Variants and states</h2></div><p>{component.examples.length} documented examples</p></div>
        <div className="example-grid">
          {component.examples.map((example) => <ExampleCard example={example} key={example.label} />)}
        </div>
      </section>

      <section className="component-section guidance-grid" id="usage">
        <div><small>Usage</small><h2>Built for real interfaces</h2><p>Use semantic labels, keep actions predictable, and choose the simplest variant that communicates the correct hierarchy.</p></div>
        <div><small>Accessibility</small><h2>Keyboard and screen-reader ready</h2><p>Every production component will include focus-visible behavior, meaningful names, reduced-motion support, and documented keyboard interactions.</p></div>
      </section>
    </> : <section className="planned-panel" id="roadmap">
      <span>Coming next</span>
      <h2>{component.name} is on the roadmap.</h2>
      <p>The documentation route is reserved. Implementation will include the component API, interactive examples, accessibility behavior, and visual tests.</p>
      <div><b>API design</b><b>Web implementation</b><b>Stories</b><b>Accessibility</b></div>
    </section>}
  </article>;
}

function OnThisPage({ component }: { component?: ComponentDoc }) {
  return <aside className="docs-toc">
    <small>On this page</small>
    {component?.status === "ready" ? <nav><a href="#preview">Preview</a><a href="#examples">Examples</a><a href="#usage">Usage</a><a href="#usage">Accessibility</a></nav> : component ? <nav><a href="#roadmap">Roadmap</a></nav> : <nav><a href="#new-components">New components</a><a href="#all-components">All components</a></nav>}
    <div className="toc-card"><span>Web UI</span><strong>Designed to grow.</strong><p>Each component gets a focused page, interactive states, and implementation guidance.</p><a href="#button">Explore Button →</a></div>
  </aside>;
}

function App() {
  const slug = useSelectedSlug();
  const { appearance, cycleAppearance } = useAppearance();
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = componentDocs.find((component) => component.slug === slug);

  const filteredDocs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return componentDocs;
    return componentDocs.filter((component) => `${component.name} ${component.group} ${component.description}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        setSidebarOpen(false);
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => setSidebarOpen(false), [slug]);

  return <div className="docs-app">
    <Header query={query} setQuery={setQuery} onMenu={() => setSidebarOpen(true)} appearance={appearance} cycleAppearance={cycleAppearance} searchRef={searchRef} />
    <div className="docs-shell">
      <Sidebar query={query} docs={filteredDocs} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="docs-main">
        {selected ? <ComponentDetail component={selected} /> : <Overview docs={filteredDocs} />}
      </main>
      <OnThisPage component={selected} />
    </div>
  </div>;
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
