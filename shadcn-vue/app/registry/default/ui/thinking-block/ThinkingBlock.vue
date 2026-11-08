<script setup lang="ts">
import { ref, computed, watch, type HTMLAttributes } from "vue";
import { ChevronRight, Sparkles, Copy, Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface ThinkingBlockProps {
  title?: string;
  isStreaming?: boolean;
  durationMs?: number;
  tokens?: number;
  defaultOpen?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ThinkingBlockProps>(), {
  title: "Thinking Process",
  isStreaming: false,
  defaultOpen: false,
});

const isOpen = ref(props.defaultOpen || props.isStreaming);
const copied = ref(false);
const contentRef = ref<HTMLDivElement | null>(null);

watch(
  () => props.isStreaming,
  (streaming) => {
    if (streaming) {
      isOpen.value = true;
    }
  }
);

const durationFormatted = computed(() => {
  if (!props.durationMs) return null;
  if (props.durationMs < 1000) return `${props.durationMs}ms`;
  return `${(props.durationMs / 1000).toFixed(1)}s`;
});

async function handleCopy(e: MouseEvent) {
  e.stopPropagation();
  if (!contentRef.value) return;
  try {
    await navigator.clipboard.writeText(contentRef.value.innerText);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch {}
}
</script>

<template>
  <div
    data-slot="thinking-block"
    :class="
      cn(
        'rounded-xl border bg-muted/30 dark:bg-muted/15 overflow-hidden transition-all text-xs',
        isStreaming && 'border-primary/40 ring-1 ring-primary/20',
        props.class
      )
    "
  >
    <button
      type="button"
      :aria-expanded="isOpen"
      class="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors select-none"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2">
        <ChevronRight
          :class="
            cn(
              'size-3.5 text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-90'
            )
          "
        />
        <div class="flex items-center gap-1.5 font-medium text-foreground">
          <span v-if="isStreaming" class="relative flex size-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
            />
            <span
              class="relative inline-flex rounded-full size-2 bg-primary"
            />
          </span>
          <Sparkles v-else class="size-3.5 text-primary" />
          <span>{{ title }}</span>
        </div>
      </div>

      <div class="flex items-center gap-2 text-muted-foreground">
        <span v-if="tokens">{{ tokens.toLocaleString() }} tokens</span>
        <template v-if="durationFormatted">
          <span v-if="tokens">•</span>
          <span>{{ durationFormatted }}</span>
        </template>

        <div
          role="button"
          tabindex="0"
          title="Copy thinking output"
          aria-label="Copy thinking output"
          class="p-1 rounded hover:bg-background/80 transition-colors text-muted-foreground hover:text-foreground ml-1"
          @click="handleCopy"
        >
          <Check v-if="copied" class="size-3 text-emerald-500" />
          <Copy v-else class="size-3" />
        </div>
      </div>
    </button>

    <div
      v-if="isOpen"
      ref="contentRef"
      class="px-4 pb-3 pt-1 text-muted-foreground leading-relaxed border-t border-border/40 font-mono text-[11px] whitespace-pre-wrap select-text bg-background/50"
    >
      <slot />
    </div>
  </div>
</template>
