<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="drawer-swipe-handle"
    aria-hidden="true"
    :class="
      cn(
        'mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
