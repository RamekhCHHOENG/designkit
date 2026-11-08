<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import { ChevronRight, ChevronDown, Check, X } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface CascaderOption {
  value: string;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface CascaderProps {
  options: CascaderOption[];
  modelValue?: string[];
  placeholder?: string;
  separator?: string;
  disabled?: boolean;
  allowClear?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CascaderProps>(), {
  placeholder: "Select...",
  separator: " / ",
  disabled: false,
  allowClear: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
  (e: "change", value: string[], selectedOptions: CascaderOption[]): void;
}>();

const isOpen = ref(false);
const internalValue = ref<string[]>(props.modelValue || []);
const activePath = ref<CascaderOption[]>([]);
const containerRef = ref<HTMLDivElement | null>(null);

const activeValue = computed(() => props.modelValue ?? internalValue.value);

const selectedOptions = computed(() => {
  const list: CascaderOption[] = [];
  let currentOptions = props.options;
  for (const val of activeValue.value) {
    const match = currentOptions?.find((o) => o.value === val);
    if (match) {
      list.push(match);
      currentOptions = match.children || [];
    } else {
      break;
    }
  }
  return list;
});

const displayString = computed(() => {
  if (selectedOptions.value.length === 0) return "";
  return selectedOptions.value.map((o) => o.label).join(props.separator);
});

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

function handleSelectOption(option: CascaderOption, columnIdx: number) {
  if (option.disabled) return;

  const nextPath = [...activePath.value.slice(0, columnIdx), option];
  activePath.value = nextPath;

  if (!option.children || option.children.length === 0) {
    const newVals = nextPath.map((o) => o.value);
    internalValue.value = newVals;
    emit("update:modelValue", newVals);
    emit("change", newVals, nextPath);
    isOpen.value = false;
  }
}

function handleClear(e: MouseEvent) {
  e.stopPropagation();
  internalValue.value = [];
  activePath.value = [];
  emit("update:modelValue", []);
  emit("change", [], []);
}

const columns = computed(() => {
  const cols: CascaderOption[][] = [props.options];
  for (const opt of activePath.value) {
    if (opt.children && opt.children.length > 0) {
      cols.push(opt.children);
    }
  }
  return cols;
});
</script>

<template>
  <div
    ref="containerRef"
    data-slot="cascader"
    :class="cn('relative inline-block w-full max-w-sm text-xs', props.class)"
  >
    <button
      type="button"
      :disabled="disabled"
      :class="
        cn(
          'flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 py-1 text-xs text-foreground shadow-2xs transition-all hover:bg-muted/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
          disabled && 'opacity-40 cursor-not-allowed'
        )
      "
      @click="isOpen = !isOpen"
    >
      <span :class="cn('truncate', !displayString && 'text-muted-foreground')">
        {{ displayString || placeholder }}
      </span>
      <div class="flex items-center gap-1 shrink-0 ml-2">
        <span
          v-if="allowClear && displayString && !disabled"
          class="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground"
          @click="handleClear"
        >
          <X class="size-3" />
        </span>
        <ChevronDown
          :class="
            cn(
              'size-3.5 text-muted-foreground transition-transform',
              isOpen && 'rotate-180'
            )
          "
        />
      </div>
    </button>

    <div
      v-if="isOpen"
      class="absolute left-0 top-full z-50 mt-1.5 flex rounded-xl border bg-popover text-popover-foreground shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 bg-background"
    >
      <ul
        v-for="(colOptions, colIdx) in columns"
        :key="colIdx"
        class="max-h-60 w-44 overflow-y-auto border-r last:border-r-0 p-1 flex flex-col gap-0.5 bg-background"
      >
        <li
          v-for="opt in colOptions"
          :key="opt.value"
          :class="
            cn(
              'flex items-center justify-between rounded-md px-2.5 py-1.5 cursor-pointer select-none transition-colors',
              opt.disabled && 'opacity-40 cursor-not-allowed',
              activePath[colIdx]?.value === opt.value
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-foreground hover:bg-muted'
            )
          "
          @click="handleSelectOption(opt, colIdx)"
        >
          <span class="truncate">{{ opt.label }}</span>
          <ChevronRight
            v-if="opt.children && opt.children.length > 0"
            class="size-3 text-muted-foreground shrink-0"
          />
          <Check
            v-else-if="activePath[colIdx]?.value === opt.value"
            class="size-3 text-primary shrink-0"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
