<script setup lang="ts">
import { ref } from "vue";
import { IconMotion } from "@/registry/default/ui/icon-motion";
import { Sun, Moon, Volume2, VolumeX, Search, X, Copy, Check } from "lucide-vue-next";

const isDark = ref(false);
const isMuted = ref(false);
const isSearch = ref(false);
const isCopied = ref(false);

function handleCopy(active: boolean) {
  isCopied.value = active;
  if (active) setTimeout(() => (isCopied.value = false), 1800);
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 p-4 rounded-xl border bg-card shadow-sm">
    <IconMotion v-model="isDark" title="Toggle Theme">
      <template #first><Sun class="size-4 text-amber-500" /></template>
      <template #second><Moon class="size-4 text-indigo-400" /></template>
    </IconMotion>

    <IconMotion v-model="isMuted" title="Toggle Sound">
      <template #first><Volume2 class="size-4 text-emerald-500" /></template>
      <template #second><VolumeX class="size-4 text-rose-500" /></template>
    </IconMotion>

    <IconMotion v-model="isSearch" title="Toggle Search">
      <template #first><Search class="size-4" /></template>
      <template #second><X class="size-4 text-rose-500" /></template>
    </IconMotion>

    <IconMotion :model-value="isCopied" title="Copy" @toggle="handleCopy">
      <template #first><Copy class="size-4" /></template>
      <template #second><Check class="size-4 text-emerald-500 stroke-[3]" /></template>
    </IconMotion>
  </div>
</template>
