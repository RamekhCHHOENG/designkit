<script setup lang="ts">
import { ref } from "vue";
import { SignaturePad } from "@/registry/default/ui/signature-pad";

const savedSignature = ref<string | null>(null);
</script>

<template>
  <div class="w-full max-w-md flex flex-col gap-3 p-4 rounded-xl border bg-card shadow-sm">
    <div class="flex items-center justify-between pb-1">
      <span class="text-xs font-semibold text-foreground">Sign Legal Agreement</span>
      <span class="text-[11px] text-muted-foreground">Digital Signature</span>
    </div>

    <SignaturePad
      :height="150"
      @save="(url) => savedSignature = url"
      @clear="() => savedSignature = null"
    />

    <div v-if="savedSignature" class="p-2 border rounded bg-background flex flex-col gap-1">
      <span class="text-[10px] text-muted-foreground">Captured PNG Signature:</span>
      <img :src="savedSignature" class="h-10 object-contain" alt="Signature" />
    </div>
  </div>
</template>
