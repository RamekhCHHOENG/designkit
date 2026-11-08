<script setup lang="ts">
import { ref } from "vue";
import { PromptInput } from "@/registry/default/ui/prompt-input";

const prompt = ref("");
</script>

<template>
  <div class="w-full max-w-lg">
    <PromptInput
      v-model="prompt"
      placeholder="Type an instruction or question..."
    />
  </div>
</template>
