<script setup lang="ts">
import { MorphMenuToggle, MorphPlayToggle } from "@/registry/default/ui/icon-motion";
</script>

<template>
  <div class="flex items-center gap-4 p-4 rounded-xl border bg-card shadow-sm">
    <div class="flex flex-col gap-1">
      <span class="text-xs font-semibold text-foreground">Menu Toggle</span>
      <span class="text-[11px] text-muted-foreground">Hamburger to X</span>
      <MorphMenuToggle class="mt-1" />
    </div>

    <div class="h-10 w-[1px] bg-border mx-2" />

    <div class="flex flex-col gap-1">
      <span class="text-xs font-semibold text-foreground">Playback Toggle</span>
      <span class="text-[11px] text-muted-foreground">Play to Pause</span>
      <MorphPlayToggle class="mt-1" />
    </div>
  </div>
</template>
