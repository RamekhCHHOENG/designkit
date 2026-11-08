<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { PipetteIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/default/ui/popover";
import { Button } from "@/registry/default/ui/button";

export interface ColorPickerProps {
  modelValue?: string;
  defaultValue?: string;
  presets?: string[];
  disabled?: boolean;
  showEyeDropper?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  defaultValue: "#3b82f6",
  presets: () => [
    "#000000",
    "#ffffff",
    "#64748b",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
  ],
  disabled: false,
  showEyeDropper: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();

const internalValue = ref(props.defaultValue);
const open = ref(false);

const currentColor = computed(() => {
  return props.modelValue !== undefined ? props.modelValue : internalValue.value;
});

function updateColor(color: string) {
  internalValue.value = color;
  emit("update:modelValue", color);
  emit("change", color);
}

async function handleEyeDropper() {
  if (typeof window !== "undefined" && "EyeDropper" in window) {
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        updateColor(result.sRGBHex);
      }
    } catch {}
  }
}

const hasEyeDropper = computed(() => {
  return typeof window !== "undefined" && "EyeDropper" in window && props.showEyeDropper;
});
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <button
        type="button"
        :disabled="disabled"
        :class="
          cn(
            'flex h-8 items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors',
            'hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
            disabled && 'opacity-50 pointer-events-none cursor-not-allowed bg-input/50',
            props.class
          )
        "
      >
        <span
          class="size-4 shrink-0 rounded-full border border-black/10 shadow-xs dark:border-white/20"
          :style="{ backgroundColor: currentColor }"
        />
        <span class="font-mono text-xs uppercase text-foreground">{{ currentColor }}</span>
      </button>
    </PopoverTrigger>

    <PopoverContent class="w-64 space-y-3 p-3" align="start">
      <div class="flex items-center gap-2">
        <div
          class="h-8 w-12 shrink-0 rounded-md border border-border shadow-xs"
          :style="{ backgroundColor: currentColor }"
        />
        <input
          type="text"
          :value="currentColor"
          class="h-8 w-full rounded-md border border-input bg-transparent px-2.5 font-mono text-xs uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="#000000"
          @input="updateColor(($event.target as HTMLInputElement).value)"
        />
        <Button
          v-if="hasEyeDropper"
          type="button"
          variant="outline"
          size="sm"
          class="size-8 p-0"
          title="Pick color from screen"
          @click="handleEyeDropper"
        >
          <PipetteIcon class="size-3.5" />
        </Button>
      </div>

      <!-- Color input slider -->
      <div>
        <input
          type="color"
          :value="currentColor.startsWith('#') && currentColor.length === 7 ? currentColor : '#3b82f6'"
          class="h-8 w-full cursor-pointer appearance-none rounded-md border border-input bg-transparent p-0.5"
          @input="updateColor(($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Presets -->
      <div v-if="presets.length > 0" class="space-y-1.5 pt-1 border-t border-border">
        <span class="text-[11px] font-medium text-muted-foreground">Presets</span>
        <div class="grid grid-cols-6 gap-1.5">
          <button
            v-for="preset in presets"
            :key="preset"
            type="button"
            :title="preset"
            :class="
              cn(
                'size-7 rounded-md border border-black/10 shadow-xs transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring dark:border-white/20',
                preset === currentColor && 'ring-2 ring-primary ring-offset-1'
              )
            "
            :style="{ backgroundColor: preset }"
            @click="updateColor(preset)"
          />
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
