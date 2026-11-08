<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface MorphPlayToggleProps {
  modelValue?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<MorphPlayToggleProps>();

const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "toggle", val: boolean): void;
}>();

const internalPlaying = ref(false);

const active = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalPlaying.value
);

function handleClick() {
  const next = !active.value;
  internalPlaying.value = next;
  emit("update:modelValue", next);
  emit("toggle", next);
}
</script>

<template>
  <button
    type="button"
    data-slot="morph-play-toggle"
    :aria-label="active ? 'Pause' : 'Play'"
    :aria-pressed="active"
    :class="
      cn(
        'relative flex size-9 items-center justify-center rounded-lg border bg-background hover:bg-muted/80 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class
      )
    "
    @click="handleClick"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-4.5 text-foreground transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
    >
      <template v-if="active">
        <rect x="6" y="4" width="4" height="16" rx="1.5" />
        <rect x="14" y="4" width="4" height="16" rx="1.5" />
      </template>
      <path
        v-else
        d="M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z"
      />
    </svg>
  </button>
</template>
