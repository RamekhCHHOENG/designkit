<script setup lang="ts">
import { ref, onMounted, watch, type HTMLAttributes } from "vue";
import QRCodeGenerator from "qrcode";
import { DownloadIcon, RefreshCwIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

export interface QRCodeProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  color?: string;
  bgColor?: string;
  icon?: string;
  iconSize?: number;
  status?: "active" | "expired" | "loading";
  downloadable?: boolean;
  fileName?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<QRCodeProps>(), {
  size: 160,
  level: "M",
  color: "#000000",
  bgColor: "#ffffff",
  iconSize: 36,
  status: "active",
  downloadable: false,
  fileName: "qrcode.png",
});

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const dataUrl = ref("");
const error = ref<string | null>(null);

function generateQR() {
  if (!props.value) return;

  QRCodeGenerator.toDataURL(props.value, {
    width: props.size,
    margin: 1,
    errorCorrectionLevel: props.level,
    color: {
      dark: props.color,
      light: props.bgColor,
    },
  })
    .then((url) => {
      dataUrl.value = url;
      error.value = null;
    })
    .catch((err) => {
      error.value = err.message;
    });
}

onMounted(generateQR);
watch(() => [props.value, props.size, props.level, props.color, props.bgColor], generateQR);

function handleDownload() {
  if (!dataUrl.value || typeof document === "undefined") return;
  const link = document.createElement("a");
  link.href = dataUrl.value;
  link.download = props.fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <div
    data-slot="qr-code"
    :class="cn('relative inline-flex flex-col items-center gap-2 select-none', props.class)"
  >
    <div
      class="relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-2 shadow-xs"
      :style="{ width: `${size + 16}px`, height: `${size + 16}px` }"
    >
      <img
        v-if="dataUrl"
        :src="dataUrl"
        :alt="`QR Code: ${value}`"
        :width="size"
        :height="size"
        class="block size-full object-contain"
      />

      <!-- Central Icon Overlay -->
      <div
        v-if="icon && status === 'active'"
        class="absolute flex items-center justify-center overflow-hidden rounded-md border-2 border-white bg-white shadow-xs"
        :style="{ width: `${iconSize}px`, height: `${iconSize}px` }"
      >
        <img :src="icon" alt="QR logo" class="size-full object-contain" />
      </div>

      <!-- Expired or Loading Overlay -->
      <div
        v-if="status !== 'active'"
        class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/85 backdrop-blur-xs text-foreground p-2 text-center"
      >
        <template v-if="status === 'expired'">
          <p class="text-xs font-medium">QR code expired</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            class="gap-1 mt-1 text-[11px] h-7"
            @click="emit('refresh')"
          >
            <RefreshCwIcon class="size-3" />
            <span>Refresh</span>
          </Button>
        </template>
        <RefreshCwIcon v-else class="size-5 animate-spin text-muted-foreground" />
      </div>
    </div>

    <Button
      v-if="downloadable && status === 'active' && dataUrl"
      type="button"
      variant="ghost"
      size="sm"
      class="text-xs text-muted-foreground hover:text-foreground gap-1 h-7"
      @click="handleDownload"
    >
      <DownloadIcon class="size-3" />
      <span>Download</span>
    </Button>

    <span v-if="error" class="text-[11px] text-destructive">{{ error }}</span>
  </div>
</template>
