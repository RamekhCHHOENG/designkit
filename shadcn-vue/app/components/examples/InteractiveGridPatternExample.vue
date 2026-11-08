<script setup lang="ts">
import { InteractiveGridPattern } from "@/registry/default/ui/interactive-grid-pattern";
import { Sparkles } from "lucide-vue-next";
</script>

<template>
  <div class="relative flex flex-col items-center justify-center p-8 w-full max-w-xl rounded-2xl border bg-card overflow-hidden shadow-sm">
    <InteractiveGridPattern
      :width="32"
      :height="32"
      :squares="[16, 8]"
      class="absolute inset-0 opacity-40"
    />
    <div class="relative z-10 flex flex-col items-center gap-2 text-center pointer-events-none p-4">
      <span class="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
        <Sparkles class="size-4" />
      </span>
      <h4 class="font-bold text-base text-foreground tracking-tight">
        Hover to Illuminate
      </h4>
      <p class="text-xs text-muted-foreground max-w-xs leading-relaxed">
        The background grid dynamically tracks cursor coordinates and leaves a smooth illuminated trail.
      </p>
    </div>
  </div>
</template>
