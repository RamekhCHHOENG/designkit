<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { MinusIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="input-otp-separator"
    role="separator"
    :class="cn('flex items-center px-1 text-muted-foreground', props.class)"
  >
    <MinusIcon class="size-4" />
  </div>
</template>
