<script setup lang="ts">
import { ThinkingBlock } from "@/registry/default/ui/thinking-block";
</script>

<template>
  <div class="w-full max-w-lg">
    <ThinkingBlock
      title="Agent Reasoning"
      :duration-ms="2400"
      :tokens="680"
      :default-open="true"
    >
1. Evaluate query context and detect design system components.
2. Cross-reference React 19 and Nuxt 4 symbol exports.
3. Verify ARIA attributes and keyboard shortcuts.
4. Synthesize final response with working code preview.
    </ThinkingBlock>
  </div>
</template>
