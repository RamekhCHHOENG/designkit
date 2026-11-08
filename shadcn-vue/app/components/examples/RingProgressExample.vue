<script setup lang="ts">
import { ref } from "vue";
import { RingProgress } from "@/registry/default/ui/ring-progress";

const val = ref(68);
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-8 p-6">
    <div class="flex flex-col items-center gap-2">
      <RingProgress :value="val" :size="100" :thickness="8">
        <span class="text-sm font-bold">{{ val }}%</span>
      </RingProgress>
      <span class="text-xs text-muted-foreground">Single Metric</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <RingProgress
        :size="130"
        :thickness="12"
        :sections="[
          { value: 40, color: 'oklch(0.65 0.2 145)', tooltip: 'Completed: 40%' },
          { value: 25, color: 'oklch(0.75 0.18 70)', tooltip: 'In Progress: 25%' },
          { value: 15, color: 'oklch(0.6 0.22 25)', tooltip: 'Review: 15%' },
        ]"
      >
        <span class="text-xs font-semibold text-muted-foreground">Status</span>
        <span class="text-base font-bold">80%</span>
      </RingProgress>
      <span class="text-xs text-muted-foreground">Multi-Segment</span>
    </div>
  </div>
</template>
