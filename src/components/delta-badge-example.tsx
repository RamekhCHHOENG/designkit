import * as React from "react";
import { DeltaBadge } from "@/components/ui/delta-badge";

export default function DeltaBadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4">
      <DeltaBadge value={18.4} />
      <DeltaBadge value={-5.2} />
      <DeltaBadge value={0.0} />

      {/* Latency metric where increase is negative */}
      <DeltaBadge value={12.5} isIncreasePositive={false} />

      {/* Sizes */}
      <DeltaBadge size="sm" value={24.1} />
      <DeltaBadge size="lg" value={-9.8} />

      {/* Custom format */}
      <DeltaBadge
        value={1520}
        format={(v) => `+$${v.toLocaleString()}`}
      />
    </div>
  );
}
