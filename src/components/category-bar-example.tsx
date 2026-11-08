import * as React from "react";
import { CategoryBar } from "@/components/ui/category-bar";

export default function CategoryBarExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6 p-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          System Storage Allocation
        </span>
        <CategoryBar
          values={[45, 25, 20, 10]}
          labels={["System", "Applications", "Documents", "Other"]}
          colors={[
            "bg-blue-500",
            "bg-purple-500",
            "bg-emerald-500",
            "bg-amber-500",
          ]}
          showLabels
          marker={80}
          markerLabel="Quota threshold (80%)"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Compact Usage Bar
        </span>
        <CategoryBar
          size="sm"
          values={[60, 30, 10]}
          colors={["bg-emerald-500", "bg-blue-500", "bg-muted-foreground/30"]}
        />
      </div>
    </div>
  );
}
