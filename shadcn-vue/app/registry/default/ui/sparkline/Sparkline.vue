<script setup lang="ts">
import { ref, computed, useId, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface SparklineProps {
  data: number[];
  type?: "area" | "line" | "bar";
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  curve?: "linear" | "smooth";
  showTooltip?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SparklineProps>(), {
  type: "area",
  color: "var(--primary, oklch(0.6 0.2 260))",
  width: 120,
  height: 36,
  strokeWidth: 2,
  curve: "smooth",
  showTooltip: true,
});

const hoverIndex = ref<number | null>(null);
const gradientId = useId();

const svgWidth = 100;
const svgHeight = 40;
const padding = computed(() => props.strokeWidth * 2);

const min = computed(() => (props.data?.length ? Math.min(...props.data) : 0));
const max = computed(() => (props.data?.length ? Math.max(...props.data) : 0));
const range = computed(() => (max.value - min.value === 0 ? 1 : max.value - min.value));

const points = computed(() => {
  if (!props.data || props.data.length === 0) return [];
  const pad = padding.value;
  return props.data.map((val, idx) => {
    const x =
      props.data.length > 1
        ? (idx / (props.data.length - 1)) * (svgWidth - pad * 2) + pad
        : svgWidth / 2;
    const y =
      svgHeight -
      pad -
      ((val - min.value) / range.value) * (svgHeight - pad * 2);
    return { x, y, val };
  });
});

const pathD = computed(() => {
  const pts = points.value;
  if (!pts || pts.length === 0) return "";
  if (props.curve === "linear" || pts.length < 3) {
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }

  // Smooth Bezier
  let d = `M ${pts[0]!.x} ${pts[0]!.y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1]!;
    const p1 = pts[i]!;
    const p2 = pts[i + 1]!;
    const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1]!;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
});

const areaD = computed(() => {
  const pts = points.value;
  if (!pts || pts.length === 0) return "";
  return `${pathD.value} L ${pts[pts.length - 1]!.x} ${svgHeight} L ${pts[0]!.x} ${svgHeight} Z`;
});
</script>

<template>
  <div
    v-if="data && data.length > 0"
    role="img"
    :aria-label="`Sparkline chart with ${data.length} points, min ${min}, max ${max}`"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    }"
    :class="cn('relative inline-flex items-center select-none', props.class)"
    @mouseleave="hoverIndex = null"
  >
    <!-- Tooltip -->
    <div
      v-if="showTooltip && hoverIndex !== null && points[hoverIndex]"
      role="tooltip"
      class="pointer-events-none absolute -top-8 z-30 -translate-x-1/2 rounded bg-popover px-2 py-0.5 text-[10px] font-semibold text-popover-foreground shadow-2xs border border-border"
      :style="{
        left: `${(points[hoverIndex]!.x / svgWidth) * 100}%`,
      }"
    >
      {{ points[hoverIndex]!.val }}
    </div>

    <svg
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      class="size-full overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="color" stop-opacity="0.35" />
          <stop offset="100%" :stop-color="color" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <template v-if="type === 'bar'">
        <rect
          v-for="(p, i) in points"
          :key="i"
          :x="p.x - ((svgWidth / points.length) * 0.7) / 2"
          :y="p.y"
          :width="(svgWidth / points.length) * 0.7"
          :height="Math.max(2, svgHeight - p.y)"
          :rx="1.5"
          :fill="color"
          :opacity="hoverIndex === i ? 1 : 0.8"
          class="transition-opacity cursor-pointer"
          @mouseenter="hoverIndex = i"
        />
      </template>

      <template v-else>
        <path
          v-if="type === 'area'"
          :d="areaD"
          :fill="`url(#${gradientId})`"
        />
        <path
          :d="pathD"
          fill="none"
          :stroke="color"
          :stroke-width="strokeWidth"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <template v-if="showTooltip">
          <circle
            v-for="(p, i) in points"
            :key="i"
            :cx="p.x"
            :cy="p.y"
            :r="hoverIndex === i ? 4 : 2"
            :fill="color"
            stroke="var(--background, #fff)"
            :stroke-width="1"
            class="transition-all cursor-pointer"
            @mouseenter="hoverIndex = i"
          />
        </template>
      </template>
    </svg>
  </div>
</template>
