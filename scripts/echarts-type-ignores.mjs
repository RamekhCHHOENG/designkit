#!/usr/bin/env node
// Records where the generated ECharts examples need `// @ts-ignore`, so that they type-check in a
// `strict` project (the ECharts typings don't describe every option the examples use).
//
//   node scripts/echarts-type-ignores.mjs <path to an apache/echarts-examples checkout>
//
// It type-checks src/echarts, stores each failing line in scripts/echarts-ignores.json, and
// regenerates; build-echarts-examples.mjs then puts a `// @ts-ignore` above those lines in both the
// React and the Vue files. Entries are keyed by the line's text (and which occurrence of it), so the
// same list applies to either framework and survives regeneration.
//
// Why not a file-level `// @ts-nocheck`? The shadcn CLI drops everything before a file's first
// statement when it installs it, so a leading directive would never reach the user's project.

import { spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parse } from "@babel/parser"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const checkout = process.argv[2] ?? process.env.ECHARTS_EXAMPLES_DIR
if (!checkout) {
  console.error("Usage: node scripts/echarts-type-ignores.mjs <path to an apache/echarts-examples checkout>")
  process.exit(1)
}
const ignoresFile = path.join(root, "scripts/echarts-ignores.json")
const { __loose: looseList = [], ...ignores } = fs.existsSync(ignoresFile) ? JSON.parse(fs.readFileSync(ignoresFile, "utf8")) : {}
const loose = new Set(looseList)

const run = (command, args) => spawnSync(command, args, { cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 })
const regenerate = () => {
  const result = run("node", ["scripts/build-echarts-examples.mjs", checkout])
  if (result.status !== 0) throw new Error(result.stderr || result.stdout)
}

/** The key that identifies a line independent of its position: `<n>|<trimmed text>` for the nth such line. */
function keysFor(lines, indexes) {
  const seen = new Map()
  const wanted = new Set(indexes)
  const keys = []
  lines.forEach((line, index) => {
    const text = line.trim()
    const n = (seen.get(text) ?? 0) + 1
    seen.set(text, n)
    if (wanted.has(index)) keys.push(`${n}|${text}`)
  })
  return keys
}

/** 0-based indexes of the lines that start inside the text of a template literal, where a comment would change the string. */
function linesInsideTemplates(text) {
  const ast = parse(text, { sourceType: "module", plugins: ["typescript", "jsx"] })
  const ranges = []
  const visit = (node) => {
    if (!node || typeof node.type !== "string") return
    if (node.type === "TemplateElement") ranges.push([node.start, node.end])
    for (const key of Object.keys(node)) {
      if (key === "loc" || key === "extra") continue
      const value = node[key]
      if (Array.isArray(value)) value.forEach(visit)
      else if (value && typeof value.type === "string") visit(value)
    }
  }
  visit(ast.program)
  const inside = new Set()
  let offset = 0
  text.split("\n").forEach((line, index) => {
    if (ranges.some(([start, end]) => offset > start && offset <= end)) inside.add(index)
    offset += line.length + 1
  })
  return inside
}

function typeErrors() {
  const result = run("npx", ["--no-install", "tsc", "-p", "tsconfig.json", "--noEmit", "--pretty", "false"])
  const found = new Map()
  for (const match of `${result.stdout}\n${result.stderr}`.matchAll(/^src\/echarts\/echarts-([^()]+)\.tsx\((\d+),\d+\): error TS\d+/gm)) {
    const [, slug, line] = match
    found.set(slug, [...(found.get(slug) ?? []), Number(line) - 1])
  }
  return found
}

for (let round = 1; round <= 4; round++) {
  const found = typeErrors()
  if (!found.size) {
    console.log(`echarts type check: clean (${Object.keys(ignores).length} examples carry ignores, ${Object.values(ignores).flat().length} lines)`)
    break
  }
  let added = 0
  for (const [slug, indexes] of found) {
    const text = fs.readFileSync(path.join(root, "src/echarts", `echarts-${slug}.tsx`), "utf8")
    const inside = linesInsideTemplates(text)
    const safe = [...new Set(indexes)].filter((index) => !inside.has(index))
    if (safe.length < new Set(indexes).size) loose.add(slug)
    const keys = keysFor(text.split("\n"), safe)
    ignores[slug] = [...new Set([...(ignores[slug] ?? []), ...keys])]
    if (!ignores[slug].length) delete ignores[slug]
    added += keys.length
  }
  const output = { __loose: [...loose].sort(), ...Object.fromEntries(Object.entries(ignores).sort(([a], [b]) => a.localeCompare(b))) }
  fs.writeFileSync(ignoresFile, JSON.stringify(output, null, 2) + "\n")
  console.log(`round ${round}: ${found.size} files, ${added} lines recorded, ${loose.size} loosened`)
  regenerate()
  if (round === 4) {
    console.error("Type errors remain after 4 rounds")
    process.exit(1)
  }
}
