import * as React from "react";
import { RadioCardGroup, RadioCard, CheckboxCard } from "@/components/ui/card-choice";
import { Zap, Shield, Sparkles } from "lucide-react";

export function CardChoiceExample() {
  const [selectedPlan, setSelectedPlan] = React.useState("pro");
  const [analyticsChecked, setAnalyticsChecked] = React.useState(true);

  return (
    <div className="w-full max-w-xl space-y-6">
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Radio Plan Selection
        </h4>
        <RadioCardGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          <RadioCard
            value="starter"
            title="Starter"
            description="Perfect for side projects and prototypes."
            price="$0 / month"
            icon={<Sparkles className="size-4" />}
          />
          <RadioCard
            value="pro"
            title="Pro Team"
            badge="Popular"
            description="Unlimited components, ECharts, and priority updates."
            price="$29 / month"
            icon={<Zap className="size-4" />}
          />
          <RadioCard
            value="enterprise"
            title="Enterprise"
            description="Dedicated SLAs, custom styling, and SOC2 compliance."
            price="Custom"
            icon={<Shield className="size-4" />}
          />
        </RadioCardGroup>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Multi-Select Add-On
        </h4>
        <CheckboxCard
          checked={analyticsChecked}
          onCheckedChange={setAnalyticsChecked}
          title="Advanced Real-Time Telemetry"
          description="Enable sub-millisecond trace logging and live token usage metrics."
          price="+$10 / month"
          icon={<Zap className="size-4" />}
        />
      </div>
    </div>
  );
}
