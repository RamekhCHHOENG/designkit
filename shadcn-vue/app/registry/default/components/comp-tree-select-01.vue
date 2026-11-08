<script setup lang="ts">
import { ref } from "vue";
import { TreeSelect, type TreeSelectNode } from "@/registry/default/ui/tree-select";

const departmentTree: TreeSelectNode[] = [
  {
    id: "eng",
    label: "Engineering",
    children: [
      { id: "frontend", label: "Frontend Platform" },
      { id: "backend", label: "Core API & Systems" },
      { id: "ai", label: "Agentic AI & Inference" },
    ],
  },
  {
    id: "design",
    label: "Design & Product",
    children: [
      { id: "design-system", label: "Design Systems" },
      { id: "brand", label: "Brand Creative" },
    ],
  },
];

const selectedSingle = ref("ai");
</script>

<template>
  <div class="w-full max-w-xs space-y-2 p-2">
    <label class="text-xs font-semibold text-muted-foreground">Select Department</label>
    <TreeSelect
      :tree-data="departmentTree"
      v-model="selectedSingle"
      placeholder="Pick team..."
    />
  </div>
</template>
