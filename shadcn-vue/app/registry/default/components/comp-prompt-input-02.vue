<script setup lang="ts">
import { ref } from "vue";
import { PromptInput, type PromptAttachment } from "@/registry/default/ui/prompt-input";

const prompt = ref("Can you summarize this quarterly report?");
const attachments = ref<PromptAttachment[]>([
  { id: "1", name: "Q3-financials.pdf", size: "2.4MB" },
  { id: "2", name: "market-analysis.csv", size: "480KB" },
]);
</script>

<template>
  <div class="w-full max-w-lg">
    <PromptInput
      v-model="prompt"
      :attachments="attachments"
      @remove-attachment="(id) => attachments = attachments.filter(a => a.id !== id)"
    />
  </div>
</template>
