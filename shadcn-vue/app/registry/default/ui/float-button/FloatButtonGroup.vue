<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { PlusIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import FloatButton from "./FloatButton.vue";

export interface FloatButtonGroupProps {
  trigger?: "click" | "hover";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FloatButtonGroupProps>(), {
  trigger: "click",
});

const open = ref(false);
</script>

<template>
  <div
    data-slot="float-button-group"
    :class="cn('fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 select-none', props.class)"
    @mouseenter="trigger === 'hover' && (open = true)"
    @mouseleave="trigger === 'hover' && (open = false)"
  >
    <div
      v-if="open"
      class="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <slot />
    </div>

    <FloatButton
      class="bg-primary text-primary-foreground hover:bg-primary/90"
      @click="trigger === 'click' && (open = !open)"
    >
      <PlusIcon :class="cn('size-4 transition-transform duration-300', open && 'rotate-45')" />
    </FloatButton>
  </div>
</template>
