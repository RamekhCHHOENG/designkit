import * as React from "react"
import * as echarts from "echarts"
import type { ECharts, EChartsOption } from "echarts"

import { cn } from "@/lib/utils"

/*
 * A thin runner for Apache ECharts examples (https://echarts.apache.org/examples).
 *
 * The official examples are scripts written against a few implicit variables
 * (`myChart`, `app`, `setTimeout`, `setInterval`) and jQuery for loading data.
 * `EChart` provides the same contract: it creates the chart, calls your `setup`
 * function with those variables, applies the option `setup` returns, keeps the
 * chart sized to its box, follows the `.dark` class, and cleans up timers and
 * the chart instance on unmount.
 */

export type EChartApp = {
  /** Describes the controls for `app.config` (a select for `options`, a slider for `min`/`max`). */
  configParameters: {
    [key: string]: { options: Record<string, string> | string[] } | { min?: number; max?: number }
  }
  /** Values shown as controls; `onChange` runs after any of them changes. */
  config: {
    onChange: () => void
    [key: string]: string | number | boolean | Function
  }
  onresize: () => void
  [key: string]: any
}

export interface EChartContext {
  myChart: ECharts
  app: EChartApp
  /** Timers created through these are cleared when the chart is unmounted. */
  setTimeout: typeof window.setTimeout
  setInterval: typeof window.setInterval
}

export type EChartSetup = (
  context: EChartContext,
) => EChartsOption | undefined | void | Promise<EChartsOption | undefined | void>

// --- jQuery-compatible loading helpers ---------------------------------------------
// Only the four calls the ECharts examples use: $.get, $.getJSON, $.getScript and
// $.when. Each returns a thenable with jQuery's `done` / `fail` / `always`.

class Deferred<T = any> implements PromiseLike<T> {
  constructor(readonly settled: Promise<unknown[]>) {
    // Rejections stay observable through `then` / `fail`, but never go unhandled.
    settled.catch(() => {})
  }
  done(callback: (...args: any[]) => void) {
    this.settled.then((args) => callback(...args), () => {})
    return this
  }
  fail(callback: (error: unknown) => void) {
    this.settled.catch(callback)
    return this
  }
  always(callback: (...args: any[]) => void) {
    this.settled.then((args) => callback(...args), callback)
    return this
  }
  then<R1 = T, R2 = never>(
    onFulfilled?: ((value: T) => R1 | PromiseLike<R1>) | null,
    onRejected?: ((reason: any) => R2 | PromiseLike<R2>) | null,
  ): Promise<R1 | R2> {
    return this.settled.then((args) => args[0] as T).then(onFulfilled, onRejected)
  }
}

async function request(url: string, dataType?: string): Promise<unknown[]> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`)
  const isJson = dataType === "json" || (!dataType && (response.headers.get("content-type") ?? "").includes("json"))
  return [isJson ? await response.json() : await response.text(), "success", response]
}

const scripts = new Map<string, Promise<unknown[]>>()
let scriptQueue: Promise<unknown> = Promise.resolve()

function loadScript(url: string): Promise<unknown[]> {
  let loaded = scripts.get(url)
  if (!loaded) {
    // Scripts run one after another, in the order they were requested: libraries such as d3-geo
    // need d3-array to have run already, which parallel async scripts do not guarantee.
    loaded = scriptQueue
      .catch(() => {})
      .then(
        () =>
          new Promise<unknown[]>((resolve, reject) => {
            const script = document.createElement("script")
            script.src = url
            script.onload = () => resolve(["", "success", script])
            script.onerror = () => {
              scripts.delete(url)
              reject(new Error(`Failed to load ${url}`))
            }
            document.head.appendChild(script)
          }),
      )
    scriptQueue = loaded
    scripts.set(url, loaded)
  }
  return loaded
}

export const $ = {
  get(url: string, success?: ((data: any) => void) | string, dataType?: string) {
    const type = typeof success === "string" ? success : dataType
    const deferred = new Deferred(request(url, type))
    if (typeof success === "function") deferred.done(success)
    return deferred
  },
  getJSON(url: string, success?: (data: any) => void) {
    const deferred = new Deferred(request(url, "json"))
    if (success) deferred.done(success)
    return deferred
  },
  getScript(url: string, success?: () => void) {
    const deferred = new Deferred(loadScript(url))
    if (success) deferred.done(success)
    return deferred
  },
  when(...deferreds: Deferred[]) {
    // With one argument jQuery passes its results straight through.
    if (deferreds.length === 1) return deferreds[0]!
    return new Deferred(Promise.all(deferreds.map((d) => d.settled)))
  },
}

const builtinMaps = new Map<string, Promise<void>>()

/**
 * Registers the `china` or `world` map. The official gallery preloads them; ECharts 5+ no longer
 * bundles them, so they are fetched once from the last release that did (4.9.0).
 */
export function registerBuiltinMap(name: "china" | "world") {
  let ready = builtinMaps.get(name)
  if (!ready) {
    ready = fetch(`https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/${name}.json`)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load the ${name} map (${response.status})`)
        return response.json()
      })
      .then((geoJson) => echarts.registerMap(name, geoJson))
    ready.catch(() => builtinMaps.delete(name))
    builtinMaps.set(name, ready)
  }
  return ready
}

// --- Component -----------------------------------------------------------------------

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
  return () => observer.disconnect()
}

function useIsDark() {
  return React.useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  )
}

interface EChartProps extends Omit<React.ComponentProps<"div">, "children"> {
  setup: EChartSetup
  /** Create the chart only while it is near the viewport. */
  lazy?: boolean
  /** "dark" always uses the dark theme, for examples that are drawn for a dark background. */
  theme?: "dark"
}

function EChart({ setup, lazy = true, theme, className, ...props }: EChartProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const hostRef = React.useRef<HTMLDivElement>(null)
  const dark = useIsDark() || theme === "dark"
  const [visible, setVisible] = React.useState(!lazy)
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading")
  const [error, setError] = React.useState("")
  const [app, setApp] = React.useState<EChartApp | null>(null)

  // Create the chart when it scrolls near the viewport and release it when it is far away,
  // so a page with hundreds of charts only ever holds a handful of live instances.
  React.useEffect(() => {
    const root = rootRef.current
    if (!lazy || !root) return
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true)
      },
      { rootMargin: "300px" },
    )
    const far = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting) setVisible(false)
      },
      { rootMargin: "1500px" },
    )
    near.observe(root)
    far.observe(root)
    return () => {
      near.disconnect()
      far.disconnect()
    }
  }, [lazy])

  React.useEffect(() => {
    const host = hostRef.current
    if (!visible || !host) {
      setStatus("loading")
      return
    }

    let cancelled = false
    const timeouts = new Set<number>()
    const intervals = new Set<number>()
    const chart = echarts.init(host, dark ? "dark" : undefined)
    const exampleApp = {} as EChartApp

    // Callbacks that fire after unmount must not touch a disposed instance.
    for (const method of ["setOption", "dispatchAction", "showLoading", "hideLoading", "resize"] as const) {
      const original = (chart[method] as (...args: unknown[]) => unknown).bind(chart)
      ;(chart as unknown as Record<string, unknown>)[method] = (...args: unknown[]) =>
        chart.isDisposed() ? undefined : original(...args)
    }

    const resizer = new ResizeObserver(() => chart.resize())
    resizer.observe(host)

    setStatus("loading")
    Promise.resolve()
      .then(() =>
        setup({
          myChart: chart,
          app: exampleApp,
          setTimeout: ((handler: TimerHandler, delay?: number, ...args: unknown[]) => {
            const id = window.setTimeout(handler, delay, ...args)
            timeouts.add(id)
            return id
          }) as typeof window.setTimeout,
          setInterval: ((handler: TimerHandler, delay?: number, ...args: unknown[]) => {
            const id = window.setInterval(handler, delay, ...args)
            intervals.add(id)
            return id
          }) as typeof window.setInterval,
        }),
      )
      .then((option) => {
        if (cancelled) return
        if (option && typeof option === "object") chart.setOption(option, true)
        setApp(exampleApp.config ? exampleApp : null)
        setStatus("ready")
      })
      .catch((reason: unknown) => {
        if (cancelled) return
        console.error("Failed to run the chart example", reason)
        setError(reason instanceof Error ? reason.message : String(reason))
        setStatus("error")
      })

    return () => {
      cancelled = true
      timeouts.forEach((id) => window.clearTimeout(id))
      intervals.forEach((id) => window.clearInterval(id))
      resizer.disconnect()
      chart.dispose()
      setApp(null)
    }
  }, [visible, setup, dark])

  return (
    <div
      ref={rootRef}
      data-slot="echart"
      data-status={status}
      className={cn("relative h-[var(--echart-height,400px)] w-full overflow-hidden rounded-lg", className)}
      {...props}
    >
      <div ref={hostRef} className="size-full" />
      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 animate-pulse bg-muted/40" aria-hidden />
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-destructive">
          Could not render this chart: {error}
        </div>
      )}
      {app && <EChartControls app={app} />}
    </div>
  )
}

// The `app.config` panel (the official gallery renders it with dat.GUI).

type ConfigValue = string | number | boolean | Function

function EChartControls({ app }: { app: EChartApp }) {
  const [, refresh] = React.useReducer((n: number) => n + 1, 0)
  const parameters = app.configParameters ?? {}

  const update = (key: string, value: ConfigValue) => {
    app.config[key] = value
    refresh()
    app.config.onChange?.()
  }

  const fieldClass = "h-7 w-full min-w-0 rounded border bg-background px-1.5 text-xs"

  return (
    <div className="absolute top-2 right-2 z-10 flex max-h-[calc(100%-1rem)] w-52 flex-col gap-2 overflow-auto rounded-lg border bg-background/95 p-3 text-xs shadow-sm backdrop-blur">
      {Object.entries(app.config)
        .filter(([key]) => key !== "onChange" && key !== "onFinishChange")
        .map(([key, value]) => {
          const parameter = parameters[key]
          const options = parameter && "options" in parameter ? parameter.options : null
          const label = <span className="truncate text-muted-foreground">{key}</span>

          if (typeof value === "function") {
            return (
              <button
                key={key}
                type="button"
                className="h-7 rounded border bg-muted/50 px-2 text-xs hover:bg-muted"
                onClick={() => {
                  ;(value as () => void).call(app.config)
                  refresh()
                }}
              >
                {key}
              </button>
            )
          }

          if (options) {
            const entries: [string, string | number | boolean][] = Array.isArray(options)
              ? options.map((option) => [String(option), option])
              : Object.entries(options)
            return (
              <label key={key} className="flex flex-col gap-1">
                {label}
                <select
                  className={fieldClass}
                  value={String(value)}
                  onChange={(event) => {
                    const chosen = entries.find(([, raw]) => String(raw) === event.target.value)
                    update(key, chosen ? chosen[1] : event.target.value)
                  }}
                >
                  {entries.map(([name, raw]) => (
                    <option key={name} value={String(raw)}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            )
          }

          if (typeof value === "boolean") {
            return (
              <label key={key} className="flex items-center justify-between gap-2">
                {label}
                <input type="checkbox" checked={value} onChange={(event) => update(key, event.target.checked)} />
              </label>
            )
          }

          if (typeof value === "number") {
            const range = parameter && "min" in parameter && parameter.min != null ? parameter : null
            const step = value === 0 ? 1 : 10 ** Math.floor(Math.log10(Math.abs(value))) / 10
            return (
              <label key={key} className="flex flex-col gap-1">
                <span className="flex justify-between gap-2 text-muted-foreground">
                  {key}
                  <span className="text-foreground tabular-nums">{value}</span>
                </span>
                <input
                  type={range ? "range" : "number"}
                  className={range ? "w-full" : fieldClass}
                  min={range?.min}
                  max={range?.max}
                  step={step}
                  value={value}
                  onChange={(event) => update(key, Number(event.target.value))}
                />
              </label>
            )
          }

          return (
            <label key={key} className="flex flex-col gap-1">
              {label}
              <input className={fieldClass} value={String(value)} onChange={(event) => update(key, event.target.value)} />
            </label>
          )
        })}
    </div>
  )
}

export { EChart }
