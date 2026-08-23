<script setup lang="ts">
import { ref, onMounted, nextTick, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    autoScroll?: boolean;
  }>(),
  {
    autoScroll: true,
  }
);

const scrollRef = ref<HTMLDivElement | null>(null);

function scrollToBottom() {
  if (scrollRef.value) {
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight;
  }
}

onMounted(() => {
  if (props.autoScroll) {
    nextTick(() => scrollToBottom());
  }
});

defineExpose({
  scrollToBottom,
});
</script>

<template>
  <div
    ref="scrollRef"
    data-slot="message-scroller"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-y-auto overscroll-contain p-4 scroll-smooth',
        props.class
      )
    "
  >
    <div class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>
