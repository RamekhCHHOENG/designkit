<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    showIcon?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    showIcon: false,
  }
);
</script>

<template>
  <div
    data-sidebar="menu-skeleton"
    data-slot="sidebar-menu-skeleton"
    :class="cn('flex h-8 items-center gap-2 rounded-md px-2', props.class)"
  >
    <Skeleton
      v-if="showIcon"
      class="size-4 rounded-md"
      data-sidebar="menu-skeleton-icon"
    />
    <Skeleton
      class="h-4 max-w-(--skeleton-width) flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{
        '--skeleton-width': '70%',
      }"
    />
  </div>
</template>
