<script setup lang="ts">
import { DiffViewer } from "@/registry/default/ui/diff-viewer";

const OLD_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

const NEW_CODE = `function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const discountedPrice = item.price * (1 - (item.discount || 0));
    return total + discountedPrice;
  }, 0);
}`;
</script>

<template>
  <div class="w-full max-w-2xl p-4">
    <DiffViewer
      :old-value="OLD_CODE"
      :new-value="NEW_CODE"
      filename="calculate-total.ts"
      old-title="v1.0 (Imperative)"
      new-title="v2.0 (Functional + Discounts)"
    />
  </div>
</template>
