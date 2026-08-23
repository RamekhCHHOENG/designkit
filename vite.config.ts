import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// shadcn/ui vendoring lives here. vite.lib.config.ts (the published npm
// package build) is untouched.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "next/image": fileURLToPath(new URL("./src/shims/next-image.tsx", import.meta.url)),
      "next/link": fileURLToPath(new URL("./src/shims/next-link.tsx", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress MISSING_EXPORT warnings from vendored Origin UI registry
        // files — these arise from @tanstack/react-table v8→v9 and
        // react-resizable-panels v3→v4 API renames. The affected components
        // are lazy-loaded and isolated by an ErrorBoundary at runtime.
        if (
          warning.code === "MISSING_EXPORT" &&
          (warning.id?.includes("src/registry/") || warning.exporter?.includes("src/registry/"))
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
