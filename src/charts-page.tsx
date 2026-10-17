import { Suspense, lazy, useEffect, useMemo, useState, type ComponentType } from "react"
import { CheckIcon, CodeIcon, CopyIcon, EyeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { chartTypes, charts, type ChartEntry, type ChartType } from "@/charts"
import { InstallCommand } from "@/install-command"
import { echartsExamples } from "@/echarts/meta"

// The ECharts gallery (and the echarts library itself) only loads when that tab is opened.
const EChartsGallery = lazy(() => import("@/echarts-page").then((m) => ({ default: m.EChartsGallery })))

// Each chart file exports one component (plus a few metadata consts).
const loaders = import.meta.glob("./charts/chart-*.tsx") as Record<string, () => Promise<Record<string, unknown>>>
const sources = import.meta.glob("./charts/chart-*.tsx", { query: "?raw", import: "default" }) as Record<
  string,
  () => Promise<string>
>

const typeLabels: Record<ChartType, string> = {
  area: "Area",
  bar: "Bar",
  line: "Line",
  pie: "Pie",
  radar: "Radar",
  radial: "Radial",
  tooltip: "Tooltip",
}

const componentCache = new Map<string, ComponentType>()
function chartComponent(name: string) {
  let Component = componentCache.get(name)
  if (!Component) {
    const load = loaders[`./charts/${name}.tsx`]!
    Component = lazy(async () => {
      const mod = await load()
      const component = Object.values(mod).find((value) => typeof value === "function") as ComponentType
      return { default: component }
    })
    componentCache.set(name, Component)
  }
  return Component
}

const isEChartsRoute = () => /^#charts\/echarts(\/|$)/.test(window.location.hash)

function readType(): ChartType {
  const match = window.location.hash.match(/^#charts\/([a-z]+)$/)
  return (chartTypes as readonly string[]).includes(match?.[1] ?? "") ? (match![1] as ChartType) : "area"
}

function ChartCell({ chart }: { chart: ChartEntry }) {
  const Chart = chartComponent(chart.name)
  const [showCode, setShowCode] = useState(false)
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!showCode || code) return
    let cancelled = false
    sources[`./charts/${chart.name}.tsx`]!().then((text) => !cancelled && setCode(text))
    return () => {
      cancelled = true
    }
  }, [showCode, code, chart.name])

  const wide = chart.name.endsWith("-interactive")

  return (
    <figure id={chart.name} className={`flex min-w-0 flex-col gap-2 ${wide ? "md:col-span-2 xl:col-span-3" : ""}`}>
      {showCode ? (
        <div className="relative overflow-hidden rounded-xl border">
          <div className="flex h-10 items-center border-b bg-muted/50 px-4 font-mono text-xs text-muted-foreground">
            charts/{chart.name}.tsx
          </div>
          <div className="border-b p-2 pr-12">
            <InstallCommand name={chart.name} />
          </div>
          <Button
            variant="outline"
            size="icon-sm"
            className="absolute top-12 right-3"
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
          <pre className="max-h-[520px] overflow-auto p-4 text-xs leading-relaxed">
            <code>{code || "Loading source…"}</code>
          </pre>
        </div>
      ) : (
        <Suspense fallback={<Skeleton className="h-[380px] w-full rounded-xl" />}>
          <Chart />
        </Suspense>
      )}
      <figcaption className="flex items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
        <span className="truncate">{chart.description}</span>
        <Button variant="ghost" size="xs" onClick={() => setShowCode((v) => !v)}>
          {showCode ? <EyeIcon /> : <CodeIcon />}
          {showCode ? "Preview" : "Code"}
        </Button>
      </figcaption>
    </figure>
  )
}

export function ChartsPage() {
  const [active, setActive] = useState<ChartType>(readType)
  const [echarts, setEcharts] = useState(isEChartsRoute)

  useEffect(() => {
    const onHash = () => {
      setActive(readType())
      setEcharts(isEChartsRoute())
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const visible = useMemo(() => charts.filter((c) => c.type === active), [active])

  const library = (isActive: boolean) =>
    `rounded-full px-3 py-1 text-sm font-medium transition-colors ${
      isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
    }`

  return (
    <div className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-6 py-12 text-center md:py-16">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance lg:text-5xl">
            Beautiful Charts &amp; Graphs
          </h1>
          <p className="max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
            {echarts
              ? `${echartsExamples.length} examples from the Apache ECharts gallery, adapted to DesignKit. Copy them or install any one with a single command.`
              : `${charts.length} chart examples built with Recharts and DesignKit components. Copy and paste into your apps.`}
          </p>
          <div className="mt-3 flex items-center gap-0.5 rounded-full border bg-muted/50 p-0.5" role="tablist" aria-label="Chart library">
            <a href="#charts" role="tab" aria-selected={!echarts} className={library(!echarts)}>
              Recharts
            </a>
            <a href="#charts/echarts" role="tab" aria-selected={echarts} className={library(echarts)}>
              ECharts
              <span className="ml-1.5 text-xs tabular-nums text-muted-foreground">{echartsExamples.length}</span>
            </a>
          </div>
        </div>
      </section>

      {echarts ? (
        <Suspense fallback={<div className="mx-auto w-full max-w-screen-2xl px-4 py-8 lg:px-6"><Skeleton className="h-[380px] w-full rounded-xl" /></div>}>
          <EChartsGallery />
        </Suspense>
      ) : (
        <>
          <div className="sticky top-14 z-10 border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-screen-2xl items-center gap-1 overflow-x-auto px-4 py-2 lg:px-6">
              {chartTypes.map((type) => (
                <a
                  key={type}
                  href={`#charts/${type}`}
                  className={`flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors ${
                    active === type ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {typeLabels[type]}
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {charts.filter((c) => c.type === type).length}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto grid w-full max-w-screen-2xl gap-6 px-4 py-8 md:grid-cols-2 lg:px-6 xl:grid-cols-3">
            {visible.map((chart) => (
              <ChartCell key={chart.name} chart={chart} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
