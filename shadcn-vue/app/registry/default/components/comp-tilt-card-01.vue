<script setup lang="ts">
import { TiltCard } from "@/registry/default/ui/tilt-card";
import { Sparkles, ShieldCheck } from "lucide-vue-next";
</script>

<template>
  <div class="w-full max-w-sm flex justify-center p-6">
    <TiltCard :max-tilt="15" :glare="true" class="w-72 h-44 rounded-2xl border bg-gradient-to-br from-card via-card/90 to-primary/10 p-5 shadow-xl flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <span class="text-xs font-mono font-medium tracking-wider text-muted-foreground uppercase">DesignKit Black</span>
        <Sparkles class="size-4 text-primary" />
      </div>
      <div>
        <p class="font-mono text-sm tracking-widest text-foreground font-semibold">•••• •••• •••• 8842</p>
        <div class="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>VALUED MEMBER</span>
          <span class="flex items-center gap-1 font-sans text-primary">
            <ShieldCheck class="size-3.5" />
            Active
          </span>
        </div>
      </div>
    </TiltCard>
  </div>
</template>
