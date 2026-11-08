<script setup lang="ts">
import { ref } from "vue";
import { Transfer } from "@/registry/default/ui/transfer";

const items = [
  { key: "1", title: "Authentication module" },
  { key: "2", title: "Payment gateway" },
  { key: "3", title: "Real-time notifications" },
  { key: "4", title: "Analytics telemetry" },
  { key: "5", title: "Audit logging" },
  { key: "6", title: "Customer support chat" },
];

const targetKeys = ref<string[]>(["1", "3"]);
</script>

<template>
  <div class="w-full max-w-xl">
    <Transfer
      :data-source="items"
      :target-keys="targetKeys"
      :titles="['Available Modules', 'Enabled Features']"
      show-search
      @change="(keys) => targetKeys = keys"
    />
  </div>
</template>
