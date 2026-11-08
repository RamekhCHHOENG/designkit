import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DeltaBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  format?: (value: number) => string;
  isIncreasePositive?: boolean;
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
}

export function DeltaBadge({
  value,
  format,
  isIncreasePositive = true,
  size = "default",
  showIcon = true,
  className,
  ...props
}: DeltaBadgeProps) {
  const isZero = Math.abs(value) < 0.0001;
  const isPositive = value > 0;

  // Determine sentiment
  const isGood = isZero ? null : isIncreasePositive ? isPositive : !isPositive;

  const defaultFormatted = React.useMemo(() => {
    if (format) return format(value);
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  }, [value, format]);

  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5 gap-0.5 font-medium",
    default: "text-xs px-2 py-0.5 gap-1 font-semibold",
    lg: "text-sm px-2.5 py-1 gap-1.5 font-semibold",
  };

  const iconSizes = {
    sm: "size-3",
    default: "size-3.5",
    lg: "size-4",
  };

  const sentimentClasses = isZero
    ? "bg-muted text-muted-foreground border-transparent"
    : isGood
    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";

  return (
    <span
      data-slot="delta-badge"
      className={cn(
        "inline-flex items-center rounded-full border shadow-2xs select-none tabular-nums",
        sentimentClasses,
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={`${value >= 0 ? "Increase" : "Decrease"} of ${defaultFormatted}`}
      {...props}
    >
      {showIcon && (
        <>
          {isZero ? (
            <Minus className={iconSizes[size]} aria-hidden="true" />
          ) : isPositive ? (
            <TrendingUp className={iconSizes[size]} aria-hidden="true" />
          ) : (
            <TrendingDown className={iconSizes[size]} aria-hidden="true" />
          )}
        </>
      )}
      <span>{defaultFormatted}</span>
    </span>
  );
}
