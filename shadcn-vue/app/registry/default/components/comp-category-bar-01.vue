<script setup lang="ts">
import { CategoryBar } from "@/registry/default/ui/category-bar";
</script>

<template>
  <div class="w-full max-w-md flex flex-col gap-2 p-4 rounded-xl border bg-card shadow-sm">
    <div class="flex items-center justify-between text-xs">
      <span class="font-semibold text-foreground">Cloud Storage Usage</span>
      <span class="text-muted-foreground font-mono">1.8 TB / 2.0 TB</span>
    </div>
    <CategoryBar
      :values="[40, 30, 20, 10]"
      :labels="['Databases', 'Backups', 'Assets', 'Logs']"
      :colors="['bg-indigo-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500']"
      show-labels
      :marker="85"
      marker-label="Threshold"
    />
  </div>
</template>
