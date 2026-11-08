import React, { Component, lazy, Suspense, useEffect, useMemo, useState, type ComponentType, type ErrorInfo, type ReactNode } from "react";
import { categories, type ComponentCategory } from "@/config/components";
import { CheckIcon, CopyIcon, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ---------------------------------------------------------------------------
// Glob maps — keyed by path like `./registry/default/components/comp-01.tsx`
// ---------------------------------------------------------------------------
type ModuleMap = Record<string, () => Promise<{ default: ComponentType }>>;
type SourceMap = Record<string, () => Promise<string>>;

// ---------------------------------------------------------------------------
// ErrorBoundary for isolating failing previews
// ---------------------------------------------------------------------------
type EBProps = { children: ReactNode; label: string };
type EBState = { hasError: boolean; message: string };

class CardErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(err: Error): EBState {
    return { hasError: true, message: err.message };
  }

  override componentDidCatch(_err: Error, _info: ErrorInfo) {
    // Intentionally swallowed — visible as inline error card
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
          <span>Preview unavailable<br /><span className="opacity-60">{this.state.message}</span></span>
        </div>
      );
    }
    return this.props.children;
  }
}

// ---------------------------------------------------------------------------
// Copy helper
// ---------------------------------------------------------------------------
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // clipboard unavailable — best effort
  }
}

// ---------------------------------------------------------------------------
// A single example card
// ---------------------------------------------------------------------------
function ExampleCard({
  compName,
  compModules,
  compSources,
  onOpenDialog,
}: {
  compName: string;
  compModules: ModuleMap;
  compSources: SourceMap;
  onOpenDialog: () => void;
}) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [source, setSource] = useState<string>("");

  // Find the module path matching this component name
  const modulePath = `./registry/default/components/${compName}.tsx`;
  const LazyComp = React.useMemo(() => {
    const loader = compModules[modulePath];
    if (!loader) return null;
    return lazy(loader);
  }, [modulePath, compModules]);

  // Load source on demand when code panel is opened
  useEffect(() => {
    if (showCode && !source) {
      const loader = compSources[modulePath];
      if (loader) {
        loader().then(setSource).catch(() => setSource("// Source unavailable"));
      }
    }
  }, [showCode, source, modulePath, compSources]);

  return (
    <div className="flex flex-col rounded-lg border overflow-hidden">
      {/* Preview */}
      <div
        className="relative min-h-[260px] flex items-center justify-center bg-muted/30 p-4 overflow-visible"
      >
        {LazyComp ? (
          <CardErrorBoundary label={compName}>
            <Suspense
              fallback={
                <div className="flex h-32 items-center justify-center text-xs text-muted-foreground">
                  Loading...
                </div>
              }
            >
              <LazyComp />
            </Suspense>
          </CardErrorBoundary>
        ) : (
          <div className="flex h-32 items-center justify-center text-xs text-muted-foreground">
            Not found
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-3 py-2 bg-background gap-2">
        <span className="text-xs text-muted-foreground font-mono truncate">{compName}</span>
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onOpenDialog}
            title="Show full view in dialog modal"
            aria-label="Show full in dialog"
            className="size-7"
          >
            <Maximize2 className="size-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowCode((v) => !v)}
            aria-label={showCode ? "Hide code" : "Show code"}
            className="text-xs h-6 w-auto px-2 gap-1"
          >
            {showCode ? "Hide" : "Code"}
          </Button>
        </div>
      </div>

      {/* Source code */}
      {showCode && source && (
        <div className="relative border-t">
          <pre className="max-h-80 overflow-auto bg-muted p-4 text-xs leading-relaxed">
            <code>{source}</code>
          </pre>
          <Button
            variant="outline"
            size="icon-sm"
            className="absolute top-2 right-2"
            aria-label={copied ? "Copied" : "Copy code"}
            onClick={async () => {
              await copyText(source);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            }}
          >
            {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          </Button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Category grid
// ---------------------------------------------------------------------------
function CategoryGrid({
  category,
  compModules,
  compSources,
}: {
  category: ComponentCategory;
  compModules: ModuleMap;
  compSources: SourceMap;
}) {
  const [activeDialogComp, setActiveDialogComp] = useState<string | null>(null);

  const ActiveComponent = useMemo(() => {
    if (!activeDialogComp) return null;
    const path = `./registry/default/components/${activeDialogComp}.tsx`;
    const loader = compModules[path];
    if (!loader) return null;
    return lazy(loader);
  }, [activeDialogComp, compModules]);

  return (
    <article className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">{category.name}</h1>
        <p className="text-sm text-muted-foreground">
          {category.components.length} example{category.components.length !== 1 ? "s" : ""}
          {category.isNew && (
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">New</span>
          )}
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {category.components.map((comp) => (
          <ExampleCard
            key={comp.name}
            compName={comp.name}
            compModules={compModules}
            compSources={compSources}
            onOpenDialog={() => setActiveDialogComp(comp.name)}
          />
        ))}
      </div>

      {/* Full View Modal Dialog */}
      <Dialog
        open={activeDialogComp !== null}
        onOpenChange={(open) => {
          if (!open) setActiveDialogComp(null);
        }}
      >
        <DialogContent className="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl w-[94vw] max-h-[92vh] flex flex-col p-0 overflow-hidden gap-0 rounded-xl border bg-background shadow-2xl">
          <DialogHeader className="border-b px-6 py-4 flex flex-row items-center justify-between gap-4 space-y-0 bg-muted/30">
            <div className="flex flex-col gap-0.5">
              <DialogTitle className="font-mono text-base font-semibold flex items-center gap-2">
                <span>{activeDialogComp}</span>
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-sans font-medium text-primary">
                  Preview Modal
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Interactive preview of {activeDialogComp} in expanded modal mode
              </DialogDescription>
            </div>
          </DialogHeader>

          <div
            className="relative flex-1 min-h-[420px] max-h-[calc(92vh-130px)] overflow-auto p-6 md:p-10 flex items-center justify-center bg-muted/10"
          >
            {ActiveComponent && (
              <CardErrorBoundary label={activeDialogComp || "preview"}>
                <Suspense
                  fallback={
                    <div className="flex h-32 items-center justify-center text-xs text-muted-foreground">
                      Loading preview...
                    </div>
                  }
                >
                  <div className="w-full max-w-4xl flex items-center justify-center">
                    <ActiveComponent />
                  </div>
                </Suspense>
              </CardErrorBoundary>
            )}
          </div>

          <DialogFooter className="border-t px-6 py-3 bg-muted/20 flex sm:flex-row items-center justify-between sm:justify-between">
            <span className="font-mono text-xs text-muted-foreground">{activeDialogComp}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActiveDialogComp(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Examples overview (no category selected)
// ---------------------------------------------------------------------------
function ExamplesOverview({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Origin UI Examples</h1>
        <p className="text-sm text-muted-foreground">
          {categories.reduce((s, c) => s + c.components.length, 0)} real-world component examples across {categories.length} categories, vendored from Origin UI.
        </p>
      </header>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className="rounded-lg border p-3 text-left text-sm hover:bg-muted flex items-center justify-between"
          >
            <span>{cat.name}</span>
            <span className="text-xs text-muted-foreground">{cat.components.length}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Examples sidebar
// ---------------------------------------------------------------------------
function ExamplesSidebar({
  activeCategorySlug,
  onSelect,
}: {
  activeCategorySlug: string | null;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-4 py-6 md:block">
      <button
        onClick={() => onSelect(null)}
        className={`mb-4 block w-full rounded-md px-2 py-1.5 text-left text-sm font-medium hover:bg-muted ${
          activeCategorySlug === null ? "bg-muted text-foreground" : "text-muted-foreground"
        }`}
      >
        All Examples
      </button>
      <nav className="flex flex-col gap-1">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted ${
              activeCategorySlug === cat.slug
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <span>{cat.name}</span>
            <span className="text-xs opacity-60">{cat.components.length}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Main ExamplesSection
// ---------------------------------------------------------------------------
export function ExamplesSection({
  compModules,
  compSources,
}: {
  compModules: ModuleMap;
  compSources: SourceMap;
}) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);

  const activeCategory = activeCategorySlug
    ? categories.find((c) => c.slug === activeCategorySlug) ?? null
    : null;

  return (
    <div className="mx-auto flex w-full flex-1">
      <ExamplesSidebar activeCategorySlug={activeCategorySlug} onSelect={setActiveCategorySlug} />
      <main className="min-w-0 flex-1">
        {activeCategory ? (
          <CategoryGrid
            category={activeCategory}
            compModules={compModules}
            compSources={compSources}
          />
        ) : (
          <ExamplesOverview onSelect={setActiveCategorySlug} />
        )}
      </main>
    </div>
  );
}
