<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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
</script>

<template>
  <div class="flex items-center gap-0.5 rounded-full border border-border bg-muted/50 p-0.5 text-sm">
    <a
      :href="`http://localhost:5173/${hash}`"
      class="rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      shadcn/ui
    </a>
    <span class="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-sm">
      shadcn-vue
    </span>
  </div>
</template>
