<script setup lang="ts">
import { computed, type Component, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface BarListItem {
  name: string;
  value: number;
  href?: string;
  icon?: Component;
  color?: string;
}

export interface BarListProps {
  data: BarListItem[];
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
  color?: string;
  sort?: "desc" | "asc" | "none";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<BarListProps>(), {
  valueFormatter: (val: number) => val.toLocaleString(),
  showAnimation: true,
  color: "bg-primary/10 dark:bg-primary/20",
  sort: "desc",
});

const sortedData = computed(() => {
  if (props.sort === "none") return props.data;
  const copied = [...props.data];
  return copied.sort((a, b) =>
    props.sort === "desc" ? b.value - a.value : a.value - b.value
  );
});

const maxValue = computed(() => {
  if (!props.data || props.data.length === 0) return 0;
  return Math.max(...props.data.map((d) => d.value), 0);
});
</script>

<template>
  <div
    data-slot="bar-list"
    role="list"
    :class="cn('flex flex-col gap-2 w-full', props.class)"
  >
    <template v-for="(item, index) in sortedData" :key="item.name + index">
      <!-- Link Variant -->
      <a
        v-if="item.href"
        :href="item.href"
        role="listitem"
        class="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <div
          class="relative flex items-center justify-between h-9 px-2.5 rounded-md overflow-hidden group hover:bg-muted/40 transition-colors"
        >
          <div
            :class="
              cn(
                'absolute inset-y-0 left-0 rounded-md transition-all duration-500 ease-out',
                item.color ?? color
              )
            "
            :style="{
              width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
              transitionDuration: showAnimation ? '500ms' : '0ms',
            }"
          />
          <div class="relative flex items-center gap-2 truncate z-10">
            <component
              :is="item.icon"
              v-if="item.icon"
              class="size-4 shrink-0 text-muted-foreground"
            />
            <span class="text-sm font-medium text-foreground truncate">
              {{ item.name }}
            </span>
          </div>
          <span
            class="relative z-10 text-sm font-semibold font-mono text-foreground shrink-0 pl-4"
          >
            {{ valueFormatter(item.value) }}
          </span>
        </div>
      </a>

      <!-- Plain Div Variant -->
      <div v-else role="listitem">
        <div
          class="relative flex items-center justify-between h-9 px-2.5 rounded-md overflow-hidden group hover:bg-muted/40 transition-colors"
        >
          <div
            :class="
              cn(
                'absolute inset-y-0 left-0 rounded-md transition-all duration-500 ease-out',
                item.color ?? color
              )
            "
            :style="{
              width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
              transitionDuration: showAnimation ? '500ms' : '0ms',
            }"
          />
          <div class="relative flex items-center gap-2 truncate z-10">
            <component
              :is="item.icon"
              v-if="item.icon"
              class="size-4 shrink-0 text-muted-foreground"
            />
            <span class="text-sm font-medium text-foreground truncate">
              {{ item.name }}
            </span>
          </div>
          <span
            class="relative z-10 text-sm font-semibold font-mono text-foreground shrink-0 pl-4"
          >
            {{ valueFormatter(item.value) }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
