<script setup lang="ts">
import { ref } from "vue";
import {
  IconMotion,
  MorphMenuToggle,
  MorphPlayToggle,
} from "@/registry/default/ui/icon-motion";
import {
  Search,
  X,
  Volume2,
  VolumeX,
  Heart,
  Bookmark,
  Check,
  Sun,
  Moon,
  Copy,
} from "lucide-vue-next";

const isSearchActive = ref(false);
const isMuted = ref(false);
const isBookmarked = ref(false);
const isCopied = ref(false);
const isDark = ref(false);

function handleCopy(active: boolean) {
  isCopied.value = active;
  if (active) {
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 p-4 max-w-lg w-full">
    <!-- SVG Morph Line Transitions -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        SVG Morph Line Transitions
      </span>
      <div class="flex items-center gap-3">
        <MorphMenuToggle />
        <MorphPlayToggle />
      </div>
    </div>

    <!-- Spring Morph Icon Transitions -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Spring Morph Icon Transitions
      </span>
      <div class="flex items-center gap-3">
        <!-- Search <-> Close -->
        <IconMotion
          v-model="isSearchActive"
          title="Search / Close"
        >
          <template #first>
            <Search class="size-4" />
          </template>
          <template #second>
            <X class="size-4 text-rose-500" />
          </template>
        </IconMotion>

        <!-- Sound / Mute -->
        <IconMotion
          v-model="isMuted"
          title="Sound / Mute"
        >
          <template #first>
            <Volume2 class="size-4 text-emerald-500" />
          </template>
          <template #second>
            <VolumeX class="size-4 text-rose-500" />
          </template>
        </IconMotion>

        <!-- Sun / Moon Theme -->
        <IconMotion
          v-model="isDark"
          transition="morph"
          title="Light / Dark"
        >
          <template #first>
            <Sun class="size-4 text-amber-500" />
          </template>
          <template #second>
            <Moon class="size-4 text-indigo-400" />
          </template>
        </IconMotion>

        <!-- Copy / Checkmark -->
        <IconMotion
          :model-value="isCopied"
          transition="morph"
          title="Copy to clipboard"
          @toggle="handleCopy"
        >
          <template #first>
            <Copy class="size-4" />
          </template>
          <template #second>
            <Check class="size-4 text-emerald-500 stroke-[3]" />
          </template>
        </IconMotion>
      </div>
    </div>

    <!-- Flip & Slide Transitions -->
    <div class="flex flex-col gap-2">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        3D Flip & Slide Transitions
      </span>
      <div class="flex items-center gap-3">
        <IconMotion
          v-model="isBookmarked"
          transition="flip"
          title="Bookmark (3D Flip)"
        >
          <template #first>
            <Bookmark class="size-4 text-muted-foreground" />
          </template>
          <template #second>
            <Bookmark class="size-4 fill-primary text-primary" />
          </template>
        </IconMotion>

        <IconMotion
          transition="slide"
          title="Favorite (Vertical Slide)"
        >
          <template #first>
            <Heart class="size-4 text-muted-foreground" />
          </template>
          <template #second>
            <Heart class="size-4 fill-rose-500 text-rose-500" />
          </template>
        </IconMotion>
      </div>
    </div>
  </div>
</template>
