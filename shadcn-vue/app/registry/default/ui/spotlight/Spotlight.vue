<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface SpotlightProps {
  size?: number;
  color?: string;
  fillOpacity?: number;
  variant?: "background" | "border" | "both";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SpotlightProps>(), {
  size: 350,
  fillOpacity: 0.15,
  variant: "background",
});

const containerRef = ref<HTMLDivElement | null>(null);
const position = ref<{ x: number; y: number } | null>(null);

function handlePointerMove(e: PointerEvent) {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  position.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function handlePointerLeave() {
  position.value = null;
}

const glowColor = computed(() => props.color ?? "var(--primary, oklch(0.6 0.2 260))");
</script>

<template>
  <div
    ref="containerRef"
    :class="
      cn(
        'relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-colors dark:bg-card/70',
        props.class
      )
    "
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <!-- Background radial spotlight -->
    <div
      v-if="position && (variant === 'background' || variant === 'both')"
      aria-hidden="true"
      class="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
      :style="{
        background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 80%)`,
        opacity: fillOpacity,
      }"
    />

    <!-- Border-only spotlight -->
    <div
      v-if="position && (variant === 'border' || variant === 'both')"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-10 rounded-2xl border transition-opacity duration-300"
      :style="{
        borderColor: 'transparent',
        maskImage: `radial-gradient(${size * 0.75}px circle at ${position.x}px ${position.y}px, black 40%, transparent 80%)`,
        WebkitMaskImage: `radial-gradient(${size * 0.75}px circle at ${position.x}px ${position.y}px, black 40%, transparent 80%)`,
        borderImage: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 70%) 1`,
      }"
    />

    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>
