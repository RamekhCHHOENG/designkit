import { StrictMode, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createRoot, type Root } from "react-dom/client";
import { componentDocs, previewBlockCount, previewExtrasCount, sectionGroups, stableComponentCount, type CatalogSection, type ComponentDoc } from "./componentDocs";
import { SpaceExampleCard, SpaceExampleStage } from "./spaceExamples";
import { Toaster } from "./space/components/ui/sonner";
import "./docsTheme.css";

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
      const resolved = appearance === "system" ? (media.matches ? "dark" : "light") : appearance;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.dkTheme = resolved;
      // The vendored shadcnspace styles key off a `.dark` class on <html>.
      document.documentElement.classList.toggle("dark", resolved === "dark");
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

function Header({ query, setQuery, onMenu, appearance, cycleAppearance, searchRef, section }: {
  query: string;
  setQuery: (value: string) => void;
  onMenu: () => void;
  appearance: Appearance;
  cycleAppearance: () => void;
  searchRef: RefObject<HTMLInputElement | null>;
  section: CatalogSection;
}) {
  return <header className="docs-header">
    <button className="mobile-menu" type="button" aria-label="Open navigation" onClick={onMenu}>☰</button>
    <a className="docs-brand" href="#overview"><BrandMark /><span>DesignKit</span><b>web</b></a>
    <nav className="top-nav" aria-label="Primary navigation">
      <a href="#overview">Docs</a>
      <a className={section === "components" ? "active" : ""} href="#overview">Components</a>
      <a className={section === "extras" ? "active" : ""} href="#extras">Extras</a>
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

function Sidebar({ query, docs, section, open, onClose }: { query: string; docs: ComponentDoc[]; section: CatalogSection; open: boolean; onClose: () => void }) {
  const sectionDocs = docs.filter((component) => component.section === section);
  const groups = sectionGroups(section).filter((group) => group !== "Blocks");
  const blockItems = section === "extras" ? sectionDocs.filter((component) => component.group === "Blocks") : [];
  const hash = window.location.hash;
  return <>
    <button className={`sidebar-scrim ${open ? "visible" : ""}`} aria-label="Close navigation" onClick={onClose} />
    <aside className={`docs-sidebar ${open ? "open" : ""}`}>
      <nav aria-label="Documentation navigation">
        {section === "components" ? <section>
          <small>Get started</small>
          <a className={!hash || hash === "#overview" ? "active" : ""} href="#overview">Overview</a>
          <a href="#typography">Foundations</a>
          <a href="#tipkit">Patterns</a>
        </section> : <section>
          <small>Get started</small>
          <a className={hash === "#extras" ? "active" : ""} href="#extras">Overview</a>
        </section>}
        {groups.map((group) => {
          const items = sectionDocs.filter((component) => component.group === group);
          if (!items.length) return null;
          return <section key={group}>
            <small>{group}</small>
            {items.map((component) => <a href={`#${component.slug}`} key={component.slug}>
              <span>{component.name}</span>
              {component.status === "planned" && <i title="Planned" />}
            </a>)}
          </section>;
        })}
        {blockItems.length > 0 && <section className="sidebar-blocks">
          <small>Blocks · Page sections</small>
          {blockItems.map((component) => <a href={`#${component.slug}`} key={component.slug}>
            <span>{component.name}</span>
          </a>)}
        </section>}
        {query && !sectionDocs.length && <p className="sidebar-empty">No components match “{query}”.</p>}
      </nav>
    </aside>
  </>;
}

function StatusBadge({ status }: { status: ComponentDoc["status"] }) {
  const labels: Record<ComponentDoc["status"], string> = {
    stable: "Stable",
    preview: "Preview",
    planned: "Planned",
  };
  return <span className={`status-badge status-badge--${status}`}>{labels[status]}</span>;
}

function Overview({ docs, section }: { docs: ComponentDoc[]; section: CatalogSection }) {
  const sectionDocs = docs.filter((component) => component.section === section);
  const newComponents = section === "components"
    ? sectionDocs.filter((component) => ["Data Table", "Drawer", "Form", "Payment Button", "Navigation Bar"].includes(component.name))
    : [];
  const baseDocs = sectionDocs.filter((component) => component.group !== "Blocks");
  const blockDocs = sectionDocs.filter((component) => component.group === "Blocks");
  const isExtras = section === "extras";

  return <article className="docs-page overview-page">
    <div className="page-eyebrow">
      <span>{isExtras ? "Extras" : "Components"}</span>
      <b>{isExtras ? `${previewExtrasCount} previews · ${previewBlockCount} blocks` : `${stableComponentCount} stable`}</b>
    </div>
    <div className="page-heading-row">
      <div>
        <h1>{isExtras ? "Extras" : "Web components"}</h1>
        <p>{isExtras
          ? "Animated showpieces, specialty inputs, and full-page blocks that extend the core component set."
          : "Browse every available component, inspect its states, and use the examples as a living reference for the design system."}</p>
      </div>
      <a className="copy-page" href={isExtras ? "#apple-dock" : "#button"}>Start exploring <span>→</span></a>
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

    {baseDocs.length > 0 && <section className="catalog-section" id="all-components">
      <div className="section-heading"><div><small>Library index</small><h2>Components</h2></div><p>{baseDocs.length} results</p></div>
      <div className="component-index">
        {baseDocs.map((component) => <a href={`#${component.slug}`} key={component.slug}>
          <span>{component.name}</span>
          <StatusBadge status={component.status} />
          <small>{component.group}</small>
          <b>↗</b>
        </a>)}
      </div>
    </section>}

    {blockDocs.length > 0 && <section className="catalog-section" id="all-blocks">
      <div className="section-heading"><div><small>Page sections</small><h2>Blocks</h2></div><p>{blockDocs.length} results</p></div>
      <div className="component-index">
        {blockDocs.map((component) => <a href={`#${component.slug}`} key={component.slug}>
          <span>{component.name}</span>
          <StatusBadge status={component.status} />
          <small>Blocks</small>
          <b>↗</b>
        </a>)}
      </div>
    </section>}
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
  const gallery = component.spaceExamples ?? [];

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
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href={component.section === "extras" ? "#extras" : "#overview"}>{component.section === "extras" ? "Extras" : "Components"}</a><span>/</span><span>{component.group}</span><span>/</span><strong>{component.name}</strong></nav>
    <div className="component-heading">
      <div>
        <div className="component-kicker"><StatusBadge status={component.status} /><span>{component.source}</span></div>
        <h1>{component.name}</h1>
        <p>{component.description}</p>
      </div>
      <button className="copy-page" type="button" onClick={copyCode}>{copied ? "Copied" : "Copy example"}<span>{copied ? "✓" : "▢"}</span></button>
    </div>

    {component.status !== "planned" ? <>
      <section className="component-section" id="preview">
        <div className="detail-tabs" role="tablist" aria-label="Component example">
          <button id="preview-tab" type="button" className={tab === "preview" ? "active" : ""} onClick={() => setTab("preview")} role="tab" aria-controls="component-example-panel" aria-selected={tab === "preview"}>Preview</button>
          <button id="code-tab" type="button" className={tab === "code" ? "active" : ""} onClick={() => setTab("code")} role="tab" aria-controls="component-example-panel" aria-selected={tab === "code"}>Code</button>
          <span />
          <small>Interactive example</small>
        </div>
        {tab === "preview"
          ? <div key={`${component.slug}-preview`} id="component-example-panel" className="primary-preview" role="tabpanel" aria-labelledby="preview-tab">
              {component.examples[0]
                ? component.examples[0].render()
                : gallery[0] && <SpaceExampleStage example={gallery[0]} block={component.spaceBlock} />}
            </div>
          : <pre key={`${component.slug}-code`} id="component-example-panel" className="code-block" role="tabpanel" aria-labelledby="code-tab"><code>{component.code}</code></pre>}
      </section>

      {component.examples.length > 0 && <section className="component-section" id="examples">
        <div className="section-heading"><div><small>Stories</small><h2>Variants and states</h2></div><p>{component.examples.length} documented examples</p></div>
        <div className="example-grid">
          {component.examples.map((example, index) => <ExampleCard example={example} key={`${component.slug}-${index}-${example.label}`} />)}
        </div>
      </section>}

      {gallery.length > 0 && <section className="component-section" id="gallery">
        <div className="section-heading"><div><small>Gallery</small><h2>Ready-to-use examples</h2></div><p>{gallery.length} example{gallery.length === 1 ? "" : "s"}</p></div>
        <div className="space-grid" data-columns={component.spaceBlock ? "1" : "2"}>
          {gallery.map((example) => <SpaceExampleCard example={example} block={component.spaceBlock} key={example.id} />)}
        </div>
      </section>}

      <section className="component-section guidance-grid" id="usage">
        <div><small>Usage</small><h2>Built for real interfaces</h2><p>Use semantic labels, keep actions predictable, and choose the simplest variant that communicates the correct hierarchy.</p></div>
        <div id="accessibility"><small>Accessibility</small><h2>Keyboard and screen-reader ready</h2><p>Every production component will include focus-visible behavior, meaningful names, reduced-motion support, and documented keyboard interactions.</p></div>
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
    {component && component.status !== "planned" ? <nav><a href="#preview">Preview</a>{component.examples.length > 0 && <a href="#examples">Examples</a>}{(component.spaceExamples?.length ?? 0) > 0 && <a href="#gallery">Gallery</a>}<a href="#usage">Usage</a><a href="#accessibility">Accessibility</a></nav> : component ? <nav><a href="#roadmap">Roadmap</a></nav> : <nav><a href="#new-components">New components</a><a href="#all-components">All components</a></nav>}
    <div className="toc-card"><span>Web UI</span><strong>Designed to grow.</strong><p>Each component gets a focused page, interactive states, and implementation guidance.</p><a href="#button">Explore Button →</a></div>
  </aside>;
}

// Hidden QA route (#qa-components / #qa-blocks): renders every vendored example on
// one page so failures surface in a single scan.
function QaAllExamples({ blocks }: { blocks: boolean }) {
  const docs = componentDocs.filter((doc) => (doc.group === "Blocks") === blocks);
  return <article className="docs-page" data-qa-page="">
    {docs.map((doc) => (doc.spaceExamples ?? []).map((example) => (
      <section key={`${doc.slug}-${example.id}`} data-qa-example={`${doc.slug}/${example.id}`}>
        <h3>{doc.name} — {example.label}</h3>
        <SpaceExampleStage example={example} block={doc.spaceBlock} />
      </section>
    )))}
  </article>;
}

function App() {
  const slug = useSelectedSlug();
  const { appearance, cycleAppearance } = useAppearance();
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const selected = componentDocs.find((component) => component.slug === slug);
  const section: CatalogSection = selected?.section ?? (slug === "extras" ? "extras" : "components");

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
    <Header query={query} setQuery={setQuery} onMenu={() => setSidebarOpen(true)} appearance={appearance} cycleAppearance={cycleAppearance} searchRef={searchRef} section={section} />
    <div className="docs-shell">
      <Sidebar query={query} docs={filteredDocs} section={section} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="docs-main">
        {slug === "qa-components" || slug === "qa-blocks"
          ? <QaAllExamples blocks={slug === "qa-blocks"} />
          : selected ? <ComponentDetail component={selected} /> : <Overview docs={filteredDocs} section={section} />}
      </main>
      <OnThisPage component={selected} />
    </div>
    <Toaster />
  </div>;
}

const rootElement = document.getElementById("root")!;
const root = (import.meta.hot?.data.designKitRoot as Root | undefined) ?? createRoot(rootElement);

if (import.meta.hot) import.meta.hot.data.designKitRoot = root;

root.render(<StrictMode><App /></StrictMode>);
