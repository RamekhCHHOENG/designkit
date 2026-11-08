<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ChevronDownIcon, ChevronRightIcon, FolderIcon, FileIcon, CheckIcon, XIcon, SearchIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface TreeSelectNode {
  id: string;
  label: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    treeData?: TreeSelectNode[];
    modelValue?: string | string[];
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    treeData: () => [],
    multiple: false,
    searchable: true,
    clearable: true,
    placeholder: "Select item...",
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

const isOpen = ref(false);
const searchQuery = ref("");
const containerRef = ref<HTMLElement | null>(null);

const selectedIds = computed(() => {
  if (!props.modelValue) return [];
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
});

function selectNode(node: TreeSelectNode) {
  if (node.disabled) return;
  if (props.multiple) {
    const exists = selectedIds.value.includes(node.id);
    const next = exists
      ? selectedIds.value.filter((id) => id !== node.id)
      : [...selectedIds.value, node.id];
    emit("update:modelValue", next);
  } else {
    emit("update:modelValue", node.id);
    isOpen.value = false;
  }
}

function clear() {
  emit("update:modelValue", props.multiple ? [] : "");
}

function findLabel(nodes: TreeSelectNode[], id: string): string | null {
  for (const n of nodes) {
    if (n.id === id) return n.label;
    if (n.children) {
      const res = findLabel(n.children, id);
      if (res) return res;
    }
  }
  return null;
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <div ref="containerRef" :class="cn('relative inline-block w-full sm:w-72', props.class)">
    <button
      type="button"
      :disabled="disabled"
      @click="isOpen = !isOpen"
      :class="
        cn(
          'flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-xs transition-colors text-start',
          'hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          disabled && 'cursor-not-allowed opacity-50'
        )
      "
    >
      <div class="flex flex-wrap items-center gap-1.5 min-w-0 pr-2">
        <span v-if="selectedIds.length === 0" class="text-xs text-muted-foreground">{{ placeholder }}</span>
        <template v-else-if="multiple">
          <span
            v-for="id in selectedIds"
            :key="id"
            class="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
          >
            {{ findLabel(treeData, id) || id }}
          </span>
        </template>
        <span v-else class="text-xs font-medium text-foreground truncate">
          {{ findLabel(treeData, selectedIds[0]) || selectedIds[0] }}
        </span>
      </div>

      <div class="flex items-center gap-1 shrink-0">
        <span v-if="clearable && selectedIds.length > 0 && !disabled" @click.stop="clear" class="rounded p-0.5 text-muted-foreground hover:text-foreground cursor-pointer">
          <XIcon class="size-3.5" />
        </span>
        <ChevronDownIcon :class="cn('size-4 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')" />
      </div>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-full min-w-64 max-h-72 overflow-y-auto rounded-lg border bg-popover p-2 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
    >
      <div v-if="searchable" class="relative mb-2 flex items-center border-b pb-2">
        <SearchIcon class="size-3.5 text-muted-foreground absolute left-2 pointer-events-none" />
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search nodes..."
          class="w-full bg-transparent pl-7 pr-2 py-0.5 text-xs outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div class="space-y-0.5 text-xs">
        <div
          v-for="node in treeData"
          :key="node.id"
          @click="selectNode(node)"
          :class="
            cn(
              'flex items-center justify-between rounded-md px-2.5 py-1.5 transition-colors cursor-pointer',
              selectedIds.includes(node.id) ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'
            )
          "
        >
          <div class="flex items-center gap-1.5 truncate">
            <FolderIcon v-if="node.children && node.children.length > 0" class="size-3.5 text-muted-foreground shrink-0" />
            <FileIcon v-else class="size-3.5 text-muted-foreground shrink-0" />
            <span class="truncate">{{ node.label }}</span>
          </div>
          <CheckIcon v-if="selectedIds.includes(node.id)" class="size-3.5 text-primary shrink-0 ml-2" />
        </div>
      </div>
    </div>
  </div>
</template>
