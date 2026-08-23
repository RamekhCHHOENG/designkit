<script setup lang="ts">
import { catalog, catalogGroups } from "~/config/catalog";

useSeoMeta({
  title: "Components — DesignKit Vue",
  description: "Browse all accessible UI primitives for Vue 3 and Nuxt.",
});
</script>

<template>
  <article class="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-semibold tracking-tight">DesignKit Vue</h1>
      <p class="text-sm text-muted-foreground">
        {{ catalog.length }} accessible components for Vue 3 and Nuxt. Select a component from the sidebar or grid below.
      </p>
    </header>

    <div class="flex flex-col gap-8">
      <section
        v-for="group in catalogGroups"
        :key="group.name"
        class="flex flex-col gap-3"
      >
        <h2 class="text-sm font-medium text-muted-foreground">{{ group.name }}</h2>
        <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <NuxtLink
            v-for="entry in group.entries"
            :key="entry.slug"
            :to="`/components/${entry.slug}`"
            class="rounded-lg border p-3 text-sm transition-colors hover:bg-muted"
          >
            {{ entry.title }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </article>
</template>
