<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface MorphMenuToggleProps {
  modelValue?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<MorphMenuToggleProps>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "toggle", val: boolean): void;
}>();

const internalOpen = ref(false);

const active = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalOpen.value
);

function handleClick() {
  const next = !active.value;
  internalOpen.value = next;
  emit("update:modelValue", next);
  emit("toggle", next);
}
</script>

<template>
  <button
    type="button"
    data-slot="morph-menu-toggle"
    :aria-label="active ? 'Close menu' : 'Open menu'"
    :aria-expanded="active"
    :class="
      cn(
        'relative flex size-9 items-center justify-center rounded-lg border bg-background hover:bg-muted/80 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class
      )
    "
    @click="handleClick"
  >
    <div class="relative size-4 flex flex-col justify-between">
      <!-- Top line -->
      <span
        :class="
          cn(
            'h-0.5 w-full bg-foreground rounded-full transition-all duration-300 origin-center ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            active && 'translate-y-[7px] rotate-45'
          )
        "
      />
      <!-- Middle line -->
      <span
        :class="
          cn(
            'h-0.5 w-full bg-foreground rounded-full transition-all duration-200 ease-out',
            active && 'opacity-0 scale-x-0'
          )
        "
      />
      <!-- Bottom line -->
      <span
        :class="
          cn(
            'h-0.5 w-full bg-foreground rounded-full transition-all duration-300 origin-center ease-[cubic-bezier(0.34,1.56,0.64,1)]',
            active && '-translate-y-[7px] -rotate-45'
          )
        "
      />
    </div>
  </button>
</template>
