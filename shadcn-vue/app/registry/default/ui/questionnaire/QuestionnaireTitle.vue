<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <h3
    data-slot="questionnaire-title"
    :class="
      cn(
        'font-heading text-base leading-snug font-medium text-pretty',
        props.class
      )
    "
  >
    <slot />
  </h3>
</template>
