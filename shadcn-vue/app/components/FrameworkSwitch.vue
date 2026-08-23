<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const hash = ref("");

function updateHash() {
  if (typeof window !== "undefined") {
    hash.value = window.location.hash;
  }
}

onMounted(() => {
  updateHash();
  window.addEventListener("hashchange", updateHash);
});

onUnmounted(() => {
  window.removeEventListener("hashchange", updateHash);
});

const reactUrl = computed(() => {
  if (typeof window === "undefined") return "http://localhost:5173/";
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (isLocal) {
    return `http://${window.location.hostname}:5173/${hash.value}`;
  }
  return `https://designkit-smoky.vercel.app/${hash.value}`;
});
</script>

<template>
  <div class="flex items-center gap-0.5 rounded-full border border-border bg-muted/50 p-0.5 text-sm">
    <a
      :href="reactUrl"
      class="rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      shadcn/ui
    </a>
    <span class="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
      shadcn-vue
    </span>
  </div>
</template>
