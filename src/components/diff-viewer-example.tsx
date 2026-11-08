import * as React from "react";
import { DiffViewer } from "@/components/ui/diff-viewer";

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

export default function DiffViewerExample() {
  return (
    <div className="w-full max-w-2xl p-4">
      <DiffViewer
        oldValue={OLD_CODE}
        newValue={NEW_CODE}
        filename="calculate-total.ts"
        oldTitle="v1.0 (Imperative)"
        newTitle="v2.0 (Functional + Discounts)"
      />
    </div>
  );
}
