<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
  pauseOnHover?: boolean;
  reverse?: boolean;
  fadeEdges?: boolean;
  speed?: number; // Duration in seconds
  vertical?: boolean;
  gap?: string;
  repeat?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MarqueeProps>(), {
  pauseOnHover: false,
  reverse: false,
  fadeEdges: true,
  speed: 30,
  vertical: false,
  gap: "1rem",
  repeat: 4,
});
</script>

<template>
  <div
    :style="{
      '--gap': gap,
      '--duration': `${speed}s`,
    }"
    :class="
      cn(
        'group relative flex overflow-hidden p-2',
        vertical ? 'flex-col' : 'flex-row',
        fadeEdges &&
          !vertical &&
          '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        fadeEdges &&
          vertical &&
          '[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]',
        props.class
      )
    "
  >
    <div
      v-for="index in repeat"
      :key="index"
      :aria-hidden="index > 1"
      :class="
        cn(
          'flex shrink-0 justify-around [gap:var(--gap)]',
          vertical
            ? 'flex-col animate-marquee-vertical'
            : 'flex-row animate-marquee',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )
      "
    >
      <slot />
    </div>
  </div>
</template>
