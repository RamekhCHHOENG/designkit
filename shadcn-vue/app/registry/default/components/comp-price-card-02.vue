<script setup lang="ts">
import { PriceCard } from "@/registry/default/ui/price-card";

const proFeatures = [
  { text: "Unlimited team members", included: true },
  { text: "Unlimited private & public projects", included: true },
  { text: "Priority 24/7 engineering support", included: true },
  { text: "Custom brand design tokens", included: true },
  { text: "SOC2 Compliance reporting", included: true },
];
</script>

<template>
  <div class="w-full max-w-sm">
    <PriceCard
      title="Pro Team"
      description="Engineered for high-velocity teams scaling production software."
      price="$49"
      interval="/month"
      badge="Most Popular"
      highlighted
      cta-text="Start 14-Day Free Trial"
      :features="proFeatures"
    />
  </div>
</template>
