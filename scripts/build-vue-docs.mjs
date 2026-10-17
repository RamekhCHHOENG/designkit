#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vueDir = path.join(root, "shadcn-vue");
const docsDist = path.join(root, "docs-dist");
const docsDistVue = path.join(docsDist, "vue");

console.log("[build-vue-docs] Ensuring shadcn-vue dependencies are installed...");
const nodeModules = path.join(vueDir, "node_modules");
if (!fs.existsSync(nodeModules)) {
  console.log("[build-vue-docs] Installing shadcn-vue dependencies with npm ci --legacy-peer-deps...");
  execSync("npm ci --legacy-peer-deps", { cwd: vueDir, stdio: "inherit" });
}

console.log("[build-vue-docs] Generating static Nuxt build for /vue/...");
execSync("npm run generate", {
  cwd: vueDir,
  stdio: "inherit",
  env: {
    ...process.env,
    NUXT_APP_BASE_URL: "/vue/",
    NODE_OPTIONS: "--max-old-space-size=4096",
  },
});

console.log(`[build-vue-docs] Copying generated site to ${docsDistVue}...`);
fs.rmSync(docsDistVue, { recursive: true, force: true });
fs.mkdirSync(docsDistVue, { recursive: true });

const outputPublic = path.join(vueDir, ".output", "public");
if (fs.existsSync(outputPublic)) {
  fs.cpSync(outputPublic, docsDistVue, { recursive: true });
  console.log("[build-vue-docs] Successfully built and copied Vue docs to docs-dist/vue!");
} else {
  console.error("[build-vue-docs] Error: .output/public not found in shadcn-vue!");
  process.exit(1);
}
