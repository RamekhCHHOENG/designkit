<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface NumberTickerProps {
  value: number;
  initialValue?: number;
  direction?: "up" | "down";
  duration?: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<NumberTickerProps>(), {
  initialValue: 0,
  direction: "up",
  duration: 2,
  decimalPlaces: 0,
  prefix: "",
  suffix: "",
  locale: "en-US",
});

const currentValue = ref(
  props.direction === "down" ? props.value : props.initialValue
);
const spanRef = ref<HTMLSpanElement | null>(null);
let hasAnimated = false;
let rafId: number | null = null;
let observer: IntersectionObserver | null = null;

function animate(startVal: number, endVal: number) {
  if (rafId) cancelAnimationFrame(rafId);
  const startTime = performance.now();
  const durationMs = props.duration * 1000;

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const easeProgress =
      progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const nextVal = startVal + (endVal - startVal) * easeProgress;

    currentValue.value = nextVal;

    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      currentValue.value = endVal;
      rafId = null;
    }
  };

  rafId = requestAnimationFrame(step);
}

onMounted(() => {
  const element = spanRef.value;
  if (!element) return;

  if (typeof IntersectionObserver === "undefined") {
    currentValue.value = props.value;
    return;
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        const startVal = props.direction === "down" ? props.value : props.initialValue;
        const endVal = props.direction === "down" ? props.initialValue : props.value;
        animate(startVal, endVal);
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(element);
});

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (observer) observer.disconnect();
});

watch(
  () => props.value,
  (newVal, oldVal) => {
    if (hasAnimated && newVal !== oldVal) {
      animate(currentValue.value, newVal);
    }
  }
);

const formattedNumber = computed(() => {
  const formatter = new Intl.NumberFormat(props.locale, {
    minimumFractionDigits: props.decimalPlaces,
    maximumFractionDigits: props.decimalPlaces,
  });
  return formatter.format(currentValue.value);
});
</script>

<template>
  <span
    ref="spanRef"
    :class="
      cn(
        'inline-block tabular-nums font-semibold tracking-tight text-foreground',
        props.class
      )
    "
  >
    {{ prefix }}{{ formattedNumber }}{{ suffix }}
  </span>
</template>
