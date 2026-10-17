#!/usr/bin/env node
// Builds the shadcn-compatible DesignKit registry:
//   1. registry.json  -- item index, generated from the files under src/
//   2. public/r/*.json -- one self-contained item per component/block/chart
//      (via `shadcn build`, which inlines each file's contents)
//   3. public/r/index.json -- a small catalogue for tooling and docs
//
// Usage:  npm run registry:build
//         REGISTRY_URL=http://localhost:5173 npm run registry:build   # local testing
//
// Item dependencies are absolute URLs under REGISTRY_URL, so
// `npx shadcn add <url>/r/login-01.json` pulls in DesignKit's own components
// instead of resolving names against the default shadcn registry.

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const BASE = (process.env.REGISTRY_URL ?? "https://designkit-smoky.vercel.app").replace(/\/$/, "")
const itemUrl = (name) => `${BASE}/r/${name}.json`

const rel = (...p) => path.join(root, ...p)
const posix = (p) => p.split(path.sep).join("/")
const humanize = (slug) =>
  slug
    .split("-")
    .map((w) => (w === "otp" ? "OTP" : w[0].toUpperCase() + w.slice(1)))
    .join(" ")

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? listFiles(full) : [full]
  })
}

const IGNORED_PACKAGES = new Set(["react", "react-dom"])

// Pin each dependency to the range this project declares: the CLI otherwise
// installs the latest release, and a new major (e.g. @tanstack/react-table 9)
// can break code written against the version DesignKit ships with.
const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"))
const declared = { ...manifest.devDependencies, ...manifest.peerDependencies, ...manifest.dependencies }
const pinned = (pkg) => (declared[pkg] ? `${pkg}@${declared[pkg]}` : pkg)

/** Scan a source file for the things an item has to declare. */
function scan(file) {
  const source = fs.readFileSync(file, "utf8")
  const specifiers = [...source.matchAll(/(?:from|import)\s+["']([^"']+)["']/g)].map((m) => m[1])
  const ui = new Set()
  const hooks = new Set()
  const packages = new Set()
  for (const spec of specifiers) {
    let m
    if ((m = spec.match(/^@\/components\/ui\/([a-z0-9-]+)$/))) ui.add(m[1])
    else if ((m = spec.match(/^@\/hooks\/([a-z0-9-]+)$/))) hooks.add(m[1])
    else if (spec.startsWith(".") || spec.startsWith("@/")) continue
    else {
      const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]
      if (!IGNORED_PACKAGES.has(pkg)) packages.add(pkg)
    }
  }
  return { ui, hooks, packages }
}

function dependenciesOf(files, self) {
  const ui = new Set()
  const hooks = new Set()
  const packages = new Set()
  for (const file of files) {
    if (!/\.(tsx?|jsx?)$/.test(file)) continue
    const found = scan(file)
    found.ui.forEach((n) => ui.add(n))
    found.hooks.forEach((n) => hooks.add(n))
    found.packages.forEach((n) => packages.add(n))
  }
  ui.delete(self)
  return {
    dependencies: [...packages].sort().map(pinned),
    registryDependencies: [...[...ui].sort(), ...[...hooks].sort()].map(itemUrl),
  }
}

const items = []

// --- UI primitives -----------------------------------------------------------
const uiDir = rel("src/components/ui")
for (const file of fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx")).sort()) {
  const name = file.replace(/\.tsx$/, "")
  items.push({
    name,
    type: "registry:ui",
    title: humanize(name),
    ...dependenciesOf([path.join(uiDir, file)], name),
    files: [{ path: `src/components/ui/${file}`, type: "registry:ui" }],
  })
}

// --- Hooks -------------------------------------------------------------------
const hooksDir = rel("src/hooks")
for (const file of fs.readdirSync(hooksDir).filter((f) => /\.tsx?$/.test(f)).sort()) {
  const name = file.replace(/\.tsx?$/, "")
  items.push({
    name,
    type: "registry:hook",
    title: humanize(name),
    ...dependenciesOf([path.join(hooksDir, file)], name),
    files: [{ path: `src/hooks/${file}`, type: "registry:hook" }],
  })
}

// --- Blocks ------------------------------------------------------------------
const { blocks } = await import(pathToFileURL(rel("src/blocks/meta.ts")).href)
for (const block of blocks) {
  const dir = rel("src/blocks", block.name)
  const files = listFiles(dir).sort((a, b) =>
    a.endsWith("page.tsx") ? -1 : b.endsWith("page.tsx") ? 1 : a.localeCompare(b),
  )
  items.push({
    name: block.name,
    type: "registry:block",
    title: humanize(block.name),
    description: block.description,
    ...dependenciesOf(files, block.name),
    // Files keep their own project paths so the blocks' internal
    // `@/blocks/<name>/...` imports keep resolving after install.
    files: files.map((file) => {
      const p = posix(path.relative(root, file))
      return {
        path: p,
        target: p,
        type: file.endsWith(".json") ? "registry:file" : "registry:component",
      }
    }),
    categories: block.categories,
  })
}

// --- Charts ------------------------------------------------------------------
const { charts } = await import(pathToFileURL(rel("src/charts/index.ts")).href)
for (const chart of charts) {
  const file = rel("src/charts", `${chart.name}.tsx`)
  items.push({
    name: chart.name,
    type: "registry:block",
    title: humanize(chart.name.replace(/^chart-/, "")),
    description: chart.description,
    ...dependenciesOf([file], chart.name),
    files: [{ path: `src/charts/${chart.name}.tsx`, type: "registry:component" }],
    categories: ["charts", chart.type],
  })
}

// --- ECharts examples (generated by scripts/build-echarts-examples.mjs) -----------
const { echartsExamples } = await import(pathToFileURL(rel("src/echarts/meta.ts")).href)
const ECHARTS_PACKAGES = new Set(["echarts", "echarts-gl", "echarts-stat", "echarts-simple-transform"])
for (const example of echartsExamples) {
  const file = rel("src/echarts", `${example.name}.tsx`)
  const found = dependenciesOf([file], example.name)
  // A stray "from '...'" inside an example's text must not turn into an install dependency.
  const unexpected = found.dependencies.filter((d) => !ECHARTS_PACKAGES.has(d.replace(/@[^@/]+$/, "")))
  if (unexpected.length) throw new Error(`${example.name}: unexpected dependencies ${unexpected.join(", ")}`)
  items.push({
    name: example.name,
    type: "registry:block",
    title: example.title,
    description: `${example.title}, adapted from the Apache ECharts examples.`,
    ...found,
    files: [{ path: `src/echarts/${example.name}.tsx`, type: "registry:component" }],
    categories: ["charts", "echarts", ...example.categories],
  })
}

// Empty arrays are noise in the output.
for (const item of items) {
  if (!item.dependencies.length) delete item.dependencies
  if (!item.registryDependencies.length) delete item.registryDependencies
}

const names = items.map((i) => i.name)
const dupes = names.filter((n, i) => names.indexOf(n) !== i)
if (dupes.length) throw new Error(`Duplicate registry item names: ${[...new Set(dupes)].join(", ")}`)

fs.writeFileSync(
  rel("registry.json"),
  JSON.stringify(
    { $schema: "https://ui.shadcn.com/schema/registry.json", name: "designkit", homepage: BASE, items },
    null,
    2,
  ) + "\n",
)
console.log(`registry.json: ${items.length} items (base ${BASE})`)

// Inline file contents into public/r/*.json with the official builder.
fs.rmSync(rel("public/r"), { recursive: true, force: true })
execFileSync("npx", ["--no-install", "shadcn", "build", "--cwd", root], { stdio: "inherit" })

const summary = items.map(({ name, type, title, description, categories }) => ({
  name,
  type,
  title,
  ...(description ? { description } : {}),
  ...(categories ? { categories } : {}),
  url: itemUrl(name),
}))
fs.writeFileSync(rel("public/r/index.json"), JSON.stringify(summary, null, 2) + "\n")
console.log(`public/r: ${fs.readdirSync(rel("public/r")).length} files`)
