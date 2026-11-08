<script setup lang="ts">
import { MediaGallery, type MediaItem } from "@/registry/default/ui/media-gallery";

const items: MediaItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    title: "Alpine Mist",
    category: "Landscape",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    title: "Starry Night",
    category: "Astronomy",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    title: "Golden Ridgeline",
    category: "Wilderness",
  },
];
</script>

<template>
  <div class="w-full max-w-xl">
    <MediaGallery :items="items" :columns="3" gap="sm" aspect-ratio="video" />
  </div>
</template>
