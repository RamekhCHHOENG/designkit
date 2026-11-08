<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { StarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface RatingProps {
  modelValue?: number;
  defaultValue?: number;
  max?: number;
  precision?: 0.5 | 1;
  readOnly?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<RatingProps>(), {
  max: 5,
  precision: 1,
  readOnly: false,
  disabled: false,
  size: "default",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
}>();

const internalValue = ref(props.defaultValue ?? 0);
const hoverValue = ref<number | null>(null);

const currentValue = computed(() => {
  return props.modelValue !== undefined ? props.modelValue : internalValue.value;
});

const displayValue = computed(() => {
  return hoverValue.value !== null ? hoverValue.value : currentValue.value;
});

function handleSelect(val: number) {
  if (props.readOnly || props.disabled) return;
  internalValue.value = val;
  emit("update:modelValue", val);
  emit("change", val);
}

function handleMouseMove(e: MouseEvent, starIndex: number) {
  if (props.readOnly || props.disabled) return;
  if (props.precision === 0.5) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    hoverValue.value = isLeftHalf ? starIndex - 0.5 : starIndex;
  } else {
    hoverValue.value = starIndex;
  }
}

const sizeClasses = {
  sm: "size-3.5",
  default: "size-4.5",
  lg: "size-6",
};

const items = computed(() => Array.from({ length: props.max }, (_, index) => index + 1));
</script>

<template>
  <div
    role="radiogroup"
    aria-label="Rating"
    data-slot="rating"
    :class="
      cn(
        'inline-flex items-center gap-1 select-none',
        disabled && 'opacity-50 pointer-events-none',
        props.class
      )
    "
    @mouseleave="!readOnly && (hoverValue = null)"
  >
    <span
      v-for="starIndex in items"
      :key="starIndex"
      :class="
        cn(
          'relative transition-transform',
          !readOnly && !disabled && 'cursor-pointer hover:scale-110'
        )
      "
      @click="handleSelect(hoverValue !== null ? hoverValue : starIndex)"
      @mousemove="handleMouseMove($event, starIndex)"
    >
      <!-- Background empty star -->
      <StarIcon
        :class="cn('text-muted-foreground/30 transition-colors', sizeClasses[size])"
      />

      <!-- Filled / half filled star -->
      <span
        v-if="displayValue >= starIndex - (precision === 0.5 ? 0.5 : 0)"
        class="absolute inset-0 overflow-hidden text-amber-500 fill-amber-500 transition-colors"
        :style="{
          width:
            precision === 0.5 && displayValue === starIndex - 0.5
              ? '50%'
              : '100%',
        }"
      >
        <StarIcon :class="cn('fill-amber-500 text-amber-500', sizeClasses[size])" />
      </span>
    </span>
  </div>
</template>
