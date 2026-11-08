<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export type TrackerStatus =
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "idle";

export interface TrackerItem {
  key?: string | number;
  status: TrackerStatus;
  tooltip?: string;
  label?: string;
  date?: string;
}

export interface TrackerProps {
  data: TrackerItem[];
  hoverEffect?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TrackerProps>(), {
  hoverEffect: true,
});

const activeItem = ref<{
  item: TrackerItem;
  x: number;
} | null>(null);

const containerRef = ref<HTMLDivElement | null>(null);

const statusColorClasses: Record<TrackerStatus, string> = {
  success: "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500",
  warning: "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500",
  error: "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500",
  neutral: "bg-muted-foreground/30 hover:bg-muted-foreground/40",
  idle: "bg-muted hover:bg-muted/80",
};

function handleMouseEnter(item: TrackerItem, e: MouseEvent | FocusEvent) {
  if (!containerRef.value) return;
  const containerRect = containerRef.value.getBoundingClientRect();
  const itemRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  activeItem.value = {
    item,
    x: itemRect.left - containerRect.left + itemRect.width / 2,
  };
}
</script>

<template>
  <div
    ref="containerRef"
    role="group"
    aria-label="Status tracker"
    :class="cn('relative flex w-full items-center gap-1', props.class)"
    @mouseleave="activeItem = null"
  >
    <!-- Floating Tooltip -->
    <div
      v-if="activeItem"
      role="tooltip"
      class="pointer-events-none absolute -top-10 z-50 -translate-x-1/2 rounded-md border border-border bg-popover/95 px-2.5 py-1 text-xs font-medium text-popover-foreground shadow-md backdrop-blur-md transition-all animate-in fade-in-0 zoom-in-95"
      :style="{ left: `${activeItem.x}px` }"
    >
      <div class="flex items-center gap-1.5">
        <span
          :class="
            cn(
              'size-1.5 rounded-full',
              activeItem.item.status === 'success' && 'bg-emerald-500',
              activeItem.item.status === 'warning' && 'bg-amber-500',
              activeItem.item.status === 'error' && 'bg-rose-500',
              activeItem.item.status === 'neutral' && 'bg-muted-foreground',
              activeItem.item.status === 'idle' && 'bg-muted-foreground/50'
            )
          "
        />
        <span>
          {{
            activeItem.item.tooltip ??
            (activeItem.item.date
              ? `${activeItem.item.date}: ${activeItem.item.status}`
              : activeItem.item.status)
          }}
        </span>
      </div>
    </div>

    <!-- Segments -->
    <div
      v-for="(item, index) in data"
      :key="item.key ?? index"
      tabindex="0"
      role="status"
      :aria-label="item.tooltip ?? item.status"
      :class="
        cn(
          'h-8 flex-1 rounded-[3px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          statusColorClasses[item.status],
          hoverEffect && 'hover:scale-y-110 active:scale-95'
        )
      "
      @mouseenter="handleMouseEnter(item, $event)"
      @focus="handleMouseEnter(item, $event)"
      @blur="activeItem = null"
    />
  </div>
</template>
