import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { RingProgress } from "@/components/ui/ring-progress"

export default function RingProgressExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Apple Watch Style Activity Rings">
        <div className="flex flex-wrap items-center justify-around gap-6 w-full">
          <div className="flex flex-col items-center gap-2">
            <RingProgress
              value={78}
              size={100}
              thickness={8}
              label={<span className="text-sm font-semibold">78%</span>}
            />
            <span className="text-xs text-muted-foreground">Storage Used</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <RingProgress
              size={100}
              thickness={8}
              sections={[
                { value: 40, color: "#10b981", tooltip: "Direct: 40%" },
                { value: 25, color: "#3b82f6", tooltip: "Referral: 25%" },
                { value: 15, color: "#f59e0b", tooltip: "Organic: 15%" },
              ]}
              label={<span className="text-xs font-semibold">Traffic</span>}
            />
            <span className="text-xs text-muted-foreground">Multi-Segment</span>
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
