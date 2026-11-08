<script setup lang="ts">
import { ref, onMounted, type HTMLAttributes } from "vue";
import { RotateCcw, Check } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface SignaturePadProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  showGuideLine?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<SignaturePadProps>(), {
  width: 500,
  height: 200,
  strokeColor: "currentColor",
  strokeWidth: 2.5,
  showGuideLine: true,
});

const emit = defineEmits<{
  (e: "save", dataUrl: string): void;
  (e: "clear"): void;
  (e: "change", isEmpty: boolean): void;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isDrawing = ref(false);
const isEmpty = ref(true);

function setupCanvas() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = props.width * dpr;
  canvas.height = props.height * dpr;
  ctx.scale(dpr, dpr);

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = props.strokeWidth;
  ctx.strokeStyle =
    props.strokeColor === "currentColor"
      ? getComputedStyle(canvas).color
      : props.strokeColor;
}

onMounted(() => {
  setupCanvas();
});

function getCoordinates(e: PointerEvent) {
  const canvas = canvasRef.value;
  if (!canvas) return { x: 0, y: 0 };
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function handlePointerDown(e: PointerEvent) {
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  isDrawing.value = true;
  const { x, y } = getCoordinates(e);

  const ctx = canvasRef.value?.getContext("2d");
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

function handlePointerMove(e: PointerEvent) {
  if (!isDrawing.value) return;
  const { x, y } = getCoordinates(e);

  const ctx = canvasRef.value?.getContext("2d");
  if (ctx) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  if (isEmpty.value) {
    isEmpty.value = false;
    emit("change", false);
  }
}

function handlePointerUp() {
  isDrawing.value = false;
}

function handleClear() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  isEmpty.value = true;
  emit("clear");
  emit("change", true);
}

function handleSave() {
  const canvas = canvasRef.value;
  if (!canvas || isEmpty.value) return;
  const dataUrl = canvas.toDataURL("image/png");
  emit("save", dataUrl);
}
</script>

<template>
  <div
    data-slot="signature-pad"
    :class="cn('flex flex-col gap-2 select-none', props.class)"
  >
    <div
      class="relative rounded-xl border bg-card overflow-hidden shadow-2xs touch-none"
    >
      <canvas
        ref="canvasRef"
        :style="{ width: `${width}px`, height: `${height}px` }"
        class="cursor-crosshair w-full block"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointercancel="handlePointerUp"
      />

      <!-- Guide Line -->
      <div
        v-if="showGuideLine"
        class="pointer-events-none absolute bottom-8 inset-x-8 border-b border-dashed border-border/70 flex items-center justify-between text-[11px] text-muted-foreground/60"
      >
        <span>Sign on the line</span>
        <span>X</span>
      </div>
    </div>

    <!-- Actions Bar -->
    <div class="flex items-center justify-between gap-2 px-1">
      <button
        type="button"
        :disabled="isEmpty"
        class="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:pointer-events-none"
        @click="handleClear"
      >
        <RotateCcw class="size-3" />
        <span>Clear</span>
      </button>

      <button
        type="button"
        :disabled="isEmpty"
        class="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1 text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:pointer-events-none"
        @click="handleSave"
      >
        <Check class="size-3" />
        <span>Save Signature</span>
      </button>
    </div>
  </div>
</template>
