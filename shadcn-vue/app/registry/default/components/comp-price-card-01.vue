<script setup lang="ts">
import { PriceCard } from "@/registry/default/ui/price-card";

const starterFeatures = [
  { text: "Up to 5 team members", included: true },
  { text: "Unlimited public projects", included: true },
  { text: "Community Discord support", included: true },
  { text: "Custom domains", included: false },
  { text: "Dedicated SLA guarantee", included: false },
];
</script>

<template>
  <div class="w-full max-w-sm">
    <PriceCard
      title="Starter"
      description="Essential primitives for independent creators and small projects."
      price="$0"
      interval="/month"
      cta-text="Get Started Free"
      cta-variant="outline"
      :features="starterFeatures"
    />
  </div>
</template>
