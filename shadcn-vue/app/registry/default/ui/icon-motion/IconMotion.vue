<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export type IconMotionTransition = "morph" | "flip" | "slide" | "fade";

export interface IconMotionProps {
  modelValue?: boolean;
  transition?: IconMotionTransition;
  size?: "sm" | "default" | "lg";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<IconMotionProps>(), {
  modelValue: undefined,
  transition: "morph",
  size: "default",
});

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "toggle", val: boolean): void;
}>();

const internalToggled = ref(false);

const active = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalToggled.value
);

function handleClick() {
  const next = !active.value;
  internalToggled.value = next;
  emit("update:modelValue", next);
  emit("toggle", next);
}

const sizeClasses = {
  sm: "size-7 p-1 text-xs",
  default: "size-9 p-2 text-sm",
  lg: "size-11 p-2.5 text-base",
};
</script>

<template>
  <button
    type="button"
    data-slot="icon-motion"
    :aria-pressed="active"
    :class="
      cn(
        'relative inline-flex items-center justify-center rounded-lg border bg-background text-foreground hover:bg-muted/80 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring select-none overflow-hidden',
        sizeClasses[size],
        props.class
      )
    "
    @click="handleClick"
  >
    <div class="relative size-full flex items-center justify-center">
      <!-- First Icon (Default / False State) -->
      <div
        :class="
          cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            transition === 'morph' &&
              (!active
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-50 -rotate-90 pointer-events-none'),
            transition === 'flip' &&
              (!active
                ? 'opacity-100 rotate-y-0'
                : 'opacity-0 [transform:rotateY(90deg)] pointer-events-none'),
            transition === 'slide' &&
              (!active
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-3 pointer-events-none'),
            transition === 'fade' &&
              (!active ? 'opacity-100' : 'opacity-0 pointer-events-none')
          )
        "
      >
        <slot name="first" />
      </div>

      <!-- Second Icon (Toggled / True State) -->
      <div
        :class="
          cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            transition === 'morph' &&
              (active
                ? 'opacity-100 scale-100 rotate-0'
                : 'opacity-0 scale-50 rotate-90 pointer-events-none'),
            transition === 'flip' &&
              (active
                ? 'opacity-100 rotate-y-0'
                : 'opacity-0 [transform:rotateY(-90deg)] pointer-events-none'),
            transition === 'slide' &&
              (active
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 pointer-events-none'),
            transition === 'fade' &&
              (active ? 'opacity-100' : 'opacity-0 pointer-events-none')
          )
        "
      >
        <slot name="second" />
      </div>
    </div>
  </button>
</template>
