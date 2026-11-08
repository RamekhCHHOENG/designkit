<script setup lang="ts">
import { ref, computed, defineAsyncComponent, onMounted } from "vue";
import {
  ChevronLeft,
  ExternalLink,
  Code2,
  Copy,
  Check,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  LucideLoader,
  Sparkles,
} from "lucide-vue-next";
import { catalog } from "~/config/catalog";
import { categories } from "~/config/components";
import DesignKitLogo from "~/components/DesignKitLogo.vue";

definePageMeta({
  layout: false,
});

const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();

const name = computed(() => (route.params.name as string) ?? "");

// Viewport width switcher: 'full' | 'tablet' | 'mobile'
const viewportMode = ref<"full" | "tablet" | "mobile">("full");
const showCodeDrawer = ref(false);
const rawCode = ref("");
const isCopied = ref(false);
const isLinkCopied = ref(false);

function toggleTheme() {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
}

// 1. Component module globs
const sampleModules = import.meta.glob("~/registry/default/components/*.vue") as Record<
  string,
  () => Promise<any>
>;
const exampleModules = import.meta.glob("~/components/examples/*.vue") as Record<
  string,
  () => Promise<any>
>;

// 2. Raw source code globs
const sampleRaws = import.meta.glob("~/registry/default/components/*.vue", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

const exampleRaws = import.meta.glob("~/components/examples/*.vue", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

// Component resolution
const resolvedAsyncComp = computed(() => {
  const n = name.value;
  if (!n) return null;

  // 1. Match sample component (e.g. comp-rich-text-editor-01)
  const sampleKey = Object.keys(sampleModules).find((k) =>
    k.endsWith(`/${n}.vue`) || k.endsWith(`/${n}`)
  );
  if (sampleKey) {
    return defineAsyncComponent(() =>
      sampleModules[sampleKey]().then((m) => m.default ?? m)
    );
  }

  // 2. Match catalog example (e.g. RichTextEditorExample or rich-text-editor)
  const exampleKey = Object.keys(exampleModules).find(
    (k) =>
      k.endsWith(`/${n}.vue`) ||
      k.endsWith(`/${n}Example.vue`) ||
      k.toLowerCase().endsWith(`/${n.toLowerCase()}example.vue`) ||
      k.toLowerCase().endsWith(`/${n.toLowerCase().replace(/-/g, "")}example.vue`)
  );
  if (exampleKey) {
    return defineAsyncComponent(() =>
      exampleModules[exampleKey]().then((m) => m.default ?? m)
    );
  }

  // 3. Fallback: match catalog slug
  const catItem = catalog.find((c) => c.slug === n);
  if (catItem && catItem.examples.length > 0) {
    return catItem.examples[0].component;
  }

  return null;
});

// Title & Category metadata
const componentMeta = computed(() => {
  const n = name.value;
  // Search in categories
  for (const cat of categories) {
    const found = cat.components.find((c) => c.name === n);
    if (found) {
      return {
        title: found.name,
        category: cat.name,
        categorySlug: cat.slug,
      };
    }
  }

  // Search in catalog
  const catItem = catalog.find(
    (c) =>
      c.slug === n ||
      c.examples.some((e) => e.sourceKey === n || e.slug === n)
  );
  if (catItem) {
    return {
      title: catItem.title,
      category: catItem.group,
      categorySlug: catItem.slug,
    };
  }

  return {
    title: n,
    category: "Component",
    categorySlug: "",
  };
});

async function loadCode() {
  const n = name.value;
  const sampleKey = Object.keys(sampleRaws).find((k) =>
    k.endsWith(`/${n}.vue`) || k.endsWith(`/${n}`)
  );
  if (sampleKey) {
    rawCode.value = await sampleRaws[sampleKey]();
    return;
  }

  const exampleKey = Object.keys(exampleRaws).find(
    (k) =>
      k.endsWith(`/${n}.vue`) ||
      k.endsWith(`/${n}Example.vue`) ||
      k.toLowerCase().endsWith(`/${n.toLowerCase()}example.vue`) ||
      k.toLowerCase().endsWith(`/${n.toLowerCase().replace(/-/g, "")}example.vue`)
  );
  if (exampleKey) {
    rawCode.value = await exampleRaws[exampleKey]();
    return;
  }

  rawCode.value = `// Source code unavailable for ${n}`;
}

async function toggleCode() {
  showCodeDrawer.value = !showCodeDrawer.value;
  if (showCodeDrawer.value && !rawCode.value) {
    await loadCode();
  }
}

async function copyCode() {
  if (!rawCode.value) await loadCode();
  try {
    await navigator.clipboard.writeText(rawCode.value);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 1500);
  } catch (err) {}
}

async function copyPageLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    isLinkCopied.value = true;
    setTimeout(() => {
      isLinkCopied.value = false;
    }, 1500);
  } catch (err) {}
}

function handleBack() {
  if (window.history.length > 1) {
    router.back();
  } else if (componentMeta.value.categorySlug) {
    router.push(`/${componentMeta.value.categorySlug}`);
  } else {
    router.push("/");
  }
}

useSeoMeta({
  title: computed(() => `${componentMeta.value.title} Preview — DesignKit Vue`),
  description: computed(() => `Standalone fullscreen preview for ${componentMeta.value.title}`),
});
</script>

<template>
  <div class="relative min-h-screen w-full bg-background text-foreground flex flex-col overflow-x-hidden">
    <!-- Top Floating Header Bar -->
    <header class="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md px-4 py-2.5">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <!-- Left: Back & Breadcrumb -->
        <div class="flex items-center gap-2.5">
          <NuxtLink
            to="/"
            class="flex items-center gap-1.5 rounded-md border bg-card p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs group"
            title="DesignKit Home"
            aria-label="DesignKit Home"
          >
            <DesignKitLogo :size="18" class="transition-transform group-hover:scale-105" />
          </NuxtLink>

          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-md border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
            @click="handleBack"
          >
            <ChevronLeft class="size-3.5" />
            <span>Back</span>
          </button>

          <div class="hidden sm:flex items-center gap-2 text-xs">
            <span class="text-muted-foreground">{{ componentMeta.category }}</span>
            <span class="text-muted-foreground/40">/</span>
            <span class="font-mono font-semibold">{{ componentMeta.title }}</span>
          </div>
        </div>

        <!-- Center: Viewport Switcher -->
        <div class="flex items-center rounded-lg border bg-muted/40 p-0.5 text-xs shadow-2xs">
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all"
            :class="
              viewportMode === 'full'
                ? 'bg-background text-foreground shadow-2xs font-medium'
                : 'text-muted-foreground hover:text-foreground'
            "
            title="Full responsive screen"
            @click="viewportMode = 'full'"
          >
            <Monitor class="size-3.5" />
            <span class="hidden md:inline">Full</span>
          </button>
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all"
            :class="
              viewportMode === 'tablet'
                ? 'bg-background text-foreground shadow-2xs font-medium'
                : 'text-muted-foreground hover:text-foreground'
            "
            title="Tablet preview (768px)"
            @click="viewportMode = 'tablet'"
          >
            <Tablet class="size-3.5" />
            <span class="hidden md:inline">Tablet</span>
          </button>
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all"
            :class="
              viewportMode === 'mobile'
                ? 'bg-background text-foreground shadow-2xs font-medium'
                : 'text-muted-foreground hover:text-foreground'
            "
            title="Mobile preview (375px)"
            @click="viewportMode = 'mobile'"
          >
            <Smartphone class="size-3.5" />
            <span class="hidden md:inline">Mobile</span>
          </button>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-1.5">
          <!-- Toggle Code Drawer -->
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
            :class="{ 'bg-muted text-foreground': showCodeDrawer }"
            @click="toggleCode"
          >
            <Code2 class="size-3.5" />
            <span class="hidden sm:inline">{{ showCodeDrawer ? "Hide Code" : "Code" }}</span>
          </button>

          <!-- Copy Link -->
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
            @click="copyPageLink"
          >
            <Check v-if="isLinkCopied" class="size-3.5 text-green-500" />
            <Copy v-else class="size-3.5" />
            <span class="hidden sm:inline">{{ isLinkCopied ? "Copied" : "Share" }}</span>
          </button>

          <!-- Theme Toggle -->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border bg-card size-7 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
            title="Toggle color theme"
            @click="toggleTheme"
          >
            <Sun class="size-3.5 dark:hidden" />
            <Moon class="size-3.5 hidden dark:block" />
            <span class="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Code Slide-down Panel (collapsible) -->
    <div
      v-if="showCodeDrawer"
      class="border-b bg-muted/60 transition-all duration-200"
    >
      <div class="mx-auto max-w-7xl px-4 py-3">
        <div class="flex items-center justify-between pb-2">
          <span class="font-mono text-xs text-muted-foreground">{{ name }}.vue</span>
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded border bg-background px-2 py-0.5 text-xs font-medium hover:bg-muted transition-colors"
            @click="copyCode"
          >
            <Check v-if="isCopied" class="size-3 text-green-500" />
            <Copy v-else class="size-3" />
            <span>{{ isCopied ? "Copied" : "Copy Code" }}</span>
          </button>
        </div>
        <pre
          class="max-h-72 overflow-auto rounded-lg border bg-background p-4 text-xs font-mono leading-relaxed"
        ><code>{{ rawCode || "Loading source code..." }}</code></pre>
      </div>
    </div>

    <!-- Main Live Fullscreen Canvas Stage -->
    <main class="flex-1 flex items-center justify-center p-4 sm:p-8 bg-muted/10 overflow-auto">
      <div
        class="transition-all duration-300 w-full flex items-center justify-center"
        :class="{
          'max-w-7xl min-h-[70vh]': viewportMode === 'full',
          'w-[768px] max-w-full min-h-[600px] rounded-xl border bg-card p-6 shadow-xl': viewportMode === 'tablet',
          'w-[375px] max-w-full min-h-[580px] rounded-2xl border-2 bg-card p-4 shadow-2xl': viewportMode === 'mobile',
        }"
      >
        <Suspense v-if="resolvedAsyncComp">
          <template #default>
            <div class="w-full flex items-center justify-center">
              <component :is="resolvedAsyncComp" />
            </div>
          </template>
          <template #fallback>
            <div class="flex h-64 items-center justify-center gap-2 text-muted-foreground">
              <LucideLoader class="size-5 animate-spin" />
              <span class="text-xs">Loading component preview...</span>
            </div>
          </template>
        </Suspense>

        <!-- Not Found -->
        <div v-else class="flex flex-col items-center justify-center gap-3 p-12 text-center">
          <h2 class="text-xl font-semibold">Component Not Found</h2>
          <p class="text-sm text-muted-foreground">
            Could not find component preview for <code class="font-mono font-semibold">{{ name }}</code>.
          </p>
          <button
            type="button"
            class="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            @click="router.push('/')"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
