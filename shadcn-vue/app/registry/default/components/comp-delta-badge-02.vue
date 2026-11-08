<script setup lang="ts">
import { DeltaBadge } from "@/registry/default/ui/delta-badge";
</script>

<template>
  <div class="flex items-center gap-4 p-4 rounded-xl border bg-card">
    <div class="flex flex-col gap-1">
      <span class="text-xs text-muted-foreground">API Latency (Lower is better)</span>
      <DeltaBadge :value="14.6" :is-increase-positive="false" />
    </div>

    <div class="h-10 w-[1px] bg-border" />

    <div class="flex flex-col gap-1">
      <span class="text-xs text-muted-foreground">MRR Growth</span>
      <DeltaBadge :value="4820" :format="(v) => `+$${v.toLocaleString()}`" />
    </div>
  </div>
</template>
