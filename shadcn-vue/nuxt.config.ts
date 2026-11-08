import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || "/",
    head: {
      title: "DesignKit — Vue 3 & Nuxt Components",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },

  site: {
    url: "http://localhost:3312",
    name: "DesignKit — Vue 3 & Nuxt Component Library",
    description:
      "An Apple-inspired collection of accessible, production-ready components for Vue 3 and Nuxt.",
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

  nitro: {
    preset: "static",
    prerender: {
      failOnError: false,
      ignore: ["/login", "/forgot-password", "/register"],
    },
  },
});
