<script setup lang="ts">
import { ref } from "vue";
import { Rating } from "@/registry/default/ui/rating";

const rate1 = ref(4);
const rate2 = ref(3.5);
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-6">
    <div class="flex flex-col items-center gap-2">
      <span class="text-xs text-muted-foreground">Standard 5-Star (Value: {{ rate1 }})</span>
      <Rating v-model="rate1" size="default" />
    </div>

    <div class="flex flex-col items-center gap-2">
      <span class="text-xs text-muted-foreground">Half-Star Precision (Value: {{ rate2 }})</span>
      <Rating v-model="rate2" :precision="0.5" size="lg" />
    </div>

    <div class="flex flex-col items-center gap-2">
      <span class="text-xs text-muted-foreground">Read Only</span>
      <Rating :model-value="4.5" :precision="0.5" read-only size="sm" />
    </div>
  </div>
</template>
