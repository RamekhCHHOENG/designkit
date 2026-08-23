<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenubarItem, type MenubarItemEmits, type MenubarItemProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
  MenubarItemProps & {
    class?: HTMLAttributes["class"];
    inset?: boolean;
  }
>();

const emits = defineEmits<MenubarItemEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarItem
    data-slot="menubar-item"
    :class="
      cn(
        'relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        inset && 'pl-8',
        props.class
      )
    "
    v-bind="forwarded"
  >
    <slot />
  </MenubarItem>
</template>
