<script setup lang="ts">
import { ref, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import { ArrowUpIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import FloatButton from "./FloatButton.vue";

export interface FloatButtonBackTopProps {
  visibilityHeight?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FloatButtonBackTopProps>(), {
  visibilityHeight: 300,
});

const visible = ref(false);

function handleScroll() {
  if (typeof window !== "undefined") {
    visible.value = window.scrollY >= props.visibilityHeight;
  }
}

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <FloatButton
    v-if="visible"
    aria-label="Back to top"
    :class="cn('text-primary hover:text-primary', props.class)"
    @click="scrollToTop"
  >
    <ArrowUpIcon class="size-4" />
  </FloatButton>
</template>
