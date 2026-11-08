<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import type { HTMLAttributes } from "vue";

interface Props {
  as?: PrimitiveProps["as"];
  asChild?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  asChild: false,
});
</script>

<template>
  <Primitive
    data-slot="snippet-header"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn('bg-secondary flex flex-row items-center justify-between border-b p-1.5', props.class)
    "
  >
    <slot />
  </Primitive>
</template>
