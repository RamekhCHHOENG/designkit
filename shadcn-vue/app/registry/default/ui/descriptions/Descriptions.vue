<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface DescriptionsItem {
  key?: string;
  label: string;
  value?: string | number;
  span?: number;
}

export interface DescriptionsProps {
  title?: string;
  extra?: string;
  bordered?: boolean;
  column?: 1 | 2 | 3 | 4;
  layout?: "horizontal" | "vertical";
  items?: DescriptionsItem[];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DescriptionsProps>(), {
  bordered: true,
  column: 2,
  layout: "horizontal",
  items: () => [],
});

const colClass = computed(() => {
  return {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[props.column];
});
</script>

<template>
  <div data-slot="descriptions" :class="cn('w-full space-y-2 text-sm', props.class)">
    <div v-if="title || extra" class="flex items-center justify-between pb-1">
      <h4 v-if="title" class="font-semibold text-foreground">{{ title }}</h4>
      <div v-if="extra" class="text-xs text-muted-foreground">{{ extra }}</div>
    </div>

    <div
      :class="
        cn(
          'grid gap-px overflow-hidden rounded-lg',
          bordered ? 'border border-border bg-border shadow-xs' : 'divide-y divide-border',
          colClass
        )
      "
    >
      <div
        v-for="(item, index) in items"
        :key="item.key ?? index"
        :class="
          cn(
            'flex bg-card p-3',
            layout === 'vertical' ? 'flex-col gap-1' : 'flex-row justify-between items-center gap-4'
          )
        "
        :style="item.span ? { gridColumn: `span ${item.span}` } : undefined"
      >
        <span class="font-medium text-xs text-muted-foreground select-none">
          {{ item.label }}
        </span>
        <span class="text-foreground text-xs font-normal text-right">
          {{ item.value }}
        </span>
      </div>
      <slot />
    </div>
  </div>
</template>
