import * as React from "react";
import { VideoPlayer } from "@/components/ui/video-player";

export default function VideoPlayerExample() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl p-4">
      <VideoPlayer
        src="/sample-video.mp4"
        poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80"
        title="Nature Blossom — 4K Macro Film"
        badge="4K HDR"
      />
    </div>
  );
}
