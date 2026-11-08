<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { ComparisonSlider } from "@/registry/default/ui/comparison-slider";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <Example title="Interactive Split-View Comparison Slider">
      <div class="w-full max-w-2xl space-y-2">
        <p class="text-xs text-muted-foreground">
          Drag the center divider handle or use keyboard arrow keys to compare layers.
        </p>

        <ComparisonSlider
          aspect-ratio="16/9"
          before-label="Light Theme"
          after-label="Dark Theme"
          :initial-position="50"
        >
          <template #before>
            <div class="flex size-full flex-col items-center justify-center bg-white p-8 text-neutral-900">
              <div class="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
                <h4 class="font-semibold text-neutral-900">Light Mode Interface</h4>
                <p class="mt-1 text-xs text-neutral-500">
                  High contrast daylight readability with pure crisp tokens.
                </p>
              </div>
            </div>
          </template>

          <template #after>
            <div class="flex size-full flex-col items-center justify-center bg-neutral-950 p-8 text-neutral-50">
              <div class="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
                <h4 class="font-semibold text-neutral-50">Dark Mode Interface</h4>
                <p class="mt-1 text-xs text-neutral-400">
                  OLED-optimized obsidian theme with relaxed night luminance.
                </p>
              </div>
            </div>
          </template>
        </ComparisonSlider>
      </div>
    </Example>
  </ExampleWrapper>
</template>
