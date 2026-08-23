<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="questionnaire"
    :class="cn('flex w-full min-w-0 flex-col gap-4', props.class)"
  >
    <slot />
  </div>
</template>
