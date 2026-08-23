<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  MenubarContent,
  type MenubarContentProps,
  MenubarPortal,
  useForwardProps,
} from "reka-ui";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<
    MenubarContentProps & {
      class?: HTMLAttributes["class"];
    }
  >(),
  {
    align: "start",
    alignOffset: -4,
    sideOffset: 8,
  }
);

const forwarded = useForwardProps(props);
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      data-slot="menubar-content"
      :class="
        cn(
          'z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-all duration-100',
          props.class
        )
      "
      v-bind="forwarded"
    >
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>
