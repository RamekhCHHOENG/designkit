<script setup lang="ts">
import { ref } from "vue";
import { ModelSelector, type AIModel } from "@/registry/default/ui/model-selector";

const models: AIModel[] = [
  { id: "claude-3-7-sonnet", name: "Claude 3.7 Sonnet", provider: "Anthropic", contextWindow: "200k" },
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", contextWindow: "128k" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google", contextWindow: "1M" },
];

const selected = ref<AIModel>(models[0]);
</script>

<template>
  <div class="flex items-center gap-3 p-4 rounded-xl border bg-card shadow-sm">
    <ModelSelector :models="models" v-model="selected.id" @select="(m) => selected = m" />
    <span class="text-xs text-muted-foreground">Active model: <strong>{{ selected.name }}</strong></span>
  </div>
</template>
