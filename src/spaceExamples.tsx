import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type LazyExoticComponent,
  type ReactNode,
} from "react";
import { components as registryComponents } from "./space/registry";
import { categories as registryCategories } from "./space/registry/categories";
import { blocks as registryBlocks } from "./space/registry/blocks";
import "./space/globals.css";

// ---------------------------------------------------------------------------
// Discovery: every vendored shadcnspace example, lazily loaded, plus its raw
// source for the code view. Metadata (titles, descriptions) comes from the
// vendored registry.
// ---------------------------------------------------------------------------

const exampleModules = import.meta.glob("./space/components/shadcn-space/**/*.tsx");
const exampleSources = import.meta.glob("./space/components/shadcn-space/**/*.tsx", {
  query: "?raw",
  import: "default",
});

const registryPathToGlobKey = (path: string) => path.replace(/^src\/components\//, "./space/components/");

type GlobModule = Record<string, unknown>;

function resolveComponent(mod: GlobModule): ComponentType {
  const candidate = mod.default ?? Object.values(mod).find((value) => typeof value === "function");
  return candidate as ComponentType;
}

export type SpaceExample = {
  id: string;
  label: string;
  description: string;
  importPath: string;
  load: () => Promise<{ default: ComponentType }>;
  loadSource: () => Promise<string>;
};

export type SpaceCategory = {
  slug: string;
  title: string;
  description: string;
  examples: SpaceExample[];
};

function exampleLabel(title: string) {
  const suffix = title.split(" - ").slice(1).join(" - ").trim();
  return suffix || title;
}

// Dev-server restarts can poison an in-flight dynamic import; retry once
// after a short pause before surfacing the failure.
function loadWithRetry(loadModule: () => Promise<unknown>) {
  return loadModule().catch(
    () => new Promise((resolve) => setTimeout(resolve, 400)).then(loadModule),
  );
}

function buildCategories(): Record<string, SpaceCategory> {
  const result: Record<string, SpaceCategory> = {};

  for (const entry of registryComponents) {
    const category = entry.category;
    if (!category?.name) continue;

    // Entries can list shared ui/ files first; the renderable example always
    // lives under shadcn-space/.
    const file =
      entry.files.find((candidate) => candidate.path.includes("/shadcn-space/") && candidate.path.endsWith(".tsx")) ??
      entry.files.find((candidate) => candidate.path.endsWith(".tsx"));
    if (!file) continue;

    const globKey = registryPathToGlobKey(file.path);
    const loadModule = exampleModules[globKey];
    const loadRaw = exampleSources[globKey];
    if (!loadModule || !loadRaw) continue;

    if (!result[category.name]) {
      result[category.name] = {
        slug: category.name,
        title: category.title,
        description: category.metaDescription ?? "",
        examples: [],
      };
    }

    result[category.name].examples.push({
      id: entry.name,
      label: exampleLabel(entry.title),
      description: entry.description,
      importPath: file.path.replace(/^src\//, "@/").replace(/\.tsx$/, ""),
      load: () => loadWithRetry(loadModule).then((mod) => ({ default: resolveComponent(mod as GlobModule) })),
      loadSource: () => loadRaw() as Promise<string>,
    });
  }

  for (const category of Object.values(result)) {
    category.examples.sort((first, second) => first.id.localeCompare(second.id, undefined, { numeric: true }));
  }

  return result;
}

export const spaceCategories = buildCategories();

export const spaceCategoryTitles: Record<string, string> = Object.fromEntries(
  Object.values(registryCategories).map((category) => [category.name, category.title]),
);

// Preview grid density per category, mirrored from shadcnspace's sidebar-data.
export const spaceCategoryColumns: Record<string, number> = {
  avatar: 3, "animated-text": 2, button: 3, badge: 3, calendar: 2, tooltip: 3,
  input: 3, textarea: 3, switch: 3, select: 3, checkbox: 3, "radio-group": 2,
  "date-picker": 2, "button-group": 2, combobox: 3, carousel: 2, alert: 2,
  breadcrumb: 2, dialog: 2, popover: 3, slider: 3, spinner: 3, sonner: 3,
  pagination: 2, "input-mask": 3, "input-otp": 2, autocomplete: 2,
  "context-menu": 2, command: 2, "code-block": 2, kbd: 2, label: 3,
  separator: 2, sheet: 2,
};

// ---------------------------------------------------------------------------
// Blocks: full-page sections (hero, pricing, footer, ...) from the vendored
// blocks registry. Each renders its composed page component.
// ---------------------------------------------------------------------------

export type SpaceBlock = {
  id: string;
  title: string;
  description: string;
  masterCategory: string;
  load: () => Promise<{ default: ComponentType }>;
  loadSource: (() => Promise<string>) | null;
};

export const spaceBlocks: SpaceBlock[] = registryBlocks
  .filter((block) => !block.isPro && !block.isDraft)
  .flatMap((block) => {
    const pageFile = block.files.find(
      (file) => file.path.includes("/blocks/") && (file.path.endsWith("/page.tsx") || file.path.endsWith("/index.tsx")),
    ) ?? block.files.find((file) => file.path.includes("/blocks/") && file.path.endsWith(".tsx"));
    const globKey = pageFile ? registryPathToGlobKey(pageFile.path) : null;
    const loadModule = globKey ? exampleModules[globKey] : undefined;
    const loadRaw = globKey ? exampleSources[globKey] : undefined;
    if (!loadModule) return [];
    return [{
      id: block.name,
      title: block.title,
      description: block.description,
      masterCategory: block.masterCategory?.title ?? "Blocks",
      load: () => loadWithRetry(loadModule).then((mod) => ({ default: resolveComponent(mod as GlobModule) })),
      loadSource: loadRaw ? () => loadRaw() as Promise<string> : null,
    }];
  });

// ---------------------------------------------------------------------------
// Rendering: card layout mirrored from shadcnspace's component gallery
// (title bar + centered preview), with an error boundary and retry.
// ---------------------------------------------------------------------------

type RenderableExample = Pick<SpaceExample, "id" | "load"> & {
  loadSource?: SpaceExample["loadSource"] | null;
  label?: string;
  description?: string;
};

// lazy() components must have a stable identity across suspended render
// retries, so they are cached at module level — never created during render.
const lazyRegistry = new Map<string, LazyExoticComponent<ComponentType>>();

function lazyFor(example: RenderableExample, attempt: number) {
  const key = `${example.id}:${attempt}`;
  let cached = lazyRegistry.get(key);
  if (!cached) {
    cached = lazy(example.load);
    lazyRegistry.set(key, cached);
  }
  return cached;
}

class SpaceErrorBoundary extends Component<
  { children: ReactNode; onRetry: () => void },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="space-example-error" role="alert">
          <strong>This example failed to render.</strong>
          <p>{this.state.error.message}</p>
          <button type="button" onClick={this.props.onRetry}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function SpaceExampleStage({ example, block = false }: { example: RenderableExample; block?: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const Example = lazyFor(example, attempt);
  return (
    <div className={block ? "space-surface space-block-stage" : "space-surface space-stage"}>
      <SpaceErrorBoundary key={attempt} onRetry={() => setAttempt((value) => value + 1)}>
        <Suspense fallback={<div className="space-stage-loading" aria-hidden="true" />}>
          <Example />
        </Suspense>
      </SpaceErrorBoundary>
    </div>
  );
}

export function useSpaceSource(loadSource: (() => Promise<string>) | null | undefined, enabled: boolean) {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || source !== null || !loadSource) return;
    let cancelled = false;
    loadSource().then((code) => {
      if (!cancelled) setSource(code);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled, source, loadSource]);

  return source;
}

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

function CodeIcon() {
  return <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5.5 4.5-3.5 3.5 3.5 3.5" /><path d="m10.5 4.5 3.5 3.5-3.5 3.5" /></svg>;
}

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) return <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8.5 3.5 3.5 6.5-7" /></svg>;
  return <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" /><path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" /></svg>;
}

// Defers mounting until the element approaches the viewport, so a page with
// many examples only loads what the user can see.
function useNearViewport() {
  const ref = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (near || !element) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [near]);

  return { ref, near };
}

export function SpaceExampleCard({ example, block = false }: { example: RenderableExample; block?: boolean }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ref, near } = useNearViewport();
  const source = useSpaceSource(example.loadSource, showCode || copied);
  const label = example.label ?? example.id;

  const copyExample = async () => {
    if (!example.loadSource) return;
    await copyText(await example.loadSource());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <article className="space-surface space-card" ref={ref}>
      <header className="space-card-header">
        <p title={example.description ?? label}>{label}</p>
        <div className="space-card-actions">
          {example.loadSource && (
            <button
              type="button"
              className={showCode ? "active" : ""}
              onClick={() => setShowCode((value) => !value)}
              aria-pressed={showCode}
              aria-label={showCode ? `Hide ${label} code` : `View ${label} code`}
              title={showCode ? "Hide code" : "View code"}
            >
              <CodeIcon />
            </button>
          )}
          {example.loadSource && (
            <button
              type="button"
              onClick={copyExample}
              aria-label={copied ? `${label} code copied` : `Copy ${label} code`}
              title="Copy code"
            >
              <CopyIcon copied={copied} />
            </button>
          )}
        </div>
      </header>
      {showCode ? (
        <pre className="space-card-code"><code>{source ?? "Loading source..."}</code></pre>
      ) : (
        <div className={block ? "space-card-preview space-card-preview--block" : "space-card-preview"}>
          {near
            ? <SpaceExampleStageInner example={example} block={block} />
            : <div className="space-stage-loading" aria-hidden="true" />}
        </div>
      )}
    </article>
  );
}

function SpaceExampleStageInner({ example, block }: { example: RenderableExample; block: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const Example = lazyFor(example, attempt);
  return (
    <SpaceErrorBoundary key={attempt} onRetry={() => setAttempt((value) => value + 1)}>
      <Suspense fallback={<div className="space-stage-loading" aria-hidden="true" />}>
        {block ? <div className="space-block-scale"><Example /></div> : <Example />}
      </Suspense>
    </SpaceErrorBoundary>
  );
}
