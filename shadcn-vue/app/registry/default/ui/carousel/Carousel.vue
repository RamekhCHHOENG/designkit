<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useProvideCarousel, type CarouselProps, type Orientation } from "./useCarousel";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<
    CarouselProps & {
      class?: HTMLAttributes["class"];
      orientation?: Orientation;
    }
  >(),
  {
    orientation: "horizontal",
  }
);

const emits = defineEmits<{
  (e: "init-api", payload: any): void;
}>();

const carouselState = useProvideCarousel(props);

watch(
  () => carouselState.carouselApi.value,
  (api) => {
    if (api) {
      emits("init-api", api);
    }
  }
);
</script>

<template>
  <div
    data-slot="carousel"
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
  >
    <slot />
  </div>
</template>
