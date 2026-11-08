<script setup lang="ts">
import type { Component, HTMLAttributes } from "vue";
import { ArrowRightIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

export interface BentoCardProps {
  name: string;
  description: string;
  href?: string;
  cta?: string;
  icon?: Component;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<BentoCardProps>(), {
  cta: "Learn more",
  colSpan: 1,
  rowSpan: 1,
});

const colSpanClasses: Record<1 | 2 | 3, string> = {
  1: "col-span-1",
  2: "col-span-1 md:col-span-2",
  3: "col-span-1 md:col-span-3",
};

const rowSpanClasses: Record<1 | 2, string> = {
  1: "row-span-1",
  2: "row-span-2",
};
</script>

<template>
  <div
    :class="
      cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-xs transition-all duration-300 hover:border-border hover:shadow-md dark:bg-card/70 dark:backdrop-blur-xl',
        colSpanClasses[props.colSpan],
        rowSpanClasses[props.rowSpan],
        props.class
      )
    "
  >
    <!-- Background graphic slot -->
    <div
      v-if="$slots.background"
      class="absolute inset-0 z-0 transition-transform duration-500 ease-out group-hover:scale-105"
    >
      <slot name="background" />
    </div>

    <!-- Header -->
    <div class="relative z-10 flex flex-col gap-2">
      <div
        v-if="icon"
        class="flex size-10 items-center justify-center rounded-xl bg-muted/80 text-foreground shadow-2xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
      >
        <component :is="icon" class="size-5" />
      </div>
      <h3 class="text-lg font-semibold tracking-tight text-foreground">
        {{ name }}
      </h3>
      <p class="max-w-md text-sm text-muted-foreground leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- Action -->
    <div class="relative z-10 flex items-center justify-between pt-4">
      <Button
        v-if="href"
        variant="ghost"
        size="sm"
        as-child
        class="group/btn -ml-2 gap-1.5 text-xs font-medium text-foreground hover:bg-muted/80"
      >
        <a :href="href">
          <span>{{ cta }}</span>
          <ArrowRightIcon class="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
        </a>
      </Button>
      <span v-else class="text-xs font-medium text-muted-foreground">
        {{ cta }}
      </span>
    </div>

    <!-- Border highlight on hover -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-20 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-foreground/10"
    />
  </div>
</template>
