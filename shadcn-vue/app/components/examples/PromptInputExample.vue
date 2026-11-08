<script setup lang="ts">
import { ref } from "vue";
import { PromptInput, type PromptAttachment } from "@/registry/default/ui/prompt-input";
import { ModelSelector, type AIModel } from "@/registry/default/ui/model-selector";

const prompt = ref("");
const attachments = ref<PromptAttachment[]>([
  { id: "1", name: "design-system-spec.pdf", size: "1.2MB" },
]);
const isGenerating = ref(false);

const sampleModels: AIModel[] = [
  { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", contextWindow: "200k" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", contextWindow: "128k" },
  { id: "gemini-2-flash", name: "Gemini 2.0 Flash", provider: "Google", contextWindow: "1M" },
];

function handleSubmit(text: string) {
  isGenerating.value = true;
  setTimeout(() => {
    isGenerating.value = false;
  }, 2500);
}

function removeAttachment(id: string) {
  attachments.value = attachments.value.filter((a) => a.id !== id);
}
</script>

<template>
  <div class="w-full max-w-xl p-4">
    <PromptInput
      v-model="prompt"
      :is-streaming="isGenerating"
      :attachments="attachments"
      @submit="handleSubmit"
      @stop="isGenerating = false"
      @remove-attachment="removeAttachment"
    >
      <template #addon-leading>
        <ModelSelector
          :models="sampleModels"
          model-value="claude-3-7-sonnet"
        />
      </template>
    </PromptInput>
  </div>
</template>
