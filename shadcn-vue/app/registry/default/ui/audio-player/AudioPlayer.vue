<script setup lang="ts">
import { ref, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface AudioPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
  poster?: string;
  waveformHeights?: number[];
  autoPlay?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AudioPlayerProps>(), {
  title: "DesignKit Audio Track",
  artist: "Ambient System Soundscape",
  waveformHeights: () => [
    25, 45, 60, 30, 75, 90, 40, 85, 100, 70, 50, 65, 80, 95, 30, 60, 85, 40,
    70, 90, 65, 35, 55, 75, 40, 90, 80, 45, 60, 85, 95, 50, 70, 30, 45, 65,
  ],
  autoPlay: false,
});

const audioRef = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(180);
const volume = ref(1);
const isMuted = ref(false);
const playbackRate = ref(1);
const showSpeedMenu = ref(false);

let simTimer: any = null;

function formatTime(secs: number) {
  if (isNaN(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

async function togglePlay() {
  const audio = audioRef.value;
  if (!audio) {
    isPlaying.value = !isPlaying.value;
    return;
  }

  try {
    if (audio.paused || audio.ended) {
      await audio.play();
    } else {
      audio.pause();
    }
  } catch (err) {
    console.warn("Audio playback error:", err);
  }
}

function seek(time: number) {
  currentTime.value = time;
  if (audioRef.value) {
    audioRef.value.currentTime = time;
  }
}

function skip(delta: number) {
  const next = Math.max(0, Math.min(duration.value, currentTime.value + delta));
  seek(next);
}

function toggleMute() {
  isMuted.value = !isMuted.value;
  if (audioRef.value) {
    audioRef.value.muted = isMuted.value;
  }
}

function handleVolumeChange(e: Event) {
  const val = parseFloat((e.target as HTMLInputElement).value);
  volume.value = val;
  isMuted.value = val === 0;
  if (audioRef.value) {
    audioRef.value.volume = val;
    audioRef.value.muted = val === 0;
  }
}

function changeSpeed(rate: number) {
  playbackRate.value = rate;
  showSpeedMenu.value = false;
  if (audioRef.value) {
    audioRef.value.playbackRate = rate;
  }
}

onMounted(() => {
  if (!props.src) {
    simTimer = setInterval(() => {
      if (isPlaying.value) {
        if (currentTime.value >= duration.value) {
          isPlaying.value = false;
          currentTime.value = 0;
        } else {
          currentTime.value += 1;
        }
      }
    }, 1000);
  }
});

onUnmounted(() => {
  if (simTimer) clearInterval(simTimer);
});
</script>

<template>
  <div
    data-slot="audio-player"
    :class="
      cn(
        'flex flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground shadow-sm max-w-md w-full select-none text-xs',
        props.class
      )
    "
  >
    <audio
      v-if="src"
      ref="audioRef"
      :src="src"
      :autoplay="autoPlay"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="isPlaying = false"
      @loadedmetadata="() => { if (audioRef) duration = audioRef.duration; }"
      @timeupdate="() => { if (audioRef) currentTime = audioRef.currentTime; }"
    />

    <!-- Track Header -->
    <div class="flex items-center gap-3">
      <img
        v-if="poster"
        :src="poster"
        :alt="title"
        class="size-12 rounded-xl object-cover shadow-2xs shrink-0"
      />
      <div
        v-else
        class="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-2xs shrink-0"
      >
        <Sparkles class="size-5" />
      </div>

      <div class="flex flex-col min-w-0 flex-1">
        <span class="font-semibold text-xs text-foreground truncate">{{ title }}</span>
        <span class="text-[11px] text-muted-foreground truncate">{{ artist }}</span>
      </div>

      <!-- Speed menu -->
      <div class="relative">
        <button
          type="button"
          class="rounded-md border bg-muted/30 px-1.5 py-0.5 text-[10px] font-mono font-medium hover:bg-muted text-muted-foreground"
          @click="showSpeedMenu = !showSpeedMenu"
        >
          {{ playbackRate }}x
        </button>
        <div
          v-if="showSpeedMenu"
          class="absolute right-0 top-full mt-1 z-50 flex flex-col rounded-lg border bg-popover p-1 shadow-md text-xs bg-background"
        >
          <button
            v-for="r in [0.75, 1, 1.25, 1.5, 2]"
            :key="r"
            type="button"
            :class="
              cn(
                'rounded px-2 py-1 text-left text-[11px] hover:bg-muted',
                playbackRate === r && 'font-semibold text-primary'
              )
            "
            @click="changeSpeed(r)"
          >
            {{ r }}x
          </button>
        </div>
      </div>
    </div>

    <!-- Waveform Scrubber -->
    <div class="flex flex-col gap-1.5 pt-1">
      <div
        class="relative flex items-center justify-between h-9 gap-1 cursor-pointer group"
        @click="(e) => {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          seek(ratio * duration);
        }"
      >
        <div
          v-for="(h, idx) in waveformHeights"
          :key="idx"
          :class="
            cn(
              'w-1 rounded-full transition-all duration-150 group-hover:opacity-90',
              (idx / waveformHeights.length) * 100 <= (currentTime / duration) * 100
                ? 'bg-primary'
                : 'bg-muted-foreground/25'
            )
          "
          :style="{ height: `${Math.max(15, h)}%` }"
        />
      </div>

      <div class="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex items-center justify-between pt-1 border-t">
      <div class="flex items-center gap-2">
        <button
          type="button"
          title="Rewind 15s"
          class="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          @click="skip(-15)"
        >
          <RotateCcw class="size-3.5" />
        </button>

        <button
          type="button"
          class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95 shadow-xs"
          @click="togglePlay"
        >
          <Pause v-if="isPlaying" class="size-4 fill-current" />
          <Play v-else class="size-4 fill-current ml-0.5" />
        </button>

        <button
          type="button"
          title="Forward 15s"
          class="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          @click="skip(15)"
        >
          <RotateCw class="size-3.5" />
        </button>
      </div>

      <!-- Volume -->
      <div class="flex items-center gap-1.5">
        <button
          type="button"
          class="text-muted-foreground hover:text-foreground transition-colors"
          @click="toggleMute"
        >
          <VolumeX v-if="isMuted || volume === 0" class="size-3.5" />
          <Volume2 v-else class="size-3.5" />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          :value="isMuted ? 0 : volume"
          class="w-14 h-1 rounded-full appearance-none bg-muted accent-primary cursor-pointer"
          @input="handleVolumeChange"
        />
      </div>
    </div>
  </div>
</template>
