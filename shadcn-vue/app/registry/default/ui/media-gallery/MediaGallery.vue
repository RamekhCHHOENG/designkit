<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Info,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface MediaItem {
  id: string | number;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  category?: string;
}

export interface MediaGalleryProps {
  items: MediaItem[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "default" | "lg";
  aspectRatio?: "video" | "square" | "auto";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<MediaGalleryProps>(), {
  columns: 3,
  gap: "default",
  aspectRatio: "auto",
});

const lightboxIndex = ref<number | null>(null);
const isZoomed = ref(false);
const showInfo = ref(false);

const activeItem = computed(() =>
  lightboxIndex.value !== null ? props.items[lightboxIndex.value] : null
);

function handleNext() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % props.items.length;
  isZoomed.value = false;
}

function handlePrev() {
  if (lightboxIndex.value === null) return;
  lightboxIndex.value =
    (lightboxIndex.value - 1 + props.items.length) % props.items.length;
  isZoomed.value = false;
}

function handleClose() {
  lightboxIndex.value = null;
  isZoomed.value = false;
  showInfo.value = false;
}

function handleKeyDown(e: KeyboardEvent) {
  if (lightboxIndex.value === null) return;
  if (e.key === "Escape") handleClose();
  else if (e.key === "ArrowRight") handleNext();
  else if (e.key === "ArrowLeft") handlePrev();
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

const colClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
};

const gapClasses = {
  sm: "gap-2",
  default: "gap-4",
  lg: "gap-6",
};

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  auto: "aspect-4/3",
};
</script>

<template>
  <div
    data-slot="media-gallery"
    :class="cn('w-full flex flex-col gap-4', props.class)"
  >
    <!-- Gallery Grid -->
    <div :class="cn('grid w-full', colClasses[columns], gapClasses[gap])">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        role="button"
        tabindex="0"
        :class="
          cn(
            'group relative overflow-hidden rounded-xl border bg-muted cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring',
            aspectClasses[aspectRatio]
          )
        "
        @click="lightboxIndex = idx"
        @keydown.enter="lightboxIndex = idx"
        @keydown.space.prevent="lightboxIndex = idx"
      >
        <img
          :src="item.thumbnail ?? item.src"
          :alt="item.alt ?? item.title ?? 'Gallery image'"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <!-- Hover Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white"
        >
          <div class="flex justify-end">
            <span class="p-1.5 rounded-full bg-black/40 backdrop-blur-md">
              <Maximize2 class="size-3.5 text-white" />
            </span>
          </div>
          <div>
            <span
              v-if="item.category"
              class="text-[10px] font-mono uppercase tracking-wider text-white/70"
            >
              {{ item.category }}
            </span>
            <h4 v-if="item.title" class="text-sm font-semibold truncate text-white">
              {{ item.title }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div
      v-if="lightboxIndex !== null && activeItem"
      role="dialog"
      aria-modal="true"
      class="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md text-white animate-in fade-in-0 duration-200 select-none"
    >
      <!-- Top Bar -->
      <div class="flex items-center justify-between p-4 z-10">
        <div class="flex items-center gap-3">
          <span class="font-mono text-xs text-white/70">
            {{ lightboxIndex + 1 }} / {{ items.length }}
          </span>
          <span
            v-if="activeItem.title"
            class="text-sm font-medium truncate max-w-xs md:max-w-md"
          >
            {{ activeItem.title }}
          </span>
        </div>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            :title="isZoomed ? 'Zoom out' : 'Zoom in'"
            :aria-label="isZoomed ? 'Zoom out' : 'Zoom in'"
            class="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            @click="isZoomed = !isZoomed"
          >
            <ZoomOut v-if="isZoomed" class="size-4" />
            <ZoomIn v-else class="size-4" />
          </button>

          <button
            type="button"
            title="Details"
            aria-label="Details"
            :class="
              cn(
                'p-2 rounded-lg hover:bg-white/10 transition-colors',
                showInfo ? 'bg-white/20 text-white' : 'text-white/80 hover:text-white'
              )
            "
            @click="showInfo = !showInfo"
          >
            <Info class="size-4" />
          </button>

          <button
            type="button"
            title="Close (Esc)"
            aria-label="Close"
            class="p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors ml-2"
            @click="handleClose"
          >
            <X class="size-5" />
          </button>
        </div>
      </div>

      <!-- Center Stage -->
      <div
        class="relative flex-1 flex items-center justify-center p-4 min-h-0 overflow-hidden"
      >
        <button
          type="button"
          title="Previous (Left arrow)"
          aria-label="Previous"
          class="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-10"
          @click="handlePrev"
        >
          <ChevronLeft class="size-6" />
        </button>

        <div
          class="relative max-h-full max-w-full flex items-center justify-center overflow-auto"
        >
          <img
            :src="activeItem.src"
            :alt="activeItem.alt ?? activeItem.title ?? 'Preview'"
            :class="
              cn(
                'max-h-[75vh] max-w-[85vw] object-contain rounded-lg shadow-2xl transition-transform duration-300',
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              )
            "
            @click="isZoomed = !isZoomed"
          />
        </div>

        <button
          type="button"
          title="Next (Right arrow)"
          aria-label="Next"
          class="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-10"
          @click="handleNext"
        >
          <ChevronRight class="size-6" />
        </button>

        <!-- Info Drawer -->
        <div
          v-if="showInfo"
          class="absolute right-6 top-6 bottom-6 w-72 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 p-4 text-xs text-white/80 flex flex-col gap-3 z-20 animate-in slide-in-from-right-4"
        >
          <h4 class="text-sm font-semibold text-white">Metadata</h4>
          <div v-if="activeItem.title">
            <span class="text-[10px] text-white/50 block">Title</span>
            <span>{{ activeItem.title }}</span>
          </div>
          <div v-if="activeItem.description">
            <span class="text-[10px] text-white/50 block">Description</span>
            <p class="leading-relaxed">{{ activeItem.description }}</p>
          </div>
          <div v-if="activeItem.category">
            <span class="text-[10px] text-white/50 block">Category</span>
            <span class="font-mono">{{ activeItem.category }}</span>
          </div>
        </div>
      </div>

      <!-- Scrubber Bottom Thumbnails -->
      <div
        class="flex items-center justify-center gap-2 p-4 overflow-x-auto border-t border-white/10 z-10 bg-black/40"
      >
        <button
          v-for="(item, idx) in items"
          :key="item.id"
          type="button"
          :class="
            cn(
              'size-12 shrink-0 rounded-lg overflow-hidden border transition-all',
              lightboxIndex === idx
                ? 'border-primary ring-2 ring-primary/50 scale-105'
                : 'border-transparent opacity-60 hover:opacity-100'
            )
          "
          @click="
            lightboxIndex = idx;
            isZoomed = false;
          "
        >
          <img
            :src="item.thumbnail ?? item.src"
            alt=""
            class="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  </div>
</template>
