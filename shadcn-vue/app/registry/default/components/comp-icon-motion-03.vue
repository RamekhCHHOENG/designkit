<script setup lang="ts">
import { ref } from "vue";
import { IconMotion } from "@/registry/default/ui/icon-motion";
import { Bookmark, Heart } from "lucide-vue-next";

const isBookmarked = ref(false);
</script>

<template>
  <div class="flex items-center gap-4 p-4 rounded-xl border bg-card shadow-sm">
    <div class="flex flex-col gap-1 items-center">
      <span class="text-xs text-muted-foreground">3D Flip</span>
      <IconMotion v-model="isBookmarked" transition="flip" title="Save Bookmark">
        <template #first><Bookmark class="size-4 text-muted-foreground" /></template>
        <template #second><Bookmark class="size-4 fill-primary text-primary" /></template>
      </IconMotion>
    </div>

    <div class="h-10 w-[1px] bg-border" />

    <div class="flex flex-col gap-1 items-center">
      <span class="text-xs text-muted-foreground">Slide Up</span>
      <IconMotion transition="slide" title="Like">
        <template #first><Heart class="size-4 text-muted-foreground" /></template>
        <template #second><Heart class="size-4 fill-rose-500 text-rose-500" /></template>
      </IconMotion>
    </div>
  </div>
</template>
