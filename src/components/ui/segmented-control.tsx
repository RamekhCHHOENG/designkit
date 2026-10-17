"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SegmentedControlOption<T extends string = string> {
  value: T
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps<T extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: (SegmentedControlOption<T> | T)[]
  value?: T
  defaultValue?: T
  onValueChange?: (value: T) => void
  size?: "sm" | "default" | "lg"
  fullWidth?: boolean
  disabled?: boolean
}

export function SegmentedControl<T extends string = string>({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  size = "default",
  fullWidth = false,
  disabled = false,
  className,
  ...props
}: SegmentedControlProps<T>) {
  const normalizedOptions: SegmentedControlOption<T>[] = React.useMemo(() => {
    return options.map((opt) =>
      typeof opt === "string" ? { value: opt as T, label: opt } : opt
    )
  }, [options])

  const [uncontrolledValue, setUncontrolledValue] = React.useState<T>(() => {
    return defaultValue ?? normalizedOptions[0]?.value ?? ("" as T)
  })

  const activeValue = controlledValue !== undefined ? controlledValue : uncontrolledValue

  const handleSelect = (val: T) => {
    if (disabled) return
    if (controlledValue === undefined) {
      setUncontrolledValue(val)
    }
    onValueChange?.(val)
  }

  const sizeClasses = {
    sm: "h-7 text-xs p-0.5 gap-0.5",
    default: "h-8 text-sm p-1 gap-1",
    lg: "h-9 text-sm p-1 gap-1",
  }

  const itemSizeClasses = {
    sm: "px-2 py-0.5 gap-1",
    default: "px-2.5 py-1 gap-1.5",
    lg: "px-3 py-1.5 gap-2",
  }

  return (
    <div
      role="radiogroup"
      data-slot="segmented-control"
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border/60 bg-muted/70 p-1 text-muted-foreground transition-colors select-none",
        fullWidth && "w-full",
        disabled && "opacity-50 pointer-events-none",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {normalizedOptions.map((option) => {
        const isSelected = option.value === activeValue
        const isDisabled = disabled || option.disabled

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isDisabled}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "relative inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md font-medium transition-all outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              itemSizeClasses[size],
              isSelected
                ? "bg-background text-foreground shadow-xs font-semibold dark:bg-card"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {option.icon && (
              <span className="shrink-0 [&_svg]:size-3.5">{option.icon}</span>
            )}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
