<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenubarTrigger, type MenubarTriggerProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<MenubarTriggerProps & { class?: HTMLAttributes["class"] }>();
</script>

<template>
  <MenubarTrigger
    data-slot="menubar-trigger"
    :class="
      cn(
        'flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-none select-none hover:bg-muted focus:bg-muted focus:text-accent-foreground data-[state=open]:bg-muted',
        props.class
      )
    "
    v-bind="props"
  >
    <slot />
  </MenubarTrigger>
</template>
