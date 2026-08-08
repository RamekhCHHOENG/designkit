import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/postcss";

const space = (path: string) => fileURLToPath(new URL(`./src/space/${path}`, import.meta.url));

// Tailwind runs only in this docs build (inline PostCSS); vite.lib.config.ts is untouched.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "next/image": space("shims/next-image.tsx"),
      "next/font/google": space("shims/next-font-google.ts"),
      "next/navigation": space("shims/next-navigation.ts"),
      "next/link": space("shims/next-link.tsx"),
      "@": fileURLToPath(new URL("./src/space", import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  // Pre-bundle every dependency the vendored gallery uses so Vite never
  // discovers one mid-session (discovery triggers a re-optimize + reload that
  // poisons in-flight lazy imports).
  optimizeDeps: {
    include: [
      "lucide-react",
      "motion/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "cmdk",
      "vaul",
      "sonner",
      "input-otp",
      "react-day-picker",
      "date-fns",
      "embla-carousel-react",
      "recharts",
      "canvas-confetti",
      "@number-flow/react",
      "@iconify/react",
      "react-hook-form",
      "react-resizable-panels",
      "simplebar-react",
      "react-dropzone",
      "@faker-js/faker",
      "radix-ui",
      "shiki",
      "@base-ui/react",
      "@base-ui/react/accordion",
      "@base-ui/react/alert-dialog",
      "@base-ui/react/avatar",
      "@base-ui/react/button",
      "@base-ui/react/checkbox",
      "@base-ui/react/collapsible",
      "@base-ui/react/context-menu",
      "@base-ui/react/dialog",
      "@base-ui/react/direction-provider",
      "@base-ui/react/input",
      "@base-ui/react/menu",
      "@base-ui/react/menubar",
      "@base-ui/react/merge-props",
      "@base-ui/react/navigation-menu",
      "@base-ui/react/popover",
      "@base-ui/react/preview-card",
      "@base-ui/react/progress",
      "@base-ui/react/radio",
      "@base-ui/react/radio-group",
      "@base-ui/react/scroll-area",
      "@base-ui/react/select",
      "@base-ui/react/separator",
      "@base-ui/react/slider",
      "@base-ui/react/switch",
      "@base-ui/react/tabs",
      "@base-ui/react/toggle",
      "@base-ui/react/toggle-group",
      "@base-ui/react/tooltip",
      "@base-ui/react/use-render",
    ],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        warn(warning);
      },
    },
  },
});
