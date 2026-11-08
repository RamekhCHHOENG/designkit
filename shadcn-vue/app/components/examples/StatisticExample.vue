<script setup lang="ts">
import { Statistic } from "@/registry/default/ui/statistic";
</script>

<template>
  <div class="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
    <Statistic
      title="Total Revenue"
      value="45,231.89"
      prefix="$"
      :trend="{ value: '+20.1%', direction: 'up' }"
      description="from last month"
    />
    <Statistic
      title="Active Subscriptions"
      value="2,350"
      prefix="+"
      :trend="{ value: '+180.1%', direction: 'up' }"
      description="up from last week"
    />
    <Statistic
      title="Bounce Rate"
      value="12.3"
      suffix="%"
      :trend="{ value: '-4.2%', direction: 'down' }"
      description="healthy drop"
    />
  </div>
</template>
