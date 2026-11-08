<script setup lang="ts">
import { ref, computed, nextTick, type HTMLAttributes } from "vue";
import { AtSign, Hash } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface MentionOption {
  value: string;
  label: string;
  avatar?: string;
  description?: string;
}

export interface MentionsProps {
  options: MentionOption[];
  prefix?: string;
  modelValue?: string;
  placeholder?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MentionsProps>(), {
  prefix: "@",
  placeholder: "Type @ to mention someone...",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "mention-select", option: MentionOption): void;
}>();

const internalValue = ref(props.modelValue || "");
const isOpen = ref(false);
const query = ref("");
const activeIndex = ref(0);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const filteredOptions = computed(() => {
  if (!query.value) return props.options.slice(0, 5);
  const q = query.value.toLowerCase();
  return props.options
    .filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase().includes(q)
    )
    .slice(0, 5);
});

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  internalValue.value = target.value;
  emit("update:modelValue", target.value);

  const cursorPos = target.selectionStart;
  const textBeforeCursor = target.value.slice(0, cursorPos);
  const lastPrefixIndex = textBeforeCursor.lastIndexOf(props.prefix);

  if (lastPrefixIndex !== -1) {
    const match = textBeforeCursor.slice(lastPrefixIndex + props.prefix.length);
    if (!/\s/.test(match)) {
      query.value = match;
      isOpen.value = true;
      activeIndex.value = 0;
      return;
    }
  }

  isOpen.value = false;
}

function insertMention(option: MentionOption) {
  const textarea = textareaRef.value;
  if (!textarea) return;

  const cursorPos = textarea.selectionStart;
  const textBeforeCursor = internalValue.value.slice(0, cursorPos);
  const lastPrefixIndex = textBeforeCursor.lastIndexOf(props.prefix);

  if (lastPrefixIndex !== -1) {
    const before = internalValue.value.slice(0, lastPrefixIndex);
    const after = internalValue.value.slice(cursorPos);
    const inserted = `${props.prefix}${option.value} `;
    const newVal = `${before}${inserted}${after}`;

    internalValue.value = newVal;
    isOpen.value = false;
    emit("update:modelValue", newVal);
    emit("mention-select", option);

    nextTick(() => {
      textarea.focus();
      textarea.setSelectionRange(
        before.length + inserted.length,
        before.length + inserted.length
      );
    });
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (!isOpen.value || filteredOptions.value.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % filteredOptions.value.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex.value =
      (activeIndex.value - 1 + filteredOptions.value.length) %
      filteredOptions.value.length;
  } else if (e.key === "Enter" || e.key === "Tab") {
    e.preventDefault();
    insertMention(filteredOptions.value[activeIndex.value]);
  } else if (e.key === "Escape") {
    isOpen.value = false;
  }
}
</script>

<template>
  <div data-slot="mentions" class="relative w-full text-xs">
    <textarea
      ref="textareaRef"
      :value="modelValue !== undefined ? modelValue : internalValue"
      :placeholder="placeholder"
      :class="
        cn(
          'w-full min-h-[90px] rounded-xl border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none shadow-2xs transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 leading-relaxed resize-y',
          props.class
        )
      "
      @input="handleInput"
      @keydown="handleKeyDown"
    />

    <div
      v-if="isOpen && filteredOptions.length > 0"
      class="absolute left-3 bottom-full mb-1.5 z-50 w-60 rounded-xl border bg-popover text-popover-foreground shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 p-1 bg-background"
    >
      <div class="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1 border-b mb-1">
        <AtSign v-if="prefix === '@'" class="size-3" />
        <Hash v-else class="size-3" />
        <span>Suggestions</span>
      </div>
      <ul class="flex flex-col gap-0.5">
        <li
          v-for="(opt, idx) in filteredOptions"
          :key="opt.value"
          :class="
            cn(
              'flex items-center gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer select-none transition-colors',
              idx === activeIndex
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-foreground hover:bg-muted'
            )
          "
          @mousedown.prevent="insertMention(opt)"
        >
          <img
            v-if="opt.avatar"
            :src="opt.avatar"
            :alt="opt.label"
            class="size-5 rounded-full object-cover shrink-0"
          />
          <div
            v-else
            :class="
              cn(
                'size-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0',
                idx === activeIndex ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
              )
            "
          >
            {{ opt.label[0].toUpperCase() }}
          </div>
          <div class="flex flex-col min-w-0 flex-1">
            <span class="truncate">{{ opt.label }}</span>
            <span
              v-if="opt.description"
              :class="cn('text-[10px] truncate', idx === activeIndex ? 'text-white/80' : 'text-muted-foreground')"
            >
              {{ opt.description }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
