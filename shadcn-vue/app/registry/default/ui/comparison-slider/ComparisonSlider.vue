<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { ChevronsLeftRightIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface ComparisonSliderProps {
  initialPosition?: number;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ComparisonSliderProps>(), {
  initialPosition: 50,
  beforeLabel: "Before",
  afterLabel: "After",
  aspectRatio: "16/9",
});

const position = ref(props.initialPosition);
const isDragging = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);

function updatePosition(clientX: number) {
  if (!containerRef.value) return;
  const rect = containerRef.value.getBoundingClientRect();
  const x = clientX - rect.left;
  const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
  position.value = percentage;
}

function handlePointerDown(e: PointerEvent) {
  isDragging.value = true;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  updatePosition(e.clientX);
}

function handlePointerMove(e: PointerEvent) {
  if (!isDragging.value) return;
  updatePosition(e.clientX);
}

function handlePointerUp(e: PointerEvent) {
  isDragging.value = false;
  try {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  } catch {
    // Already released
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
    e.preventDefault();
    position.value = Math.max(0, position.value - 5);
  } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
    e.preventDefault();
    position.value = Math.min(100, position.value + 5);
  } else if (e.key === "Home") {
    e.preventDefault();
    position.value = 0;
  } else if (e.key === "End") {
    e.preventDefault();
    position.value = 100;
  }
}
</script>

<template>
  <div
    ref="containerRef"
    role="slider"
    aria-label="Image comparison slider"
    :aria-valuenow="Math.round(position)"
    :aria-valuemin="0"
    :aria-valuemax="100"
    tabindex="0"
    :style="{ aspectRatio: props.aspectRatio }"
    :class="
      cn(
        'group relative select-none overflow-hidden rounded-2xl border border-border/80 bg-muted cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class
      )
    "
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
    @keydown="handleKeyDown"
  >
    <!-- After layer -->
    <div class="absolute inset-0 size-full">
      <slot name="after" />
    </div>

    <!-- Before layer (clipped) -->
    <div
      class="absolute inset-0 size-full overflow-hidden"
      :style="{
        clipPath: `inset(0 ${100 - position}% 0 0)`,
      }"
    >
      <slot name="before" />
    </div>

    <!-- Labels -->
    <span
      v-if="beforeLabel"
      :class="
        cn(
          'pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-md transition-opacity duration-200',
          position < 15 ? 'opacity-0' : 'opacity-100'
        )
      "
    >
      {{ beforeLabel }}
    </span>

    <span
      v-if="afterLabel"
      :class="
        cn(
          'pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-md transition-opacity duration-200',
          position > 85 ? 'opacity-0' : 'opacity-100'
        )
      "
    >
      {{ afterLabel }}
    </span>

    <!-- Divider bar & handle -->
    <div
      class="pointer-events-none absolute inset-y-0 z-30 w-px bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
      :style="{ left: `${position}%` }"
    >
      <div class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border border-white/50 bg-background/80 text-foreground shadow-2xl backdrop-blur-md transition-transform group-hover:scale-110 active:scale-95 dark:bg-card/80">
        <ChevronsLeftRightIcon class="size-4" />
      </div>
    </div>
  </div>
</template>
