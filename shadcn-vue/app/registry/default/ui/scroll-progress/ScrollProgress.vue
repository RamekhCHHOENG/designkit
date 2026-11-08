<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    gradient?: boolean;
    class?: string;
  }>(),
  {
    orientation: "horizontal",
    gradient: false,
  }
);

const progress = ref(0);
let ticking = false;

function updateProgress() {
  if (typeof window === "undefined") return;
  const isHoriz = props.orientation === "horizontal";
  const current = isHoriz
    ? window.scrollX || document.documentElement.scrollLeft
    : window.scrollY || document.documentElement.scrollTop;
  const total = isHoriz
    ? document.documentElement.scrollWidth - window.innerWidth
    : document.documentElement.scrollHeight - window.innerHeight;

  progress.value = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0;
  ticking = false;
}

function handleScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateProgress);
    ticking = true;
  }
}

onMounted(() => {
  updateProgress();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
});

const isHorizontal = computed(() => props.orientation === "horizontal");
</script>

<template>
  <div
    data-slot="scroll-progress"
    role="progressbar"
    :aria-valuenow="Math.round(progress * 100)"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :class="
      cn(
        'pointer-events-none fixed z-50 transition-transform duration-75 ease-out',
        isHorizontal
          ? 'top-0 left-0 right-0 h-1 origin-left'
          : 'top-0 right-0 bottom-0 w-1 origin-top',
        gradient
          ? 'bg-gradient-to-r from-primary via-indigo-500 to-sky-400'
          : 'bg-primary',
        props.class
      )
    "
    :style="{
      transform: isHorizontal ? `scaleX(${progress})` : `scaleY(${progress})`,
    }"
  />
</template>
