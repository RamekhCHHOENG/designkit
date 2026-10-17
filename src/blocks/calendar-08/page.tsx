import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

function Calendar08() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      disabled={{
        before: new Date(2025, 5, 12),
      }}
      className="rounded-lg border shadow-sm"
    />
  )
}

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Calendar08 />
    </div>
  )
}
