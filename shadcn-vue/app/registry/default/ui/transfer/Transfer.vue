<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Search,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps {
  dataSource: TransferItem[];
  targetKeys: string[];
  titles?: [string, string];
  searchable?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TransferProps>(), {
  titles: () => ["Available", "Selected"],
  searchable: true,
});

const emit = defineEmits<{
  (e: "update:targetKeys", targetKeys: string[]): void;
  (e: "change", targetKeys: string[], direction: "left" | "right", moveKeys: string[]): void;
}>();

const selectedLeft = ref<Set<string>>(new Set());
const selectedRight = ref<Set<string>>(new Set());
const searchLeft = ref("");
const searchRight = ref("");

const targetSet = computed(() => new Set(props.targetKeys));

const leftItems = computed(() =>
  props.dataSource.filter((item) => !targetSet.value.has(item.key))
);

const rightItems = computed(() =>
  props.dataSource.filter((item) => targetSet.value.has(item.key))
);

const filteredLeft = computed(() => {
  if (!searchLeft.value.trim()) return leftItems.value;
  const q = searchLeft.value.toLowerCase();
  return leftItems.value.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
  );
});

const filteredRight = computed(() => {
  if (!searchRight.value.trim()) return rightItems.value;
  const q = searchRight.value.toLowerCase();
  return rightItems.value.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
  );
});

function toggleLeftItem(key: string) {
  const next = new Set(selectedLeft.value);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  selectedLeft.value = next;
}

function toggleRightItem(key: string) {
  const next = new Set(selectedRight.value);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  selectedRight.value = next;
}

function moveRight() {
  const moveKeys = Array.from(selectedLeft.value);
  if (moveKeys.length === 0) return;
  const nextTargetKeys = [...props.targetKeys, ...moveKeys];
  selectedLeft.value = new Set();
  emit("update:targetKeys", nextTargetKeys);
  emit("change", nextTargetKeys, "right", moveKeys);
}

function moveLeft() {
  const moveKeys = Array.from(selectedRight.value);
  if (moveKeys.length === 0) return;
  const moveSet = new Set(moveKeys);
  const nextTargetKeys = props.targetKeys.filter((k) => !moveSet.has(k));
  selectedRight.value = new Set();
  emit("update:targetKeys", nextTargetKeys);
  emit("change", nextTargetKeys, "left", moveKeys);
}

function moveAllRight() {
  const moveKeys = leftItems.value.map((i) => i.key);
  const nextTargetKeys = [...props.targetKeys, ...moveKeys];
  selectedLeft.value = new Set();
  emit("update:targetKeys", nextTargetKeys);
  emit("change", nextTargetKeys, "right", moveKeys);
}

function moveAllLeft() {
  selectedRight.value = new Set();
  emit("update:targetKeys", []);
  emit("change", [], "left", props.targetKeys);
}
</script>

<template>
  <div
    data-slot="transfer"
    :class="cn('flex items-center gap-3 w-full max-w-2xl text-xs', props.class)"
  >
    <!-- Left List -->
    <div class="flex flex-1 flex-col rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden min-w-[200px]">
      <div class="flex items-center justify-between border-b bg-muted/30 px-3 py-2 text-xs font-semibold">
        <span>{{ titles[0] }}</span>
        <span class="font-mono text-[11px] text-muted-foreground">
          {{ selectedLeft.size }}/{{ leftItems.length }}
        </span>
      </div>

      <div v-if="searchable" class="relative border-b p-2">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        <input
          v-model="searchLeft"
          type="text"
          placeholder="Search..."
          class="w-full rounded-md border bg-muted/20 pl-7 pr-2 py-1 text-xs outline-none focus:border-primary/50"
        />
      </div>

      <ul class="flex-1 max-h-56 overflow-auto p-1.5 flex flex-col gap-0.5">
        <template v-if="filteredLeft.length > 0">
          <li
            v-for="item in filteredLeft"
            :key="item.key"
            :class="
              cn(
                'flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors',
                item.disabled && 'opacity-40 cursor-not-allowed',
                selectedLeft.has(item.key) ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'
              )
            "
            @click="!item.disabled && toggleLeftItem(item.key)"
          >
            <input
              type="checkbox"
              :checked="selectedLeft.has(item.key)"
              :disabled="item.disabled"
              class="mt-0.5 size-3.5 rounded border-muted-foreground/40 accent-primary cursor-pointer"
            />
            <div class="flex flex-col min-w-0">
              <span class="truncate">{{ item.title }}</span>
              <span v-if="item.description" class="text-[10px] text-muted-foreground truncate">
                {{ item.description }}
              </span>
            </div>
          </li>
        </template>
        <div v-else class="py-8 text-center text-xs text-muted-foreground">
          No items
        </div>
      </ul>
    </div>

    <!-- Center Action Buttons -->
    <div class="flex flex-col gap-1.5 shrink-0">
      <button
        type="button"
        :disabled="leftItems.length === 0"
        title="Move all right"
        class="flex size-7 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        @click="moveAllRight"
      >
        <ChevronsRight class="size-3.5" />
      </button>
      <button
        type="button"
        :disabled="selectedLeft.size === 0"
        title="Move selected right"
        class="flex size-7 items-center justify-center rounded-lg border bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        @click="moveRight"
      >
        <ChevronRight class="size-3.5" />
      </button>
      <button
        type="button"
        :disabled="selectedRight.size === 0"
        title="Move selected left"
        class="flex size-7 items-center justify-center rounded-lg border bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        @click="moveLeft"
      >
        <ChevronLeft class="size-3.5" />
      </button>
      <button
        type="button"
        :disabled="rightItems.length === 0"
        title="Move all left"
        class="flex size-7 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        @click="moveAllLeft"
      >
        <ChevronsLeft class="size-3.5" />
      </button>
    </div>

    <!-- Right List -->
    <div class="flex flex-1 flex-col rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden min-w-[200px]">
      <div class="flex items-center justify-between border-b bg-muted/30 px-3 py-2 text-xs font-semibold">
        <span>{{ titles[1] }}</span>
        <span class="font-mono text-[11px] text-muted-foreground">
          {{ selectedRight.size }}/{{ rightItems.length }}
        </span>
      </div>

      <div v-if="searchable" class="relative border-b p-2">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
        <input
          v-model="searchRight"
          type="text"
          placeholder="Search..."
          class="w-full rounded-md border bg-muted/20 pl-7 pr-2 py-1 text-xs outline-none focus:border-primary/50"
        />
      </div>

      <ul class="flex-1 max-h-56 overflow-auto p-1.5 flex flex-col gap-0.5">
        <template v-if="filteredRight.length > 0">
          <li
            v-for="item in filteredRight"
            :key="item.key"
            :class="
              cn(
                'flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors',
                item.disabled && 'opacity-40 cursor-not-allowed',
                selectedRight.has(item.key) ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'
              )
            "
            @click="!item.disabled && toggleRightItem(item.key)"
          >
            <input
              type="checkbox"
              :checked="selectedRight.has(item.key)"
              :disabled="item.disabled"
              class="mt-0.5 size-3.5 rounded border-muted-foreground/40 accent-primary cursor-pointer"
            />
            <div class="flex flex-col min-w-0">
              <span class="truncate">{{ item.title }}</span>
              <span v-if="item.description" class="text-[10px] text-muted-foreground truncate">
                {{ item.description }}
              </span>
            </div>
          </li>
        </template>
        <div v-else class="py-8 text-center text-xs text-muted-foreground">
          No items
        </div>
      </ul>
    </div>
  </div>
</template>
