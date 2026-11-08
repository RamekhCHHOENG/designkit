<script setup lang="ts">
import { InteractiveGridPattern } from "@/registry/default/ui/interactive-grid-pattern";
</script>

<template>
  <div class="relative w-full max-w-xl h-64 rounded-2xl border overflow-hidden bg-background flex flex-col items-center justify-center p-6 text-center">
    <InteractiveGridPattern class="absolute inset-0 opacity-40" />
    <div class="relative z-10 flex flex-col items-center gap-2">
      <span class="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary">
        Interactive Kinetic Grid
      </span>
      <h3 class="text-xl font-bold tracking-tight text-foreground">Hover to Awaken Geometry</h3>
      <p class="text-xs text-muted-foreground max-w-sm">
        Pointer coordinate driven cell illumination with GPU accelerated canvas rendering.
      </p>
    </div>
  </div>
</template>
