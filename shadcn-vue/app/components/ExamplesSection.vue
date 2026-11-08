<script setup lang="ts">
import { ref, computed, defineAsyncComponent, shallowRef } from "vue";
import { categories, type ComponentCategory } from "~/config/components";
import { Button } from "@/registry/default/ui/button";
import { CheckIcon, CopyIcon, SearchIcon, Maximize2, ExternalLink, LucideCode, LucideX } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/registry/default/ui/dialog";

// Glob maps for Origin UI examples in Vue
const compModules = import.meta.glob("../registry/default/components/*.vue");
const compSources = import.meta.glob("../registry/default/components/*.vue", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

const activeCategorySlug = ref<string | null>(null);
const searchQuery = ref("");

const activeCategory = computed(() =>
  activeCategorySlug.value
    ? categories.find((c) => c.slug === activeCategorySlug.value) || null
    : null
);

const filteredCategories = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return categories;
  return categories.filter((c) => c.name.toLowerCase().includes(q));
});

const totalExamplesCount = computed(() =>
  categories.reduce((s, c) => s + c.components.length, 0)
);

// Code viewer and copy state per card
const openCodeCards = ref<Record<string, boolean>>({});
const sourcesCache = ref<Record<string, string>>({});
const copiedCards = ref<Record<string, boolean>>({});

async function toggleCode(compName: string) {
  openCodeCards.value[compName] = !openCodeCards.value[compName];
  if (openCodeCards.value[compName] && !sourcesCache.value[compName]) {
    const path = `../registry/default/components/${compName}.vue`;
    const loader = compSources[path];
    if (loader) {
      try {
        sourcesCache.value[compName] = await loader();
      } catch (err) {
        sourcesCache.value[compName] = `<!-- Source unavailable for ${compName} -->`;
      }
    }
  }
}

async function copyCode(compName: string) {
  const code = sourcesCache.value[compName];
  if (!code) return;
  try {
    await navigator.clipboard.writeText(code);
    copiedCards.value[compName] = true;
    setTimeout(() => {
      copiedCards.value[compName] = false;
    }, 1500);
  } catch (err) {}
}

const loadedComponents = new Map<string, any>();

// Dialog modal state for full view
const activeDialogComp = ref<string | null>(null);

function openFullDialog(name: string) {
  activeDialogComp.value = name;
}

function closeFullDialog() {
  activeDialogComp.value = null;
}

function getAsyncComponent(compName: string) {
  if (loadedComponents.has(compName)) {
    return loadedComponents.get(compName);
  }
  const path = `../registry/default/components/${compName}.vue`;
  const loader = compModules[path];
  if (!loader) return null;
  const comp = defineAsyncComponent({
    loader: loader as any,
    loadingComponent: {
      template: '<div class="flex h-32 items-center justify-center text-xs text-muted-foreground">Loading preview...</div>',
    },
    errorComponent: {
      template: '<div class="flex h-32 items-center justify-center rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">Preview unavailable</div>',
    },
  });
  loadedComponents.set(compName, comp);
  return comp;
}
</script>

<template>
  <div class="mx-auto flex w-full flex-1">
    <!-- Examples Sidebar -->
    <aside class="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-4 py-6 md:block">
      <!-- Search -->
      <label class="mb-4 flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm text-muted-foreground">
        <SearchIcon class="size-4 shrink-0" />
        <input
          v-model="searchQuery"
          placeholder="Filter categories..."
          class="w-full bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
        />
      </label>

      <!-- All Examples Button -->
      <button
        type="button"
        class="mb-3 block w-full rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors hover:bg-muted"
        :class="activeCategorySlug === null ? 'bg-muted text-foreground font-semibold' : 'text-muted-foreground'"
        @click="activeCategorySlug = null"
      >
        All Examples
      </button>

      <!-- Categories List -->
      <nav class="flex flex-col gap-1">
        <button
          v-for="cat in filteredCategories"
          :key="cat.slug"
          type="button"
          class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted"
          :class="activeCategorySlug === cat.slug ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'"
          @click="activeCategorySlug = cat.slug"
        >
          <span>{{ cat.name }}</span>
          <span class="text-xs text-muted-foreground">{{ cat.components.length }}</span>
        </button>
        <div v-if="filteredCategories.length === 0" class="px-2 text-sm text-muted-foreground">
          No categories found.
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="min-w-0 flex-1">
      <!-- 1. Category View -->
      <article v-if="activeCategory" class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10">
        <header class="flex flex-col gap-1">
          <h1 class="text-3xl font-semibold tracking-tight">{{ activeCategory.name }}</h1>
          <p class="text-sm text-muted-foreground">
            {{ activeCategory.components.length }} example{{ activeCategory.components.length !== 1 ? 's' : '' }}
          </p>
        </header>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="comp in activeCategory.components"
            :key="comp.name"
            class="flex flex-col rounded-lg border overflow-hidden bg-card"
          >
            <!-- Preview Box -->
            <div
              class="relative min-h-[12rem] flex items-center justify-center bg-muted/30 p-4 overflow-auto"
              style="contain: layout"
            >
              <component :is="getAsyncComponent(comp.name)" v-if="getAsyncComponent(comp.name)" />
              <div v-else class="flex h-32 items-center justify-center text-xs text-muted-foreground">
                Not found
              </div>
            </div>

            <!-- Footer Toolbar -->
            <div class="flex items-center justify-between border-t px-3 py-2 bg-background gap-2">
              <span class="text-xs text-muted-foreground font-mono truncate">{{ comp.name }}</span>
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

                <Button
                  variant="ghost"
                  size="sm"
                  class="text-xs h-6 px-2 gap-1"
                  :aria-label="openCodeCards[comp.name] ? 'Hide code' : 'Show code'"
                  @click="toggleCode(comp.name)"
                >
                  <LucideX v-if="openCodeCards[comp.name]" class="size-3" />
                  <LucideCode v-else class="size-3" />
                  <span>{{ openCodeCards[comp.name] ? 'Hide' : 'Code' }}</span>
                </Button>
              </div>
            </div>

            <!-- Code Panel -->
            <div v-if="openCodeCards[comp.name]" class="relative border-t">
              <pre class="max-h-80 overflow-auto bg-muted p-4 text-xs leading-relaxed font-mono"><code>{{ sourcesCache[comp.name] || 'Loading code...' }}</code></pre>
              <Button
                v-if="sourcesCache[comp.name]"
                variant="outline"
                size="icon"
                class="absolute top-2 right-2 size-7"
                :aria-label="copiedCards[comp.name] ? 'Copied' : 'Copy code'"
                @click="copyCode(comp.name)"
              >
                <CheckIcon v-if="copiedCards[comp.name]" class="size-3.5 text-green-500" />
                <CopyIcon v-else class="size-3.5" />
              </Button>
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
                    Preview Modal
                  </span>
                </DialogTitle>
                <DialogDescription class="text-xs text-muted-foreground">
                  Interactive preview of {{ activeDialogComp }} in expanded modal mode
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

            <!-- Dialog Body: Live Preview -->
            <div
              class="relative flex-1 min-h-[420px] max-h-[calc(92vh-130px)] overflow-auto p-6 md:p-10 flex items-center justify-center bg-muted/10"
              style="contain: layout"
            >
              <div v-if="activeDialogComp" class="w-full max-w-4xl flex items-center justify-center">
                <component :is="getAsyncComponent(activeDialogComp)" />
              </div>
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

      <!-- 2. Overview of All Categories -->
      <article v-else class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
        <header class="flex flex-col gap-2">
          <h1 class="text-3xl font-semibold tracking-tight">Origin UI Examples</h1>
          <p class="text-sm text-muted-foreground">
            {{ totalExamplesCount }} real-world component examples across {{ categories.length }} categories, vendored from Origin UI.
          </p>
        </header>

        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <button
            v-for="cat in categories"
            :key="cat.slug"
            type="button"
            class="rounded-lg border p-3 text-left text-sm hover:bg-muted flex items-center justify-between transition-colors"
            @click="activeCategorySlug = cat.slug"
          >
            <span class="font-medium">{{ cat.name }}</span>
            <span class="text-xs text-muted-foreground">{{ cat.components.length }}</span>
          </button>
        </div>
      </article>
    </main>
  </div>
</template>
