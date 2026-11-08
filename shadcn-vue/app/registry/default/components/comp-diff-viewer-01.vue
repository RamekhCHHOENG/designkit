<script setup lang="ts">
import { DiffViewer } from "@/registry/default/ui/diff-viewer";

const oldCode = `function calculateTotal(price, tax) {
  return price + (price * tax);
}`;

const newCode = `function calculateTotal(price, tax, discount = 0) {
  const subtotal = price - discount;
  return subtotal + (subtotal * tax);
}`;
</script>

<template>
  <div class="w-full max-w-xl">
    <DiffViewer
      :old-value="oldCode"
      :new-value="newCode"
      filename="calculate.ts"
      mode="split"
    />
  </div>
</template>
