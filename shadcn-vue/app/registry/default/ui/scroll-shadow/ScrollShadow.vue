<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    orientation?: "vertical" | "horizontal";
    size?: number;
    hideScrollBar?: boolean;
    offset?: number;
    class?: string;
  }>(),
  {
    orientation: "vertical",
    size: 40,
    hideScrollBar: false,
    offset: 0,
  }
);

const containerRef = ref<HTMLDivElement | null>(null);
const showStart = ref(false);
const showEnd = ref(false);

function checkScroll() {
  const el = containerRef.value;
  if (!el) return;

  if (props.orientation === "vertical") {
    const hasOverflow = el.scrollHeight > el.clientHeight;
    showStart.value = hasOverflow && el.scrollTop > props.offset;
    showEnd.value = hasOverflow && el.scrollTop + el.clientHeight < el.scrollHeight - props.offset - 1;
  } else {
    const hasOverflow = el.scrollWidth > el.clientWidth;
    showStart.value = hasOverflow && el.scrollLeft > props.offset;
    showEnd.value = hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - props.offset - 1;
  }
}

let ro: ResizeObserver | null = null;

onMounted(() => {
  const el = containerRef.value;
  if (!el) return;

  checkScroll();
  el.addEventListener("scroll", checkScroll, { passive: true });

  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(checkScroll);
    ro.observe(el);
  }
});

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener("scroll", checkScroll);
  }
  ro?.disconnect();
});

const isVertical = computed(() => props.orientation === "vertical");
</script>

<template>
  <div :class="cn('relative overflow-hidden', props.class)" data-slot="scroll-shadow">
    <!-- Top / Left Shadow -->
    <div
      data-slot="scroll-shadow-start"
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none absolute z-10 transition-opacity duration-300',
          isVertical
            ? 'top-0 left-0 right-0 bg-gradient-to-b from-background to-transparent'
            : 'top-0 bottom-0 left-0 bg-gradient-to-r from-background to-transparent',
          showStart ? 'opacity-100' : 'opacity-0'
        )
      "
      :style="{
        height: isVertical ? `${size}px` : '100%',
        width: isVertical ? '100%' : `${size}px`,
      }"
    />

    <!-- Scrollable Content Box -->
    <div
      ref="containerRef"
      data-slot="scroll-shadow-content"
      :class="
        cn(
          'h-full w-full',
          isVertical ? 'overflow-y-auto overflow-x-hidden' : 'overflow-x-auto overflow-y-hidden',
          hideScrollBar && 'scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
        )
      "
    >
      <slot />
    </div>

    <!-- Bottom / Right Shadow -->
    <div
      data-slot="scroll-shadow-end"
      aria-hidden="true"
      :class="
        cn(
          'pointer-events-none absolute z-10 transition-opacity duration-300',
          isVertical
            ? 'bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent'
            : 'top-0 bottom-0 right-0 bg-gradient-to-l from-background to-transparent',
          showEnd ? 'opacity-100' : 'opacity-0'
        )
      "
      :style="{
        height: isVertical ? `${size}px` : '100%',
        width: isVertical ? '100%' : `${size}px`,
      }"
    />
  </div>
</template>
