<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { BorderBeam } from "@/registry/default/ui/border-beam";
import { Button } from "@/registry/default/ui/button";
import { SparklesIcon } from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-2">
    <Example title="Animated Border Beam Light Highlight">
      <div class="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        <BorderBeam :size="150" :duration="8" />

        <div class="space-y-3">
          <div class="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <SparklesIcon class="size-4" />
          </div>
          <h4 class="font-semibold text-foreground">Pro Tier Activation</h4>
          <p class="text-xs text-muted-foreground leading-relaxed">
            Notice the illuminated beam traveling continuously along the container boundary without layout shift.
          </p>
        </div>

        <div class="mt-6 flex justify-end">
          <Button size="sm">Upgrade to Pro</Button>
        </div>
      </div>
    </Example>

    <Example title="Multi-Color Offset Beam">
      <div class="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        <BorderBeam
          :size="180"
          :duration="10"
          color-from="oklch(0.65 0.25 150)"
          color-to="oklch(0.7 0.2 260)"
        />

        <div class="space-y-3">
          <h4 class="font-semibold text-foreground">Custom Color Beam</h4>
          <p class="text-xs text-muted-foreground leading-relaxed">
            Customized gradient beam utilizing OKLCH emerald and violet hues.
          </p>
        </div>

        <div class="mt-6 flex justify-end">
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Example>
  </ExampleWrapper>
</template>
