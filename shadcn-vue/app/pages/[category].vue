<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";
import {
  LucideLoader,
  LucideCode,
  LucideX,
  ChevronLeftIcon,
  CheckIcon,
  CopyIcon,
  SparklesIcon,
  Maximize2,
  ExternalLink,
} from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/registry/default/ui/dialog";
import { categories } from "~/config/components";
import { catalog } from "~/config/catalog";

const route = useRoute();
const categorySlug = computed(() => (route.params.category as string) ?? "");

const category = computed(() => categories.find((c) => c.slug === categorySlug.value));

// Reverse mapping to find component slug in catalog
const componentEntry = computed(() => {
  if (!categorySlug.value) return null;
  return (
    catalog.find((c) => c.categorySlug === categorySlug.value) ||
    catalog.find((c) => c.slug === categorySlug.value) ||
    null
  );
});

const backLink = computed(() => {
  if (componentEntry.value) {
    return `/#${componentEntry.value.slug}`;
  }
  return `/#${categorySlug.value}`;
});

// Component module globs for live rendering
const sampleModules = import.meta.glob("~/registry/default/components/*.vue") as Record<
  string,
  () => Promise<any>
>;

// Load raw source for each component using import.meta.glob with ?raw
const rawSources = import.meta.glob("~/registry/default/components/*.vue", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

// Track which cards have source code open
const openSource = ref<Record<string, boolean>>({});
const sources = ref<Record<string, string>>({});
const copiedCards = ref<Record<string, boolean>>({});

async function toggleSource(name: string) {
  openSource.value[name] = !openSource.value[name];
  if (openSource.value[name] && !sources.value[name]) {
    const key = Object.keys(rawSources).find((k) => k.includes(`/${name}.vue`));
    if (key) {
      sources.value[name] = await rawSources[key]();
    }
  }
}

async function copySource(name: string) {
  const code = sources.value[name];
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    copiedCards.value[name] = true;
    setTimeout(() => {
      copiedCards.value[name] = false;
    }, 1500);
  } catch (err) {}
}

useSeoMeta({
  title: computed(() => category.value ? `${category.value.name} Samples — DesignKit Vue` : "Samples — DesignKit Vue"),
  description: computed(() => category.value ? `A collection of ${category.value.components.length} ${category.value.name.toLowerCase()} component samples and variations.` : ""),
});

// Cache async components to prevent re-creation
const loadedAsyncComps = new Map<string, any>();

function makeLoader(name: string) {
  if (loadedAsyncComps.has(name)) {
    return loadedAsyncComps.get(name);
  }
  const key = Object.keys(sampleModules).find(
    (k) => k.endsWith(`/${name}.vue`) || k.endsWith(`/${name}`)
  );
  if (!key) {
    return null;
  }
  const comp = defineAsyncComponent(() =>
    sampleModules[key]().then((m) => m.default ?? m),
  );
  loadedAsyncComps.set(name, comp);
  return comp;
}

// Active modal dialog component
const activeDialogComp = ref<string | null>(null);

function openFullDialog(name: string) {
  activeDialogComp.value = name;
}

function closeFullDialog() {
  activeDialogComp.value = null;
}
</script>

<template>
  <article v-if="category" class="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
    <!-- Top Back Navigation -->
    <div class="flex items-center justify-between">
      <a
        :href="'/#' + (componentEntry ? componentEntry.slug : categorySlug)"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ChevronLeftIcon class="size-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>Back to {{ componentEntry ? componentEntry.title : category.name }} Component</span>
      </a>
    </div>

    <!-- Page Header -->
    <header class="flex flex-col gap-1 border-b pb-6">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          <SparklesIcon class="size-3" />
          Sample Showcase
        </span>
      </div>
      <h1 class="text-3xl font-semibold tracking-tight">{{ category.name }} Samples</h1>
      <p class="text-sm text-muted-foreground">
        {{ category.components.length }} accessible, production-ready {{ category.name.toLowerCase() }} patterns and variations with interactive previews and code.
      </p>
    </header>

    <!-- Samples Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="comp in category.components"
        :key="comp.name"
        class="flex flex-col rounded-lg border bg-card overflow-hidden shadow-2xs"
      >
        <!-- Live Preview -->
        <div
          class="relative min-h-[260px] flex items-center justify-center bg-muted/20 p-6 overflow-visible"
        >
          <Suspense>
            <template #default>
              <component :is="makeLoader(comp.name)" />
            </template>
            <template #fallback>
              <div class="flex h-full min-h-[200px] items-center justify-center">
                <LucideLoader class="size-4 animate-spin text-muted-foreground" />
              </div>
            </template>
          </Suspense>
        </div>

        <!-- Card Bottom Bar -->
        <div class="flex items-center justify-between border-t px-3 py-2 bg-background gap-2">
          <span class="font-mono text-xs text-muted-foreground truncate">{{ comp.name }}</span>
          <div class="flex items-center gap-1 shrink-0">
            <button
              type="button"
              class="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Show full view in dialog modal"
              aria-label="Show full in dialog"
              @click="openFullDialog(comp.name)"
            >
              <Maximize2 class="size-3.5" />
            </button>

            <NuxtLink
              :to="'/preview/' + comp.name"
              target="_blank"
              class="flex size-7 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Open full screen in a new page"
              aria-label="Open full screen in new page"
            >
              <ExternalLink class="size-3.5" />
            </NuxtLink>

            <button
              type="button"
              class="flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              @click="toggleSource(comp.name)"
            >
              <LucideX v-if="openSource[comp.name]" class="size-3" />
              <LucideCode v-else class="size-3" />
              <span>{{ openSource[comp.name] ? "Hide" : "Code" }}</span>
            </button>
          </div>
        </div>

        <!-- Source Code Panel -->
        <div v-if="openSource[comp.name]" class="relative border-t bg-muted">
          <pre
            class="max-h-[24rem] overflow-auto p-4 text-xs leading-relaxed font-mono"
          ><code>{{ sources[comp.name] ?? "Loading source code…" }}</code></pre>
          <button
            v-if="sources[comp.name]"
            type="button"
            class="absolute top-2 right-2 rounded-md border bg-background p-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shadow-2xs"
            :aria-label="copiedCards[comp.name] ? 'Copied' : 'Copy code'"
            @click="copySource(comp.name)"
          >
            <CheckIcon v-if="copiedCards[comp.name]" class="size-3.5 text-green-500" />
            <CopyIcon v-else class="size-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Full View Modal Dialog -->
    <Dialog
      :open="activeDialogComp !== null"
      @update:open="(val) => { if (!val) closeFullDialog() }"
    >
      <DialogContent
        class="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl w-[94vw] max-h-[92vh] flex flex-col p-0 overflow-hidden gap-0 rounded-xl border bg-background shadow-2xl"
      >
        <!-- Dialog Header -->
        <DialogHeader class="border-b px-6 py-4 flex flex-row items-center justify-between gap-4 space-y-0 bg-muted/30">
          <div class="flex flex-col gap-0.5">
            <DialogTitle class="font-mono text-base font-semibold flex items-center gap-2">
              <span>{{ activeDialogComp }}</span>
              <span class="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-sans font-medium text-primary">
                Interactive Preview
              </span>
            </DialogTitle>
            <DialogDescription class="text-xs text-muted-foreground">
              Accessible, production-ready component preview in dialog modal
            </DialogDescription>
          </div>
          <div class="flex items-center gap-2 pr-6">
            <NuxtLink
              v-if="activeDialogComp"
              :to="'/preview/' + activeDialogComp"
              target="_blank"
              class="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors shadow-2xs"
              title="Open full screen in a new browser tab"
            >
              <ExternalLink class="size-3.5" />
              <span>Open in New Tab</span>
            </NuxtLink>
          </div>
        </DialogHeader>

        <!-- Dialog Body: Interactive Component Stage -->
        <div
          class="relative flex-1 min-h-[420px] max-h-[calc(92vh-130px)] overflow-auto p-6 md:p-10 flex items-center justify-center bg-muted/10"
        >
          <Suspense v-if="activeDialogComp">
            <template #default>
              <div class="w-full max-w-4xl flex items-center justify-center">
                <component :is="makeLoader(activeDialogComp)" />
              </div>
            </template>
            <template #fallback>
              <div class="flex h-48 items-center justify-center">
                <LucideLoader class="size-6 animate-spin text-muted-foreground" />
              </div>
            </template>
          </Suspense>
        </div>

        <!-- Dialog Footer -->
        <DialogFooter class="border-t px-6 py-3 bg-muted/20 flex sm:flex-row items-center justify-between sm:justify-between">
          <span class="font-mono text-xs text-muted-foreground">{{ activeDialogComp }}</span>
          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="activeDialogComp"
              :to="'/preview/' + activeDialogComp"
              target="_blank"
              class="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <ExternalLink class="size-3.5" />
              <span>Full screen in new page</span>
            </NuxtLink>
            <button
              type="button"
              class="rounded-md bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 transition-colors"
              @click="closeFullDialog"
            >
              Close
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </article>

  <!-- Not Found State -->
  <article v-else class="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-4 px-6 py-20 text-center">
    <h2 class="text-xl font-semibold">Category not found</h2>
    <p class="text-sm text-muted-foreground">The sample category "{{ categorySlug }}" could not be found.</p>
    <NuxtLink to="/" class="rounded-md border bg-primary px-4 py-2 text-sm text-primary-foreground">
      Back to Home
    </NuxtLink>
  </article>
</template>
