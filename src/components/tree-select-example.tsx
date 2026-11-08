import * as React from "react";
import { TreeSelect, type TreeSelectNode } from "@/components/ui/tree-select";

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

export function TreeSelectExample() {
  const [selectedSingle, setSelectedSingle] = React.useState("ai");
  const [selectedMulti, setSelectedMulti] = React.useState(["frontend", "design-system"]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl items-start">
      <div className="space-y-1.5 w-full">
        <label className="text-xs font-semibold text-muted-foreground">Single Branch Select</label>
        <TreeSelect
          treeData={departmentTree}
          value={selectedSingle}
          onValueChange={setSelectedSingle}
          placeholder="Pick department..."
        />
      </div>

      <div className="space-y-1.5 w-full">
        <label className="text-xs font-semibold text-muted-foreground">Multi-Select Tags</label>
        <TreeSelect
          treeData={departmentTree}
          value={selectedMulti}
          onValueChange={setSelectedMulti}
          multiple
          placeholder="Pick multiple teams..."
        />
      </div>
    </div>
  );
}
