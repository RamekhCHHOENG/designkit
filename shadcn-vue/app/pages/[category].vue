<script setup lang="ts">
import { LucideLoader, LucideCode, LucideX } from "lucide-vue-next";
import { categories } from "~/config/components";

const route = useRoute();
const categorySlug = route.params.category as string;

const category = categories.find((c) => c.slug === categorySlug);

if (!category) {
  throw createError({
    statusCode: 404,
    message: `Category '${categorySlug}' not found`,
  });
}

// Load raw source for each component using import.meta.glob with ?raw
const rawSources = import.meta.glob("~/registry/default/components/*.vue", {
  query: "?raw",
  import: "default",
}) as Record<string, () => Promise<string>>;

// Track which cards have source code open
const openSource = ref<Record<string, boolean>>({});
const sources = ref<Record<string, string>>({});

async function toggleSource(name: string) {
  openSource.value[name] = !openSource.value[name];
  if (openSource.value[name] && !sources.value[name]) {
    const key = Object.keys(rawSources).find((k) => k.includes(`/${name}.vue`));
    if (key) {
      sources.value[name] = await rawSources[key]();
    }
  }
}

useSeoMeta({
  title: `${category.name} — tipkit / shadcn-vue`,
  description: `shadcn-vue ${category.name.toLowerCase()} components.`,
});

// Inline async component loader for each comp name
function makeLoader(name: string) {
  return defineAsyncComponent(() =>
    import(`~/registry/default/components/${name}.vue`).then((m) => m.default ?? m),
  );
}
</script>

<template>
  <article class="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
    <header class="flex flex-col gap-1">
      <h1 class="text-3xl font-semibold tracking-tight">{{ category.name }}</h1>
      <p class="text-sm text-muted-foreground">
        {{ category.components.length }} {{ category.name.toLowerCase() }} components
      </p>
    </header>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="comp in category.components"
        :key="comp.name"
        class="flex flex-col rounded-lg border bg-card"
      >
        <!-- Live Preview -->
        <div
          class="relative min-h-[200px] overflow-hidden rounded-t-lg"
          style="contain: layout"
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
        <div class="flex items-center justify-between border-t px-3 py-2">
          <span class="font-mono text-xs text-muted-foreground">{{ comp.name }}</span>
          <button
            class="flex items-center gap-1 rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            @click="toggleSource(comp.name)"
          >
            <LucideX v-if="openSource[comp.name]" class="size-3" />
            <LucideCode v-else class="size-3" />
            {{ openSource[comp.name] ? "Hide" : "Code" }}
          </button>
        </div>

        <!-- Source Code Panel -->
        <div v-if="openSource[comp.name]" class="border-t">
          <pre
            class="max-h-[32rem] overflow-auto rounded-b-lg bg-muted p-4 text-xs leading-relaxed"
          ><code>{{ sources[comp.name] ?? "Loading…" }}</code></pre>
        </div>
      </div>
    </div>
  </article>
</template>
