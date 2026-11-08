<script setup lang="ts">
import { ref } from "vue";
import { ToolCallCard } from "@/registry/default/ui/tool-call-card";

const status = ref<"pending" | "running" | "success">("pending");

function handleConfirm() {
  status.value = "running";
  setTimeout(() => (status.value = "success"), 1000);
}
</script>

<template>
  <div class="w-full max-w-sm space-y-3 p-2">
    <ToolCallCard
      tool-name="read_codebase_schema"
      status="success"
      :duration-ms="185"
      :args="{ path: 'src/lib/index.ts', lineRange: [1, 50] }"
      :result="{ exportsFound: 135, framework: 'React 19 + Vue 3' }"
    />

    <ToolCallCard
      tool-name="deploy_edge_worker"
      :status="status"
      :duration-ms="status === 'success' ? 420 : undefined"
      :requires-confirmation="status === 'pending'"
      @confirm="handleConfirm"
      :args="{ target: 'production', region: 'iad1' }"
    />
  </div>
</template>
