<script setup lang="ts">
import { ref, onMounted, watch, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export interface WatermarkProps {
  content?: string | string[];
  image?: string;
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
  gap?: [number, number];
  font?: {
    color?: string;
    fontSize?: number;
    fontWeight?: string | number;
    fontFamily?: string;
  };
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<WatermarkProps>(), {
  content: "CONFIDENTIAL",
  width: 160,
  height: 64,
  rotate: -22,
  zIndex: 9,
  gap: () => [100, 100],
});

const base64Url = ref("");

function renderWatermark() {
  if (typeof document === "undefined") return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const [gapX, gapY] = props.gap;
  const canvasWidth = props.width + gapX;
  const canvasHeight = props.height + gapY;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate((props.rotate * Math.PI) / 180);

  const color = props.font?.color ?? "rgba(0, 0, 0, 0.08)";
  const fontSize = props.font?.fontSize ?? 14;
  const fontWeight = props.font?.fontWeight ?? "normal";
  const fontFamily = props.font?.fontFamily ?? "sans-serif";

  if (props.image) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = props.image;
    img.onload = () => {
      ctx.drawImage(img, -props.width / 2, -props.height / 2, props.width, props.height);
      base64Url.value = canvas.toDataURL();
    };
  } else {
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const contents = Array.isArray(props.content) ? props.content : [props.content];
    contents.forEach((line, index) => {
      ctx.fillText(line, 0, (index - (contents.length - 1) / 2) * (fontSize + 4));
    });

    base64Url.value = canvas.toDataURL();
  }
}

onMounted(renderWatermark);
watch(() => [props.content, props.image, props.width, props.height, props.rotate], renderWatermark);
</script>

<template>
  <div data-slot="watermark" :class="cn('relative overflow-hidden', props.class)">
    <slot />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 select-none"
      :style="{
        zIndex: props.zIndex,
        backgroundImage: base64Url ? `url(${base64Url})` : undefined,
        backgroundRepeat: 'repeat',
        backgroundPosition: '0 0',
      }"
    />
  </div>
</template>
