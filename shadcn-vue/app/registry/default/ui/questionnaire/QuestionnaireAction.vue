<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Button } from "@/registry/default/ui/button";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div data-slot="questionnaire-action" :class="cn('flex items-center justify-end gap-2 pt-2', props.class)">
    <slot />
  </div>
</template>
