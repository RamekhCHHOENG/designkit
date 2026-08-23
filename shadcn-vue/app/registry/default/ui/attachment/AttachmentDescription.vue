<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span
    data-slot="attachment-description"
    :class="cn('block truncate text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </span>
</template>
