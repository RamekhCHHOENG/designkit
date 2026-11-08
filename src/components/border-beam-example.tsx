import * as React from "react";
import { SparklesIcon } from "lucide-react";
import { Example, ExampleWrapper } from "@/components/example";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";

export default function BorderBeamExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-2">
      <Example title="Animated Border Beam Light Highlight">
        <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
          <BorderBeam size={150} duration={8} />

          <div className="space-y-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <SparklesIcon className="size-4" />
            </div>
            <h4 className="font-semibold text-foreground">Pro Tier Activation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Notice the illuminated beam traveling continuously along the container boundary without layout shift.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <Button size="sm">Upgrade to Pro</Button>
          </div>
        </div>
      </Example>

      <Example title="Multi-Color Offset Beam">
        <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
          <BorderBeam
            size={180}
            duration={10}
            colorFrom="oklch(0.65 0.25 150)"
            colorTo="oklch(0.7 0.2 260)"
          />

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Custom Color Beam</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Customized gradient beam utilizing OKLCH emerald and violet hues.
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
