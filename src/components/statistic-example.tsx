import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Statistic } from "@/components/ui/statistic"

export default function StatisticExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Enterprise KPI & Metric Cards">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <Statistic
            title="Monthly Recurring Revenue"
            prefix="$"
            value="128,450"
            trend={{ value: "+14.2%", direction: "up" }}
            description="vs. previous month"
          />
          <Statistic
            title="Active Subscriptions"
            value="3,842"
            suffix="users"
            trend={{ value: "+8.1%", direction: "up" }}
            description="98% retention rate"
          />
          <Statistic
            title="Avg. Response Time"
            value="142"
            suffix="ms"
            trend={{ value: "-12.5%", direction: "up" }}
            description="p99 latency under 250ms"
          />
        </div>
      </Example>
    </ExampleWrapper>
  )
}
