import * as React from "react";
import { Example, ExampleWrapper } from "@/components/example";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";

export default function NumberTickerExample() {
  const [key, setKey] = React.useState(0);

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Spring Numerical Odometer Ticker">
        <div className="w-full space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" key={key}>
            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <span className="text-xs text-muted-foreground">Annual Recurring Revenue</span>
              <div className="mt-2 text-2xl font-bold tracking-tight">
                <NumberTicker value={1250480} prefix="$" duration={2.5} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <span className="text-xs text-muted-foreground">Active Global Users</span>
              <div className="mt-2 text-2xl font-bold tracking-tight">
                <NumberTicker value={98450} suffix=" devs" duration={2} />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
              <span className="text-xs text-muted-foreground">System Uptime SLA</span>
              <div className="mt-2 text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                <NumberTicker value={99.99} suffix="%" decimalPlaces={2} duration={1.8} />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setKey((k) => k + 1)}
            >
              Replay Animation
            </Button>
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
