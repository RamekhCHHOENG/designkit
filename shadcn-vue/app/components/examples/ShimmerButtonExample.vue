<script setup lang="ts">
import { ShimmerButton } from "@/registry/default/ui/shimmer-button";
import { Sparkles, ArrowRight } from "lucide-vue-next";
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-8 w-full">
    <ShimmerButton
      shimmer-color="#38bdf8"
      background="rgba(15, 23, 42, 0.95)"
      class="text-white"
    >
      <Sparkles class="size-3.5 text-sky-400" />
      <span>Deploy to Production</span>
      <ArrowRight class="size-3.5 ml-1" />
    </ShimmerButton>
  </div>
</template>
