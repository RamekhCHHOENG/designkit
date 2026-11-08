<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { UploadCloudIcon, FileIcon, XIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface FileDropzoneProps {
  maxFiles?: number;
  maxSize?: number; // bytes
  accept?: string;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FileDropzoneProps>(), {
  maxFiles: 5,
  maxSize: 10 * 1024 * 1024,
  disabled: false,
});

const emit = defineEmits<{
  (e: "change", files: File[]): void;
}>();

const files = ref<File[]>([]);
const isDragOver = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

function updateFiles(newFiles: File[]) {
  files.value = newFiles;
  emit("change", newFiles);
}

function handleAddFiles(incoming: FileList | null) {
  if (!incoming) return;
  const valid: File[] = [];
  for (let i = 0; i < incoming.length; i++) {
    const f = incoming[i];
    if (f && f.size <= props.maxSize) {
      valid.push(f);
    }
  }
  const combined = [...files.value, ...valid].slice(0, props.maxFiles);
  updateFiles(combined);
}

function handleRemove(index: number) {
  updateFiles(files.value.filter((_, i) => i !== index));
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  if (!props.disabled) isDragOver.value = true;
}

function handleDragLeave() {
  isDragOver.value = false;
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  isDragOver.value = false;
  if (!props.disabled && e.dataTransfer?.files) {
    handleAddFiles(e.dataTransfer.files);
  }
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
</script>

<template>
  <div data-slot="file-dropzone" :class="cn('w-full space-y-3', props.class)">
    <div
      :class="
        cn(
          'flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 p-6 text-center transition-all cursor-pointer',
          'hover:border-primary/50 hover:bg-muted/40',
          isDragOver && 'border-primary bg-primary/5 scale-[0.99]',
          disabled && 'opacity-50 pointer-events-none cursor-not-allowed'
        )
      "
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
      @click="!disabled && inputRef?.click()"
    >
      <input
        ref="inputRef"
        type="file"
        :multiple="maxFiles > 1"
        :accept="accept"
        :disabled="disabled"
        class="hidden"
        @change="handleAddFiles(($event.target as HTMLInputElement).files)"
      />

      <div class="flex size-10 items-center justify-center rounded-full bg-muted shadow-xs mb-3 text-muted-foreground">
        <UploadCloudIcon class="size-5" />
      </div>

      <p class="text-sm font-medium text-foreground">
        Click to upload <span class="font-normal text-muted-foreground">or drag and drop</span>
      </p>
      <p class="mt-1 text-xs text-muted-foreground">
        {{ accept ? accept.toUpperCase() : "Any files" }} up to {{ formatSize(maxSize) }} (max {{ maxFiles }} files)
      </p>
    </div>

    <div v-if="files.length > 0" class="space-y-1.5">
      <div
        v-for="(file, idx) in files"
        :key="`${file.name}-${idx}`"
        class="flex items-center justify-between rounded-lg border border-border bg-card p-2 text-xs shadow-xs"
      >
        <div class="flex items-center gap-2 min-w-0">
          <FileIcon class="size-4 shrink-0 text-muted-foreground" />
          <span class="truncate font-medium text-foreground">{{ file.name }}</span>
          <span class="shrink-0 text-muted-foreground">({{ formatSize(file.size) }})</span>
        </div>
        <button
          type="button"
          :aria-label="`Remove ${file.name}`"
          class="text-muted-foreground hover:text-destructive p-1 outline-none transition-colors"
          @click="handleRemove(idx)"
        >
          <XIcon class="size-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>
