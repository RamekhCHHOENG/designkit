import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  site: {
    url: "http://localhost:3312",
    name: "tipkit / shadcn-vue",
    description:
      "An open-source collection of copy-and-paste components for quickly building application UIs.",
    defaultLocale: "en",
  },

  devtools: { enabled: true },

  devServer: {
    port: 3312,
  },

  runtimeConfig: {
    public: {
      SITE_URL: import.meta.env.NUXT_SITE_URL ?? "http://localhost:3312",
    },
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxt/fonts",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "vue-sonner/nuxt",
  ],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-12-21",

  colorMode: {
    classSuffix: "",
    classPrefix: "",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },

  css: ["~/assets/css/tailwind.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: "Inter", provider: "google", global: true },
      { name: "Outfit", provider: "google", global: true },
    ],
  },

  imports: {
    dirs: ["~/lib"],
  },

  shadcn: {
    prefix: "",
    componentDir: "./app/registry/default/ui",
  },

  icon: {
    cssLayer: "icon",
    mode: "svg",
    clientBundle: {
      scan: true,
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/easings": { prerender: true },
    "/layouts": { prerender: true },
  },
});
