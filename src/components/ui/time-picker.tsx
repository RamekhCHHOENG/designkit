import * as React from "react";
import { Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimePickerProps {
  value?: string; // Format: "HH:mm" or "HH:mm:ss"
  defaultValue?: string;
  onValueChange?: (time: string) => void;
  format?: "12" | "24";
  useSeconds?: boolean;
  minuteStep?: number;
  presets?: Array<{ label: string; value: string }>;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function TimePicker({
  value: controlledValue,
  defaultValue = "12:00",
  onValueChange,
  format = "12",
  useSeconds = false,
  minuteStep = 5,
  presets = [
    { label: "Now", value: "NOW" },
    { label: "+15m", value: "IN_15" },
    { label: "+1h", value: "IN_60" },
    { label: "17:00", value: "17:00" },
  ],
  disabled = false,
  className,
  placeholder = "Select time",
}: TimePickerProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentTime = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Parse current time into parts
  const parsed = React.useMemo(() => {
    let hours = 12;
    let minutes = 0;
    let seconds = 0;
    let period: "AM" | "PM" = "PM";

    if (currentTime) {
      const parts = currentTime.split(":");
      let h = parseInt(parts[0], 10) || 0;
      minutes = parseInt(parts[1], 10) || 0;
      seconds = parseInt(parts[2], 10) || 0;

      if (format === "12") {
        if (h >= 12) {
          period = "PM";
          hours = h > 12 ? h - 12 : 12;
        } else {
          period = "AM";
          hours = h === 0 ? 12 : h;
        }
      } else {
        hours = h;
      }
    }

    return { hours, minutes, seconds, period };
  }, [currentTime, format]);

  const updateTime = (h: number, m: number, s: number, p: "AM" | "PM") => {
    let finalHour = h;
    if (format === "12") {
      if (p === "PM" && h < 12) finalHour = h + 12;
      if (p === "AM" && h === 12) finalHour = 0;
    }

    const hh = String(finalHour).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");

    const result = useSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    if (!isControlled) {
      setInternalValue(result);
    }
    onValueChange?.(result);
  };

  const handlePreset = (presetVal: string) => {
    const d = new Date();
    if (presetVal === "NOW") {
      updateTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getHours() >= 12 ? "PM" : "AM");
    } else if (presetVal === "IN_15") {
      d.setMinutes(d.getMinutes() + 15);
      updateTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getHours() >= 12 ? "PM" : "AM");
    } else if (presetVal === "IN_60") {
      d.setHours(d.getHours() + 1);
      updateTime(d.getHours(), d.getMinutes(), d.getSeconds(), d.getHours() >= 12 ? "PM" : "AM");
    } else {
      const [h, m] = presetVal.split(":").map(Number);
      updateTime(h, m, 0, h >= 12 ? "PM" : "AM");
    }
  };

  const hourList = React.useMemo(() => {
    if (format === "12") {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    }
    return Array.from({ length: 24 }, (_, i) => i);
  }, [format]);

  const minuteList = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i += minuteStep) {
      arr.push(i);
    }
    return arr;
  }, [minuteStep]);

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full sm:w-64", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" />
          <span className={currentTime ? "font-mono font-medium text-foreground" : "text-muted-foreground"}>
            {currentTime || placeholder}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-muted-foreground/80 uppercase">
          {format === "12" ? parsed.period : "24H"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-72 rounded-lg border bg-popover p-3 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          {/* Quick Preset Buttons */}
          {presets.length > 0 && (
            <div className="flex items-center gap-1.5 pb-2.5 mb-2 border-b flex-wrap">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePreset(p.value)}
                  className="rounded-md border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {/* Column Scroll Pickers */}
          <div className="grid grid-cols-3 gap-1 text-center font-mono text-xs">
            {/* Hours Column */}
            <div>
              <span className="text-[10px] font-semibold text-muted-foreground block mb-1">Hours</span>
              <div className="h-40 overflow-y-auto rounded border bg-muted/10 p-1 space-y-0.5 scrollbar-thin">
                {hourList.map((h) => {
                  const isMatch = parsed.hours === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => updateTime(h, parsed.minutes, parsed.seconds, parsed.period)}
                      className={cn(
                        "w-full rounded py-1 transition-colors",
                        isMatch
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      {String(h).padStart(2, "0")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minutes Column */}
            <div>
              <span className="text-[10px] font-semibold text-muted-foreground block mb-1">Minutes</span>
              <div className="h-40 overflow-y-auto rounded border bg-muted/10 p-1 space-y-0.5 scrollbar-thin">
                {minuteList.map((m) => {
                  const isMatch = parsed.minutes === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => updateTime(parsed.hours, m, parsed.seconds, parsed.period)}
                      className={cn(
                        "w-full rounded py-1 transition-colors",
                        isMatch
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      {String(m).padStart(2, "0")}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Period / AM-PM Column */}
            {format === "12" ? (
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground block mb-1">Period</span>
                <div className="flex flex-col gap-1.5 pt-1">
                  {(["AM", "PM"] as const).map((p) => {
                    const isMatch = parsed.period === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => updateTime(parsed.hours, parsed.minutes, parsed.seconds, p)}
                        className={cn(
                          "w-full rounded py-2 text-xs font-semibold border transition-colors",
                          isMatch
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/40 hover:bg-muted text-foreground border-transparent"
                        )}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground block mb-1">Step</span>
                <div className="pt-2 text-[11px] text-muted-foreground">24-hour clock</div>
              </div>
            )}
          </div>

          {/* Footer Done Button */}
          <div className="mt-3 pt-2 border-t flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-mono">{currentTime}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1 rounded bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Check className="size-3" />
              <span>Done</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
