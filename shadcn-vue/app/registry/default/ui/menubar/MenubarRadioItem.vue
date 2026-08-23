<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  MenubarItemIndicator,
  MenubarRadioItem,
  type MenubarRadioItemEmits,
  type MenubarRadioItemProps,
  useForwardPropsEmits,
} from "reka-ui";
import { CircleIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<MenubarRadioItemProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<MenubarRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRadioItem
    data-slot="menubar-radio-item"
    :class="
      cn(
        'relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class
      )
    "
    v-bind="forwarded"
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <MenubarItemIndicator>
        <CircleIcon class="size-2 fill-current" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarRadioItem>
</template>
