<script setup lang="ts">
import { ref } from "vue";
import { ScrollProgress } from "@/registry/default/ui/scroll-progress";
import { Button } from "@/registry/default/ui/button";

const isGradient = ref(true);
const containerRef = ref<HTMLDivElement | null>(null);
</script>

<template>
  <div class="w-full max-w-md space-y-4">
    <div class="flex items-center justify-between">
      <span class="text-xs font-medium text-muted-foreground">Vue Scroll Progress Bar</span>
      <Button
        variant="outline"
        size="sm"
        class="text-xs h-7"
        @click="isGradient = !isGradient"
      >
        {{ isGradient ? "Gradient Bar" : "Solid Bar" }}
      </Button>
    </div>

    <div class="relative rounded-xl border bg-card overflow-hidden shadow-xs">
      <ScrollProgress
        :gradient="isGradient"
        class="absolute top-0 left-0 right-0 h-1"
      />

      <div
        ref="containerRef"
        class="h-48 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed text-muted-foreground"
      >
        <p class="font-medium text-foreground">
          Scroll down inside this box to see the progress bar respond in real-time.
        </p>
        <p>
          DesignKit’s ScrollProgress supports viewport page tracking and individual container scroll tracking with passive event throttling via <code>requestAnimationFrame</code>.
        </p>
        <p>
          Toggle between the unified DesignKit OKLCH gradient and the theme's solid primary color with the <code>gradient</code> prop.
        </p>
        <p>
          Works seamlessly in Vue 3 and Nuxt with full SSR hydration safety and zero layout shift.
        </p>
      </div>
    </div>
  </div>
</template>
