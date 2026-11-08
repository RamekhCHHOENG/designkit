import * as React from "react";
import { ContributionGraph } from "@/components/ui/contribution-graph";

export default function ContributionGraphExample() {
  return (
    <div className="w-full max-w-xl p-4">
      <ContributionGraph weeks={40} />
    </div>
  );
}
