<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="item-description"
    :class="cn('text-xs text-muted-foreground leading-normal', props.class)"
  >
    <slot />
  </div>
</template>
