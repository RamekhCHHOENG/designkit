<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { SearchIcon, XIcon, Loader2Icon, CheckIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface AutoCompleteOption {
  value: string;
  label?: string;
  description?: string;
  group?: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    options?: AutoCompleteOption[];
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    highlightMatches?: boolean;
    emptyMessage?: string;
    class?: string;
  }>(),
  {
    options: () => [],
    modelValue: "",
    placeholder: "Type to search...",
    disabled: false,
    clearable: true,
    highlightMatches: true,
    emptyMessage: "No results found",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "select", option: AutoCompleteOption): void;
}>();

const isOpen = ref(false);
const highlightedIndex = ref(0);
const containerRef = ref<HTMLElement | null>(null);

const filteredOptions = computed(() => {
  const query = (props.modelValue || "").trim().toLowerCase();
  if (!query) return props.options;
  return props.options.filter(
    (opt) =>
      (opt.label || opt.value).toLowerCase().includes(query) ||
      (opt.description && opt.description.toLowerCase().includes(query))
  );
});

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit("update:modelValue", val);
  isOpen.value = true;
  highlightedIndex.value = 0;
}

function handleSelect(option: AutoCompleteOption) {
  if (option.disabled) return;
  const val = option.label || option.value;
  emit("update:modelValue", val);
  emit("select", option);
  isOpen.value = false;
}

function clear() {
  emit("update:modelValue", "");
  isOpen.value = false;
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
  <div ref="containerRef" :class="cn('relative w-full', props.class)">
    <div class="relative flex items-center">
      <SearchIcon class="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @focus="isOpen = true"
        :class="
          cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors',
            'pl-9 pr-8 placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
          )
        "
      />

      <div class="absolute right-2.5 flex items-center gap-1">
        <button
          v-if="clearable && modelValue && !disabled"
          type="button"
          @click="clear"
          class="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-xs"
        >
          <XIcon class="size-3.5" />
        </button>
      </div>
    </div>

    <!-- Dropdown List -->
    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
    >
      <div v-if="filteredOptions.length === 0" class="py-6 text-center text-xs text-muted-foreground">
        {{ emptyMessage }}
      </div>
      <div
        v-else
        v-for="(opt, idx) in filteredOptions"
        :key="opt.value + idx"
        @click="handleSelect(opt)"
        @mouseenter="highlightedIndex = idx"
        :class="
          cn(
            'relative flex cursor-pointer select-none items-center justify-between rounded-xs px-2.5 py-1.5 text-xs outline-none transition-colors',
            highlightedIndex === idx ? 'bg-accent text-accent-foreground' : '',
            opt.disabled ? 'pointer-events-none opacity-50' : ''
          )
        "
      >
        <div class="flex flex-col">
          <span class="font-medium">{{ opt.label || opt.value }}</span>
          <span v-if="opt.description" class="text-[11px] text-muted-foreground">{{ opt.description }}</span>
        </div>
        <CheckIcon v-if="(opt.label || opt.value) === modelValue" class="size-3.5 text-primary shrink-0 ml-2" />
      </div>
    </div>
  </div>
</template>
