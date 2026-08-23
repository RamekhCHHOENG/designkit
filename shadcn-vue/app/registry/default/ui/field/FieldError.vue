<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <p
    data-slot="field-error"
    role="alert"
    :class="cn('text-xs font-medium text-destructive leading-normal', props.class)"
  >
    <slot />
  </p>
</template>
