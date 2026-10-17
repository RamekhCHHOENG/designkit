import { Fragment, Suspense, lazy, useEffect, useMemo, useState, type ComponentType, type CSSProperties } from "react"
import { CheckIcon, CodeIcon, CopyIcon, EyeIcon, ExternalLinkIcon, Maximize2Icon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { echartsCategories, echartsExamples, echartsSource, type EChartsCategory, type EChartsExample } from "@/echarts/meta"
import { InstallCommand } from "@/install-command"

// Each example file exports one component; they load on demand.
const loaders = import.meta.glob("./echarts/echarts-*.tsx") as Record<string, () => Promise<Record<string, unknown>>>
const sources = import.meta.glob("./echarts/echarts-*.tsx", { query: "?raw", import: "default" }) as Record<
  string,
  () => Promise<string>
>

const componentCache = new Map<string, ComponentType>()
function exampleComponent(name: string) {
  let Component = componentCache.get(name)
  if (!Component) {
    const load = loaders[`./echarts/${name}.tsx`]!
    Component = lazy(async () => {
      const mod = await load()
      return { default: Object.values(mod).find((value) => typeof value === "function") as ComponentType }
    })
    componentCache.set(name, Component)
  }
  return Component
}

const officialUrl = (name: string) =>
  `https://echarts.apache.org/examples/en/editor.html?c=${name.replace(/^echarts-/, "")}`

function ExampleChart({ name, height }: { name: string; height: string }) {
  const Chart = exampleComponent(name)
  return (
    <div style={{ "--echart-height": height } as CSSProperties}>
      <Suspense fallback={<Skeleton className="w-full rounded-lg" style={{ height }} />}>
        <Chart />
      </Suspense>
    </div>
  )
}

function ExampleCell({ example, onExpand }: { example: EChartsExample; onExpand: () => void }) {
  const [showCode, setShowCode] = useState(false)
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!showCode || code) return
    let cancelled = false
    sources[`./echarts/${example.name}.tsx`]!().then((text) => !cancelled && setCode(text))
    return () => {
      cancelled = true
    }
  }, [showCode, code, example.name])

  return (
    <figure id={example.name} className="flex min-w-0 flex-col gap-2">
      <div className="overflow-hidden rounded-xl border">
        {showCode ? (
          <div className="relative">
            <div className="border-b p-2 pr-12">
              <InstallCommand name={example.name} />
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              className="absolute top-2.5 right-3"
              aria-label={copied ? "Copied" : "Copy code"}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(code)
                  setCopied(true)
                  window.setTimeout(() => setCopied(false), 1400)
                } catch {
                  // Clipboard unavailable -- best effort only.
                }
              }}
            >
              {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
            </Button>
            <pre className="h-[340px] overflow-auto p-4 text-xs leading-relaxed">
              <code>{code || "Loading source…"}</code>
            </pre>
          </div>
        ) : (
          <div className="p-2">
            <ExampleChart name={example.name} height="340px" />
          </div>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-2 px-1 text-xs">
        <span className="min-w-0 truncate font-medium" title={example.title}>
          {example.title}
        </span>
        <span className="flex shrink-0 items-center gap-0.5">
          <Button variant="ghost" size="icon-xs" aria-label="Open in the ECharts editor" render={<a href={officialUrl(example.name)} target="_blank" rel="noreferrer" />} nativeButton={false}>
            <ExternalLinkIcon />
          </Button>
          <Button variant="ghost" size="icon-xs" aria-label="Expand" onClick={onExpand}>
            <Maximize2Icon />
          </Button>
          <Button variant="ghost" size="xs" onClick={() => setShowCode((value) => !value)}>
            {showCode ? <EyeIcon /> : <CodeIcon />}
            {showCode ? "Preview" : "Code"}
          </Button>
        </span>
      </figcaption>
    </figure>
  )
}

function readCategory(): EChartsCategory | "all" {
  const match = window.location.hash.match(/^#charts\/echarts\/([A-Za-z0-9]+)$/)
  return echartsCategories.some((c) => c.id === match?.[1]) ? (match![1] as EChartsCategory) : "all"
}

export function EChartsGallery() {
  const [category, setCategory] = useState(readCategory)
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<EChartsExample | null>(null)

  useEffect(() => {
    const onHash = () => setCategory(readCategory())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const counts = useMemo(
    () =>
      Object.fromEntries(
        echartsCategories.map((c) => [c.id, echartsExamples.filter((e) => e.categories.includes(c.id)).length]),
      ) as Record<EChartsCategory, number>,
    [],
  )

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return echartsExamples.filter(
      (e) =>
        (category === "all" || e.categories.includes(category)) &&
        (!needle || e.title.toLowerCase().includes(needle) || e.name.toLowerCase().includes(needle)),
    )
  }, [category, query])

  const chip = (active: boolean) =>
    `flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors ${
      active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
    }`

  return (
    <>
      <div className="sticky top-14 z-10 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-2 px-4 py-2 lg:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            <a href="#charts/echarts" className={chip(category === "all")}>
              All
              <span className="text-xs tabular-nums text-muted-foreground">{echartsExamples.length}</span>
            </a>
            {echartsCategories.map(({ id, label, group }, index) => (
              <Fragment key={id}>
                {group === "gl" && echartsCategories[index - 1]?.group !== "gl" && (
                  <span className="mx-1 flex shrink-0 items-center gap-2 text-xs text-muted-foreground" title="Needs WebGL">
                    <span className="h-4 w-px bg-border" />
                    3D
                  </span>
                )}
                <a href={`#charts/echarts/${id}`} className={chip(category === id)}>
                  {label}
                  <span className="text-xs tabular-nums text-muted-foreground">{counts[id]}</span>
                </a>
              </Fragment>
            ))}
          </div>
          <div className="relative hidden w-56 shrink-0 sm:block">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search ECharts examples"
              placeholder="Search examples"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-8 pl-8 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 px-4 py-8 md:grid-cols-2 lg:px-6 xl:grid-cols-3">
        {visible.map((example) => (
          <ExampleCell key={example.name} example={example} onExpand={() => setExpanded(example)} />
        ))}
        {visible.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">No examples match “{query}”.</p>
        )}
      </div>

      <p className="mx-auto w-full max-w-screen-2xl px-4 pb-10 text-xs text-muted-foreground lg:px-6">
        Examples adapted from{" "}
        <a
          className="underline underline-offset-2 hover:text-foreground"
          href={`https://github.com/${echartsSource.repository}`}
          target="_blank"
          rel="noreferrer"
        >
          Apache ECharts
        </a>{" "}
        (Apache-2.0). Sample data is loaded from a pinned copy of the official repository.
      </p>

      <Dialog open={expanded !== null} onOpenChange={(open) => !open && setExpanded(null)}>
        <DialogContent className="max-w-[min(1200px,95vw)] sm:max-w-[min(1200px,95vw)]">
          <DialogHeader>
            <DialogTitle>{expanded?.title}</DialogTitle>
          </DialogHeader>
          {expanded && <ExampleChart key={expanded.name} name={expanded.name} height="min(75vh, 720px)" />}
        </DialogContent>
      </Dialog>
    </>
  )
}
