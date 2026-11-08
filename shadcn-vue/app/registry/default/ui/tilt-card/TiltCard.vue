<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  maxRotation?: number;
  perspective?: number;
  glareEffect?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TiltCardProps>(), {
  maxRotation: 12,
  perspective: 1000,
  glareEffect: true,
});

const cardRef = ref<HTMLDivElement | null>(null);
const rotation = ref({ x: 0, y: 0 });
const glarePosition = ref({ x: 50, y: 50, opacity: 0 });

function handleMouseMove(e: MouseEvent) {
  const card = cardRef.value;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const xPct = mouseX / rect.width - 0.5;
  const yPct = mouseY / rect.height - 0.5;

  rotation.value = {
    x: -yPct * props.maxRotation,
    y: xPct * props.maxRotation,
  };

  if (props.glareEffect) {
    glarePosition.value = {
      x: (mouseX / rect.width) * 100,
      y: (mouseY / rect.height) * 100,
      opacity: 0.15,
    };
  }
}

function handleMouseLeave() {
  rotation.value = { x: 0, y: 0 };
  if (props.glareEffect) {
    glarePosition.value.opacity = 0;
  }
}
</script>

<template>
  <div
    ref="cardRef"
    data-slot="tilt-card"
    :style="{ perspective: `${perspective}px` }"
    :class="cn('inline-block', props.class)"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      :style="{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }"
      class="relative overflow-hidden rounded-3xl border bg-card text-card-foreground shadow-lg will-change-transform"
    >
      <slot />

      <!-- Glare Overlay -->
      <div
        v-if="glareEffect"
        class="pointer-events-none absolute inset-0 transition-opacity duration-300"
        :style="{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.8), transparent 60%)`,
        }"
      />
    </div>
  </div>
</template>
