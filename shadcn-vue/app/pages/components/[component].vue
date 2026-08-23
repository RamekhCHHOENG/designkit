<script setup lang="ts">
import { ref, computed } from "vue";
import { catalog } from "~/config/catalog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";
import { Button } from "@/registry/default/ui/button";
import { CheckIcon, CopyIcon } from "lucide-vue-next";

const route = useRoute();
const slug = computed(() => (route.params.component as string) ?? "");

const entry = computed(() => catalog.find((c) => c.slug === slug.value));

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
  } catch (err) {
    // fallback
  }
}

function getSourceCode(sourceKey: string): string {
  const matchPath = Object.keys(exampleSources).find((p) =>
    p.endsWith(`/${sourceKey}.vue`)
  );
  return matchPath ? exampleSources[matchPath] : `<!-- ${sourceKey}.vue -->`;
}

useSeoMeta({
  title: computed(() => (entry.value ? `${entry.value.title} — DesignKit Vue` : "Component not found")),
  description: computed(() => (entry.value ? `Accessible ${entry.value.title} component for Vue 3 and Nuxt.` : "")),
});
</script>

<template>
  <article v-if="entry" class="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10">
    <header class="flex flex-col gap-1">
      <span class="text-xs font-medium text-muted-foreground">{{ entry.group }}</span>
      <h1 class="text-3xl font-semibold tracking-tight">{{ entry.title }}</h1>
      <p class="text-sm text-muted-foreground">
        Vendored from shadcn-vue &mdash;
        <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono">
          app/registry/default/ui/{{ entry.slug }}
        </code>
      </p>
    </header>

    <div v-if="entry.examples.length > 0" class="flex flex-col gap-10">
      <section
        v-for="example in entry.examples"
        :key="example.slug"
        class="flex flex-col gap-2"
      >
        <h3 v-if="entry.examples.length > 1" class="text-sm font-medium text-muted-foreground">
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
      No example yet for {{ entry.title }}.
    </div>
  </article>

  <div v-else class="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10">
    <h1 class="text-2xl font-bold">Component Not Found</h1>
    <p class="text-sm text-muted-foreground">
      The requested component "{{ slug }}" does not exist in the catalog.
    </p>
    <NuxtLink to="/components" class="text-sm text-primary underline">
      Back to Components
    </NuxtLink>
  </div>
</template>
