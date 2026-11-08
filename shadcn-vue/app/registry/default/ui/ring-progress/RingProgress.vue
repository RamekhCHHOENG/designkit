<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface RingProgressSection {
  value: number; // percentage (0 - 100)
  color?: string;
  tooltip?: string;
}

export interface RingProgressProps {
  size?: number;
  thickness?: number;
  value?: number;
  sections?: RingProgressSection[];
  roundCaps?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<RingProgressProps>(), {
  size: 120,
  thickness: 10,
  roundCaps: true,
});

const sections = computed<RingProgressSection[]>(() => {
  if (props.sections && props.sections.length > 0) return props.sections;
  if (props.value !== undefined) {
    return [{ value: props.value, color: "var(--primary)" }];
  }
  return [];
});

const radius = computed(() => (props.size - props.thickness) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);

const computedSections = computed(() => {
  let accumulated = 0;
  return sections.value.map((section) => {
    const strokeDashoffset = circumference.value - (section.value / 100) * circumference.value;
    const rotateOffset = (accumulated / 100) * 360;
    accumulated += section.value;
    return {
      ...section,
      strokeDashoffset,
      rotateOffset,
    };
  });
});
</script>

<template>
  <div
    data-slot="ring-progress"
    :class="cn('relative inline-flex items-center justify-center select-none', props.class)"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      class="-rotate-90 transform"
    >
      <!-- Background circle -->
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="thickness"
        class="stroke-muted fill-transparent"
      />

      <!-- Dynamic arcs -->
      <circle
        v-for="(sec, idx) in computedSections"
        :key="idx"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="thickness"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="sec.strokeDashoffset"
        :stroke-linecap="roundCaps ? 'round' : 'butt'"
        :stroke="sec.color ?? 'var(--primary)'"
        class="fill-transparent transition-all duration-500 ease-out"
        :style="{
          transformOrigin: 'center',
          transform: `rotate(${sec.rotateOffset}deg)`,
        }"
      >
        <title v-if="sec.tooltip">{{ sec.tooltip }}</title>
      </circle>
    </svg>

    <div
      v-if="$slots.default"
      class="absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <slot />
    </div>
  </div>
</template>
