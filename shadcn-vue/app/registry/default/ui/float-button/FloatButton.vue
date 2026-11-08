<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { PlusIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface FloatButtonProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<FloatButtonProps>();
</script>

<template>
  <button
    type="button"
    data-slot="float-button"
    :class="
      cn(
        'relative flex size-10 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-muted active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class
      )
    "
  >
    <slot>
      <PlusIcon class="size-4" />
    </slot>
  </button>
</template>
