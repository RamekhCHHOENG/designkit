<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ChevronLeftIcon } from "lucide-vue-next";
import { Button } from "@/registry/default/ui/button";
import { useCarousel } from "./useCarousel";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-previous"
    variant="outline"
    size="icon"
    :disabled="!canScrollPrev"
    :class="
      cn(
        'absolute size-8 rounded-full z-10',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class
      )
    "
    @click="scrollPrev"
  >
    <ChevronLeftIcon class="size-4" />
    <span class="sr-only">Previous slide</span>
  </Button>
</template>
