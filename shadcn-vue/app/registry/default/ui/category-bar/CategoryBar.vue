<script lang="ts">
export const DEFAULT_CATEGORY_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
];
</script>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface CategoryBarItem {
  value: number;
  label?: string;
  color?: string;
}

export interface CategoryBarProps {
  values: number[] | CategoryBarItem[];
  colors?: string[];
  labels?: string[];
  showLabels?: boolean;
  marker?: number;
  markerLabel?: string;
  size?: "sm" | "default" | "lg";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CategoryBarProps>(), {
  colors: () => DEFAULT_CATEGORY_COLORS,
  labels: () => [],
  showLabels: false,
  size: "default",
});

const normalizedItems = computed<CategoryBarItem[]>(() => {
  if (!props.values || props.values.length === 0) return [];
  const palette = props.colors.length > 0 ? props.colors : DEFAULT_CATEGORY_COLORS;

  if (typeof props.values[0] === "number") {
    return (props.values as number[]).map((val, idx) => ({
      value: Math.max(0, val),
      label: props.labels[idx],
      color: palette[idx % palette.length],
    }));
  }
  return (props.values as CategoryBarItem[]).map((item, idx) => ({
    value: Math.max(0, item.value),
    label: item.label ?? props.labels[idx],
    color: item.color ?? palette[idx % palette.length],
  }));
});

const total = computed(() =>
  normalizedItems.value.reduce((acc, item) => acc + item.value, 0)
);

const markerPercent = computed(() => {
  if (props.marker === undefined || total.value === 0) return null;
  return Math.min(100, Math.max(0, (props.marker / total.value) * 100));
});

const sizeHeights = {
  sm: "h-1.5",
  default: "h-2.5",
  lg: "h-4",
};
</script>

<template>
  <div
    data-slot="category-bar"
    role="group"
    aria-label="Proportional Category Bar"
    :class="cn('w-full flex flex-col gap-2 select-none', props.class)"
  >
    <div
      :class="
        cn(
          'relative flex w-full overflow-hidden rounded-full bg-muted/60 p-0.5 gap-0.5',
          sizeHeights[size]
        )
      "
    >
      <template v-for="(item, index) in normalizedItems" :key="index">
        <div
          v-if="total > 0 && item.value > 0"
          :class="
            cn(
              'h-full transition-all duration-300 relative group first:rounded-l-full last:rounded-r-full',
              item.color
            )
          "
          :style="{ width: `${(item.value / total) * 100}%` }"
          :title="`${item.label ? item.label + ': ' : ''}${item.value} (${(
            (item.value / total) *
            100
          ).toFixed(1)}%)`"
        />
      </template>

      <!-- Threshold / Current Marker -->
      <div
        v-if="markerPercent !== null"
        class="absolute top-0 bottom-0 w-1 bg-foreground z-10 shadow-xs -translate-x-1/2 rounded-full pointer-events-none"
        :style="{ left: `${markerPercent}%` }"
        :title="markerLabel ?? `Marker: ${marker}`"
      />
    </div>

    <!-- Category legend labels -->
    <div
      v-if="showLabels"
      class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-0.5"
    >
      <div
        v-for="(item, index) in normalizedItems"
        :key="index"
        class="flex items-center gap-1.5"
      >
        <span :class="cn('size-2 rounded-full shrink-0', item.color)" />
        <span class="font-medium text-foreground">
          {{ item.label ?? `Category ${index + 1}` }}
        </span>
        <span v-if="total > 0">
          ({{ ((item.value / total) * 100).toFixed(0) }}%)
        </span>
      </div>
    </div>
  </div>
</template>
