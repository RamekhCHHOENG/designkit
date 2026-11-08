<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const dockContext = inject<{
  direction: "horizontal" | "vertical";
}>("dockContext");
</script>

<template>
  <div
    role="separator"
    :class="
      cn(
        'bg-border/60',
        dockContext?.direction === 'vertical' ? 'my-1 h-px w-6' : 'mx-1 h-6 w-px',
        props.class
      )
    "
  />
</template>
