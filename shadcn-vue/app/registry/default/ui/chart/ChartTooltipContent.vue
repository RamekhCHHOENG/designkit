<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import type { ChartConfig } from "./ChartContainer.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  label?: string;
  value?: string | number;
  indicator?: "dot" | "line" | "dashed";
  hideLabel?: boolean;
}>();

const config = inject<ChartConfig>("chartConfig");
</script>

<template>
  <div
    data-slot="chart-tooltip-content"
    :class="cn('flex items-center gap-2 text-xs', props.class)"
  >
    <div class="size-2.5 rounded-full bg-primary" />
    <div class="flex flex-1 justify-between gap-4">
      <span v-if="!hideLabel" class="text-muted-foreground">{{ label }}</span>
      <span class="font-mono font-medium tabular-nums text-foreground">{{ value }}</span>
    </div>
  </div>
</template>
