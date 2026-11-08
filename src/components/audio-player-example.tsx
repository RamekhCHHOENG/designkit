import * as React from "react";
import { AudioPlayer } from "@/components/ui/audio-player";

export default function AudioPlayerExample() {
  return (
    <div className="w-full max-w-md p-4">
      <AudioPlayer
        title="Synthesizer Dreams — Spatial Mix"
        artist="Apple Intelligence Audio Lab"
        poster="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
      />
    </div>
  );
}
