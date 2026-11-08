<script setup lang="ts">
import { MediaGallery, type MediaItem } from "@/registry/default/ui/media-gallery";

const items: MediaItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
    title: "Deep Emerald Forest",
    category: "Nature",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    title: "Pacific Coast Trails",
    category: "Adventure",
  },
];
</script>

<template>
  <div class="w-full max-w-md">
    <MediaGallery :items="items" :columns="2" gap="default" aspect-ratio="square" />
  </div>
</template>
