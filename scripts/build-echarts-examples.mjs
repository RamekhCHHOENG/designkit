#!/usr/bin/env node
// Turns the official Apache ECharts examples into DesignKit chart components.
//
//   git clone --depth 1 https://github.com/apache/echarts-examples ../echarts-examples
//   node scripts/build-echarts-examples.mjs ../echarts-examples
//
// For every example under public/examples/ts it writes
//   designkit/src/echarts/echarts-<slug>.tsx                    (React)
//   designkit/src/echarts/meta.ts
//   shadcn-vue/app/registry/default/echarts/Echarts<Slug>.vue   (Vue, when the sibling site exists)
//   shadcn-vue/app/config/echarts.ts
//
// The examples are scripts written against implicit variables (`myChart`, `app`,
// `echarts`, `$`, `ROOT_PATH`, ...). Each one becomes a component whose body is the
// original code, wrapped in a `setup` function that receives what the script expects
// (see src/components/ui/echart.tsx). The examples are Apache-2.0 licensed:
// https://github.com/apache/echarts-examples

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parse } from "@babel/parser"
import _traverse from "@babel/traverse"

const traverse = _traverse.default ?? _traverse

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const vueRoot = path.resolve(root, "../shadcn-vue")
const checkout = path.resolve(process.argv[2] ?? process.env.ECHARTS_EXAMPLES_DIR ?? "")
const examplesDir = path.join(checkout, "public/examples/ts")
if (!process.argv[2] && !process.env.ECHARTS_EXAMPLES_DIR) {
  console.error("Usage: node scripts/build-echarts-examples.mjs <path to an apache/echarts-examples checkout>")
  process.exit(1)
}
if (!fs.existsSync(examplesDir)) throw new Error(`Not an echarts-examples checkout: ${checkout}`)

const commit = execFileSync("git", ["-C", checkout, "rev-parse", "HEAD"], { encoding: "utf8" }).trim()
// Pinned, CORS-enabled mirror of the repository's data files (the official host only allows its own origin).
const ROOT_PATH = `https://cdn.jsdelivr.net/gh/apache/echarts-examples@${commit}/public`
const CDN_PATH = "https://cdn.jsdelivr.net/npm/"

// Categories in the order the official gallery lists them. `geo` is folded into `map`.
const categories = [
  ["line", "Line"],
  ["bar", "Bar"],
  ["pie", "Pie"],
  ["scatter", "Scatter"],
  ["map", "Map"],
  ["candlestick", "Candlestick"],
  ["radar", "Radar"],
  ["boxplot", "Boxplot"],
  ["heatmap", "Heatmap"],
  ["graph", "Graph"],
  ["lines", "Lines"],
  ["tree", "Tree"],
  ["treemap", "Treemap"],
  ["sunburst", "Sunburst"],
  ["parallel", "Parallel"],
  ["sankey", "Sankey"],
  ["funnel", "Funnel"],
  ["gauge", "Gauge"],
  ["pictorialBar", "PictorialBar"],
  ["themeRiver", "ThemeRiver"],
  ["calendar", "Calendar"],
  ["matrix", "Matrix"],
  ["chord", "Chord"],
  ["custom", "Custom"],
  ["dataset", "Dataset"],
  ["dataZoom", "DataZoom"],
  ["graphic", "Graphic"],
  ["rich", "Rich text"],
  ["animation", "Animation"],
  ["transform", "Transform"],
  ["visualMap", "VisualMap"],
]
// The ECharts GL (3D / WebGL) examples, listed after the regular ones.
const glCategories = [
  ["bar3D", "Bar 3D"],
  ["scatter3D", "Scatter 3D"],
  ["line3D", "Line 3D"],
  ["lines3D", "Lines 3D"],
  ["surface", "Surface"],
  ["globe", "Globe"],
  ["map3D", "Map 3D"],
  ["geo3D", "Geo 3D"],
  ["flowGL", "Flow GL"],
  ["scatterGL", "Scatter GL"],
  ["linesGL", "Lines GL"],
  ["graphGL", "Graph GL"],
]
const glCategoryIds = new Set(glCategories.map(([id]) => id))
const categoryIds = [...categories, ...glCategories].map(([id]) => id)
const categoryAliases = { animtion: "animation", geo: "map" }

// Examples that cannot run without a third-party service or input.
const unsupported = [
  [/\b(bmap|BMap)\b/, "needs the Baidu Maps API"],
  [/mapbox/i, "needs a Mapbox access token"],
  [/AudioContext/, "needs an audio source"],
]

// Every file in the examples repository, to check that the data an example loads exists there.
const repoFiles = new Set(
  execFileSync("git", ["-C", checkout, "ls-tree", "-r", "--name-only", "HEAD", "public"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  }).split("\n"),
)
const repoFileList = [...repoFiles]
function missingData(source) {
  for (const match of source.matchAll(/ROOT_PATH\s*\+\s*['"`]([^'"`]+)['"`]/g)) {
    const wanted = `public${match[1]}`
    // A path ending in `_` or `/` is a prefix the code completes at run time.
    const found = /[_/]$/.test(wanted) ? repoFileList.some((f) => f.startsWith(wanted)) : repoFiles.has(wanted)
    if (!found) return match[1]
  }
  return null
}

// Lines that need `// @ts-ignore`, recorded by scripts/echarts-type-ignores.mjs as "<n>|<line text>".
const ignoresFile = path.join(root, "scripts/echarts-ignores.json")
const { __loose: looseList = [], ...ignores } = fs.existsSync(ignoresFile) ? JSON.parse(fs.readFileSync(ignoresFile, "utf8")) : {}
// Examples whose errors sit inside template literals, where a comment cannot go: their untyped
// callback parameters are typed `any` instead.
const loose = new Set(looseList)

function applyIgnores(text, slug) {
  const wanted = new Set(ignores[slug] ?? [])
  if (!wanted.size) return text
  const seen = new Map()
  return text
    .split("\n")
    .flatMap((line) => {
      const trimmed = line.trim()
      const n = (seen.get(trimmed) ?? 0) + 1
      seen.set(trimmed, n)
      return wanted.has(`${n}|${trimmed}`) ? [`${line.match(/^\s*/)[0]}// @ts-ignore`, line] : [line]
    })
    .join("\n")
}

const pascal = (slug) =>
  slug
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("")

function frontMatter(source) {
  const match = source.match(/^\/\*([\s\S]*?)\*\//)
  if (!match) return null
  const data = {}
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^\s*([A-Za-z]+)\s*:\s*(.*?)\s*$/)
    if (kv) data[kv[1]] = kv[2].replace(/^['"]|['"]$/g, "")
  }
  return { data, end: match[0].length }
}

/** Depth-first walk giving each node its parent and the key it hangs off. */
function walk(node, visit, parent = null, key = null, fnDepth = 0) {
  if (!node || typeof node.type !== "string") return
  visit(node, parent, key, fnDepth)
  const inner = /Function|Method/.test(node.type) ? fnDepth + 1 : fnDepth
  for (const k of Object.keys(node)) {
    if (k === "loc" || k === "extra" || k === "leadingComments" || k === "trailingComments" || k === "innerComments") continue
    const value = node[k]
    if (Array.isArray(value)) value.forEach((child) => walk(child, visit, node, k, inner))
    else if (value && typeof value.type === "string") walk(value, visit, node, k, inner)
  }
}

const WATCHED = new Set([
  "myChart",
  "app",
  "echarts",
  "$",
  "ecStat",
  "ecSimpleTransform",
  "d3",
  "SimplexNoise",
  "gui",
  "ROOT_PATH",
  "CDN_PATH",
  "setTimeout",
  "setInterval",
  "option",
])

function isReference(node, parent, key) {
  if (/MemberExpression/.test(parent.type) && key === "property" && !parent.computed) return false
  if (/^(ObjectProperty|ObjectMethod|ClassProperty|TSPropertySignature|ClassMethod)$/.test(parent.type) && key === "key" && !parent.computed) return false
  if (parent.type === "VariableDeclarator" && key === "id") return false
  if (/^(FunctionDeclaration|FunctionExpression|ClassDeclaration|TSInterfaceDeclaration|TSTypeAliasDeclaration)$/.test(parent.type) && key === "id") return false
  if (parent.type === "TSQualifiedName" && key === "right") return false
  if (key === "params") return false
  return true
}

/**
 * First pass: edits that have to happen in the source itself.
 *  - `<T>(x) => x` reads as JSX in a .tsx file; `<T,>(x) => x` is the same generic.
 *  - JavaScript examples get `: any` on untyped parameters, so they satisfy `noImplicitAny`.
 *  - The examples run as sloppy-mode scripts, where assigning to an undeclared name creates a global.
 *    Modules are strict, so those names are returned to be declared.
 */
function rewriteSource(source, ast, isTs, loosen = false) {
  const inserts = []
  const loopHeads = new Set() // `for (var k in o)` cannot carry a type annotation
  walk(ast.program, (node) => {
    // An image that is read back through a canvas must be requested with CORS; the data files
    // are served from another origin (jsDelivr sends `Access-Control-Allow-Origin: *`).
    if (
      node.type === "ExpressionStatement" &&
      node.expression.type === "AssignmentExpression" &&
      node.expression.left.type === "MemberExpression" &&
      !node.expression.left.computed &&
      node.expression.left.property.name === "src" &&
      node.expression.left.object.type === "Identifier" &&
      /ROOT_PATH/.test(source.slice(node.expression.right.start, node.expression.right.end))
    ) {
      const lineStart = source.lastIndexOf("\n", node.start) + 1
      const indent = source.slice(lineStart, node.start).match(/^\s*/)[0]
      inserts.push([node.start, `${node.expression.left.object.name}.crossOrigin = 'anonymous';\n${indent}`])
    }
    if (node.type === "ForInStatement" || node.type === "ForOfStatement") {
      if (node.left.type === "VariableDeclaration") node.left.declarations.forEach((d) => loopHeads.add(d))
    }
    if (!isTs && node.type === "VariableDeclarator" && node.id.type === "Identifier" && !loopHeads.has(node)) {
      const { init } = node
      if (!init || init.type === "ObjectExpression" || init.type === "NullLiteral") inserts.push([node.id.end, ": any"])
      else if (init.type === "ArrayExpression") inserts.push([node.id.end, init.elements.length ? ": any" : ": any[]"])
    }
    if (node.type === "ArrowFunctionExpression" && node.typeParameters?.params.length === 1 && source[node.typeParameters.end - 2] !== ",") {
      inserts.push([node.typeParameters.end - 1, ","])
    }
    if ((isTs && !loosen) || !/^(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ObjectMethod|ClassMethod)$/.test(node.type)) return
    const parenless = node.type === "ArrowFunctionExpression" && node.params.length === 1 && !source.slice(node.start, node.params[0].start).includes("(")
    for (const param of node.params) {
      if (param.typeAnnotation) continue
      if (param.type === "Identifier") {
        if (parenless) inserts.push([param.start, "("], [param.end, ": any)"])
        else inserts.push([param.end, ": any"])
      } else if (param.type === "ObjectPattern" || param.type === "ArrayPattern") inserts.push([param.end, ": any"])
      else if (param.type === "AssignmentPattern" && param.left.type === "Identifier" && !param.left.typeAnnotation) inserts.push([param.left.end, ": any"])
      else if (param.type === "RestElement" && param.argument.type === "Identifier") inserts.push([param.argument.end, ": any[]"])
    }
  })

  const implicitGlobals = new Set()
  if (!isTs) {
    traverse(ast, {
      AssignmentExpression(path) {
        const { left } = path.node
        if (left.type === "Identifier" && !WATCHED.has(left.name) && !path.scope.hasBinding(left.name)) implicitGlobals.add(left.name)
      },
    })
  }

  let patched = source
  for (const [at, text] of inserts.sort((a, b) => b[0] - a[0])) patched = patched.slice(0, at) + text + patched.slice(at)
  return { source: patched, implicitGlobals: [...implicitGlobals] }
}

function convert(file, dir) {
  let source = fs.readFileSync(path.join(dir, file), "utf8")
  const slug = file.replace(/\.(ts|js)$/, "")
  const isTs = file.endsWith(".ts")
  const gl = dir !== examplesDir
  let meta = frontMatter(source)
  if (!meta?.data.title) return { slug, skip: "no title (not listed in the official gallery)" }
  for (const [pattern, reason] of unsupported) if (pattern.test(source)) return { slug, skip: reason }
  const missing = missingData(source)
  if (missing) return { slug, skip: `loads ${missing}, which is not in the examples repository` }

  const parseOptions = {
    sourceType: "module",
    plugins: isTs ? ["typescript"] : [],
    allowReturnOutsideFunction: true,
    allowAwaitOutsideFunction: true,
  }
  const rewritten = rewriteSource(source, parse(source, parseOptions), isTs, loose.has(slug))
  source = rewritten.source
  meta = frontMatter(source)
  // The rewritten source may now hold type annotations, even when it began as plain JavaScript.
  const ast = parse(source, { ...parseOptions, plugins: ["typescript"] })

  const removed = [[0, meta.end]]
  const hoistedImports = []
  const hoistedDeclares = []
  const localNames = new Set()

  for (const statement of ast.program.body) {
    const text = source.slice(statement.start, statement.end)
    if (statement.type === "ImportDeclaration") {
      hoistedImports.push(text)
      removed.push([statement.start, statement.end])
    } else if (statement.type === "ExportNamedDeclaration" && !statement.declaration && statement.specifiers.length === 0) {
      removed.push([statement.start, statement.end])
    } else if (statement.type === "TSDeclareFunction" || statement.declare) {
      hoistedDeclares.push(text)
      removed.push([statement.start, statement.end])
    } else {
      const declared = statement.type === "ExportNamedDeclaration" ? statement.declaration : statement
      if (declared?.type === "VariableDeclaration") {
        for (const d of declared.declarations) if (d.id.type === "Identifier") localNames.add(d.id.name)
      } else if (declared?.type === "FunctionDeclaration" && declared.id) localNames.add(declared.id.name)
    }
  }
  const importedNames = new Set()
  for (const statement of ast.program.body) {
    if (statement.type !== "ImportDeclaration") continue
    for (const s of statement.specifiers) importedNames.add(s.local.name)
  }

  const used = new Set()
  const templates = []
  let topLevelAwait = false
  walk(ast.program, (node, parent, key, fnDepth) => {
    if (node.type === "TemplateElement") templates.push([node.start, node.end])
    if (node.type === "AwaitExpression" && fnDepth === 0) topLevelAwait = true
    if (node.type === "Identifier" && WATCHED.has(node.name) && parent && isReference(node, parent, key)) used.add(node.name)
  })
  for (const name of [...used]) if ((localNames.has(name) || importedNames.has(name)) && name !== "option") used.delete(name)

  // Blank out what moves elsewhere (keeping offsets stable), then indent the rest,
  // leaving the inside of template literals untouched.
  let text = ""
  for (let i = 0; i < source.length; i++) {
    text += removed.some(([s, e]) => i >= s && i < e) && source[i] !== "\n" ? " " : source[i]
  }
  const insideTemplate = (offset) => templates.some(([s, e]) => offset > s && offset <= e)
  const lines = []
  let offset = 0
  for (const line of text.split("\n")) {
    const raw = insideTemplate(offset) // the line starts inside a template literal
    const endsInside = templates.some(([s, e]) => offset + line.length >= s && offset + line.length < e)
    const value = raw || endsInside ? line : line.trimEnd()
    lines.push({ value: raw || !value.trim() ? value : `  ${value}`, raw, blank: !raw && !value.trim() })
    offset += line.length + 1
  }
  const collapsed = []
  for (const line of lines) {
    if (line.blank && (collapsed.length === 0 || collapsed[collapsed.length - 1].blank)) continue
    collapsed.push(line)
  }
  while (collapsed.length && collapsed[collapsed.length - 1].blank) collapsed.pop()
  const body = collapsed.map((l) => (l.blank ? "" : l.value)).join("\n")

  // The official gallery preloads the `china` and `world` maps; ECharts 6 no longer bundles them.
  const builtinMaps = [...new Set([...source.matchAll(/\bmap:\s*['"](china|world)['"]/g)].map((m) => m[1]))].filter(
    (name) => !new RegExp(`registerMap\\(\\s*['"]${name}['"]`).test(source),
  )

  const declaresOption = localNames.has("option")
  const usesOption = used.has("option")
  const context = ["myChart", "app", "setTimeout", "setInterval"].filter((n) => used.has(n))
  const alreadyImportsOptionType = hoistedImports.some((i) => /\bEChartsOption\b/.test(i))

  const categoriesOf = [
    ...new Set(
      (meta.data.category ?? "")
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => categoryAliases[c] ?? c),
    ),
  ].filter((c) => categoryIds.includes(c))
  if (!categoriesOf.length) return { skip: `unknown category "${meta.data.category}"` }

  return {
    slug,
    isTs,
    gl,
    title: meta.data.title,
    darkTheme: meta.data.theme === "dark",
    difficulty: meta.data.difficulty === undefined ? 99 : Number(meta.data.difficulty),
    categories: categoriesOf,
    body,
    hoistedImports,
    hoistedDeclares,
    used,
    context,
    async: topLevelAwait || builtinMaps.length > 0,
    builtinMaps,
    implicitGlobals: rewritten.implicitGlobals,
    optionDeclaration: usesOption && !declaresOption ? (isTs ? "let option!: EChartsOption" : "let option: any") : null,
    returnsOption: usesOption,
    needsOptionType: isTs && usesOption && !declaresOption && !alreadyImportsOptionType,
  }
}

// --- Emit -----------------------------------------------------------------------------

function scriptParts(example, importPath) {
  const { used } = example
  const imports = []
  // The CLI rewrites imports and drops whatever precedes the first one, so nothing but this line goes first.
  const helpers = [used.has("$") ? "$" : null, example.builtinMaps.length ? "registerBuiltinMap" : null].filter(Boolean)
  imports.push(`import { ${[...helpers, "EChart", "type EChartSetup"].join(", ")} } from "${importPath}"`)
  if (used.has("echarts")) imports.push(`import * as echarts from "echarts"`)
  if (example.gl) imports.push(`import "echarts-gl"`)
  if (example.needsOptionType) imports.push(`import type { EChartsOption } from "echarts"`)
  if (used.has("ecStat")) imports.push(`import ecStatModule from "echarts-stat"`)
  if (used.has("ecSimpleTransform")) {
    if (example.isTs) imports.push("// @ts-ignore -- echarts-simple-transform ships no type declarations")
    imports.push(`import ecSimpleTransform from "echarts-simple-transform"`)
  }
  imports.push(...example.hoistedImports.map((i) => i.replace(/;$/, "")))

  const top = []
  // Globals that the examples' own `$.getScript` calls (or the official page) provide.
  for (const name of ["d3", "SimplexNoise", "gui"]) if (used.has(name)) top.push(`declare const ${name}: any`)
  // The package's typings cover only part of what the examples call.
  if (used.has("ecStat")) top.push("const ecStat: any = ecStatModule")
  top.push(...example.hoistedDeclares.map((d) => d.replace(/;$/, "")))
  if (used.has("ROOT_PATH")) top.push(`const ROOT_PATH = "${ROOT_PATH}"`)
  if (used.has("CDN_PATH")) top.push(`const CDN_PATH = "${CDN_PATH}"`)

  const args = example.context.length ? `{ ${example.context.join(", ")} }` : ""
  const inner = [
    example.optionDeclaration ? `  ${example.optionDeclaration}` : null,
    example.implicitGlobals.length ? `  let ${example.implicitGlobals.map((n) => `${n}: any`).join(", ")}` : null,
    ...example.builtinMaps.map((name) => `  await registerBuiltinMap("${name}")`),
    example.body,
    example.returnsOption ? "  return option" : null,
  ]
    .filter((part) => part !== null && part !== "")
    .join("\n")
  const setup = `const setup: EChartSetup = ${example.async ? "async " : ""}(${args}) => {\n${inner}\n}`

  return { imports, top, setup }
}

const attribution = (example) =>
  `// Adapted from the Apache ECharts example "${example.title}" (Apache-2.0):\n// https://echarts.apache.org/examples/en/editor.html?c=${example.slug}`

function reactFile(example, name) {
  const { imports, top, setup } = scriptParts(example, "@/components/ui/echart")
  const component = `Echarts${pascal(example.slug)}`
  // The attribution sits above `setup` rather than at the top: the shadcn CLI drops everything
  // before a file's first statement when it installs it.
  const text = [
    imports.join("\n"),
    top.length ? `\n${top.join("\n")}` : null,
    "",
    attribution(example),
    setup,
    "",
    `export function ${component}() {\n  return <EChart setup={setup}${example.darkTheme ? ' theme="dark"' : ""} />\n}\n`,
  ]
    .filter((part) => part !== null)
    .join("\n")
  return applyIgnores(text, example.slug)
}

function vueFile(example) {
  const { imports, top, setup } = scriptParts(example, "@/registry/default/ui/echart")
  const text = [
    `<script setup lang="ts">`,
    imports.join("\n"),
    top.length ? `\n${top.join("\n")}` : null,
    "",
    attribution(example),
    setup,
    `</script>\n`,
    `<template>\n  <EChart :setup="setup"${example.darkTheme ? ' theme="dark"' : ""} />\n</template>\n`,
  ]
    .filter((part) => part !== null)
    .join("\n")
  return applyIgnores(text, example.slug)
}

// --- Run ------------------------------------------------------------------------------

const glDir = path.join(examplesDir, "gl")
const sources = [examplesDir, glDir].filter((dir) => fs.existsSync(dir)).flatMap((dir) =>
  fs
    .readdirSync(dir)
    .filter((f) => /\.(ts|js)$/.test(f) && !f.endsWith(".d.ts"))
    .sort()
    .map((file) => [file, dir]),
)

const examples = []
const excluded = []
for (const [file, dir] of sources) {
  const result = convert(file, dir)
  if (result.skip) excluded.push({ slug: result.slug, reason: result.skip })
  else examples.push(result)
}
const seen = new Set()
for (const e of examples) {
  if (seen.has(e.slug)) throw new Error(`Duplicate example slug: ${e.slug}`)
  seen.add(e.slug)
}

examples.sort(
  (a, b) =>
    categoryIds.indexOf(a.categories[0]) - categoryIds.indexOf(b.categories[0]) ||
    a.difficulty - b.difficulty ||
    a.title.localeCompare(b.title),
)

const reactDir = path.join(root, "src/echarts")
fs.rmSync(reactDir, { recursive: true, force: true })
fs.mkdirSync(reactDir, { recursive: true })
for (const example of examples) {
  fs.writeFileSync(path.join(reactDir, `echarts-${example.slug}.tsx`), reactFile(example))
}

const usedCategories = [...categories, ...glCategories].filter(([id]) => examples.some((e) => e.categories.includes(id)))
const entries = examples.map((e) => ({
  name: `echarts-${e.slug}`,
  file: `Echarts${pascal(e.slug)}`,
  title: e.title,
  categories: e.categories,
  difficulty: e.difficulty,
  gl: e.gl,
}))

const metaSource = () => `// Generated by designkit/scripts/build-echarts-examples.mjs -- do not edit.
// Examples adapted from https://github.com/apache/echarts-examples (Apache-2.0) at ${commit}.

/** The "gl" group needs WebGL and the echarts-gl package. */
export const echartsCategories = ${JSON.stringify(usedCategories.map(([id, label]) => ({ id, label, group: glCategoryIds.has(id) ? "gl" : "core" })), null, 2)} as const

export type EChartsCategory = (typeof echartsCategories)[number]["id"]

export interface EChartsExample {
  /** Registry item name and, for React, the file name. */
  name: string
  /** Component / Vue file name. */
  file: string
  title: string
  categories: EChartsCategory[]
  difficulty: number
  /** Needs WebGL and the echarts-gl package. */
  gl: boolean
}

export const echartsExamples: EChartsExample[] = ${JSON.stringify(entries, null, 2)}

/** Examples of the official gallery that are not included, and why. */
export const echartsExcluded: { slug: string; reason: string }[] = ${JSON.stringify(excluded, null, 2)}

export const echartsSource = { repository: "apache/echarts-examples", commit: "${commit}" }
`

fs.writeFileSync(path.join(reactDir, "meta.ts"), metaSource())

if (fs.existsSync(vueRoot)) {
  const vueDir = path.join(vueRoot, "app/registry/default/echarts")
  fs.rmSync(vueDir, { recursive: true, force: true })
  fs.mkdirSync(vueDir, { recursive: true })
  for (const example of examples) {
    fs.writeFileSync(path.join(vueDir, `Echarts${pascal(example.slug)}.vue`), vueFile(example))
  }
  fs.writeFileSync(path.join(vueRoot, "app/config/echarts.ts"), metaSource())
}

console.log(`echarts examples: ${examples.length} written (${examples.filter((e) => e.gl).length} GL), ${excluded.length} excluded (commit ${commit.slice(0, 7)})`)
for (const [id, label] of usedCategories) {
  console.log(`  ${label.padEnd(13)} ${examples.filter((e) => e.categories.includes(id)).length}`)
}
const reasons = {}
for (const e of excluded) reasons[e.reason] = (reasons[e.reason] ?? 0) + 1
console.log("excluded:", reasons)
