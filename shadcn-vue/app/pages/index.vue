<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { catalog, catalogGroups } from "~/config/catalog";
import { categories } from "~/config/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";
import { Button } from "@/registry/default/ui/button";
import {
  CheckIcon,
  CopyIcon,
  SparklesIcon,
  ArrowUpRightIcon,
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
import { getSamplePage } from "~/config/samples";
import InstallationPage from "./installation.vue";
import DesignKitLogo from "~/components/DesignKitLogo.vue";

const route = useRoute();
const clientHash = ref("");
const isMounted = ref(false);

function readHash() {
  if (typeof window !== "undefined") {
    clientHash.value = window.location.hash.replace(/^#/, "");
  }
}

onMounted(() => {
  isMounted.value = true;
  readHash();
  window.addEventListener("hashchange", readHash);
  window.addEventListener("popstate", readHash);
});

onUnmounted(() => {
  window.removeEventListener("hashchange", readHash);
  window.removeEventListener("popstate", readHash);
});

watch(
  () => route.hash,
  (newHash) => {
    clientHash.value = newHash ? newHash.replace(/^#/, "") : "";
  },
  { immediate: true }
);

const hashSlug = computed(() => {
  if (!isMounted.value) return "";
  const fromRoute = route.hash ? route.hash.replace(/^#/, "") : "";
  return fromRoute || clientHash.value;
});

const isInstallation = computed(() => hashSlug.value === "installation");
const currentEntry = computed(() =>
  hashSlug.value ? catalog.find((c) => c.slug === hashSlug.value) : null
);

const sampleInfo = computed(() => {
  if (!currentEntry.value) return null;
  return getSamplePage(currentEntry.value.slug, currentEntry.value.categorySlug);
});

watch(hashSlug, () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
});

const exampleSources = import.meta.glob("~/components/examples/*.vue", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const copiedState = ref<Record<string, boolean>>({});

// Full view dialog modal state
const activeDialogExample = ref<any | null>(null);

function openFullDialog(example: any) {
  activeDialogExample.value = example;
}

function closeFullDialog() {
  activeDialogExample.value = null;
}

async function copyCode(key: string, code: string) {
  try {
    await navigator.clipboard.writeText(code);
    copiedState.value[key] = true;
    setTimeout(() => {
      copiedState.value[key] = false;
    }, 1500);
  } catch (err) {}
}

function getSourceCode(sourceKey: string): string {
  const matchPath = Object.keys(exampleSources).find((p) =>
    p.endsWith(`/${sourceKey}.vue`)
  );
  return matchPath ? exampleSources[matchPath] : `<!-- ${sourceKey}.vue -->`;
}

useSeoMeta({
  title: computed(() =>
    currentEntry.value
      ? `${currentEntry.value.title} — DesignKit Vue`
      : isInstallation.value
      ? "Installation — DesignKit Vue"
      : "DesignKit — Component Showcase"
  ),
  description: "A showcase of shadcn-vue components identical to shadcn/ui.",
});
</script>

<template>
  <div>
    <!-- 1. If Hash is #installation -->
    <InstallationPage v-if="isInstallation" />

    <!-- 2. If Hash matches a Component -->
    <article v-else-if="currentEntry" class="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
      <header class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-muted-foreground">{{ currentEntry.group }}</span>
          <span
            v-if="currentEntry.isNew"
            class="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20"
          >
            New
          </span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-3xl font-semibold tracking-tight">{{ currentEntry.title }}</h1>
            <p class="text-sm text-muted-foreground">
              Vendored from shadcn-vue &mdash;
              <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">
                app/registry/default/ui/{{ currentEntry.slug }}
              </code>
            </p>
          </div>

          <NuxtLink
            v-if="sampleInfo"
            :to="sampleInfo.href"
            class="inline-flex items-center gap-2 rounded-lg border bg-card px-3.5 py-2 text-xs font-medium shadow-xs hover:bg-accent hover:text-accent-foreground transition-all shrink-0 self-start sm:self-center"
          >
            <SparklesIcon class="size-3.5 text-primary" />
            <span>{{ sampleInfo.label }}</span>
            <ArrowUpRightIcon class="size-3 text-muted-foreground" />
          </NuxtLink>
        </div>
      </header>

      <div v-if="currentEntry.examples.length > 0" class="flex flex-col gap-10">
        <section
          v-for="example in currentEntry.examples"
          :key="example.slug"
          class="flex flex-col gap-2"
        >
          <h3 v-if="currentEntry.examples.length > 1" class="text-sm font-medium text-muted-foreground">
            {{ example.title }}
          </h3>

          <Tabs default-value="preview">
            <div class="flex items-center justify-between gap-2 flex-wrap mb-2">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>

              <div class="flex items-center gap-1">
                <button
                  type="button"
                  class="flex size-7 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
                  title="Show full view in dialog modal"
                  aria-label="Show full in dialog"
                  @click="openFullDialog(example)"
                >
                  <Maximize2 class="size-3.5" />
                </button>

                <NuxtLink
                  :to="'/preview/' + example.sourceKey"
                  target="_blank"
                  class="flex size-7 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
                  title="Open full screen in a new page"
                  aria-label="Open full screen in new page"
                >
                  <ExternalLink class="size-3.5" />
                </NuxtLink>
              </div>
            </div>

            <TabsContent value="preview">
              <div class="relative min-h-[380px] w-full flex items-center justify-center rounded-xl border bg-muted/20 p-6 md:p-10 overflow-visible transition-colors">
                <component :is="example.component" />
              </div>
            </TabsContent>

            <TabsContent value="code">
              <div class="relative">
                <pre class="max-h-[32rem] overflow-auto rounded-lg border bg-muted p-4 text-xs leading-relaxed font-mono"><code>{{ getSourceCode(example.sourceKey) }}</code></pre>
                <Button
                  variant="outline"
                  size="icon"
                  class="absolute top-2 right-2 size-7"
                  :aria-label="copiedState[example.slug] ? 'Copied' : 'Copy code'"
                  @click="copyCode(example.slug, getSourceCode(example.sourceKey))"
                >
                  <CheckIcon v-if="copiedState[example.slug]" class="size-3.5 text-green-500" />
                  <CopyIcon v-else class="size-3.5" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>

      <div
        v-else
        class="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground"
      >
        No example yet for {{ currentEntry.title }}.
      </div>

      <!-- Full View Modal Dialog -->
      <Dialog
        :open="activeDialogExample !== null"
        @update:open="(val) => { if (!val) closeFullDialog() }"
      >
        <DialogContent
          class="sm:max-w-4xl md:max-w-5xl lg:max-w-6xl w-[94vw] max-h-[92vh] flex flex-col p-0 overflow-hidden gap-0 rounded-xl border bg-background shadow-2xl"
        >
          <DialogHeader class="border-b px-6 py-4 flex flex-row items-center justify-between gap-4 space-y-0 bg-muted/30">
            <div class="flex flex-col gap-0.5">
              <DialogTitle class="text-base font-semibold flex items-center gap-2">
                <span>{{ activeDialogExample?.title || currentEntry.title }}</span>
                <span class="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  Preview Modal
                </span>
              </DialogTitle>
              <DialogDescription class="text-xs text-muted-foreground">
                Interactive preview in expanded modal mode
              </DialogDescription>
            </div>
            <div class="flex items-center gap-2 pr-6">
              <NuxtLink
                v-if="activeDialogExample"
                :to="'/preview/' + activeDialogExample.sourceKey"
                target="_blank"
                class="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors shadow-2xs"
                title="Open full screen in a new browser tab"
              >
                <ExternalLink class="size-3.5" />
                <span>Open in New Tab</span>
              </NuxtLink>
            </div>
          </DialogHeader>

          <div
            class="relative flex-1 min-h-[420px] max-h-[calc(92vh-130px)] overflow-auto p-6 md:p-10 flex items-center justify-center bg-muted/10"
          >
            <div v-if="activeDialogExample" class="w-full max-w-4xl flex items-center justify-center">
              <component :is="activeDialogExample.component" />
            </div>
          </div>

          <DialogFooter class="border-t px-6 py-3 bg-muted/20 flex sm:flex-row items-center justify-between sm:justify-between">
            <span class="font-mono text-xs text-muted-foreground">{{ activeDialogExample?.sourceKey }}</span>
            <div class="flex items-center gap-2">
              <NuxtLink
                v-if="activeDialogExample"
                :to="'/preview/' + activeDialogExample.sourceKey"
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

    <!-- 3. Overview Page (no hash) -->
    <article v-else class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <header class="flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <DesignKitLogo :size="36" />
          <h1 class="text-3xl font-semibold tracking-tight">DesignKit</h1>
        </div>
        <p class="text-sm text-muted-foreground">
          {{ catalog.length }} components vendored from shadcn-vue (Reka UI, Nova preset). Pick one from the sidebar.
        </p>
      </header>

      <section v-for="group in catalogGroups" :key="group.name" class="flex flex-col gap-3">
        <h2 class="text-sm font-medium text-muted-foreground">{{ group.name }}</h2>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <NuxtLink
            v-for="entry in group.entries"
            :key="entry.slug"
            :to="`/#${entry.slug}`"
            class="flex items-center justify-between rounded-lg border p-3 text-sm hover:bg-muted"
          >
            <span>{{ entry.title }}</span>
            <span
              v-if="entry.isNew"
              class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20"
            >
              New
            </span>
          </NuxtLink>
        </div>
      </section>
    </article>
  </div>
</template>
