<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ShimmerButtonProps>(), {
  shimmerColor: "#ffffff",
  shimmerSize: "0.05em",
  shimmerDuration: "2.5s",
  borderRadius: "100px",
  background: "rgba(0, 0, 0, 1)",
});
</script>

<template>
  <button
    data-slot="shimmer-button"
    :style="{
      '--spread': '90deg',
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
    }"
    :class="
      cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-2.5 text-xs font-semibold text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-md',
        props.class
      )
    "
  >
    <!-- Spark container -->
    <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
      <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
        <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
      </div>
    </div>

    <!-- Backdrop -->
    <div className="absolute [border-radius:var(--radius)] [inset:var(--cut)] -z-20 [background:var(--bg)]" />

    <!-- Content -->
    <span className="relative z-10 flex items-center gap-2">
      <slot />
    </span>
  </button>
</template>
