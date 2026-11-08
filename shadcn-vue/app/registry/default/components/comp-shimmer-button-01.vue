<script setup lang="ts">
import { ShimmerButton } from "@/registry/default/ui/shimmer-button";
import { Sparkles, ArrowRight } from "lucide-vue-next";
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-4 p-4">
    <ShimmerButton shimmer-color="#a855f7" class="shadow-lg">
      <span class="flex items-center gap-2">
        <Sparkles class="size-4" />
        <span>Deploy Instant Stack</span>
        <ArrowRight class="size-3.5" />
      </span>
    </ShimmerButton>

    <ShimmerButton shimmer-color="#3b82f6" background="rgba(15, 23, 42, 0.9)">
      <span class="text-xs font-semibold">Explore Primitives</span>
    </ShimmerButton>
  </div>
</template>
