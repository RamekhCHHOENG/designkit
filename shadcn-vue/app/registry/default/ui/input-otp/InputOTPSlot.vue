<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PinInputInput } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<{
  index: number;
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <PinInputInput
    data-slot="input-otp-slot"
    :index="index"
    :class="
      cn(
        'relative flex size-9 items-center justify-center border-y border-r border-input text-center text-sm transition-all first:rounded-l-lg first:border-l last:rounded-r-lg focus:relative focus:z-10 focus:border-ring focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
        props.class
      )
    "
  />
</template>
