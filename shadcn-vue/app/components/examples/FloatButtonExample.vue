<script setup lang="ts">
import { FloatButton } from "@/registry/default/ui/float-button";
import { MessageSquareIcon, Share2Icon, SparklesIcon } from "lucide-vue-next";
</script>

<template>
  <div class="flex items-center justify-center gap-4 p-8">
    <FloatButton class="relative static shadow-md">
      <SparklesIcon class="size-4 text-amber-500" />
    </FloatButton>
    <FloatButton class="relative static shadow-md">
      <MessageSquareIcon class="size-4 text-blue-500" />
    </FloatButton>
    <FloatButton class="relative static shadow-md">
      <Share2Icon class="size-4 text-emerald-500" />
    </FloatButton>
  </div>
</template>
