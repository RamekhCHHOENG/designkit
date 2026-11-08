<script setup lang="ts">
import { ref, computed, onMounted, nextTick, type HTMLAttributes } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

export interface SpoilerProps {
  maxHeight?: number;
  showLabel?: string;
  hideLabel?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SpoilerProps>(), {
  maxHeight: 100,
  showLabel: "Show more",
  hideLabel: "Show less",
  defaultExpanded: false,
});

const emit = defineEmits<{
  (e: "update:expanded", value: boolean): void;
}>();

const internalExpanded = ref(props.defaultExpanded);
const contentHeight = ref(0);
const contentRef = ref<HTMLDivElement | null>(null);

const isExpanded = computed(() =>
  props.expanded !== undefined ? props.expanded : internalExpanded.value
);

function measureHeight() {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight;
  }
}

onMounted(() => {
  nextTick(measureHeight);
});

function toggleExpanded() {
  const next = !isExpanded.value;
  internalExpanded.value = next;
  emit("update:expanded", next);
}

const needsCollapse = computed(() => contentHeight.value > props.maxHeight);
</script>

<template>
  <div data-slot="spoiler" :class="cn('relative w-full', props.class)">
    <div
      ref="contentRef"
      :style="{
        maxHeight: !needsCollapse || isExpanded ? undefined : `${maxHeight}px`,
      }"
      :class="
        cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          needsCollapse && !isExpanded && 'relative'
        )
      "
    >
      <slot />

      <div
        v-if="needsCollapse && !isExpanded"
        class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"
      />
    </div>

    <div v-if="needsCollapse" class="pt-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="gap-1 font-medium text-primary hover:text-primary -ml-2 text-xs"
        @click="toggleExpanded"
      >
        <span>{{ isExpanded ? hideLabel : showLabel }}</span>
        <ChevronUpIcon v-if="isExpanded" class="size-3.5" />
        <ChevronDownIcon v-else class="size-3.5" />
      </Button>
    </div>
  </div>
</template>
