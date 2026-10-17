import * as React from "react"
import { type DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"

function Calendar06() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 5, 26),
  })

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={1}
        min={5}
        className="rounded-lg border shadow-sm"
      />
      <div className="text-muted-foreground text-center text-xs">
        A minimum of 5 days is required
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Calendar06 />
    </div>
  )
}
