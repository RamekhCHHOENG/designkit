<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { XIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

export interface TourStep {
  title: string;
  description: string;
  target: () => HTMLElement | null;
}

export interface TourProps {
  open?: boolean;
  steps: TourStep[];
  current?: number;
}

const props = withDefaults(defineProps<TourProps>(), {
  open: false,
});

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (e: "update:current", index: number): void;
  (e: "close"): void;
}>();

const internalCurrent = ref(0);
const targetRect = ref<DOMRect | null>(null);

const activeIndex = computed(() => {
  return props.current !== undefined ? props.current : internalCurrent.value;
});

const currentStep = computed(() => props.steps[activeIndex.value]);

function updateTarget() {
  if (!props.open || !currentStep.value) {
    targetRect.value = null;
    return;
  }
  const el = currentStep.value.target();
  if (el) {
    targetRect.value = el.getBoundingClientRect();
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    targetRect.value = null;
  }
}

watch(() => [props.open, activeIndex.value], updateTarget);
onMounted(updateTarget);

function handleClose() {
  emit("update:open", false);
  emit("close");
}

function setStep(index: number) {
  internalCurrent.value = index;
  emit("update:current", index);
}
</script>

<template>
  <div v-if="open && currentStep" data-slot="tour-portal" class="fixed inset-0 z-50 overflow-hidden">
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/40 transition-opacity backdrop-blur-xs"
      @click="handleClose"
    />

    <!-- Cutout Border -->
    <div
      v-if="targetRect"
      class="pointer-events-none absolute rounded-lg ring-4 ring-primary/80 transition-all duration-300"
      :style="{
        top: `${targetRect.top - 4}px`,
        left: `${targetRect.left - 4}px`,
        width: `${targetRect.width + 8}px`,
        height: `${targetRect.height + 8}px`,
      }"
    />

    <!-- Popover Card -->
    <div
      class="absolute z-50 w-80 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl transition-all duration-300"
      :style="{
        top: targetRect
          ? `${Math.min(window.innerHeight - 200, Math.max(16, targetRect.bottom + 12))}px`
          : '50%',
        left: targetRect
          ? `${Math.min(window.innerWidth - 340, Math.max(16, targetRect.left))}px`
          : '50%',
        transform: !targetRect ? 'translate(-50%, -50%)' : undefined,
      }"
    >
      <div class="flex items-start justify-between gap-2 pb-1">
        <h4 class="font-semibold text-sm text-foreground">{{ currentStep.title }}</h4>
        <button
          type="button"
          aria-label="Close tour"
          class="text-muted-foreground hover:text-foreground outline-none"
          @click="handleClose"
        >
          <XIcon class="size-4" />
        </button>
      </div>

      <p class="text-xs text-muted-foreground leading-relaxed py-1.5">
        {{ currentStep.description }}
      </p>

      <div class="flex items-center justify-between pt-3 mt-1 border-t border-border">
        <div class="flex items-center gap-1">
          <span
            v-for="(_, i) in steps"
            :key="i"
            :class="
              cn(
                'size-1.5 rounded-full transition-colors',
                i === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              )
            "
          />
        </div>

        <div class="flex items-center gap-1.5">
          <Button
            v-if="activeIndex > 0"
            type="button"
            variant="outline"
            size="sm"
            class="h-7 text-xs"
            @click="setStep(activeIndex - 1)"
          >
            Back
          </Button>

          <Button
            type="button"
            size="sm"
            class="h-7 text-xs"
            @click="activeIndex === steps.length - 1 ? handleClose() : setStep(activeIndex + 1)"
          >
            {{ activeIndex === steps.length - 1 ? "Finish" : "Next" }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
