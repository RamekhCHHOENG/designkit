<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { ArrowDownIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    autoScroll?: boolean;
    class?: string;
  }>(),
  {
    autoScroll: true,
  }
);

const scrollRef = ref<HTMLElement | null>(null);
const showScrollButton = ref(false);

function scrollToBottom(behavior: ScrollBehavior = "smooth") {
  if (!scrollRef.value) return;
  scrollRef.value.scrollTo({
    top: scrollRef.value.scrollHeight,
    behavior,
  });
  showScrollButton.value = false;
}

function handleScroll() {
  if (!scrollRef.value) return;
  const { scrollTop, scrollHeight, clientHeight } = scrollRef.value;
  showScrollButton.value = scrollHeight - scrollTop - clientHeight > 120;
}

onMounted(() => {
  if (props.autoScroll) {
    nextTick(() => scrollToBottom("auto"));
  }
});
</script>

<template>
  <div :class="cn('relative flex h-full w-full flex-col overflow-hidden bg-background', props.class)">
    <div
      ref="scrollRef"
      @scroll="handleScroll"
      class="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth"
    >
      <slot />
    </div>

    <button
      v-if="showScrollButton"
      type="button"
      @click="scrollToBottom('smooth')"
      class="absolute bottom-4 right-6 flex items-center gap-1.5 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur-md transition-all hover:bg-muted"
    >
      <ArrowDownIcon class="size-3.5" />
      <span>Latest</span>
    </button>
  </div>
</template>
