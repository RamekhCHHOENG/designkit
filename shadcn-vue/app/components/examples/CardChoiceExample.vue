<script setup lang="ts">
import { ref } from "vue";
import { RadioCard, CheckboxCard } from "@/registry/default/ui/card-choice";
import { ZapIcon, ShieldIcon, SparklesIcon } from "lucide-vue-next";

const selectedPlan = ref("pro");
const analyticsChecked = ref(true);
</script>

<template>
  <div class="w-full max-w-xl space-y-6">
    <div>
      <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Radio Plan Selection
      </h4>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <RadioCard
          value="starter"
          v-model="selectedPlan"
          title="Starter"
          description="Perfect for side projects and prototypes."
          price="$0 / month"
        >
          <template #icon><SparklesIcon class="size-4" /></template>
        </RadioCard>
        <RadioCard
          value="pro"
          v-model="selectedPlan"
          title="Pro Team"
          badge="Popular"
          description="Unlimited components, ECharts, and priority updates."
          price="$29 / month"
        >
          <template #icon><ZapIcon class="size-4" /></template>
        </RadioCard>
        <RadioCard
          value="enterprise"
          v-model="selectedPlan"
          title="Enterprise"
          description="Dedicated SLAs, custom styling, and SOC2 compliance."
          price="Custom"
        >
          <template #icon><ShieldIcon class="size-4" /></template>
        </RadioCard>
      </div>
    </div>

    <div>
      <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        Multi-Select Add-On
      </h4>
      <CheckboxCard
        v-model="analyticsChecked"
        title="Advanced Real-Time Telemetry"
        description="Enable sub-millisecond trace logging and live token usage metrics."
        price="+$10 / month"
      >
        <template #icon><ZapIcon class="size-4" /></template>
      </CheckboxCard>
    </div>
  </div>
</template>
