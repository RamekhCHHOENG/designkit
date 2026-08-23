import { createInjectionState } from "@vueuse/core";
import emblaCarouselVue from "embla-carousel-vue";
import type { EmblaCarouselType as CarouselApi, EmblaOptionsType as CarouselOptions, EmblaPluginType as CarouselPlugin } from "embla-carousel";
import { ref, type Ref } from "vue";

export type { CarouselApi, CarouselOptions, CarouselPlugin };

export type Orientation = "horizontal" | "vertical";

export interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
  orientation?: Orientation;
}

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({ opts, orientation = "horizontal", plugins }: CarouselProps) => {
    const [emblaNode, emblaApi] = emblaCarouselVue(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    const canScrollPrev = ref(false);
    const canScrollNext = ref(false);

    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }

    function scrollNext() {
      emblaApi.value?.scrollNext();
    }

    function onSelect(api: CarouselApi) {
      canScrollPrev.value = api.canScrollPrev();
      canScrollNext.value = api.canScrollNext();
    }

    watch(emblaApi, (api) => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
    });

    return {
      carouselRef: emblaNode,
      carouselApi: emblaApi,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      orientation,
    };
  }
);

function useCarousel() {
  const carouselState = useInjectCarousel();
  if (!carouselState) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return carouselState;
}

export { useProvideCarousel, useCarousel };
