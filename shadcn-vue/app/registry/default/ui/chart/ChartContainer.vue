<script setup lang="ts">
import { computed, provide, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface ChartConfigItem {
  label?: string;
  icon?: any;
  color?: string;
  theme?: Record<string, string>;
}

export type ChartConfig = Record<string, ChartConfigItem>;

const props = defineProps<{
  id?: string;
  class?: HTMLAttributes["class"];
  config: ChartConfig;
}>();

const chartId = computed(() => `chart-${props.id ?? Math.random().toString(36).substring(2, 9)}`);

provide("chartConfig", props.config);
</script>

<template>
  <div
    data-slot="chart"
    :data-chart="chartId"
    :class="
      cn(
        'flex aspect-video justify-center text-xs text-foreground [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
