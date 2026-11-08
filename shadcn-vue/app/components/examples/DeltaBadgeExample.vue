<script setup lang="ts">
import { DeltaBadge } from "@/registry/default/ui/delta-badge";
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 p-4">
    <DeltaBadge :value="18.4" />
    <DeltaBadge :value="-5.2" />
    <DeltaBadge :value="0.0" />

    <!-- Metric where increase is negative (e.g. latency) -->
    <DeltaBadge :value="12.5" :is-increase-positive="false" />

    <!-- Sizes -->
    <DeltaBadge size="sm" :value="24.1" />
    <DeltaBadge size="lg" :value="-9.8" />

    <!-- Custom format -->
    <DeltaBadge
      :value="1520"
      :format="(v) => `+$${v.toLocaleString()}`"
    />
  </div>
</template>
