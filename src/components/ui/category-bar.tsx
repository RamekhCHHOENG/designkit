import * as React from "react";
import { cn } from "@/lib/utils";

export interface CategoryBarItem {
  value: number;
  label?: string;
  color?: string;
}

export interface CategoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
  values: number[] | CategoryBarItem[];
  colors?: string[];
  labels?: string[];
  showLabels?: boolean;
  marker?: number;
  markerLabel?: string;
  size?: "sm" | "default" | "lg";
}

const DEFAULT_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
];

export function CategoryBar({
  values,
  colors = DEFAULT_COLORS,
  labels = [],
  showLabels = false,
  marker,
  markerLabel,
  size = "default",
  className,
  ...props
}: CategoryBarProps) {
  const normalizedItems: CategoryBarItem[] = React.useMemo(() => {
    if (values.length === 0) return [];
    if (typeof values[0] === "number") {
      return (values as number[]).map((val, idx) => ({
        value: Math.max(0, val),
        label: labels[idx],
        color: colors[idx % colors.length],
      }));
    }
    return (values as CategoryBarItem[]).map((item, idx) => ({
      value: Math.max(0, item.value),
      label: item.label ?? labels[idx],
      color: item.color ?? colors[idx % colors.length],
    }));
  }, [values, colors, labels]);

  const total = React.useMemo(
    () => normalizedItems.reduce((acc, item) => acc + item.value, 0),
    [normalizedItems]
  );

  const markerPercent = React.useMemo(() => {
    if (marker === undefined || total === 0) return null;
    return Math.min(100, Math.max(0, (marker / total) * 100));
  }, [marker, total]);

  const sizeHeights = {
    sm: "h-1.5",
    default: "h-2.5",
    lg: "h-4",
  };

  return (
    <div
      data-slot="category-bar"
      className={cn("w-full flex flex-col gap-2 select-none", className)}
      role="group"
      aria-label="Proportional Category Bar"
      {...props}
    >
      <div className={cn("relative flex w-full overflow-hidden rounded-full bg-muted/60 p-0.5 gap-0.5", sizeHeights[size])}>
        {normalizedItems.map((item, index) => {
          const percent = total > 0 ? (item.value / total) * 100 : 0;
          if (percent <= 0) return null;

          return (
            <div
              key={index}
              className={cn("h-full transition-all duration-300 relative group first:rounded-l-full last:rounded-r-full", item.color)}
              style={{ width: `${percent}%` }}
              title={`${item.label ? item.label + ": " : ""}${item.value} (${percent.toFixed(1)}%)`}
            />
          );
        })}

        {markerPercent !== null && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-foreground z-10 shadow-xs -translate-x-1/2 rounded-full pointer-events-none"
            style={{ left: `${markerPercent}%` }}
            title={markerLabel ?? `Marker: ${marker}`}
          />
        )}
      </div>

      {showLabels && (
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground pt-0.5">
          {normalizedItems.map((item, index) => {
            const percent = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={index} className="flex items-center gap-1.5">
                <span className={cn("size-2 rounded-full shrink-0", item.color)} />
                <span className="font-medium text-foreground">{item.label ?? `Category ${index + 1}`}</span>
                <span>({percent.toFixed(0)}%)</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
