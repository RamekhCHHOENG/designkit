import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The docs site's public/ (favicon, etc.) has no place in the published
  // library output.
  publicDir: false,
  build: {
    emptyOutDir: true,
    lib: {
      entry: "src/lib/index.ts",
      name: "DesignKit",
      formats: ["es", "cjs"],
      fileName: (format) => format === "es" ? "index.js" : "index.cjs",
      cssFileName: "styles",
    },
    rollupOptions: {
      // Bundled CJS deps (e.g. Base UI's use of use-sync-external-store) call
      // require("react") internally; rolldown can't rewrite that to the
      // externalized `react` import, so it falls back to a runtime require()
      // that throws outside CJS hosts. Externalizing the whole package avoids
      // pulling that CJS shim into the bundle at all.
      external: (id) =>
        id === "react" ||
        id === "react-dom" ||
        id.startsWith("react/") ||
        id.startsWith("react-dom/") ||
        id === "use-sync-external-store" ||
        id.startsWith("use-sync-external-store/"),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "use-sync-external-store/with-selector": "useSyncExternalStoreWithSelector",
        },
      },
    },
  },
});
