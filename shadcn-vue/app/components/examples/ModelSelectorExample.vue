<script setup lang="ts">
import { ref } from "vue";
import { ModelSelector, type AIModel } from "@/registry/default/ui/model-selector";

const models: AIModel[] = [
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    description: "Hybrid reasoning and rapid code generation",
    contextWindow: "200k",
  },
  {
    id: "gpt-4.5-preview",
    name: "GPT-4.5",
    provider: "OpenAI",
    description: "Frontier knowledge and deep instruction following",
    contextWindow: "128k",
  },
  {
    id: "gemini-2.0-pro",
    name: "Gemini 2.0 Pro",
    provider: "Google",
    description: "Multimodal and 2M token context window",
    contextWindow: "2M",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    description: "Open-weights reasoning model",
    contextWindow: "64k",
  },
  {
    id: "qwen-2.5-coder",
    name: "Qwen 2.5 Coder 32B",
    provider: "Ollama",
    description: "Local private coding model",
    contextWindow: "32k",
  },
];

const selected = ref<AIModel>(models[0]);
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <div class="flex items-center gap-3">
      <ModelSelector
        :models="models"
        :model-value="selected.id"
        @select="(m) => (selected = m)"
      />
    </div>

    <div class="text-xs text-muted-foreground">
      Active: <span class="font-semibold text-foreground">{{ selected.name }}</span> ({{ selected.provider }}) &mdash; {{ selected.contextWindow }} window
    </div>
  </div>
</template>
