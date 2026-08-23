<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="questionnaire-item"
    :class="cn('flex min-w-0 flex-col gap-4 border-0 p-0 outline-none', props.class)"
  >
    <slot />
  </div>
</template>
