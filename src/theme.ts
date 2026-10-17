// Theme engine shared by the React and Vue docs sites (the two copies are
// identical): turns an accent color, a gray "base" and a radius into the CSS
// variables DesignKit components read (the same shape as shadcn's tokens).

export interface Oklch {
  l: number
  c: number
  h: number
}

export type BaseName = "neutral" | "zinc" | "slate" | "stone"
export type ChartMode = "ramp" | "multicolor"
export type TokenMap = Record<string, string>

export interface ThemeOptions {
  /** Accent color as #rrggbb. */
  accent: string
  base: BaseName
  /** Corner radius in rem. */
  radius: number
  charts: ChartMode
}

// --- Color math (sRGB <-> OKLCH, https://bottosson.github.io/posts/oklab/) --------

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
const fromLinear = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055)
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export function isHex(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value)
}

export function hexToOklch(hex: string): Oklch {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255)) as [number, number, number]
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  const c = Math.hypot(a, bb)
  return { l: L, c, h: c < 1e-4 ? 0 : ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360 }
}

/** Linear-light sRGB for an OKLCH color, clipped to the gamut. */
function oklchToLinearRgb({ l, c, h }: Oklch): [number, number, number] {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    clamp(4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_, 0, 1),
    clamp(-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_, 0, 1),
    clamp(-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_, 0, 1),
  ]
}

export function oklchToHex(color: Oklch) {
  return (
    "#" +
    oklchToLinearRgb(color)
      .map((v) => Math.round(fromLinear(v) * 255).toString(16).padStart(2, "0"))
      .join("")
  )
}

/** WCAG contrast ratio between two colors. */
export function contrastRatio(a: Oklch, b: Oklch) {
  const luminance = (color: Oklch) => {
    const [r, g, bl] = oklchToLinearRgb(color)
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

const num = (v: number, digits: number) => String(Number(v.toFixed(digits)))

export function formatOklch({ l, c, h }: Oklch, alpha?: number) {
  const chroma = c < 0.0005 ? "0" : num(c, 3)
  const hue = c < 0.0005 ? "" : ` ${num(h, 1)}`
  return `oklch(${num(l, 3)} ${chroma}${c < 0.0005 ? " 0" : hue}${alpha === undefined ? "" : ` / ${alpha}%`})`
}

// --- Presets ----------------------------------------------------------------------

export const accents = [
  { name: "Neutral", hex: "#262626" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Rose", hex: "#e11d48" },
  { name: "Orange", hex: "#ea580c" },
  { name: "Amber", hex: "#d97706" },
  { name: "Green", hex: "#16a34a" },
  { name: "Teal", hex: "#0d9488" },
] as const

/** Hue / chroma used to tint the grays. */
export const bases: Record<BaseName, { label: string; h: number; c: number }> = {
  neutral: { label: "Neutral", h: 0, c: 0 },
  zinc: { label: "Zinc", h: 286, c: 0.01 },
  slate: { label: "Slate", h: 255, c: 0.025 },
  stone: { label: "Stone", h: 60, c: 0.01 },
}

export const radii = [0, 0.3, 0.5, 0.625, 0.75, 1] as const

export const defaultOptions: ThemeOptions = { accent: "#262626", base: "neutral", radius: 0.625, charts: "ramp" }

// --- Token generation -------------------------------------------------------------

const NEAR_BLACK: Oklch = { l: 0.205, c: 0, h: 0 }
const NEAR_WHITE: Oklch = { l: 0.985, c: 0, h: 0 }

/** Whichever of near-white / near-black reads better on `background`. */
function foregroundFor(background: Oklch): Oklch {
  return contrastRatio(background, NEAR_WHITE) >= contrastRatio(background, NEAR_BLACK) ? NEAR_WHITE : NEAR_BLACK
}

export interface Theme {
  light: TokenMap
  dark: TokenMap
  /** Contrast of the primary color against its foreground, per mode. */
  contrast: { light: number; dark: number }
}

export function buildTheme(options: ThemeOptions): Theme {
  const accent = hexToOklch(isHex(options.accent) ? options.accent : defaultOptions.accent)
  const base = bases[options.base]
  const colored = accent.c >= 0.02
  const gray = (l: number, alpha?: number): string =>
    formatOklch({ l, c: base.c, h: base.h }, alpha)

  // Primary: the accent in light mode; a lifted variant in dark mode so it stays readable.
  const primaryLight: Oklch = colored ? accent : { l: 0.205, c: 0, h: 0 }
  const primaryDark: Oklch = colored ? { l: clamp(accent.l, 0.66, 0.8), c: accent.c * 0.95, h: accent.h } : { l: 0.922, c: 0, h: 0 }
  const fgLight = foregroundFor(primaryLight)
  const fgDark = foregroundFor(primaryDark)

  const ring = (l: number): string =>
    colored ? formatOklch({ l, c: Math.min(accent.c * 0.7, 0.14), h: accent.h }) : formatOklch({ l, c: 0, h: 0 })

  const charts = (): string[] => {
    if (options.charts === "ramp") {
      if (!colored) return ["oklch(0.87 0 0)", "oklch(0.556 0 0)", "oklch(0.439 0 0)", "oklch(0.371 0 0)", "oklch(0.269 0 0)"]
      const chroma = Math.min(accent.c, 0.2)
      return [0.85, 0.72, 0.6, 0.48, 0.36].map((l) => formatOklch({ l, c: chroma, h: accent.h }))
    }
    const hue = colored ? accent.h : 250
    return [0.646, 0.6, 0.7, 0.66, 0.62].map((l, i) => formatOklch({ l, c: 0.16, h: (hue + i * 72) % 360 }))
  }
  const chart = charts()

  const chartTokens = (): TokenMap => Object.fromEntries(chart.map((value, i) => [`--chart-${i + 1}`, value]))

  const light: TokenMap = {
    "--radius": `${options.radius}rem`,
    "--background": "oklch(1 0 0)",
    "--foreground": gray(0.145),
    "--card": "oklch(1 0 0)",
    "--card-foreground": gray(0.145),
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": gray(0.145),
    "--primary": formatOklch(primaryLight),
    "--primary-foreground": formatOklch(fgLight),
    "--secondary": gray(0.97),
    "--secondary-foreground": gray(0.205),
    "--muted": gray(0.97),
    "--muted-foreground": gray(0.556),
    "--accent": gray(0.97),
    "--accent-foreground": gray(0.205),
    "--destructive": "oklch(0.577 0.245 27.325)",
    "--border": gray(0.922),
    "--input": gray(0.922),
    "--ring": ring(0.708),
    ...chartTokens(),
    "--sidebar": gray(0.985),
    "--sidebar-foreground": gray(0.145),
    "--sidebar-primary": formatOklch(primaryLight),
    "--sidebar-primary-foreground": formatOklch(fgLight),
    "--sidebar-accent": gray(0.97),
    "--sidebar-accent-foreground": gray(0.205),
    "--sidebar-border": gray(0.922),
    "--sidebar-ring": ring(0.708),
  }

  const dark: TokenMap = {
    "--radius": `${options.radius}rem`,
    "--background": gray(0.145),
    "--foreground": gray(0.985),
    "--card": gray(0.205),
    "--card-foreground": gray(0.985),
    "--popover": gray(0.205),
    "--popover-foreground": gray(0.985),
    "--primary": formatOklch(primaryDark),
    "--primary-foreground": formatOklch(fgDark),
    "--secondary": gray(0.269),
    "--secondary-foreground": gray(0.985),
    "--muted": gray(0.269),
    "--muted-foreground": gray(0.708),
    "--accent": gray(0.269),
    "--accent-foreground": gray(0.985),
    "--destructive": "oklch(0.704 0.191 22.216)",
    "--border": "oklch(1 0 0 / 10%)",
    "--input": "oklch(1 0 0 / 15%)",
    "--ring": ring(0.556),
    ...chartTokens(),
    "--sidebar": gray(0.205),
    "--sidebar-foreground": gray(0.985),
    "--sidebar-primary": formatOklch(primaryDark),
    "--sidebar-primary-foreground": formatOklch(fgDark),
    "--sidebar-accent": gray(0.269),
    "--sidebar-accent-foreground": gray(0.985),
    "--sidebar-border": "oklch(1 0 0 / 10%)",
    "--sidebar-ring": ring(0.556),
  }

  return {
    light,
    dark,
    contrast: { light: contrastRatio(primaryLight, fgLight), dark: contrastRatio(primaryDark, fgDark) },
  }
}

/** The stylesheet a user pastes into their app (`:root` plus `.dark`). */
export function themeToCss(theme: Theme) {
  const block = (selector: string, tokens: TokenMap, skip: string[] = []) =>
    `${selector} {\n${Object.entries(tokens)
      .filter(([name]) => !skip.includes(name))
      .map(([name, value]) => `  ${name}: ${value};`)
      .join("\n")}\n}`
  return `${block(":root", theme.light)}\n\n${block(".dark", theme.dark, ["--radius"])}\n`
}
