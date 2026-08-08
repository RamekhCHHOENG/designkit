import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const requiredArtifacts = [
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  "dist/styles.css",
];

await Promise.all(requiredArtifacts.map((path) => access(new URL(path, root))));

const esmSource = await readFile(new URL("dist/index.js", root), "utf8");
if (!esmSource.startsWith('"use client";')) {
  throw new Error('dist/index.js must preserve the Next.js "use client" boundary.');
}

const expectedExports = [
  "Badge",
  "Button",
  "Card",
  "CardContent",
  "CardDescription",
  "CardFooter",
  "CardHeader",
  "CardTitle",
  "DataTable",
  "Drawer",
  "Input",
];

const esm = await import(new URL("dist/index.js", root));
const require = createRequire(import.meta.url);
const cjs = require(fileURLToPath(new URL("dist/index.cjs", root)));

for (const name of expectedExports) {
  if (!(name in esm)) throw new Error(`Missing ESM export: ${name}`);
  if (!(name in cjs)) throw new Error(`Missing CommonJS export: ${name}`);
}

console.log(`Package artifacts verified (${expectedExports.length} public runtime exports).`);
