<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { catalog, catalogGroups } from "~/config/catalog";
import { categories } from "~/config/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";
import { Button } from "@/registry/default/ui/button";
import { CheckIcon, CopyIcon } from "lucide-vue-next";
import InstallationPage from "./installation.vue";

const hashSlug = ref("");

function readHash() {
  if (typeof window !== "undefined") {
    hashSlug.value = window.location.hash.replace(/^#/, "");
  }
}

onMounted(() => {
  readHash();
  window.addEventListener("hashchange", readHash);
});

onUnmounted(() => {
  window.removeEventListener("hashchange", readHash);
});

const isInstallation = computed(() => hashSlug.value === "installation");
const currentEntry = computed(() =>
  hashSlug.value ? catalog.find((c) => c.slug === hashSlug.value) : null
);

const exampleSources = import.meta.glob("~/components/examples/*.vue", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const copiedState = ref<Record<string, boolean>>({});

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
      <header class="flex flex-col gap-1">
        <span class="text-xs font-medium text-muted-foreground">{{ currentEntry.group }}</span>
        <h1 class="text-3xl font-semibold tracking-tight">{{ currentEntry.title }}</h1>
        <p class="text-sm text-muted-foreground">
          Vendored from shadcn-vue &mdash;
          <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">
            app/registry/default/ui/{{ currentEntry.slug }}
          </code>
        </p>
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
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <div class="relative max-h-[36rem] overflow-auto rounded-lg border" style="contain: layout">
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
    </article>

    <!-- 3. Overview Page (no hash) -->
    <article v-else class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
      <header class="flex flex-col gap-2">
        <h1 class="text-3xl font-semibold tracking-tight">DesignKit</h1>
        <p class="text-sm text-muted-foreground">
          {{ catalog.length }} components vendored from shadcn-vue (Reka UI, Nova preset). Pick one from the sidebar.
        </p>
      </header>

      <section v-for="group in catalogGroups" :key="group.name" class="flex flex-col gap-3">
        <h2 class="text-sm font-medium text-muted-foreground">{{ group.name }}</h2>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <a
            v-for="entry in group.entries"
            :key="entry.slug"
            :href="`#${entry.slug}`"
            class="rounded-lg border p-3 text-sm hover:bg-muted"
          >
            {{ entry.title }}
          </a>
        </div>
      </section>
    </article>
  </div>
</template>
