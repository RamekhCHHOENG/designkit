<script setup lang="ts">
import { ref } from "vue";
import { SignaturePad } from "@/registry/default/ui/signature-pad";

const signatureUrl = ref<string | null>(null);
</script>

<template>
  <div class="flex flex-col gap-4 p-4 max-w-md w-full">
    <SignaturePad
      :height="180"
      @save="(dataUrl) => (signatureUrl = dataUrl)"
      @clear="() => (signatureUrl = null)"
    />

    <div v-if="signatureUrl" class="flex flex-col gap-1.5 p-3 rounded-lg border bg-muted/30">
      <span class="text-xs font-semibold text-foreground">Exported Signature (PNG)</span>
      <img
        :src="signatureUrl"
        alt="Saved signature"
        class="max-h-16 object-contain border rounded bg-background p-1"
      />
    </div>
  </div>
</template>
