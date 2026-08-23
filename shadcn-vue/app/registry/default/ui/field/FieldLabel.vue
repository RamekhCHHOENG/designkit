<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Label } from "@/registry/default/ui/label";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
  for?: string;
}>();
</script>

<template>
  <Label
    data-slot="field-label"
    :for="props.for"
    :class="
      cn(
        'group/field-label peer/field-label flex w-fit gap-1 text-sm font-medium leading-none select-none group-data-[disabled=true]/field:opacity-50',
        props.class
      )
    "
  >
    <slot />
  </Label>
</template>
