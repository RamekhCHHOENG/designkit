<script setup lang="ts">
import { ref, provide, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface DockProps {
  magnification?: number;
  distance?: number;
  baseSize?: number;
  direction?: "horizontal" | "vertical";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DockProps>(), {
  magnification: 64,
  distance: 140,
  baseSize: 40,
  direction: "horizontal",
});

const mouseX = ref<number | null>(null);
const mouseY = ref<number | null>(null);

function handleMouseMove(e: MouseEvent) {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
}

function handleMouseLeave() {
  mouseX.value = null;
  mouseY.value = null;
}

provide("dockContext", {
  mouseX,
  mouseY,
  magnification: computed(() => props.magnification),
  distance: computed(() => props.distance),
  baseSize: computed(() => props.baseSize),
  direction: computed(() => props.direction),
});
</script>

<template>
  <div
    role="toolbar"
    :aria-orientation="direction"
    :class="
      cn(
        'relative flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-background/70 px-3 py-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-card/70',
        direction === 'vertical' ? 'flex-col py-3 px-2 w-max' : 'flex-row w-max',
        props.class
      )
    "
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </div>
</template>
