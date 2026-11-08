<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { TrendingUp, TrendingDown, Minus } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface DeltaBadgeProps {
  value: number;
  format?: (value: number) => string;
  isIncreasePositive?: boolean;
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DeltaBadgeProps>(), {
  isIncreasePositive: true,
  size: "default",
  showIcon: true,
});

const isZero = computed(() => Math.abs(props.value) < 0.0001);
const isPositive = computed(() => props.value > 0);

const isGood = computed(() => {
  if (isZero.value) return null;
  return props.isIncreasePositive ? isPositive.value : !isPositive.value;
});

const formattedText = computed(() => {
  if (props.format) return props.format(props.value);
  const sign = props.value > 0 ? "+" : "";
  return `${sign}${props.value.toFixed(1)}%`;
});

const sizeClasses = {
  sm: "text-[10px] px-1.5 py-0.5 gap-0.5 font-medium",
  default: "text-xs px-2 py-0.5 gap-1 font-semibold",
  lg: "text-sm px-2.5 py-1 gap-1.5 font-semibold",
};

const iconSizes = {
  sm: "size-3",
  default: "size-3.5",
  lg: "size-4",
};

const sentimentClasses = computed(() => {
  if (isZero.value) {
    return "bg-muted text-muted-foreground border-transparent";
  }
  if (isGood.value) {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  }
  return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
});
</script>

<template>
  <span
    data-slot="delta-badge"
    role="status"
    :aria-label="`${value >= 0 ? 'Increase' : 'Decrease'} of ${formattedText}`"
    :class="
      cn(
        'inline-flex items-center rounded-full border shadow-2xs select-none tabular-nums',
        sentimentClasses,
        sizeClasses[size],
        props.class
      )
    "
  >
    <template v-if="showIcon">
      <Minus v-if="isZero" :class="iconSizes[size]" aria-hidden="true" />
      <TrendingUp
        v-else-if="isPositive"
        :class="iconSizes[size]"
        aria-hidden="true"
      />
      <TrendingDown v-else :class="iconSizes[size]" aria-hidden="true" />
    </template>
    <span>{{ formattedText }}</span>
  </span>
</template>
