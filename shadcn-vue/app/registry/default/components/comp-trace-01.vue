<script setup lang="ts">
import { Trace, type TraceStep } from "@/registry/default/ui/trace";

const steps: TraceStep[] = [
  { id: "1", name: "Vector Index Lookup", type: "tool", status: "success", durationMs: 84 },
  { id: "2", name: "Plan Generation", type: "reasoning", status: "success", durationMs: 420 },
  { id: "3", name: "Subagent Execution", type: "subagent", status: "running", durationMs: 250 },
  { id: "4", name: "Final Notification", type: "message", status: "pending" },
];
</script>

<template>
  <div class="w-full max-w-lg p-2">
    <Trace :steps="steps" active-step-id="3" />
  </div>
</template>
