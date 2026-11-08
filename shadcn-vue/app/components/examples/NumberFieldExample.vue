<script setup lang="ts">
import { ref } from "vue";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/default/ui/number-field";
import { Label } from "@/registry/default/ui/label";

const count = ref(15);
</script>

<template>
  <div class="max-w-xs space-y-2 p-6">
    <Label>Quantity</Label>
    <NumberField v-model="count" :min="0" :max="100">
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  </div>
</template>
