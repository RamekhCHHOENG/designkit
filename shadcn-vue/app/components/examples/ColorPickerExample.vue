<script setup lang="ts">
import { ref } from "vue";
import { ColorPicker } from "@/registry/default/ui/color-picker";

const selectedColor = ref("#8b5cf6");
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-6">
    <div class="flex items-center gap-3">
      <span class="text-xs text-muted-foreground">Brand Color:</span>
      <ColorPicker v-model="selectedColor" />
    </div>

    <div
      class="h-20 w-48 rounded-xl shadow-md transition-colors border border-black/10 flex items-center justify-center text-xs font-semibold text-white"
      :style="{ backgroundColor: selectedColor }"
    >
      Preview Box
    </div>
  </div>
</template>
