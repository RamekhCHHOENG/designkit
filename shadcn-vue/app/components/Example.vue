<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  title?: string;
  class?: HTMLAttributes["class"];
  containerClassName?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="example"
    :class="
      cn(
        'mx-auto flex w-full max-w-lg min-w-0 flex-col gap-1 self-stretch lg:max-w-none',
        props.containerClassName
      )
    "
  >
    <div v-if="title" class="px-1.5 py-2 text-xs font-medium text-muted-foreground">
      {{ title }}
    </div>
    <div
      data-slot="example-content"
      :class="
        cn(
          'flex min-w-0 flex-1 flex-col items-start gap-6 rounded-xl border bg-card p-6 md:p-12 text-foreground *:[div:not([class*=\'w-\'])]:w-full',
          props.class
        )
      "
    >
      <slot />
    </div>
  </div>
</template>
