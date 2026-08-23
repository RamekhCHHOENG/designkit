<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Input } from "@/registry/default/ui/input";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <Input
    data-sidebar="input"
    data-slot="sidebar-input"
    :class="
      cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        props.class
      )
    "
  />
</template>
