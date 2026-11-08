<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Spotlight } from "@/registry/default/ui/spotlight";
import { Button } from "@/registry/default/ui/button";
import { SparklesIcon } from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-2">
    <Example title="Cursor-Following Spotlight (Background)">
      <Spotlight
        variant="background"
        :size="300"
        :fill-opacity="0.2"
        class="w-full space-y-4"
      >
        <div class="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <SparklesIcon class="size-5" />
        </div>
        <div>
          <h4 class="text-base font-semibold">VisionOS Ambient Glow</h4>
          <p class="mt-1 text-sm text-muted-foreground leading-relaxed">
            Move your pointer across this card to see an organic radial light beam follow your cursor with smooth decay.
          </p>
        </div>
        <Button variant="outline" size="sm">
          Interactive Surface
        </Button>
      </Spotlight>
    </Example>

    <Example title="Cursor-Following Spotlight (Border Highlight)">
      <Spotlight
        variant="border"
        :size="250"
        class="w-full space-y-4 border-2"
      >
        <div class="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
          <SparklesIcon class="size-5" />
        </div>
        <div>
          <h4 class="text-base font-semibold">Border Specular Ray</h4>
          <p class="mt-1 text-sm text-muted-foreground leading-relaxed">
            Only the card perimeter illuminates where the cursor hovers, creating an illuminated rim effect.
          </p>
        </div>
        <Button size="sm">Explore Effect</Button>
      </Spotlight>
    </Example>
  </ExampleWrapper>
</template>
