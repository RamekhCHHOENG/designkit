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

  const outputPublic = path.join(vueDir, ".output", "public");
  if (fs.existsSync(outputPublic)) {
    fs.rmSync(docsDistVue, { recursive: true, force: true });
    fs.mkdirSync(docsDistVue, { recursive: true });
    fs.cpSync(outputPublic, docsDistVue, { recursive: true });
    console.log("[build-vue-docs] Successfully built and copied Vue docs to docs-dist/vue!");
    fs.mkdirSync(docsDist, { recursive: true });
    fs.writeFileSync(path.join(docsDist, "vue-build.log"), "SUCCESS\n" + logOutput);
  } else {
    throw new Error(`.output/public not found in ${vueDir}`);
  }
} catch (err) {
  console.error("[build-vue-docs] Error during Vue docs build:\n", err.message);
  fs.mkdirSync(docsDist, { recursive: true });
  fs.writeFileSync(path.join(docsDist, "vue-build.log"), "FAILED:\n" + err.message + "\n\nLOGS:\n" + logOutput);
}
