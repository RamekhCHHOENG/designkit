import * as React from "react"
import { LayoutGridIcon, ListIcon, CalendarIcon } from "lucide-react"
import { Example, ExampleWrapper } from "@/components/example"
import { SegmentedControl } from "@/components/ui/segmented-control"

export default function SegmentedControlExample() {
  const [view, setView] = React.useState("grid")
  const [period, setPeriod] = React.useState("monthly")

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Apple-style View Switcher">
        <div className="w-full max-w-sm space-y-4">
          <SegmentedControl
            value={view}
            onValueChange={setView}
            options={[
              { value: "grid", label: "Grid", icon: <LayoutGridIcon /> },
              { value: "list", label: "List", icon: <ListIcon /> },
              { value: "calendar", label: "Calendar", icon: <CalendarIcon /> },
            ]}
          />
          <p className="text-xs text-muted-foreground">Active view: {view}</p>
        </div>
      </Example>

      <Example title="Subscription Period (Full Width)">
        <div className="w-full max-w-sm space-y-4">
          <SegmentedControl
            fullWidth
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "quarterly", label: "Quarterly" },
              { value: "yearly", label: "Yearly (Save 20%)" },
            ]}
          />
          <p className="text-xs text-muted-foreground">Selected plan: {period}</p>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
