<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        'grid w-full auto-rows-[20rem] grid-cols-1 gap-4 md:grid-cols-3',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
