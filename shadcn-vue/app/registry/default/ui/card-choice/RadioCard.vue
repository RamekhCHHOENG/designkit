<script setup lang="ts">
import { computed } from "vue";
import { CheckIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    value: string;
    title: string;
    description?: string;
    price?: string;
    badge?: string;
    indicator?: "radio" | "check" | "none";
    disabled?: boolean;
    class?: string;
  }>(),
  {
    indicator: "radio",
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isSelected = computed(() => props.modelValue === props.value);

function select() {
  if (props.disabled) return;
  emit("update:modelValue", props.value);
}
</script>

<template>
  <div
    role="radio"
    :aria-checked="isSelected"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="select"
    @keydown.space.prevent="select"
    @keydown.enter.prevent="select"
    :class="
      cn(
        'group relative flex flex-col justify-between rounded-xl border p-4 text-start transition-all cursor-pointer select-none',
        'bg-card hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isSelected
          ? 'border-primary bg-primary/5 shadow-xs ring-1 ring-primary'
          : 'border-border hover:border-foreground/30',
        disabled && 'pointer-events-none opacity-50 cursor-not-allowed',
        props.class
      )
    "
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <div
          v-if="$slots.icon"
          :class="
            cn(
              'flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors',
              isSelected ? 'border-primary text-primary' : 'text-muted-foreground'
            )
          "
        >
          <slot name="icon" />
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm leading-tight text-foreground">{{ title }}</span>
            <span
              v-if="badge"
              class="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
            >
              {{ badge }}
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="indicator !== 'none'"
        :class="
          cn(
            'flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5',
            isSelected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-muted-foreground/40 bg-background'
          )
        "
      >
        <span v-if="indicator === 'radio' && isSelected" class="size-1.5 rounded-full bg-primary-foreground" />
        <CheckIcon v-if="indicator === 'check' && isSelected" class="size-3 stroke-[3]" />
      </div>
    </div>

    <p v-if="description" class="mt-2 text-xs text-muted-foreground leading-relaxed">{{ description }}</p>

    <div v-if="price" class="mt-3 pt-3 border-t border-border/50 flex items-baseline gap-1 text-sm font-semibold text-foreground">
      {{ price }}
    </div>
  </div>
</template>
