<script setup lang="ts">
import { ref } from "vue";
import { TreeSelect, type TreeSelectNode } from "@/registry/default/ui/tree-select";

const departmentTree: TreeSelectNode[] = [
  {
    id: "eng",
    label: "Engineering",
    children: [
      { id: "frontend", label: "Frontend Platform" },
      { id: "backend", label: "Core API & Distributed Systems" },
      { id: "ai", label: "Agentic AI & Inference" },
    ],
  },
  {
    id: "design",
    label: "Design & Product",
    children: [
      { id: "design-system", label: "Design Systems & Tokens" },
      { id: "brand", label: "Brand & Creative" },
    ],
  },
  {
    id: "infra",
    label: "Cloud Infrastructure",
    children: [
      { id: "k8s", label: "Kubernetes Orchestration" },
      { id: "edge", label: "Edge Networking" },
    ],
  },
];

const selectedSingle = ref("ai");
const selectedMulti = ref(["frontend", "design-system"]);
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-6 w-full max-w-xl items-start">
    <div class="space-y-1.5 w-full">
      <label class="text-xs font-semibold text-muted-foreground">Single Branch Select</label>
      <TreeSelect
        :tree-data="departmentTree"
        v-model="selectedSingle"
        placeholder="Pick department..."
      />
    </div>

    <div class="space-y-1.5 w-full">
      <label class="text-xs font-semibold text-muted-foreground">Multi-Select Tags</label>
      <TreeSelect
        :tree-data="departmentTree"
        v-model="selectedMulti"
        multiple
        placeholder="Pick multiple teams..."
      />
    </div>
  </div>
</template>
