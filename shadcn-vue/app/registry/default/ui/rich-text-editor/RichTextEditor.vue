<script setup lang="ts">
import { ref, computed, watch, onMounted, type HTMLAttributes } from "vue";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  RemoveFormatting,
  Eye,
  FileCode,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  modelValue?: string;
  placeholder?: string;
  minHeight?: string | number;
  readOnly?: boolean;
  showWordCount?: boolean;
  showSourceToggle?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<RichTextEditorProps>(), {
  modelValue: "",
  placeholder: "Write your content here...",
  minHeight: "160px",
  readOnly: false,
  showWordCount: true,
  showSourceToggle: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
  (e: "change", html: string, text: string): void;
}>();

const editorRef = ref<HTMLDivElement | null>(null);
const htmlContent = ref(props.modelValue);
const isSourceMode = ref(false);
const stats = ref({ words: 0, chars: 0 });

function updateStats() {
  if (!editorRef.value) return;
  const text = editorRef.value.innerText || "";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  stats.value = { words, chars };
}

onMounted(() => {
  if (editorRef.value && props.modelValue) {
    editorRef.value.innerHTML = props.modelValue;
    updateStats();
  }
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (editorRef.value && !isSourceMode.value && editorRef.value.innerHTML !== newVal) {
      editorRef.value.innerHTML = newVal;
      updateStats();
    }
  }
);

function handleInput() {
  if (!editorRef.value) return;
  const html = editorRef.value.innerHTML;
  const text = editorRef.value.innerText;
  htmlContent.value = html;
  updateStats();
  emit("update:modelValue", html);
  emit("change", html, text);
}

function execCommand(command: string, arg?: string) {
  if (props.readOnly || isSourceMode.value) return;
  editorRef.value?.focus();
  document.execCommand(command, false, arg);
  handleInput();
}

function handleLink() {
  const url = window.prompt("Enter destination URL:", "https://");
  if (url) {
    execCommand("createLink", url);
  }
}

const minHeightStyle = computed(() =>
  typeof props.minHeight === "number" ? `${props.minHeight}px` : props.minHeight
);
</script>

<template>
  <div
    data-slot="rich-text-editor"
    :class="
      cn(
        'flex flex-col w-full rounded-xl border bg-background overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring transition-all',
        readOnly && 'opacity-80 pointer-events-none bg-muted/20',
        props.class
      )
    "
  >
    <!-- Editor Toolbar -->
    <div
      v-if="!readOnly"
      class="flex flex-wrap items-center gap-1 p-1.5 border-b bg-muted/40 text-muted-foreground select-none"
    >
      <!-- History -->
      <div class="flex items-center gap-0.5 pr-1 border-r border-border/60">
        <button
          type="button"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('undo')"
        >
          <Undo class="size-3.5" />
        </button>
        <button
          type="button"
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('redo')"
        >
          <Redo class="size-3.5" />
        </button>
      </div>

      <!-- Formatting -->
      <div class="flex items-center gap-0.5 px-1 border-r border-border/60">
        <button
          type="button"
          title="Bold (Ctrl+B)"
          aria-label="Bold"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('bold')"
        >
          <Bold class="size-3.5" />
        </button>
        <button
          type="button"
          title="Italic (Ctrl+I)"
          aria-label="Italic"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('italic')"
        >
          <Italic class="size-3.5" />
        </button>
        <button
          type="button"
          title="Underline (Ctrl+U)"
          aria-label="Underline"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('underline')"
        >
          <Underline class="size-3.5" />
        </button>
        <button
          type="button"
          title="Strikethrough"
          aria-label="Strikethrough"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('strikeThrough')"
        >
          <Strikethrough class="size-3.5" />
        </button>
        <button
          type="button"
          title="Code block"
          aria-label="Code block"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('formatBlock', '<pre>')"
        >
          <Code class="size-3.5" />
        </button>
      </div>

      <!-- Headings -->
      <div class="flex items-center gap-0.5 px-1 border-r border-border/60">
        <button
          type="button"
          title="Heading 1"
          aria-label="Heading 1"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors font-bold text-xs"
          @click="execCommand('formatBlock', '<h1>')"
        >
          <Heading1 class="size-3.5" />
        </button>
        <button
          type="button"
          title="Heading 2"
          aria-label="Heading 2"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors font-semibold text-xs"
          @click="execCommand('formatBlock', '<h2>')"
        >
          <Heading2 class="size-3.5" />
        </button>
        <button
          type="button"
          title="Heading 3"
          aria-label="Heading 3"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors text-xs"
          @click="execCommand('formatBlock', '<h3>')"
        >
          <Heading3 class="size-3.5" />
        </button>
      </div>

      <!-- Lists & Quotes -->
      <div class="flex items-center gap-0.5 px-1 border-r border-border/60">
        <button
          type="button"
          title="Bullet List"
          aria-label="Bullet List"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('insertUnorderedList')"
        >
          <List class="size-3.5" />
        </button>
        <button
          type="button"
          title="Numbered List"
          aria-label="Numbered List"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('insertOrderedList')"
        >
          <ListOrdered class="size-3.5" />
        </button>
        <button
          type="button"
          title="Blockquote"
          aria-label="Blockquote"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('formatBlock', '<blockquote>')"
        >
          <Quote class="size-3.5" />
        </button>
        <button
          type="button"
          title="Insert Link"
          aria-label="Insert Link"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="handleLink"
        >
          <LinkIcon class="size-3.5" />
        </button>
      </div>

      <!-- Alignment -->
      <div class="flex items-center gap-0.5 px-1 border-r border-border/60">
        <button
          type="button"
          title="Align Left"
          aria-label="Align Left"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('justifyLeft')"
        >
          <AlignLeft class="size-3.5" />
        </button>
        <button
          type="button"
          title="Align Center"
          aria-label="Align Center"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('justifyCenter')"
        >
          <AlignCenter class="size-3.5" />
        </button>
        <button
          type="button"
          title="Align Right"
          aria-label="Align Right"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('justifyRight')"
        >
          <AlignRight class="size-3.5" />
        </button>
      </div>

      <!-- Clear & View Mode -->
      <div class="flex items-center gap-0.5 ml-auto">
        <button
          type="button"
          title="Clear Formatting"
          aria-label="Clear Formatting"
          class="p-1.5 rounded hover:bg-muted hover:text-foreground transition-colors"
          @click="execCommand('removeFormat')"
        >
          <RemoveFormatting class="size-3.5" />
        </button>
        <button
          v-if="showSourceToggle"
          type="button"
          :title="isSourceMode ? 'Visual Editor' : 'HTML Source'"
          :aria-label="isSourceMode ? 'Visual Editor' : 'HTML Source'"
          :class="
            cn(
              'p-1.5 rounded hover:bg-muted transition-colors flex items-center gap-1 text-[11px] font-medium',
              isSourceMode ? 'bg-muted text-foreground' : 'text-muted-foreground'
            )
          "
          @click="isSourceMode = !isSourceMode"
        >
          <Eye v-if="isSourceMode" class="size-3.5" />
          <FileCode v-else class="size-3.5" />
        </button>
      </div>
    </div>

    <!-- Editor Body -->
    <textarea
      v-if="isSourceMode"
      v-model="htmlContent"
      :style="{ minHeight: minHeightStyle }"
      class="w-full p-4 font-mono text-xs bg-muted/10 outline-none resize-y text-foreground border-none"
      @input="
        emit('update:modelValue', htmlContent);
        if (editorRef) {
          editorRef.innerHTML = htmlContent;
          updateStats();
        }
      "
    />
    <div
      v-else
      ref="editorRef"
      :contenteditable="!readOnly"
      :style="{ minHeight: minHeightStyle }"
      :data-placeholder="placeholder"
      class="p-4 outline-none text-sm text-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/60 empty:before:pointer-events-none"
      @input="handleInput"
    />

    <!-- Footer Counter -->
    <div
      v-if="showWordCount"
      class="flex items-center justify-between px-3 py-1.5 border-t bg-muted/20 text-[11px] text-muted-foreground select-none"
    >
      <span>{{ isSourceMode ? "HTML Source View" : "Visual Mode" }}</span>
      <div class="flex items-center gap-3">
        <span>{{ stats.words }} words</span>
        <span>{{ stats.chars }} characters</span>
      </div>
    </div>
  </div>
</template>
