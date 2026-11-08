<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface InteractiveGridPatternProps {
  width?: number;
  height?: number;
  squares?: [number, number];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<InteractiveGridPatternProps>(), {
  width: 36,
  height: 36,
  squares: () => [24, 16],
});

const hoveredSquare = ref<{ x: number; y: number } | null>(null);

const cols = computed(() => props.squares[0]);
const rows = computed(() => props.squares[1]);
</script>

<template>
  <div
    data-slot="interactive-grid-pattern"
    :class="cn('relative overflow-hidden pointer-events-auto select-none', props.class)"
  >
    <div
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${cols}, ${width}px)`,
        gridTemplateRows: `repeat(${rows}, ${height}px)`,
      }"
    >
      <template v-for="r in rows" :key="`r-${r}`">
        <template v-for="c in cols" :key="`c-${c}`">
          <div
            :class="
              cn(
                'border-r border-b border-border/30 transition-all duration-500',
                hoveredSquare?.x === c && hoveredSquare?.y === r
                  ? 'bg-primary/20 border-primary/50 shadow-inner duration-75'
                  : 'hover:bg-primary/10'
              )
            "
            :style="{
              width: `${width}px`,
              height: `${height}px`,
            }"
            @mouseenter="hoveredSquare = { x: c, y: r }"
            @mouseleave="hoveredSquare = null"
          />
        </template>
      </template>
    </div>
  </div>
</template>
