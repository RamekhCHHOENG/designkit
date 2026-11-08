<script setup lang="ts">
import { ref } from "vue";
import { QRCode } from "@/registry/default/ui/qr-code";

const status = ref<"active" | "expired">("active");

function refresh() {
  status.value = "active";
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-8 p-6">
    <div class="flex flex-col items-center gap-2">
      <QRCode value="https://designkit.smoky.app" downloadable />
      <span class="text-xs text-muted-foreground">Downloadable QR</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <QRCode
        value="https://github.com/RamekhCHHOENG/designkit"
        color="oklch(0.6 0.2 260)"
        :size="140"
      />
      <span class="text-xs text-muted-foreground">Custom Color</span>
    </div>

    <div class="flex flex-col items-center gap-2">
      <QRCode
        value="EXPIRED_CODE"
        :status="status"
        :size="140"
        @refresh="refresh"
      />
      <span class="text-xs text-muted-foreground">Expired State</span>
    </div>
  </div>
</template>
