<script setup lang="ts">
import { Descriptions } from "@/registry/default/ui/descriptions";
</script>

<template>
  <div class="max-w-2xl p-6">
    <Descriptions
      title="User Profile Details"
      extra="Verified Account"
      :column="2"
      :items="[
        { label: 'Username', value: 'ramekhchhoeng' },
        { label: 'Telephone', value: '+1 800 555 0199' },
        { label: 'Live Location', value: 'Phnom Penh, Cambodia' },
        { label: 'Subscription Plan', value: 'Enterprise (Annual)' },
        { label: 'Address', value: 'No. 128 Russian Federation Blvd, Toul Kork', span: 2 },
      ]"
    />
  </div>
</template>
