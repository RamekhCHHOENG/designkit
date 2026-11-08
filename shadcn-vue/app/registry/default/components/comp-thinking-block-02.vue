<script setup lang="ts">
import { ref } from "vue";
import { ThinkingBlock } from "@/registry/default/ui/thinking-block";

const isStreaming = ref(true);
</script>

<template>
  <div class="w-full max-w-lg flex flex-col gap-3">
    <ThinkingBlock
      title="Streaming Thoughts"
      :is-streaming="isStreaming"
      :duration-ms="1100"
      :tokens="320"
      :default-open="true"
    >
Generating AST transformation tree and resolving reactive dependencies...
    </ThinkingBlock>
  </div>
</template>
