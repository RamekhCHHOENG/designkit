<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { DirectionProvider } from "@/registry/default/ui/direction";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";

const dir = ref<"ltr" | "rtl">("ltr");
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="Direction Provider (LTR / RTL)">
      <div class="flex flex-col gap-4 w-full max-w-sm">
        <div class="flex items-center gap-2">
          <Button
            size="xs"
            :variant="dir === 'ltr' ? 'default' : 'outline'"
            @click="dir = 'ltr'"
          >
            LTR
          </Button>
          <Button
            size="xs"
            :variant="dir === 'rtl' ? 'default' : 'outline'"
            @click="dir = 'rtl'"
          >
            RTL
          </Button>
        </div>

        <DirectionProvider :dir="dir">
          <div :dir="dir" class="flex flex-col gap-2 rounded-lg border p-4">
            <span class="text-xs text-muted-foreground">Current Direction: {{ dir.toUpperCase() }}</span>
            <Input placeholder="Enter localized text..." />
          </div>
        </DirectionProvider>
      </div>
    </Example>
  </ExampleWrapper>
</template>
