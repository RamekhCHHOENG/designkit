<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MenubarSeparator, type MenubarSeparatorProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<MenubarSeparatorProps & { class?: HTMLAttributes["class"] }>();
</script>

<template>
  <MenubarSeparator
    data-slot="menubar-separator"
    :class="cn('-mx-1 my-1 h-px bg-border', props.class)"
    v-bind="props"
  />
</template>
