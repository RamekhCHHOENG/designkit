<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ChevronRightIcon } from "lucide-vue-next";
import { Button } from "@/registry/default/ui/button";
import { useCarousel } from "./useCarousel";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-next"
    variant="outline"
    size="icon"
    :disabled="!canScrollNext"
    :class="
      cn(
        'absolute size-8 rounded-full z-10',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class
      )
    "
    @click="scrollNext"
  >
    <ChevronRightIcon class="size-4" />
    <span class="sr-only">Next slide</span>
  </Button>
</template>
