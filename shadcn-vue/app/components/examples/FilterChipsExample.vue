<script setup lang="ts">
import { ref } from "vue";
import { FilterChips, type ActiveFilter, type FilterFieldDefinition } from "@/registry/default/ui/filter-chips";

const FILTER_FIELDS: FilterFieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    operators: ["is", "is not"],
    options: ["Active", "Pending", "Archived", "Suspended"],
  },
  {
    key: "role",
    label: "Role",
    operators: ["is", "is not"],
    options: ["Admin", "Editor", "Viewer", "Billing"],
  },
  {
    key: "email",
    label: "Email",
    operators: ["contains", "starts with", "ends with"],
  },
];

const filters = ref<ActiveFilter[]>([
  { id: "1", field: "Status", operator: "is", value: "Active" },
  { id: "2", field: "Role", operator: "is", value: "Admin" },
]);
</script>

<template>
  <div class="w-full max-w-xl p-4 flex flex-col gap-3">
    <FilterChips
      v-model:filters="filters"
      :fields="FILTER_FIELDS"
    />
  </div>
</template>
