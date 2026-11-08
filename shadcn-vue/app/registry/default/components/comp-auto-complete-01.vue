<script setup lang="ts">
import { ref } from "vue";
import { AutoComplete } from "@/registry/default/ui/auto-complete";

const selected = ref("React 19");

const frameworks = [
  { value: "react", label: "React 19", description: "The library for web and native user interfaces" },
  { value: "vue", label: "Vue 3", description: "The progressive JavaScript framework" },
  { value: "nuxt", label: "Nuxt 4", description: "The intuitive Vue framework for full-stack web" },
  { value: "next", label: "Next.js 15", description: "The React framework for the web" },
  { value: "svelte", label: "Svelte 5", description: "Cybernetically enhanced web apps" },
  { value: "tailwind", label: "Tailwind CSS v4", description: "Utility-first CSS framework" },
];
</script>

<template>
  <div class="w-full max-w-sm space-y-3 p-2">
    <AutoComplete
      :options="frameworks"
      v-model="selected"
      placeholder="Search modern frameworks..."
    />
    <p class="text-xs text-muted-foreground">
      Active selection: <span class="font-mono text-foreground font-medium">{{ selected || "none" }}</span>
    </p>
  </div>
</template>
