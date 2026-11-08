<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Sparkline } from "@/registry/default/ui/sparkline";

const stockPrices = [42, 45, 43, 48, 52, 50, 58, 64, 61, 70, 74, 82];
const serverLatency = [120, 115, 140, 180, 240, 190, 160, 130, 125, 110];
const dailySignups = [14, 22, 18, 29, 35, 40, 32, 45, 52, 48, 60];
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <Example title="Inline High-Density Sparklines">
      <div class="w-full space-y-6">
        <div class="rounded-xl border border-border bg-card p-4 shadow-2xs">
          <div class="divide-y divide-border/60">
            <div class="flex items-center justify-between py-3">
              <div>
                <span class="text-sm font-semibold">AAPL (Apple Inc.)</span>
                <div class="text-xs text-muted-foreground">$234.80</div>
              </div>
              <div class="flex items-center gap-4">
                <Sparkline
                  :data="stockPrices"
                  type="area"
                  color="oklch(0.65 0.22 145)"
                  :width="130"
                  :height="32"
                />
                <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +14.2%
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between py-3">
              <div>
                <span class="text-sm font-semibold">API Latency (p99)</span>
                <div class="text-xs text-muted-foreground">Global Median</div>
              </div>
              <div class="flex items-center gap-4">
                <Sparkline
                  :data="serverLatency"
                  type="line"
                  color="oklch(0.65 0.22 25)"
                  :width="130"
                  :height="32"
                />
                <span class="text-xs font-semibold text-rose-600 dark:text-rose-400">
                  110 ms
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between py-3">
              <div>
                <span class="text-sm font-semibold">Daily User Signups</span>
                <div class="text-xs text-muted-foreground">Past 11 Days</div>
              </div>
              <div class="flex items-center gap-4">
                <Sparkline
                  :data="dailySignups"
                  type="bar"
                  color="oklch(0.6 0.2 260)"
                  :width="130"
                  :height="32"
                />
                <span class="text-xs font-semibold text-foreground">
                  +60 today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Example>
  </ExampleWrapper>
</template>
