<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import { ChevronDown, Check, Sparkles, Search } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface AIModel {
  id: string;
  name: string;
  provider: "OpenAI" | "Anthropic" | "Google" | "DeepSeek" | "Ollama" | string;
  description?: string;
  contextWindow?: string;
  badge?: string;
}

export interface ModelSelectorProps {
  models: AIModel[];
  modelValue?: string;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ModelSelectorProps>();

const emit = defineEmits<{
  (e: "update:modelValue", id: string): void;
  (e: "select", model: AIModel): void;
}>();

const isOpen = ref(false);
const search = ref("");
const rootRef = ref<HTMLDivElement | null>(null);

const currentId = computed(() => props.modelValue ?? props.models[0]?.id);
const currentModel = computed(
  () => props.models.find((m) => m.id === currentId.value) || props.models[0]
);

const filteredModels = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return props.models;
  return props.models.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.provider.toLowerCase().includes(q) ||
      m.description?.toLowerCase().includes(q)
  );
});

function handleSelect(model: AIModel) {
  emit("update:modelValue", model.id);
  emit("select", model);
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(event.target as Node)) {
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
  <div
    ref="rootRef"
    :class="cn('relative inline-block text-left', props.class)"
  >
    <!-- Trigger Button -->
    <button
      type="button"
      :disabled="disabled"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      class="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/60 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
      @click="isOpen = !isOpen"
    >
      <Sparkles class="size-3.5 text-primary" />
      <span class="font-semibold">{{ currentModel?.name ?? "Select Model" }}</span>
      <span class="text-[10px] text-muted-foreground font-mono">
        ({{ currentModel?.provider }})
      </span>
      <ChevronDown class="size-3 text-muted-foreground ml-0.5" />
    </button>

    <!-- Dropdown List -->
    <div
      v-if="isOpen"
      role="listbox"
      class="absolute left-0 top-full mt-1.5 w-72 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg z-50 animate-in fade-in-0 zoom-in-95"
    >
      <!-- Search Input -->
      <div class="flex items-center gap-2 px-2 py-1.5 border-b mb-1">
        <Search class="size-3.5 text-muted-foreground" />
        <input
          v-model="search"
          type="text"
          placeholder="Search model or provider..."
          class="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          autofocus
        />
      </div>

      <!-- Models List -->
      <div class="max-h-60 overflow-y-auto flex flex-col gap-0.5">
        <button
          v-for="model in filteredModels"
          :key="model.id"
          type="button"
          role="option"
          :aria-selected="model.id === currentId"
          :class="
            cn(
              'flex items-center justify-between w-full rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted/80',
              model.id === currentId && 'bg-muted font-medium text-foreground'
            )
          "
          @click="handleSelect(model)"
        >
          <div class="flex flex-col gap-0.5 min-w-0 pr-2">
            <div class="flex items-center gap-1.5">
              <span class="font-semibold truncate">{{ model.name }}</span>
              <span class="text-[10px] text-muted-foreground font-mono">
                {{ model.provider }}
              </span>
            </div>
            <span v-if="model.description" class="text-[11px] text-muted-foreground truncate">
              {{ model.description }}
            </span>
          </div>

          <div class="flex items-center gap-1.5 shrink-0">
            <span
              v-if="model.contextWindow"
              class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground"
            >
              {{ model.contextWindow }}
            </span>
            <Check v-if="model.id === currentId" class="size-3.5 text-primary" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
