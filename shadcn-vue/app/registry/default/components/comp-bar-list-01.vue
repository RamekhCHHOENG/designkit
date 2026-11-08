<script setup lang="ts">
import { BarList } from "@/registry/default/ui/bar-list";
import { Globe, Monitor, Smartphone } from "lucide-vue-next";

const data = [
  { name: "Direct Traffic", value: 34200, icon: Globe },
  { name: "Search Engines", value: 28400, icon: Monitor },
  { name: "Social Media", value: 16900, icon: Smartphone },
];
</script>

<template>
  <div class="w-full max-w-md p-4 rounded-xl border bg-card shadow-sm">
    <div class="flex items-center justify-between border-b pb-2 mb-3">
      <span class="text-xs font-semibold text-foreground">Acquisition Channels</span>
      <span class="text-xs text-muted-foreground">Sessions</span>
    </div>
    <BarList :data="data" :value-formatter="(v) => v.toLocaleString()" />
  </div>
</template>
