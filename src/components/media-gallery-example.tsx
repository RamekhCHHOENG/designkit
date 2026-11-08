import * as React from "react";
import { MediaGallery, MediaItem } from "@/components/ui/media-gallery";

export default function MediaGalleryExample() {
  const items: MediaItem[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      title: "Alpine Lake Mist",
      category: "Landscape",
      description: "Serene morning reflections over the crystal waters of Yosemite Valley.",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
      title: "Starry Mountain Night",
      category: "Astronomy",
      description: "Milky way galactic center rising above snowcapped peaks.",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      title: "Golden Hour Ridgeline",
      category: "Wilderness",
      description: "Dramatic warm sunlight filtering through coastal redwood trees.",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
      title: "Deep Emerald Forest",
      category: "Nature",
      description: "Lush moss covered canopies and ancient wooden bridges.",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      title: "Wilderness Solitude",
      category: "Adventure",
      description: "Wandering through the breathtaking expanses of the Pacific Northwest.",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80",
      title: "Rolling Prairie Hills",
      category: "Panorama",
      description: "Gentle rolling topography under an expansive open sky.",
    },
  ];

  return (
    <div className="w-full max-w-3xl p-4">
      <MediaGallery items={items} columns={3} gap="default" />
    </div>
  );
}
