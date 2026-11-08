<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { ClockIcon, CheckIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    format?: "12" | "24";
    minuteStep?: number;
    disabled?: boolean;
    class?: string;
  }>(),
  {
    modelValue: "12:00",
    format: "12",
    minuteStep: 5,
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", time: string): void;
}>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const parsed = computed(() => {
  let hours = 12;
  let minutes = 0;
  let period: "AM" | "PM" = "PM";

  if (props.modelValue) {
    const parts = props.modelValue.split(":");
    let h = parseInt(parts[0], 10) || 0;
    minutes = parseInt(parts[1], 10) || 0;

    if (props.format === "12") {
      if (h >= 12) {
        period = "PM";
        hours = h > 12 ? h - 12 : 12;
      } else {
        period = "AM";
        hours = h === 0 ? 12 : h;
      }
    } else {
      hours = h;
    }
  }

  return { hours, minutes, period };
});

function updateTime(h: number, m: number, p: "AM" | "PM") {
  let finalHour = h;
  if (props.format === "12") {
    if (p === "PM" && h < 12) finalHour = h + 12;
    if (p === "AM" && h === 12) finalHour = 0;
  }
  const hh = String(finalHour).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  emit("update:modelValue", `${hh}:${mm}`);
}

const hourList = computed(() => {
  if (props.format === "12") {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
  return Array.from({ length: 24 }, (_, i) => i);
});

const minuteList = computed(() => {
  const arr = [];
  for (let i = 0; i < 60; i += props.minuteStep) {
    arr.push(i);
  }
  return arr;
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
</script>

<template>
  <div ref="containerRef" :class="cn('relative inline-block w-full sm:w-64', props.class)">
    <button
      type="button"
      :disabled="disabled"
      @click="isOpen = !isOpen"
      :class="
        cn(
          'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors',
          'hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          disabled && 'cursor-not-allowed opacity-50'
        )
      "
    >
      <div class="flex items-center gap-2">
        <ClockIcon class="size-4 text-muted-foreground" />
        <span class="font-mono font-medium text-foreground">{{ modelValue }}</span>
      </div>
      <span class="text-[11px] font-semibold text-muted-foreground/80 uppercase">
        {{ format === "12" ? parsed.period : "24H" }}
      </span>
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 mt-1 w-72 rounded-lg border bg-popover p-3 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95"
    >
      <div class="grid grid-cols-3 gap-1 text-center font-mono text-xs">
        <div>
          <span class="text-[10px] font-semibold text-muted-foreground block mb-1">Hours</span>
          <div class="h-40 overflow-y-auto rounded border bg-muted/10 p-1 space-y-0.5 scrollbar-thin">
            <button
              v-for="h in hourList"
              :key="h"
              type="button"
              @click="updateTime(h, parsed.minutes, parsed.period)"
              :class="
                cn(
                  'w-full rounded py-1 transition-colors',
                  parsed.hours === h ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted text-foreground'
                )
              "
            >
              {{ String(h).padStart(2, "0") }}
            </button>
          </div>
        </div>

        <div>
          <span class="text-[10px] font-semibold text-muted-foreground block mb-1">Minutes</span>
          <div class="h-40 overflow-y-auto rounded border bg-muted/10 p-1 space-y-0.5 scrollbar-thin">
            <button
              v-for="m in minuteList"
              :key="m"
              type="button"
              @click="updateTime(parsed.hours, m, parsed.period)"
              :class="
                cn(
                  'w-full rounded py-1 transition-colors',
                  parsed.minutes === m ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-muted text-foreground'
                )
              "
            >
              {{ String(m).padStart(2, "0") }}
            </button>
          </div>
        </div>

        <div v-if="format === '12'">
          <span class="text-[10px] font-semibold text-muted-foreground block mb-1">Period</span>
          <div class="flex flex-col gap-1.5 pt-1">
            <button
              v-for="p in (['AM', 'PM'] as const)"
              :key="p"
              type="button"
              @click="updateTime(parsed.hours, parsed.minutes, p)"
              :class="
                cn(
                  'w-full rounded py-2 text-xs font-semibold border transition-colors',
                  parsed.period === p
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted/40 hover:bg-muted text-foreground border-transparent'
                )
              "
            >
              {{ p }}
            </button>
          </div>
        </div>
      </div>

      <div class="mt-3 pt-2 border-t flex justify-between items-center text-xs">
        <span class="text-muted-foreground font-mono">{{ modelValue }}</span>
        <button
          type="button"
          @click="isOpen = false"
          class="inline-flex items-center gap-1 rounded bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <CheckIcon class="size-3" />
          <span>Done</span>
        </button>
      </div>
    </div>
  </div>
</template>
