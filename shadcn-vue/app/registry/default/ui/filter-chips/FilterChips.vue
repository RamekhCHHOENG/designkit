<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import { Plus, X, Filter } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface ActiveFilter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface FilterFieldDefinition {
  key: string;
  label: string;
  operators?: string[];
  options?: string[];
}

export interface FilterChipsProps {
  fields?: FilterFieldDefinition[];
  filters?: ActiveFilter[];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FilterChipsProps>(), {
  fields: () => [],
  filters: () => [],
});

const emit = defineEmits<{
  (e: "update:filters", filters: ActiveFilter[]): void;
  (e: "clear-all"): void;
}>();

const isOpen = ref(false);
const selectedFieldKey = ref(props.fields?.[0]?.key || "");
const selectedOp = ref("is");
const filterValue = ref("");
const popoverRef = ref<HTMLDivElement | null>(null);

const selectedField = computed(
  () => props.fields?.find((f) => f.key === selectedFieldKey.value) || props.fields?.[0]
);

const operators = computed(
  () => selectedField.value?.operators || ["is", "is not", "contains"]
);

function handleClickOutside(e: MouseEvent) {
  if (popoverRef.value && !popoverRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

function removeFilter(id: string) {
  const next = props.filters.filter((f) => f.id !== id);
  emit("update:filters", next);
}

function handleAddFilter() {
  if (!filterValue.value.trim()) return;

  const newFilter: ActiveFilter = {
    id: `filter-${Date.now()}`,
    field: selectedField.value?.label || selectedFieldKey.value,
    operator: selectedOp.value,
    value: filterValue.value.trim(),
  };

  emit("update:filters", [...props.filters, newFilter]);
  filterValue.value = "";
  isOpen.value = false;
}
</script>

<template>
  <div
    data-slot="filter-chips"
    :class="cn('flex flex-wrap items-center gap-2 text-xs', props.class)"
  >
    <div class="flex items-center gap-1.5 text-muted-foreground text-xs pr-1 font-medium select-none">
      <Filter class="size-3.5" />
      <span>Filters</span>
    </div>

    <!-- Active Filter Chips -->
    <span
      v-for="f in filters"
      :key="f.id"
      class="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 pl-2.5 pr-1.5 py-0.5 text-xs text-foreground transition-all hover:bg-muted group"
    >
      <span class="font-medium text-muted-foreground">{{ f.field }}</span>
      <span class="text-[10px] text-muted-foreground/60">{{ f.operator }}</span>
      <span class="font-semibold text-primary">{{ f.value }}</span>
      <button
        type="button"
        class="flex size-4 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
        title="Remove filter"
        @click="removeFilter(f.id)"
      >
        <X class="size-3" />
      </button>
    </span>

    <!-- Add Filter Button & Popover -->
    <div ref="popoverRef" class="relative">
      <button
        type="button"
        :class="
          cn(
            'inline-flex items-center gap-1 rounded-full border border-dashed px-2.5 py-0.5 text-xs font-medium text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors',
            isOpen && 'border-primary text-primary'
          )
        "
        @click="isOpen = !isOpen"
      >
        <Plus class="size-3" />
        <span>Add filter</span>
      </button>

      <form
        v-if="isOpen"
        class="absolute left-0 top-full mt-2 z-50 w-72 rounded-xl border bg-card p-3 text-card-foreground shadow-xl animate-in fade-in-0 zoom-in-95 flex flex-col gap-2.5 bg-background"
        @submit.prevent="handleAddFilter"
      >
        <div class="font-semibold text-xs border-b pb-1 text-foreground">
          Add New Filter
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-muted-foreground font-medium">Field</label>
          <select
            v-model="selectedFieldKey"
            class="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50"
            @change="selectedOp = selectedField?.operators?.[0] || 'is'"
          >
            <option v-for="f in fields" :key="f.key" :value="f.key">
              {{ f.label }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-muted-foreground font-medium">Condition</label>
          <select
            v-model="selectedOp"
            class="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50"
          >
            <option v-for="op in operators" :key="op" :value="op">
              {{ op }}
            </option>
          </select>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-[10px] text-muted-foreground font-medium">Value</label>
          <select
            v-if="selectedField?.options"
            v-model="filterValue"
            class="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50"
          >
            <option value="">Select value...</option>
            <option v-for="opt in selectedField.options" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </select>
          <input
            v-else
            v-model="filterValue"
            type="text"
            placeholder="Enter filter value..."
            class="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>

        <div class="flex items-center justify-end gap-2 pt-1 border-t mt-1">
          <button
            type="button"
            class="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
            @click="isOpen = false"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!filterValue.trim()"
            class="rounded-md bg-primary text-primary-foreground px-3 py-1 text-xs font-medium hover:bg-primary/90 disabled:opacity-40"
          >
            Apply
          </button>
        </div>
      </form>
    </div>

    <!-- Clear All -->
    <button
      v-if="filters.length > 0"
      type="button"
      class="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline ml-1"
      @click="() => { emit('update:filters', []); emit('clear-all'); }"
    >
      Clear all
    </button>
  </div>
</template>
