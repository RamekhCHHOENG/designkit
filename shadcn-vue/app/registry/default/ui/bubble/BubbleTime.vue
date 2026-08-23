<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <time
    data-slot="bubble-time"
    :class="cn('text-[11px] text-muted-foreground self-end px-1', props.class)"
  >
    <slot />
  </time>
</template>
