<script setup lang="ts">
import { ref } from "vue";
import { PriceCard } from "@/registry/default/ui/price-card";

const isAnnual = ref(true);
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-4 w-full">
    <!-- Billing Switch -->
    <div class="flex items-center gap-2 rounded-full border bg-muted/40 p-1 text-xs">
      <button
        type="button"
        :class="[
          'rounded-full px-3 py-1 font-medium transition-all',
          !isAnnual ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground'
        ]"
        @click="isAnnual = false"
      >
        Monthly
      </button>
      <button
        type="button"
        :class="[
          'flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-all',
          isAnnual ? 'bg-background text-foreground shadow-2xs' : 'text-muted-foreground'
        ]"
        @click="isAnnual = true"
      >
        <span>Annual</span>
        <span class="rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          Save 20%
        </span>
      </button>
    </div>

    <div class="flex flex-wrap justify-center gap-6">
      <PriceCard
        name="Pro Studio"
        description="Everything growing engineering teams need to build fluid UI platforms."
        monthly-price="39"
        annual-price="29"
        :is-annual="isAnnual"
        badge="Most Popular"
        :highlighted="true"
        :features="[
          'Unlimited React & Vue primitives',
          'OKLCH dynamic theme generator',
          'Agentic AI prompt & trace blocks',
          'Zero layout-shift guarantee',
          'Priority community support',
        ]"
      />
    </div>
  </div>
</template>
