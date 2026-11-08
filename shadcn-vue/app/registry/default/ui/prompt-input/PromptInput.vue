<script setup lang="ts">
import { ref, computed, watch, nextTick, type HTMLAttributes } from "vue";
import { ArrowUp, Paperclip, Square, X } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface PromptAttachment {
  id: string;
  name: string;
  size?: string;
  type?: string;
}

export interface PromptInputProps {
  modelValue?: string;
  placeholder?: string;
  isStreaming?: boolean;
  attachments?: PromptAttachment[];
  maxHeight?: number;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PromptInputProps>(), {
  modelValue: "",
  placeholder: "Ask anything or type a prompt...",
  isStreaming: false,
  attachments: () => [],
  maxHeight: 240,
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
  (e: "submit", value: string, attachments: PromptAttachment[]): void;
  (e: "stop"): void;
  (e: "removeAttachment", id: string): void;
  (e: "attachClick"): void;
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

function resizeTextarea() {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, props.maxHeight)}px`;
}

watch(
  () => props.modelValue,
  () => {
    nextTick(resizeTextarea);
  }
);

function handleInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value;
  emit("update:modelValue", val);
  resizeTextarea();
}

function handleSubmit() {
  if (props.isStreaming) {
    emit("stop");
    return;
  }
  const trimmed = props.modelValue.trim();
  if (!trimmed && props.attachments.length === 0) return;
  emit("submit", trimmed, props.attachments);
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
}
</script>

<template>
  <div
    data-slot="prompt-input"
    :class="
      cn(
        'relative flex flex-col rounded-2xl border bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring transition-all',
        disabled && 'opacity-60 pointer-events-none',
        props.class
      )
    "
  >
    <!-- Attachment Chips -->
    <div
      v-if="attachments.length > 0"
      class="flex flex-wrap items-center gap-1.5 p-3 pb-1 border-b border-border/40"
    >
      <span
        v-for="file in attachments"
        :key="file.id"
        class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-xs text-foreground font-medium"
      >
        <Paperclip class="size-3 text-muted-foreground" />
        <span class="truncate max-w-[140px]">{{ file.name }}</span>
        <button
          type="button"
          class="p-0.5 rounded-full hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground"
          @click="emit('removeAttachment', file.id)"
        >
          <X class="size-3" />
        </button>
      </span>
    </div>

    <!-- Text Input Area -->
    <div class="flex items-start px-3 pt-3">
      <textarea
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        rows="1"
        class="w-full resize-none bg-transparent outline-none text-sm placeholder:text-muted-foreground leading-relaxed min-h-[36px]"
        @input="handleInput"
        @keydown="handleKeyDown"
      />
    </div>

    <!-- Bottom Actions Toolbar -->
    <div class="flex items-center justify-between px-3 pb-3 pt-1">
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          title="Attach files"
          aria-label="Attach files"
          class="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          @click="emit('attachClick')"
        >
          <Paperclip class="size-4" />
        </button>

        <slot name="addon-leading" />
      </div>

      <button
        type="button"
        :disabled="
          disabled ||
          (!isStreaming && !modelValue.trim() && attachments.length === 0)
        "
        :title="isStreaming ? 'Stop generating' : 'Send prompt'"
        :aria-label="isStreaming ? 'Stop generating' : 'Send prompt'"
        :class="
          cn(
            'flex size-8 items-center justify-center rounded-full transition-all shadow-xs shrink-0',
            isStreaming
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none'
          )
        "
        @click="handleSubmit"
      >
        <Square v-if="isStreaming" class="size-3.5 fill-current" />
        <ArrowUp v-else class="size-4 stroke-[2.5]" />
      </button>
    </div>
  </div>
</template>
