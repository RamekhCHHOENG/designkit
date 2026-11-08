<script setup lang="ts">
import { ref } from "vue";
import { ChatContainer, ChatMessage } from "@/registry/default/ui/chat-container";

const branch = ref(0);
const responses = [
  "DesignKit provides unified OKLCH palettes and seamless dual-framework parity across React 19 and Vue 3 / Nuxt 4.",
  "Alternative 2: DesignKit features over 135 accessible primitives with built-in Apple-inspired motion and ECharts integration.",
  "Alternative 3: All DesignKit components follow the code-ownership model with zero vendor lock-in.",
];
</script>

<template>
  <div class="w-full max-w-md h-72 rounded-xl border bg-background shadow-xs overflow-hidden flex flex-col">
    <ChatContainer class="flex-1">
      <ChatMessage
        role="user"
        author-name="Alex Developer"
        timestamp="10:42 AM"
      >
        How does DesignKit compare with other UI component ecosystems?
      </ChatMessage>
      <ChatMessage
        role="assistant"
        author-name="DesignKit AI"
        timestamp="10:42 AM"
        :branch-index="branch"
        :branch-total="responses.length"
        @branch-change="(idx) => branch = idx"
      >
        {{ responses[branch] }}
      </ChatMessage>
    </ChatContainer>
  </div>
</template>
