<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { AlertTriangleIcon, InfoIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    okText?: string;
    cancelText?: string;
    variant?: "default" | "destructive" | "warning";
    disabled?: boolean;
    class?: string;
  }>(),
  {
    okText: "Confirm",
    cancelText: "Cancel",
    variant: "warning",
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

function handleConfirm() {
  emit("confirm");
  isOpen.value = false;
}

function handleCancel() {
  emit("cancel");
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
  <div ref="containerRef" class="relative inline-block">
    <div @click="!disabled && (isOpen = !isOpen)">
      <slot />
    </div>

    <div
      v-if="isOpen"
      :class="
        cn(
          'absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-xl border bg-popover p-3.5 text-popover-foreground shadow-lg outline-none animate-in fade-in-0 zoom-in-95',
          props.class
        )
      "
    >
      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-popover" />

      <div class="flex items-start gap-2.5">
        <AlertTriangleIcon
          :class="
            cn(
              'size-4 shrink-0',
              variant === 'destructive' ? 'text-destructive' : 'text-amber-500'
            )
          "
        />
        <div class="flex-1 space-y-1">
          <h4 class="font-semibold text-xs leading-none text-foreground">{{ title }}</h4>
          <p v-if="description" class="text-[11px] text-muted-foreground leading-relaxed">{{ description }}</p>
        </div>
      </div>

      <div class="mt-3 flex items-center justify-end gap-2 pt-1 border-t">
        <button
          type="button"
          @click="handleCancel"
          class="rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          {{ cancelText }}
        </button>
        <button
          type="button"
          @click="handleConfirm"
          :class="
            cn(
              'rounded-md px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-2xs transition-colors',
              variant === 'destructive'
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground'
                : 'bg-primary hover:bg-primary/90'
            )
          "
        >
          {{ okText }}
        </button>
      </div>
    </div>
  </div>
</template>
