import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

function Calendar03() {
  const [dates, setDates] = React.useState<Date[]>([
    new Date(2025, 5, 12),
    new Date(2025, 6, 24),
  ])

  return (
    <Calendar
      mode="multiple"
      numberOfMonths={2}
      defaultMonth={dates[0]}
      required
      selected={dates}
      onSelect={setDates}
      max={5}
      className="rounded-lg border shadow-sm"
    />
  )
}

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Calendar03 />
    </div>
  )
}
