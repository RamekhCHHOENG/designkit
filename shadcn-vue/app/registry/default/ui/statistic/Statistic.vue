<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface StatisticProps {
  title?: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number | string;
    direction?: "up" | "down";
    label?: string;
  };
  description?: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<StatisticProps>();
</script>

<template>
  <div
    data-slot="statistic"
    :class="
      cn(
        'flex flex-col gap-1 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs',
        props.class
      )
    "
  >
    <span v-if="title" class="text-xs font-medium text-muted-foreground select-none">
      {{ title }}
    </span>

    <div class="flex items-baseline gap-1 font-semibold tracking-tight text-2xl text-foreground">
      <span v-if="prefix" class="text-lg font-normal text-muted-foreground">{{ prefix }}</span>
      <span>{{ value }}</span>
      <span v-if="suffix" class="text-sm font-normal text-muted-foreground">{{ suffix }}</span>
    </div>

    <div v-if="trend || description" class="mt-1 flex items-center gap-2 text-xs">
      <span
        v-if="trend"
        :class="
          cn(
            'inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium text-[11px]',
            trend.direction === 'up' || (typeof trend.value === 'number' && trend.value >= 0)
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          )
        "
      >
        <TrendingUpIcon
          v-if="trend.direction === 'up' || (typeof trend.value === 'number' && trend.value >= 0)"
          class="size-3"
        />
        <TrendingDownIcon v-else class="size-3" />
        <span>{{ trend.value }}</span>
      </span>
      <span v-if="description" class="text-muted-foreground truncate">{{ description }}</span>
    </div>
  </div>
</template>
