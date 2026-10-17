import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react"
import {
  CheckIcon,
  CopyIcon,
  FullscreenIcon,
  MonitorIcon,
  RotateCwIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstallCommand } from "@/install-command"
import {
  blockCategories,
  blocks,
  blockSourceFiles,
  loadBlockPage,
  type BlockEntry,
} from "@/blocks"

// ---------------------------------------------------------------------------
// Full-screen block view (#view/<name>), used as the preview iframe source.
// ---------------------------------------------------------------------------

/** Parses `#view/<name>?min=600` into its parts. */
export function parseViewHash(hash: string) {
  const match = hash.match(/^view\/([a-z0-9-]+)(?:\?min=(\d+))?$/)
  return match ? { name: match[1]!, min: match[2] ? Number(match[2]) : 0 } : null
}

export function BlockView({ name, min }: { name: string; min: number }) {
  const loader = loadBlockPage(name)
  const Page = useMemo(() => (loader ? lazy(loader) : null), [loader])

  // Inside a preview iframe, pin viewport-height minimums to a fixed size so
  // the parent can measure the block's real height without a svh feedback loop.
  useEffect(() => {
    if (!min) return
    const root = document.documentElement
    root.classList.add("dk-embed")
    root.style.setProperty("--dk-min", `${min}px`)
    return () => {
      root.classList.remove("dk-embed")
      root.style.removeProperty("--dk-min")
    }
  }, [min])

  useEffect(() => {
    const previous = document.title
    document.title = `${name} — DesignKit Blocks`
    return () => {
      document.title = previous
    }
  }, [name])

  if (!Page) {
    return <p className="p-10 text-center text-sm text-muted-foreground">Block “{name}” not found.</p>
  }
  return (
    <div className="bg-background">
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Blocks gallery (#blocks)
// ---------------------------------------------------------------------------

const MAX_HEIGHT = 2400
const MAX_RESIZES = 8
const viewports = [
  { value: 100, label: "Desktop", Icon: MonitorIcon },
  { value: 60, label: "Tablet", Icon: TabletIcon },
  { value: 30, label: "Mobile", Icon: SmartphoneIcon },
]

function BlockCode({ name }: { name: string }) {
  const files = useMemo(() => blockSourceFiles(name), [name])
  const [active, setActive] = useState(files[0]?.[0] ?? "")
  const [code, setCode] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const entry = files.find(([path]) => path === active)
    let cancelled = false
    entry?.[1]().then((text) => !cancelled && setCode(text))
    return () => {
      cancelled = true
    }
  }, [active, files])

  return (
    <div className="flex flex-col gap-3">
    <InstallCommand name={name} />
    <div className="flex overflow-hidden rounded-xl border">
      <nav className="hidden w-56 shrink-0 flex-col gap-0.5 border-r bg-muted/30 p-2 md:flex">
        {files.map(([path]) => (
          <button
            key={path}
            type="button"
            onClick={() => setActive(path)}
            className={`truncate rounded-md px-2 py-1 text-left font-mono text-xs ${
              path === active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {path.slice(name.length + 1)}
          </button>
        ))}
      </nav>
      <div className="relative min-w-0 flex-1">
        <div className="flex h-10 items-center border-b bg-muted/50 px-4 font-mono text-xs text-muted-foreground">
          blocks/{active}
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
        <pre className="max-h-[640px] overflow-auto p-4 text-xs leading-relaxed">
          <code>{code || "Loading source…"}</code>
        </pre>
      </div>
    </div>
    </div>
  )
}

function BlockViewer({ block }: { block: BlockEntry }) {
  const minHeight = block.height ?? 700
  const [view, setView] = useState<string>("preview")
  const [viewport, setViewport] = useState(100)
  const [frameKey, setFrameKey] = useState(0)
  const [height, setHeight] = useState(minHeight)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const src = `#view/${block.name}`
  const embedSrc = `${window.location.pathname}#view/${block.name}?min=${minHeight}`

  // Size the iframe to the block's full content so nothing is cut off.
  function onLoad() {
    observerRef.current?.disconnect()
    const doc = iframeRef.current?.contentDocument
    const root = doc?.getElementById("root") ?? doc?.body
    if (!root) return
    let resizes = 0
    const measure = () => {
      const content = Math.ceil(root.getBoundingClientRect().height)
      const next = Math.min(Math.max(content, minHeight), MAX_HEIGHT)
      setHeight((prev) => (Math.abs(next - prev) > 4 ? next : prev))
    }
    measure()
    observerRef.current = new ResizeObserver(() => {
      if (++resizes > MAX_RESIZES) return observerRef.current?.disconnect()
      requestAnimationFrame(measure)
    })
    observerRef.current.observe(root)
  }

  function reload() {
    setHeight(minHeight)
    setFrameKey((k) => k + 1)
  }

  useEffect(() => () => observerRef.current?.disconnect(), [])

  return (
    <section id={block.name} className="flex scroll-mt-28 flex-col gap-4">
      <div className="flex w-full items-center gap-2">
        <Tabs value={view} onValueChange={(v) => setView(String(v))} className="hidden lg:flex">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </Tabs>
        <Separator orientation="vertical" className="mx-2 hidden h-4 lg:flex" />
        <span className="flex-1 truncate text-sm font-medium">{block.description}</span>
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <ButtonGroup>
            {viewports.map(({ value, label, Icon }) => (
              <Button
                key={value}
                variant={viewport === value ? "secondary" : "outline"}
                size="icon-sm"
                aria-label={label}
                title={label}
                aria-pressed={viewport === value}
                onClick={() => {
                  setViewport(value)
                  reload()
                }}
              >
                <Icon />
              </Button>
            ))}
          </ButtonGroup>
          <Button
            variant="outline"
            size="icon-sm"
            title="Open in New Tab"
            aria-label="Open in New Tab"
            nativeButton={false}
            render={<a href={src} target="_blank" rel="noreferrer" />}
          >
            <FullscreenIcon />
          </Button>
          <Button variant="outline" size="icon-sm" title="Refresh Preview" aria-label="Refresh Preview" onClick={reload}>
            <RotateCwIcon />
          </Button>
        </div>
        <Button variant="outline" size="sm" className="font-mono text-xs" onClick={() => setView(view === "code" ? "preview" : "code")}>
          {block.name}
        </Button>
      </div>

      {view === "preview" ? (
        <div className="relative rounded-xl bg-muted/50 p-0 lg:border lg:p-2">
          <div
            className="relative mx-auto overflow-hidden rounded-lg border bg-background transition-[width] duration-300 ease-out"
            style={{ width: `${viewport}%`, minWidth: 360, maxWidth: "100%" }}
          >
            <iframe
              key={frameKey}
              ref={iframeRef}
              src={embedSrc}
              title={block.name}
              loading="lazy"
              className="w-full bg-background"
              style={{ height }}
              onLoad={onLoad}
            />
          </div>
        </div>
      ) : (
        <BlockCode name={block.name} />
      )}
    </section>
  )
}

function readCategory() {
  const match = window.location.hash.match(/^#blocks\/?([a-z]+)?$/)
  const slug = match?.[1]
  return slug && blockCategories.some((c) => c.slug === slug) ? slug : "featured"
}

export function BlocksPage() {
  const [active, setActive] = useState(readCategory)

  useEffect(() => {
    const onHash = () => setActive(readCategory())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const visible = useMemo(
    () =>
      active === "featured"
        ? blocks.filter((b) => b.featured)
        : blocks.filter((b) => b.categories.includes(active as BlockEntry["categories"][number])),
    [active],
  )
  const countFor = (slug: string) =>
    slug === "featured" ? blocks.filter((b) => b.featured).length : blocks.filter((b) => b.categories.includes(slug as never)).length

  return (
    <div className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-6 py-12 text-center md:py-16 lg:py-20">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance lg:text-5xl">
            Building Blocks for the Web
          </h1>
          <p className="max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
            Clean, modern building blocks built only with DesignKit components. Copy and paste into your apps.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Button size="sm" nativeButton={false}
            render={<a href="#blocks-list" />}>
              Browse Blocks
            </Button>
            <Button size="sm" variant="ghost" nativeButton={false}
            render={<a href="#" />}>
              Components
            </Button>
          </div>
        </div>
      </section>

      <div id="blocks-list" className="sticky top-14 z-10 scroll-mt-14 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-1 overflow-x-auto px-4 py-2 lg:px-6">
          {blockCategories.map((cat) => (
            <a
              key={cat.slug}
              href={cat.slug === "featured" ? "#blocks" : `#blocks/${cat.slug}`}
              className={`flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors ${
                active === cat.slug ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
              <span className="text-xs tabular-nums text-muted-foreground">{countFor(cat.slug)}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-16 px-4 py-8 md:gap-24 lg:px-6">
        {visible.map((block) => (
          <BlockViewer key={block.name} block={block} />
        ))}
      </div>
    </div>
  )
}
