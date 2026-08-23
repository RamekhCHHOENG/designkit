<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import {
  MenubarPortal,
  MenubarSubContent,
  type MenubarSubContentEmits,
  type MenubarSubContentProps,
  useForwardPropsEmits,
} from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<MenubarSubContentProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<MenubarSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarPortal>
    <MenubarSubContent
      data-slot="menubar-sub-content"
      :class="
        cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg transition-all duration-100',
          props.class
        )
      "
      v-bind="forwarded"
    >
      <slot />
    </MenubarSubContent>
  </MenubarPortal>
</template>
