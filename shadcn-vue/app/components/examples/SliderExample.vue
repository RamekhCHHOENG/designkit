<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Label } from "@/registry/default/ui/label";
import { Slider } from "@/registry/default/ui/slider";

const controlledValue = ref([0.3, 0.7]);
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Slider :default-value="[50]" :max="100" :step="1" />
    </Example>

    <!-- Range -->
    <Example title="Range">
      <Slider :default-value="[25, 50]" :max="100" :step="5" />
    </Example>

    <!-- Multiple Thumbs -->
    <Example title="Multiple Thumbs">
      <Slider :default-value="[10, 20, 70]" :max="100" :step="10" />
    </Example>

    <!-- Vertical -->
    <Example title="Vertical">
      <div class="flex items-center gap-6">
        <Slider
          :default-value="[50]"
          :max="100"
          :step="1"
          orientation="vertical"
          class="h-40"
        />
        <Slider
          :default-value="[25]"
          :max="100"
          :step="1"
          orientation="vertical"
          class="h-40"
        />
      </div>
    </Example>

    <!-- Controlled -->
    <Example title="Controlled">
      <div class="grid w-full gap-3">
        <div class="flex items-center justify-between gap-2">
          <Label for="slider-demo-temperature">Temperature</Label>
          <span class="text-sm text-muted-foreground">
            {{ controlledValue.join(", ") }}
          </span>
        </div>
        <Slider
          id="slider-demo-temperature"
          v-model="controlledValue"
          :min="0"
          :max="1"
          :step="0.1"
        />
      </div>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <Slider :default-value="[50]" :max="100" :step="1" disabled />
    </Example>
  </ExampleWrapper>
</template>
