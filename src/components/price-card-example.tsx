import * as React from "react";
import { PriceCard } from "@/components/ui/price-card";

export default function PriceCardExample() {
  const [isAnnual, setIsAnnual] = React.useState(true);

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      {/* Billing Switch */}
      <div className="flex items-center gap-2 rounded-full border bg-muted/40 p-1 text-xs">
        <button
          type="button"
          onClick={() => setIsAnnual(false)}
          className={`rounded-full px-3 py-1 font-medium transition-all ${
            !isAnnual ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setIsAnnual(true)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-medium transition-all ${
            isAnnual ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground"
          }`}
        >
          <span>Annual</span>
          <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            Save 20%
          </span>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <PriceCard
          name="Pro Studio"
          description="Everything growing engineering teams need to build fluid UI platforms."
          monthlyPrice="39"
          annualPrice="29"
          isAnnual={isAnnual}
          badge="Most Popular"
          highlighted={true}
          features={[
            "Unlimited React & Vue primitives",
            "OKLCH dynamic theme generator",
            "Agentic AI prompt & trace blocks",
            "Zero layout-shift guarantee",
            "Priority community support",
          ]}
        />
      </div>
    </div>
  );
}
