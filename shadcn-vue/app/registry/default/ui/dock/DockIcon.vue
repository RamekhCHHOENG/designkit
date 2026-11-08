<script setup lang="ts">
import { ref, inject, computed, type HTMLAttributes, type Ref, type ComputedRef } from "vue";
import { cn } from "@/lib/utils";

export interface DockIconProps {
  active?: boolean;
  label?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DockIconProps>(), {
  active: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const iconRef = ref<HTMLButtonElement | null>(null);
const isHovered = ref(false);

const dockContext = inject<{
  mouseX: Ref<number | null>;
  mouseY: Ref<number | null>;
  magnification: ComputedRef<number> | number;
  distance: ComputedRef<number> | number;
  baseSize: ComputedRef<number> | number;
  direction: ComputedRef<"horizontal" | "vertical"> | "horizontal" | "vertical";
}>("dockContext");

const getVal = <T>(val: ComputedRef<T> | T | undefined, fallback: T): T => {
  if (val === undefined) return fallback;
  if (typeof val === "object" && val !== null && "value" in val) {
    return (val as ComputedRef<T>).value;
  }
  return val as T;
};

const currentSize = computed(() => {
  const base = getVal(dockContext?.baseSize, 40);
  const mag = getVal(dockContext?.magnification, 64);
  const maxDist = getVal(dockContext?.distance, 140);
  const dir = getVal(dockContext?.direction, "horizontal");

  if (!dockContext || !iconRef.value) return base;

  const rect = iconRef.value.getBoundingClientRect();
  const iconCenter =
    dir === "horizontal"
      ? rect.left + rect.width / 2
      : rect.top + rect.height / 2;

  const pointer =
    dir === "horizontal"
      ? dockContext.mouseX.value
      : dockContext.mouseY.value;

  if (pointer === null) return base;

  const dist = Math.abs(pointer - iconCenter);

  if (dist < maxDist) {
    const scaleFactor = Math.cos((dist / maxDist) * (Math.PI / 2));
    return base + (mag - base) * scaleFactor;
  }

  return base;
});
</script>

<template>
  <div class="group relative flex flex-col items-center">
    <div
      v-if="label && isHovered"
      role="tooltip"
      class="pointer-events-none absolute -top-9 z-50 rounded-md border border-border bg-popover/90 px-2 py-0.5 text-[11px] font-medium text-popover-foreground shadow-md backdrop-blur-md transition-all duration-150 animate-in fade-in-0 zoom-in-95"
    >
      {{ label }}
    </div>

    <button
      ref="iconRef"
      type="button"
      :aria-label="label"
      :style="{
        width: `${currentSize}px`,
        height: `${currentSize}px`,
      }"
      :class="
        cn(
          'relative flex items-center justify-center rounded-xl bg-muted/60 text-foreground transition-[width,height,transform] duration-75 ease-out hover:bg-muted active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-muted/40',
          props.class
        )
      "
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="emit('click', $event)"
    >
      <div class="flex size-full items-center justify-center p-2">
        <slot />
      </div>
    </button>

    <span
      v-if="active"
      aria-hidden="true"
      class="mt-1 size-1 rounded-full bg-foreground/70"
    />
  </div>
</template>
