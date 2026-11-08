<script setup lang="ts">
import { VideoPlayer } from "@/registry/default/ui/video-player";
</script>

<template>
  <div class="w-full max-w-sm rounded-xl overflow-hidden border shadow-sm bg-black">
    <VideoPlayer
      src="/sample-video-2.mp4"
      poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
      title="Cinematic Mini Player"
      badge="MINI"
      class="rounded-none aspect-video"
    />
    <div class="p-3 bg-card border-t flex items-center justify-between text-xs">
      <span class="font-medium text-foreground">Island Escapes 4K</span>
      <span class="text-muted-foreground font-mono">03:15</span>
    </div>
  </div>
</template>
