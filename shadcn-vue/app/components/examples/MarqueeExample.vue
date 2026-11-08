<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Marquee } from "@/registry/default/ui/marquee";
import { Badge } from "@/registry/default/ui/badge";

const techItems = [
  { name: "Vue 3", category: "UI Framework" },
  { name: "Nuxt 4", category: "Meta Framework" },
  { name: "TypeScript 5", category: "Language" },
  { name: "Tailwind CSS v4", category: "Styling" },
  { name: "Reka UI", category: "Headless" },
  { name: "Vite 6", category: "Bundler" },
  { name: "OKLCH Colors", category: "Color Space" },
  { name: "DesignKit", category: "Design System" },
];
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <Example title="Infinite Horizontal Marquee (with edge blur)">
      <div class="w-full space-y-4">
        <Marquee pause-on-hover :speed="25" gap="1.5rem">
          <div
            v-for="item in techItems"
            :key="item.name"
            class="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 shadow-2xs backdrop-blur-md"
          >
            <span class="text-sm font-medium text-foreground">
              {{ item.name }}
            </span>
            <Badge variant="secondary" class="text-[10px]">
              {{ item.category }}
            </Badge>
          </div>
        </Marquee>

        <Marquee reverse pause-on-hover :speed="30" gap="1.5rem">
          <div
            v-for="item in techItems"
            :key="item.name"
            class="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/50 px-4 py-2.5 shadow-2xs"
          >
            <span class="text-sm font-medium text-foreground">
              {{ item.name }}
            </span>
            <Badge variant="outline" class="text-[10px]">
              {{ item.category }}
            </Badge>
          </div>
        </Marquee>
      </div>
    </Example>
  </ExampleWrapper>
</template>
