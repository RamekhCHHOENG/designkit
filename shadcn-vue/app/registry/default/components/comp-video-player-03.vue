<script setup lang="ts">
import { VideoPlayer } from "@/registry/default/ui/video-player";
import { Badge } from "@/registry/default/ui/badge";
import { Clock, Eye, Sparkles } from "lucide-vue-next";
</script>

<template>
  <div class="w-full max-w-lg flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Badge variant="secondary" class="gap-1 text-xs">
          <Sparkles class="size-3 text-primary" />
          Featured Episode
        </Badge>
        <span class="text-xs text-muted-foreground flex items-center gap-1">
          <Clock class="size-3" /> 12:45
        </span>
      </div>
      <span class="text-xs text-muted-foreground flex items-center gap-1">
        <Eye class="size-3" /> 24.5k views
      </span>
    </div>

    <VideoPlayer
      src="/sample-video.mp4"
      poster="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
      title="Macro Cinema — Spatial Demo"
      badge="PRO"
    />

    <div class="flex flex-col gap-1 pt-1">
      <h4 class="text-sm font-semibold text-foreground">Spatial Audio & HDR Rendering</h4>
      <p class="text-xs text-muted-foreground">
        Hardware-accelerated rendering pipelines with dynamic dynamic range switching.
      </p>
    </div>
  </div>
</template>
