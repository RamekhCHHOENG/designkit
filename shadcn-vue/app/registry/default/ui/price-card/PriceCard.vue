<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { Check, Sparkles, ArrowRight } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface PriceCardProps {
  name: string;
  description?: string;
  monthlyPrice: number | string;
  annualPrice?: number | string;
  isAnnual?: boolean;
  currency?: string;
  billingPeriod?: string;
  badge?: string;
  features: string[];
  ctaText?: string;
  highlighted?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<PriceCardProps>(), {
  isAnnual: false,
  currency: "$",
  ctaText: "Get Started",
  highlighted: false,
});

const emit = defineEmits<{
  (e: "cta-click"): void;
}>();

const price = computed(() =>
  props.isAnnual && props.annualPrice !== undefined
    ? props.annualPrice
    : props.monthlyPrice
);

const period = computed(
  () =>
    props.billingPeriod ||
    (props.isAnnual ? "per month, billed annually" : "per month")
);
</script>

<template>
  <div
    data-slot="price-card"
    :class="
      cn(
        'relative flex flex-col justify-between rounded-3xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md max-w-sm w-full',
        highlighted && 'border-primary shadow-xl ring-2 ring-primary/20 bg-linear-to-b from-primary/5 via-card to-card',
        props.class
      )
    "
  >
    <!-- Popular Badge -->
    <div v-if="badge" class="absolute -top-3.5 left-1/2 -translate-x-1/2">
      <span class="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-md">
        <Sparkles class="size-3" />
        <span>{{ badge }}</span>
      </span>
    </div>

    <div>
      <!-- Name & Description -->
      <div class="flex flex-col gap-1 mb-4">
        <h3 class="text-lg font-bold tracking-tight text-foreground">
          {{ name }}
        </h3>
        <p v-if="description" class="text-xs text-muted-foreground leading-relaxed">
          {{ description }}
        </p>
      </div>

      <!-- Price -->
      <div class="flex items-baseline gap-1 my-4">
        <span class="text-sm font-semibold text-muted-foreground">{{ currency }}</span>
        <span class="text-4xl font-extrabold tracking-tight text-foreground font-mono">
          {{ price }}
        </span>
        <span class="text-xs text-muted-foreground ml-1">/mo</span>
      </div>
      <p class="text-[11px] text-muted-foreground mb-6">{{ period }}</p>

      <!-- Features -->
      <div class="border-t pt-5 mb-6 flex flex-col gap-3">
        <span class="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Included features
        </span>
        <ul class="flex flex-col gap-2.5">
          <li
            v-for="(feature, idx) in features"
            :key="idx"
            class="flex items-start gap-2.5 text-xs text-foreground"
          >
            <div class="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check class="size-2.5 stroke-[3]" />
            </div>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- CTA -->
    <button
      type="button"
      :class="
        cn(
          'inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-semibold transition-all active:scale-[0.98] shadow-xs group',
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border'
        )
      "
      @click="emit('cta-click')"
    >
      <span>{{ ctaText }}</span>
      <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </button>
  </div>
</template>
