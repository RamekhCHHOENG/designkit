<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <p
    data-slot="questionnaire-description"
    :class="cn('text-sm text-pretty text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>
