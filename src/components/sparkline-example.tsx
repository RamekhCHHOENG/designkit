import * as React from "react";
import { Example, ExampleWrapper } from "@/components/example";
import { Sparkline } from "@/components/ui/sparkline";

export default function SparklineExample() {
  const stockPrices = [42, 45, 43, 48, 52, 50, 58, 64, 61, 70, 74, 82];
  const serverLatency = [120, 115, 140, 180, 240, 190, 160, 130, 125, 110];
  const dailySignups = [14, 22, 18, 29, 35, 40, 32, 45, 52, 48, 60];

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Inline High-Density Sparklines">
        <div className="w-full space-y-6">
          <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
            <div className="divide-y divide-border/60">
              <div className="flex items-center justify-between py-3">
                <div>
                  <span className="text-sm font-semibold">AAPL (Apple Inc.)</span>
                  <div className="text-xs text-muted-foreground">$234.80</div>
                </div>
                <div className="flex items-center gap-4">
                  <Sparkline
                    data={stockPrices}
                    type="area"
                    color="oklch(0.65 0.22 145)"
                    width={130}
                    height={32}
                  />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    +14.2%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <span className="text-sm font-semibold">API Latency (p99)</span>
                  <div className="text-xs text-muted-foreground">Global Median</div>
                </div>
                <div className="flex items-center gap-4">
                  <Sparkline
                    data={serverLatency}
                    type="line"
                    color="oklch(0.65 0.22 25)"
                    width={130}
                    height={32}
                  />
                  <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    110 ms
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <span className="text-sm font-semibold">Daily User Signups</span>
                  <div className="text-xs text-muted-foreground">Past 11 Days</div>
                </div>
                <div className="flex items-center gap-4">
                  <Sparkline
                    data={dailySignups}
                    type="bar"
                    color="oklch(0.6 0.2 260)"
                    width={130}
                    height={32}
                  />
                  <span className="text-xs font-semibold text-foreground">
                    +60 today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
