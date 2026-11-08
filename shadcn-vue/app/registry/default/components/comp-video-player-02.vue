<script setup lang="ts">
import { VideoPlayer } from "@/registry/default/ui/video-player";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/registry/default/ui/card";
</script>

<template>
  <Card class="w-full max-w-md overflow-hidden shadow-sm">
    <VideoPlayer
      src="/sample-video-2.mp4"
      poster="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80"
      title="Sintel Trailer — Open Movie"
      badge="1080P"
      class="rounded-none aspect-video"
    />
    <CardHeader class="p-4">
      <CardTitle class="text-sm">DesignKit Architecture Deep Dive</CardTitle>
      <CardDescription class="text-xs">
        Learn how tokenized CSS and headless components power fluid web applications.
      </CardDescription>
    </CardHeader>
  </Card>
</template>
