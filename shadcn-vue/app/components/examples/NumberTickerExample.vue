<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { NumberTicker } from "@/registry/default/ui/number-ticker";
import { Button } from "@/registry/default/ui/button";

const reloadKey = ref(0);
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <Example title="Spring Numerical Odometer Ticker">
      <div class="w-full space-y-6">
        <div :key="reloadKey" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-border bg-card p-5 shadow-2xs">
            <span class="text-xs text-muted-foreground">Annual Recurring Revenue</span>
            <div class="mt-2 text-2xl font-bold tracking-tight">
              <NumberTicker :value="1250480" prefix="$" :duration="2.5" />
            </div>
          </div>

          <div class="rounded-xl border border-border bg-card p-5 shadow-2xs">
            <span class="text-xs text-muted-foreground">Active Global Users</span>
            <div class="mt-2 text-2xl font-bold tracking-tight">
              <NumberTicker :value="98450" suffix=" devs" :duration="2" />
            </div>
          </div>

          <div class="rounded-xl border border-border bg-card p-5 shadow-2xs">
            <span class="text-xs text-muted-foreground">System Uptime SLA</span>
            <div class="mt-2 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
              <NumberTicker :value="99.99" suffix="%" :decimal-places="2" :duration="1.8" />
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            @click="reloadKey++"
          >
            Replay Animation
          </Button>
        </div>
      </div>
    </Example>
  </ExampleWrapper>
</template>
