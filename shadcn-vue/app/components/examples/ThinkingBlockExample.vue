<script setup lang="ts">
import { ref } from "vue";
import { ThinkingBlock } from "@/registry/default/ui/thinking-block";

const isStreaming = ref(false);
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-4 p-4">
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="text-xs px-2.5 py-1 rounded-md border bg-muted/60 hover:bg-muted font-medium transition-colors"
        @click="isStreaming = !isStreaming"
      >
        {{ isStreaming ? "Stop Stream" : "Simulate Stream" }}
      </button>
    </div>

    <ThinkingBlock
      title="Reasoning Chain"
      :is-streaming="isStreaming"
      :duration-ms="1850"
      :tokens="420"
      :default-open="true"
    >
1. Analyze incoming user request for component parity.
2. Scan existing catalog entries across React 19 and Nuxt 4.
3. Validate WAI-ARIA keyboard interaction models.
4. Calculate proportional flex allocations for category segments.
5. Verification completed with zero hydration mismatch.
    </ThinkingBlock>
  </div>
</template>
