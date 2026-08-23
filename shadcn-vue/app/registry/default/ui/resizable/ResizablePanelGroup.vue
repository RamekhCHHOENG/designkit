<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  SplitterGroup,
  type SplitterGroupEmits,
  type SplitterGroupProps,
  useForwardPropsEmits,
} from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<SplitterGroupProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<SplitterGroupEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterGroup
    data-slot="resizable-panel-group"
    :class="
      cn(
        'flex h-full w-full data-[orientation=vertical]:flex-col',
        props.class
      )
    "
    v-bind="forwarded"
  >
    <slot />
  </SplitterGroup>
</template>
