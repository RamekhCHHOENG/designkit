import * as React from "react";
import { TimePicker } from "@/components/ui/time-picker";

export function TimePickerExample() {
  const [time12, setTime12] = React.useState("09:30");
  const [time24, setTime24] = React.useState("16:45");

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg items-start">
      <div className="space-y-1.5 w-full">
        <label className="text-xs font-semibold text-muted-foreground">12-Hour Clock (AM/PM)</label>
        <TimePicker value={time12} onValueChange={setTime12} format="12" />
      </div>

      <div className="space-y-1.5 w-full">
        <label className="text-xs font-semibold text-muted-foreground">24-Hour International</label>
        <TimePicker value={time24} onValueChange={setTime24} format="24" />
      </div>
    </div>
  );
}
