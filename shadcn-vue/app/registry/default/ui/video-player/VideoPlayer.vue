<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture,
  RotateCcw,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
  badge?: string;
  autoHideControlsMs?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<VideoPlayerProps>(), {
  src: "/sample-video.mp4",
  badge: "HD",
  autoHideControlsMs: 3000,
});

const videoRef = ref<HTMLVideoElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

const activeSrc = ref(props.src || "/sample-video.mp4");
const hasError = ref(false);

watch(
  () => props.src,
  (newSrc) => {
    activeSrc.value = newSrc || "/sample-video.mp4";
    hasError.value = false;
  }
);

function handleVideoError() {
  if (activeSrc.value !== "/sample-video.mp4") {
    console.warn("Video failed to load external src; falling back to local /sample-video.mp4");
    activeSrc.value = "/sample-video.mp4";
  } else {
    hasError.value = true;
  }
}

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const isFullscreen = ref(false);
const showControls = ref(true);
const playbackRate = ref(1);
const showSpeedMenu = ref(false);

let hideTimer: any = null;

onMounted(() => {
  const onFsChange = () => {
    isFullscreen.value = Boolean(document.fullscreenElement);
  };
  document.addEventListener("fullscreenchange", onFsChange);
  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", onFsChange);
    if (hideTimer) clearTimeout(hideTimer);
  });
});

function formatTime(seconds: number) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function triggerAutoHide() {
  showControls.value = true;
  if (hideTimer) clearTimeout(hideTimer);
  if (isPlaying.value) {
    hideTimer = setTimeout(() => {
      showControls.value = false;
      showSpeedMenu.value = false;
    }, props.autoHideControlsMs);
  }
}

async function togglePlay() {
  const video = videoRef.value;
  if (!video) return;
  try {
    if (video.paused || video.ended) {
      await video.play();
    } else {
      video.pause();
    }
  } catch (err) {
    console.warn("Video play error:", err);
  }
  triggerAutoHide();
}

function toggleMute() {
  const video = videoRef.value;
  if (!video) return;
  const newMuted = !isMuted.value;
  video.muted = newMuted;
  isMuted.value = newMuted;
  if (!newMuted && volume.value === 0) {
    video.volume = 0.5;
    volume.value = 0.5;
  }
}

function handleVolumeChange(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value);
  volume.value = val;
  if (videoRef.value) {
    videoRef.value.volume = val;
    videoRef.value.muted = val === 0;
    isMuted.value = val === 0;
  }
}

function handleSeek(e: Event) {
  const newTime = parseFloat((e.target as HTMLInputElement).value);
  currentTime.value = newTime;
  if (videoRef.value) {
    videoRef.value.currentTime = newTime;
  }
}

async function toggleFullscreen() {
  if (!containerRef.value) return;
  if (!document.fullscreenElement) {
    await containerRef.value.requestFullscreen?.();
    isFullscreen.value = true;
  } else {
    await document.exitFullscreen?.();
    isFullscreen.value = false;
  }
}

async function togglePiP() {
  const video = videoRef.value;
  if (!video) return;
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
  } else if (document.pictureInPictureEnabled) {
    await video.requestPictureInPicture();
  }
}

function changeSpeed(rate: number) {
  if (videoRef.value) {
    videoRef.value.playbackRate = rate;
    playbackRate.value = rate;
    showSpeedMenu.value = false;
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === " " || e.key === "k") {
    e.preventDefault();
    togglePlay();
  } else if (e.key === "f") {
    e.preventDefault();
    toggleFullscreen();
  } else if (e.key === "m") {
    e.preventDefault();
    toggleMute();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (videoRef.value) {
      videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 5);
    }
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    if (videoRef.value) {
      videoRef.value.currentTime = Math.min(
        duration.value,
        videoRef.value.currentTime + 5
      );
    }
  }
}
</script>

<template>
  <div
    ref="containerRef"
    tabindex="0"
    data-slot="video-player"
    :class="
      cn(
        'relative group flex items-center justify-center overflow-hidden rounded-2xl bg-black aspect-video select-none shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring',
        props.class
      )
    "
    @keydown="handleKeyDown"
    @mousemove="triggerAutoHide"
    @mouseleave="
      () => {
        if (isPlaying) showControls = false;
      }
    "
  >
    <video
      ref="videoRef"
      :src="activeSrc"
      :poster="poster"
      playsinline
      preload="metadata"
      class="w-full h-full object-cover cursor-pointer"
      @click="togglePlay"
      @timeupdate="
        () => {
          if (videoRef) currentTime = videoRef.currentTime;
        }
      "
      @loadedmetadata="
        () => {
          if (videoRef) duration = videoRef.duration;
        }
      "
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="isPlaying = false"
      @error="handleVideoError"
    />

    <!-- Top Overlay -->
    <div
      :class="
        cn(
          'absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between transition-opacity duration-300 z-20 pointer-events-none',
          showControls ? 'opacity-100' : 'opacity-0'
        )
      "
    >
      <span class="text-sm font-medium text-white/95 drop-shadow-md truncate">
        {{ title }}
      </span>
      <span
        v-if="badge"
        class="text-[10px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white border border-white/20 uppercase tracking-wider"
      >
        {{ badge }}
      </span>
    </div>

    <!-- Center Play/Pause Bubble -->
    <div
      :class="
        cn(
          'absolute flex items-center justify-center cursor-pointer transition-all duration-300 z-10',
          !isPlaying
            ? 'opacity-100 scale-100'
            : showControls
            ? 'opacity-60 hover:opacity-100 scale-95 hover:scale-105'
            : 'opacity-0 scale-75 pointer-events-none'
        )
      "
      @click="togglePlay"
    >
      <div
        class="flex size-14 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-xl"
      >
        <Pause v-if="isPlaying" class="size-6 fill-current" />
        <Play v-else class="size-6 fill-current ml-1" />
      </div>
    </div>

    <!-- Bottom Controls Bar -->
    <div
      :class="
        cn(
          'absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity duration-300 z-20',
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )
      "
    >
      <!-- Scrubber Timeline -->
      <div class="relative flex items-center w-full group/slider">
        <input
          type="range"
          min="0"
          :max="duration || 100"
          :value="currentTime"
          class="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary group-hover/slider:h-2 transition-all outline-none"
          @input="handleSeek"
        />
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between text-white/90 text-xs">
        <div class="flex items-center gap-3">
          <button
            type="button"
            :title="isPlaying ? 'Pause (Space)' : 'Play (Space)'"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
            class="p-1 hover:text-white transition-colors"
            @click="togglePlay"
          >
            <Pause v-if="isPlaying" class="size-4 fill-current" />
            <Play v-else class="size-4 fill-current" />
          </button>

          <button
            type="button"
            title="Rewind 10s"
            aria-label="Rewind 10s"
            class="p-1 hover:text-white transition-colors"
            @click="
              () => {
                if (videoRef) videoRef.currentTime -= 10;
              }
            "
          >
            <RotateCcw class="size-3.5" />
          </button>

          <!-- Volume -->
          <div class="flex items-center gap-1.5 group/vol">
            <button
              type="button"
              :title="isMuted ? 'Unmute (M)' : 'Mute (M)'"
              :aria-label="isMuted ? 'Unmute' : 'Mute'"
              class="p-1 hover:text-white transition-colors"
              @click="toggleMute"
            >
              <VolumeX v-if="isMuted || volume === 0" class="size-4" />
              <Volume2 v-else class="size-4" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              :value="isMuted ? 0 : volume"
              class="w-14 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-white outline-none"
              @input="handleVolumeChange"
            />
          </div>

          <span class="font-mono text-[11px] text-white/80 select-none">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <!-- Speed -->
          <div class="relative">
            <button
              type="button"
              title="Playback Speed"
              class="px-2 py-0.5 rounded hover:bg-white/10 text-[11px] font-mono font-medium transition-colors"
              @click="showSpeedMenu = !showSpeedMenu"
            >
              {{ playbackRate }}x
            </button>

            <div
              v-if="showSpeedMenu"
              class="absolute right-0 bottom-full mb-2 bg-black/90 backdrop-blur-md border border-white/15 rounded-lg py-1 shadow-xl flex flex-col z-30"
            >
              <button
                v-for="rate in [0.5, 0.75, 1, 1.25, 1.5, 2]"
                :key="rate"
                type="button"
                :class="
                  cn(
                    'px-3 py-1 text-left text-[11px] hover:bg-white/20 transition-colors',
                    playbackRate === rate ? 'text-primary font-bold' : 'text-white/80'
                  )
                "
                @click="changeSpeed(rate)"
              >
                {{ rate }}x
              </button>
            </div>
          </div>

          <!-- PiP -->
          <button
            type="button"
            title="Picture in Picture"
            aria-label="Picture in Picture"
            class="p-1 hover:text-white transition-colors"
            @click="togglePiP"
          >
            <PictureInPicture class="size-4" />
          </button>

          <!-- Fullscreen -->
          <button
            type="button"
            :title="isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'"
            :aria-label="isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'"
            class="p-1 hover:text-white transition-colors"
            @click="toggleFullscreen"
          >
            <Minimize v-if="isFullscreen" class="size-4" />
            <Maximize v-else class="size-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
