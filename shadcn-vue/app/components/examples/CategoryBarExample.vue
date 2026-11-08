<script setup lang="ts">
import { CategoryBar } from "@/registry/default/ui/category-bar";
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6 p-4">
    <div class="flex flex-col gap-1.5">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        System Storage Allocation
      </span>
      <CategoryBar
        :values="[45, 25, 20, 10]"
        :labels="['System', 'Applications', 'Documents', 'Other']"
        :colors="[
          'bg-blue-500',
          'bg-purple-500',
          'bg-emerald-500',
          'bg-amber-500',
        ]"
        show-labels
        :marker="80"
        marker-label="Quota threshold (80%)"
      />
    </div>

    <div class="flex flex-col gap-1.5">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Compact Usage Bar
      </span>
      <CategoryBar
        size="sm"
        :values="[60, 30, 10]"
        :colors="['bg-emerald-500', 'bg-blue-500', 'bg-muted-foreground/30']"
      />
    </div>
  </div>
</template>
