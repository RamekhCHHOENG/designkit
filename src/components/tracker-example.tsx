import * as React from "react";
import { Example, ExampleWrapper } from "@/components/example";
import { Tracker, type TrackerItem } from "@/components/ui/tracker";

const uptimeHistory: TrackerItem[] = Array.from({ length: 45 }).map((_, i) => {
  const day = i + 1;
  const isDown = i === 12;
  const isDegraded = i === 28 || i === 39;
  return {
    key: day,
    status: isDown ? "error" : isDegraded ? "warning" : "success",
    tooltip: isDown
      ? `Nov ${day}: Major Outage (97.2%)`
      : isDegraded
      ? `Nov ${day}: Partial Degradation (99.1%)`
      : `Nov ${day}: Operational (100%)`,
    date: `2026-11-${String(day).padStart(2, "0")}`,
  };
});

export default function TrackerExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="System Availability & Health Tracker (45-Day Window)">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold">Core API Gateway</span>
              <p className="text-xs text-muted-foreground">Europe & North America clusters</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              99.94% uptime
            </span>
          </div>

          <Tracker data={uptimeHistory} />

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>45 days ago</span>
            <span>Today</span>
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
