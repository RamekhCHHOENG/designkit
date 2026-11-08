<script setup lang="ts">
import { BarList } from "@/registry/default/ui/bar-list";

const data = [
  { name: "TypeScript", value: 78, color: "bg-blue-500/20" },
  { name: "Vue", value: 64, color: "bg-emerald-500/20" },
  { name: "Tailwind CSS", value: 52, color: "bg-cyan-500/20" },
  { name: "Rust", value: 34, color: "bg-amber-500/20" },
];
</script>

<template>
  <div class="w-full max-w-sm p-3 rounded-lg border bg-card">
    <span class="text-xs font-semibold text-foreground block mb-2">Codebase Composition</span>
    <BarList :data="data" :value-formatter="(v) => `${v}%`" />
  </div>
</template>
