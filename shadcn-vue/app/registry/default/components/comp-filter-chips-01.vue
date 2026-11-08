<script setup lang="ts">
import { ref } from "vue";
import { FilterChips, type ActiveFilter, type FilterFieldDefinition } from "@/registry/default/ui/filter-chips";

const fields: FilterFieldDefinition[] = [
  {
    key: "environment",
    label: "Environment",
    operators: ["is", "is not"],
    options: ["Production", "Staging", "Development"],
  },
  {
    key: "status",
    label: "Status",
    operators: ["is", "is not"],
    options: ["Healthy", "Degraded", "Offline"],
  },
  {
    key: "region",
    label: "Region",
    operators: ["is", "is not"],
    options: ["us-east-1", "eu-central-1", "ap-southeast-1"],
  },
];

const filters = ref<ActiveFilter[]>([
  { id: "1", field: "Environment", operator: "is", value: "Production" },
  { id: "2", field: "Status", operator: "is", value: "Healthy" },
]);
</script>

<template>
  <div class="w-full max-w-xl">
    <FilterChips
      v-model:filters="filters"
      :fields="fields"
    />
  </div>
</template>
