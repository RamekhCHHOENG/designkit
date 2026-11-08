<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonGroupVariants } from ".";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";

interface Props {
  class?: HTMLAttributes["class"];
  orientation?: ButtonGroupVariants["orientation"];
  as?: PrimitiveProps["as"];
  asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  asChild: false,
});
</script>

<template>
  <Primitive
    role="group"
    data-slot="button-group"
    :data-orientation="props.orientation"
    :as="props.as"
    :as-child="props.asChild"
    :class="
      cn(
        'bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
