<script setup lang="ts">
import { Trace, type TraceStep } from "@/registry/default/ui/trace";

const steps: TraceStep[] = [
  {
    id: "1",
    name: "Search Vector Database",
    type: "tool",
    status: "success",
    durationMs: 142,
    details: '{"query": "design tokens", "results_count": 8, "threshold": 0.85}',
  },
  {
    id: "2",
    name: "Synthesize Multi-Agent Plan",
    type: "reasoning",
    status: "success",
    durationMs: 820,
    details: "Formulated 3-phase execution strategy: analysis, generation, verification.",
  },
  {
    id: "3",
    name: "Execute Code Generation Tool",
    type: "tool",
    status: "running",
    durationMs: 450,
    details: "Writing component template and reactive state bindings...",
  },
  {
    id: "4",
    name: "Dispatch Final Response",
    type: "message",
    status: "pending",
  },
];
</script>

<template>
  <div class="w-full max-w-lg p-4">
    <Trace :steps="steps" active-step-id="3" />
  </div>
</template>
