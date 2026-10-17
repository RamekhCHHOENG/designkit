import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { CheckIcon, CopyIcon, MoonIcon, RotateCcwIcon, SunIcon } from "lucide-react"
import { ChartBarMultiple } from "@/charts/chart-bar-multiple"
import { ChartPieDonut } from "@/charts/chart-pie-donut"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  accents,
  bases,
  buildTheme,
  defaultOptions,
  isHex,
  radii,
  themeToCss,
  type BaseName,
  type ChartMode,
  type ThemeOptions,
} from "@/theme"

const STORAGE_KEY = "designkit-theme"

function loadOptions(): ThemeOptions {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null")
    if (stored && isHex(stored.accent) && stored.base in bases && typeof stored.radius === "number") {
      return { ...defaultOptions, ...stored }
    }
  } catch {
    // Storage blocked or corrupt -- fall back to the defaults.
  }
  return defaultOptions
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
        active ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

function Preview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one click.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="theme-name">Name</Label>
            <Input id="theme-name" placeholder="Name of your project" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="theme-terms" defaultChecked />
            <Label htmlFor="theme-terms">Accept terms</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="theme-notify" defaultChecked />
            <Label htmlFor="theme-notify">Email notifications</Label>
          </div>
          <Progress value={62} />
        </CardContent>
        <CardFooter className="flex-wrap gap-2">
          <Button>Deploy</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>Badges, tabs and selection colors.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-2 text-sm text-muted-foreground">
              Focus rings, links and the active tab follow your accent.
            </TabsContent>
            <TabsContent value="analytics" className="pt-2 text-sm text-muted-foreground">
              Chart colors below come from the palette you pick.
            </TabsContent>
            <TabsContent value="reports" className="pt-2 text-sm text-muted-foreground">
              Muted text, borders and inputs follow the gray base.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ChartBarMultiple />
      <ChartPieDonut />
    </div>
  )
}

export function ThemesPage() {
  const [options, setOptions] = useState<ThemeOptions>(loadOptions)
  const [mode, setMode] = useState<"light" | "dark">("light")
  const [hexDraft, setHexDraft] = useState(options.accent)
  const [copied, setCopied] = useState(false)

  const theme = useMemo(() => buildTheme(options), [options])
  const css = useMemo(() => themeToCss(theme), [theme])
  const set = (patch: Partial<ThemeOptions>) => setOptions((prev) => ({ ...prev, ...patch }))

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options))
    } catch {
      // Storage blocked -- the theme just won't persist.
    }
    setHexDraft(options.accent)
  }, [options])

  const ratio = theme.contrast[mode]
  const previewStyle = theme[mode] as CSSProperties

  return (
    <div className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-6 py-12 text-center md:py-16">
          <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance lg:text-5xl">
            Make it yours
          </h1>
          <p className="max-w-2xl text-base text-balance text-muted-foreground sm:text-lg">
            Pick an accent color, a gray and a corner radius, see it applied to real components, then copy the CSS
            variables into your app.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-screen-2xl gap-8 px-4 py-8 lg:grid-cols-[320px_1fr] lg:px-6">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:h-fit">
          <Field label="Accent color">
            <div className="flex flex-wrap gap-2">
              {accents.map((accent) => (
                <button
                  key={accent.name}
                  type="button"
                  title={accent.name}
                  aria-label={accent.name}
                  aria-pressed={options.accent.toLowerCase() === accent.hex}
                  onClick={() => set({ accent: accent.hex })}
                  className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    options.accent.toLowerCase() === accent.hex ? "border-foreground" : "border-transparent"
                  }`}
                  style={{ backgroundColor: accent.hex }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                aria-label="Custom accent color"
                value={options.accent}
                onChange={(event) => set({ accent: event.target.value })}
                className="size-9 cursor-pointer rounded-md border bg-transparent p-0.5"
              />
              <Input
                aria-label="Accent hex value"
                value={hexDraft}
                maxLength={7}
                onChange={(event) => {
                  setHexDraft(event.target.value)
                  if (isHex(event.target.value)) set({ accent: event.target.value.toLowerCase() })
                }}
                className="h-9 w-28 font-mono text-xs"
              />
            </div>
          </Field>

          <Field label="Base gray">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(bases) as BaseName[]).map((name) => (
                <Choice key={name} active={options.base === name} onClick={() => set({ base: name })}>
                  {bases[name].label}
                </Choice>
              ))}
            </div>
          </Field>

          <Field label="Radius">
            <div className="flex flex-wrap gap-2">
              {radii.map((radius) => (
                <Choice key={radius} active={options.radius === radius} onClick={() => set({ radius })}>
                  {radius === 0.625 ? "0.625 (default)" : radius}
                </Choice>
              ))}
            </div>
          </Field>

          <Field label="Chart colors">
            <div className="flex flex-wrap gap-2">
              {([
                ["ramp", "Accent ramp"],
                ["multicolor", "Multicolor"],
              ] as [ChartMode, string][]).map(([value, label]) => (
                <Choice key={value} active={options.charts === value} onClick={() => set({ charts: value })}>
                  {label}
                </Choice>
              ))}
            </div>
          </Field>

          <div className="flex items-center gap-2 text-xs text-muted-foreground" data-testid="contrast">
            Primary on its foreground:
            <span className="font-mono font-medium text-foreground">{ratio.toFixed(2)}:1</span>
            <Badge variant={ratio >= 4.5 ? "secondary" : "destructive"}>{ratio >= 4.5 ? "AA" : "Low contrast"}</Badge>
          </div>

          <Button variant="outline" size="sm" onClick={() => setOptions(defaultOptions)} className="w-fit">
            <RotateCcwIcon /> Reset
          </Button>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
            <div className="flex items-center gap-1 rounded-full border p-0.5">
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => setMode(m)}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                    mode === m ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  {m === "light" ? <SunIcon className="size-3.5" /> : <MoonIcon className="size-3.5" />}
                  {m === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
          </div>

          <div
            data-testid="theme-preview"
            className={`rounded-xl border bg-background p-4 text-foreground md:p-6 ${mode === "dark" ? "dark" : ""}`}
            style={previewStyle}
          >
            <Preview />
          </div>

          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground">CSS variables</h2>
              <Button
                size="sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(css)
                    setCopied(true)
                    window.setTimeout(() => setCopied(false), 1600)
                  } catch {
                    // Clipboard unavailable -- best effort only.
                  }
                }}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? "Copied" : "Copy CSS"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Paste over the <code className="rounded bg-muted px-1 py-0.5">:root</code> and{" "}
              <code className="rounded bg-muted px-1 py-0.5">.dark</code> blocks in your global stylesheet.
            </p>
            <pre
              data-testid="theme-css"
              className="max-h-[28rem] overflow-auto rounded-xl border bg-muted/40 p-4 text-xs leading-relaxed"
            >
              <code>{css}</code>
            </pre>
          </section>
        </div>
      </div>
    </div>
  )
}
