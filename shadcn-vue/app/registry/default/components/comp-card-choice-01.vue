<script setup lang="ts">
import { ref } from "vue";
import { RadioCard, CheckboxCard } from "@/registry/default/ui/card-choice";
import { ZapIcon, ShieldIcon, SparklesIcon } from "lucide-vue-next";

const selectedPlan = ref("pro");
const analyticsChecked = ref(true);
</script>

<template>
  <div class="w-full max-w-xl space-y-4 p-2">
    <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      <RadioCard
        value="starter"
        v-model="selectedPlan"
        title="Starter"
        description="For personal side projects."
        price="$0/mo"
      >
        <template #icon><SparklesIcon class="size-4" /></template>
      </RadioCard>
      <RadioCard
        value="pro"
        v-model="selectedPlan"
        title="Pro Team"
        badge="Popular"
        description="Unlimited components and ECharts."
        price="$29/mo"
      >
        <template #icon><ZapIcon class="size-4" /></template>
      </RadioCard>
    </div>

    <CheckboxCard
      v-model="analyticsChecked"
      title="Advanced Real-Time Telemetry"
      description="Enable sub-millisecond trace logging."
      price="+$10/mo"
    >
      <template #icon><ZapIcon class="size-4" /></template>
    </CheckboxCard>
  </div>
</template>
