<script setup lang="ts">
import { CopyButton } from "@/registry/default/ui/copy-button";
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-6">
    <div class="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 font-mono text-xs">
      <span>npx nuxi add @ramekhchhoeng/designkit</span>
      <CopyButton value="npx nuxi add @ramekhchhoeng/designkit" />
    </div>
  </div>
</template>
