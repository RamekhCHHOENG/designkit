<script setup lang="ts">
import { TiltCard } from "@/registry/default/ui/tilt-card";
import { Sparkles, ArrowUpRight } from "lucide-vue-next";
</script>

<template>
  <div class="flex justify-center p-8 w-full">
    <TiltCard :max-rotation="15" :perspective="1000" class="w-80">
      <div class="flex flex-col gap-4 p-6 bg-gradient-to-br from-card to-muted/30">
        <div class="flex items-center justify-between">
          <span class="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles class="size-4" />
          </span>
          <span class="rounded-full border bg-background/50 px-2 py-0.5 text-[10px] font-mono text-muted-foreground backdrop-blur-md">
            VisionOS
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <h4 class="font-bold text-base text-foreground tracking-tight">
            Spatial Parallax Canvas
          </h4>
          <p class="text-xs text-muted-foreground leading-relaxed">
            Move your cursor over this card to witness realistic 3D perspective rotation and dynamic specular light glare.
          </p>
        </div>

        <div class="flex items-center justify-between pt-3 border-t text-xs font-semibold text-primary">
          <span>Explore 3D Primitives</span>
          <ArrowUpRight class="size-4" />
        </div>
      </div>
    </TiltCard>
  </div>
</template>
