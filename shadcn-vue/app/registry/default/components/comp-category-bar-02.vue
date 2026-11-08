<script setup lang="ts">
import { CategoryBar } from "@/registry/default/ui/category-bar";
</script>

<template>
  <div class="w-full max-w-sm flex flex-col gap-2 p-3 rounded-lg border bg-card">
    <div class="flex items-center justify-between text-xs font-medium">
      <span>CPU Core Distribution</span>
      <span class="text-emerald-500 font-mono">68% Active</span>
    </div>
    <CategoryBar
      size="sm"
      :values="[68, 22, 10]"
      :colors="['bg-emerald-500', 'bg-blue-500', 'bg-muted-foreground/30']"
    />
  </div>
</template>
