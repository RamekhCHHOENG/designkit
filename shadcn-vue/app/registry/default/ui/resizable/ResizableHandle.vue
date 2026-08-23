<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  SplitterResizeHandle,
  type SplitterResizeHandleEmits,
  type SplitterResizeHandleProps,
  useForwardPropsEmits,
} from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
  SplitterResizeHandleProps & {
    class?: HTMLAttributes["class"];
    withHandle?: boolean;
  }
>();

const emits = defineEmits<SplitterResizeHandleEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SplitterResizeHandle
    data-slot="resizable-handle"
    :class="
      cn(
        'relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2 [&[data-orientation=vertical]>div]:rotate-90',
        props.class
      )
    "
    v-bind="forwarded"
  >
    <div
      v-if="withHandle"
      class="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border"
    />
  </SplitterResizeHandle>
</template>
