<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { CheckIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    selected?: boolean;
  }>(),
  {
    selected: false,
  }
);

const emits = defineEmits<{
  (e: "select"): void;
}>();
</script>

<template>
  <button
    type="button"
    data-slot="questionnaire-choice"
    :data-state="selected ? 'checked' : 'unchecked'"
    :class="
      cn(
        'group/questionnaire-choice relative flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected && 'border-primary bg-primary/5 text-primary',
        props.class
      )
    "
    @click="emits('select')"
  >
    <slot />
    <span
      data-slot="questionnaire-choice-indicator"
      :class="
        cn(
          'flex size-4 shrink-0 items-center justify-center rounded-full border border-muted-foreground/30',
          selected && 'border-primary bg-primary text-primary-foreground'
        )
      "
    >
      <CheckIcon v-if="selected" class="size-3" />
    </span>
  </button>
</template>
