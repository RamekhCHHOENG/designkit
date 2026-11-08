<script setup lang="ts">
import { ref } from "vue";
import { ScrollShadow } from "@/registry/default/ui/scroll-shadow";
import { Badge } from "@/registry/default/ui/badge";

const hideScrollbar = ref(false);

const items = [
  { id: 1, title: "DesignKit v1.3.0 Architecture", category: "Core", time: "10m ago" },
  { id: 2, title: "Dual-Framework Parity Testing", category: "Quality", time: "25m ago" },
  { id: 3, title: "Zero Layout Shift Viewport Primitives", category: "Performance", time: "1h ago" },
  { id: 4, title: "OKLCH Theme System Calibration", category: "Design", time: "2h ago" },
  { id: 5, title: "Dynamic Scroll Shadow Masking", category: "Animation", time: "3h ago" },
  { id: 6, title: "Vercel Static Edge SPA Deployment", category: "DevOps", time: "4h ago" },
  { id: 7, title: "Accessible Focus-Visible Rings", category: "A11y", time: "5h ago" },
  { id: 8, title: "Universal Icon Motion Primitives", category: "Motion", time: "6h ago" },
];
</script>

<template>
  <div class="w-full max-w-sm space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-xs font-medium text-muted-foreground">Auto-Fading Scroll Container</span>
      <button
        type="button"
        @click="hideScrollbar = !hideScrollbar"
        class="text-xs text-primary hover:underline"
      >
        {{ hideScrollbar ? "Show Scrollbar" : "Hide Scrollbar" }}
      </button>
    </div>

    <ScrollShadow
      :size="48"
      :hide-scroll-bar="hideScrollbar"
      class="h-56 rounded-xl border bg-card p-2 shadow-xs"
    >
      <div class="space-y-2 p-1">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between rounded-lg border bg-background p-2.5 text-xs transition-colors hover:bg-muted/50"
        >
          <div class="flex flex-col gap-0.5">
            <span class="font-medium text-foreground">{{ item.title }}</span>
            <span class="text-[10px] text-muted-foreground">{{ item.time }}</span>
          </div>
          <Badge variant="secondary" class="text-[10px]">
            {{ item.category }}
          </Badge>
        </div>
      </div>
    </ScrollShadow>

    <p class="text-[11px] text-muted-foreground text-center">
      Scroll up and down — top and bottom shadows smoothly fade in and out.
    </p>
  </div>
</template>
