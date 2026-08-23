<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenubarRoot, type MenubarRootEmits, type MenubarRootProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<MenubarRootProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<MenubarRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarRoot
    data-slot="menubar"
    :class="cn('flex h-9 items-center gap-1 rounded-lg border bg-background p-1 shadow-xs', props.class)"
    v-bind="forwarded"
  >
    <slot />
  </MenubarRoot>
</template>
