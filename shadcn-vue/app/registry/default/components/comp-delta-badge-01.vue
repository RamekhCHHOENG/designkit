<script setup lang="ts">
import { DeltaBadge } from "@/registry/default/ui/delta-badge";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 p-4 rounded-xl border bg-card shadow-sm">
    <DeltaBadge :value="24.8" />
    <DeltaBadge :value="-8.4" />
    <DeltaBadge :value="0.0" />
    <DeltaBadge size="sm" :value="15.2" />
    <DeltaBadge size="lg" :value="-3.1" />
  </div>
</template>
