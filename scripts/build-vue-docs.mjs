#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vueDir = path.join(root, "shadcn-vue");
const docsDist = path.join(root, "docs-dist");
const docsDistVue = path.join(docsDist, "vue");

let logOutput = "";
function run(cmd, cwd = vueDir) {
  console.log(`[build-vue-docs] Running: ${cmd}`);
  logOutput += `\n--- RUN: ${cmd} ---\n`;
  try {
    const out = execSync(cmd, {
      cwd,
      encoding: "utf8",
      stdio: "pipe",
      env: {
        ...process.env,
        VERCEL: "",
        NITRO_PRESET: "static",
        NUXT_APP_BASE_URL: "/vue/",
        NODE_OPTIONS: "--max-old-space-size=4096",
      },
    });
    logOutput += out;
    console.log(out.slice(-500));
    return out;
  } catch (err) {
    const errDetails = `Command failed: ${cmd}\nStatus: ${err.status}\nSignal: ${err.signal}\nStdout: ${err.stdout || ""}\nStderr: ${err.stderr || ""}\nMessage: ${err.message}`;
    logOutput += "\n" + errDetails;
    throw new Error(errDetails);
  }
}

try {
  const nodeModules = path.join(vueDir, "node_modules");
  if (!fs.existsSync(nodeModules)) {
    run("npm ci --legacy-peer-deps --no-audit --no-fund");
  }

  run("npm run generate");

  const candidateDirs = [
    path.join(vueDir, ".output", "public"),
    path.join(vueDir, ".vercel", "output", "static", "vue"),
    path.join(vueDir, ".vercel", "output", "static"),
    path.join(root, ".vercel", "output", "static", "vue"),
    path.join(root, ".vercel", "output", "static"),
  ];

  const foundDir = candidateDirs.find((dir) => fs.existsSync(path.join(dir, "index.html")));
  if (foundDir) {
    fs.rmSync(docsDistVue, { recursive: true, force: true });
    fs.mkdirSync(docsDistVue, { recursive: true });
    fs.cpSync(foundDir, docsDistVue, { recursive: true });
    console.log(`[build-vue-docs] Successfully built and copied Vue docs from ${foundDir} to ${docsDistVue}!`);
    fs.mkdirSync(docsDist, { recursive: true });
    fs.writeFileSync(path.join(docsDist, "vue-build.log"), `SUCCESS from ${foundDir}\n` + logOutput);
  } else {
    const debugInfo = candidateDirs.map((d) => `${d} exists: ${fs.existsSync(d)}`).join("\n");
    throw new Error(`Could not find generated index.html in any candidate directory:\n${debugInfo}`);
  }
} catch (err) {
  console.error("[build-vue-docs] Error during Vue docs build:\n", err.message);
  fs.mkdirSync(docsDist, { recursive: true });
  fs.writeFileSync(path.join(docsDist, "vue-build.log"), "FAILED:\n" + err.message + "\n\nLOGS:\n" + logOutput);
}
