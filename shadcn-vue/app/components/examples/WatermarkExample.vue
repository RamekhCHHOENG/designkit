<script setup lang="ts">
import { Watermark } from "@/registry/default/ui/watermark";
</script>

<template>
  <div class="p-6">
    <Watermark content="INTERNAL USE ONLY" :font="{ color: 'rgba(150, 150, 150, 0.15)', fontSize: 13 }">
      <div class="h-56 rounded-xl border border-dashed border-border p-6 flex flex-col justify-between">
        <h4 class="font-semibold text-foreground">Sensitive Financial Report Q4</h4>
        <p class="text-sm text-muted-foreground">
          This container is wrapped with a responsive, zero-overhead canvas watermark layer that prevents unauthorized screenshots and confidential leaks.
        </p>
        <span class="text-xs text-muted-foreground font-mono">CONFIDENTIAL &bull; STRICT ACCESS ONLY</span>
      </div>
    </Watermark>
  </div>
</template>
