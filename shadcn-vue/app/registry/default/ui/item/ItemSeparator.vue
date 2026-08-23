<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Separator } from "@/registry/default/ui/separator";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <Separator
    data-slot="item-separator"
    orientation="horizontal"
    :class="cn('my-2', props.class)"
  />
</template>
