import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


// formatRange is ES2021; every modern browser supports it but this project's
// TypeScript lib is ES2020, so type it locally.
type RangeFormat = Intl.DateTimeFormat & { formatRange(from: Date, to: Date): string }

// Compact date range text ("Jun 4 – 10, 2025"; times for same-day ranges).
function formatDateRange(from: Date, to: Date, options: { includeTime?: boolean } = {}) {
  const sameDay = from.toDateString() === to.toDateString()
  const includeTime = options.includeTime ?? sameDay
  const fmt = (sameDay && includeTime
    ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" })
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        ...(includeTime ? { hour: "numeric", minute: "2-digit" } : { year: "numeric" }),
      })) as RangeFormat
  return fmt.formatRange(from, to).replace(/\s/g, " ")
}

function Calendar30() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 4),
    to: new Date(2025, 5, 10),
  })

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="dates" className="px-1">
        Select your stay
      </Label>
      <Popover>
        <PopoverTrigger
          render={<Button
            variant="outline"
            id="dates"
            className="w-56 justify-between font-normal" />}
        >
          {range?.from && range?.to
              ? formatDateRange(range.from, range.to, {
                  includeTime: false,
                })
              : "Select date"}
            <ChevronDownIcon />
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            captionLayout="dropdown"
            onSelect={(range) => {
              setRange(range)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Calendar30 />
    </div>
  )
}
