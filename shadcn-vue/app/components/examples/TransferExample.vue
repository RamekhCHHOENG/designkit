<script setup lang="ts">
import { ref } from "vue";
import { Transfer, type TransferItem } from "@/registry/default/ui/transfer";

const MOCK_ITEMS: TransferItem[] = [
  { key: "1", title: "Read Analytics", description: "View visitor metrics" },
  { key: "2", title: "Write Content", description: "Create and publish posts" },
  { key: "3", title: "Manage Users", description: "Add/remove organization members" },
  { key: "4", title: "Billing Admin", description: "Manage subscription plans" },
  { key: "5", title: "API Tokens", description: "Generate secret credentials" },
  { key: "6", title: "Audit Logs", description: "Inspect system security events" },
];

const targetKeys = ref<string[]>(["1", "2"]);
</script>

<template>
  <div class="w-full max-w-xl p-4 flex flex-col gap-3">
    <Transfer
      v-model:target-keys="targetKeys"
      :data-source="MOCK_ITEMS"
      :titles="['Available Permissions', 'Assigned Roles']"
    />
  </div>
</template>
