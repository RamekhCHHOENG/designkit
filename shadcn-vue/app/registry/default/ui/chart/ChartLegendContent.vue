<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  name?: string;
  color?: string;
}>();
</script>

<template>
  <div data-slot="chart-legend-content" :class="cn('flex items-center gap-1.5', props.class)">
    <div
      class="size-2 rounded-xs"
      :style="{ backgroundColor: color ?? 'var(--primary)' }"
    />
    <span class="text-muted-foreground">{{ name }}</span>
  </div>
</template>
