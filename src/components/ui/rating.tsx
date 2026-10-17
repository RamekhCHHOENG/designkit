"use client"

import * as React from "react"
import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number
  defaultValue?: number
  max?: number
  precision?: 0.5 | 1
  onValueChange?: (value: number) => void
  readOnly?: boolean
  disabled?: boolean
  size?: "sm" | "default" | "lg"
  icon?: React.ReactNode
}

export function Rating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  onValueChange,
  readOnly = false,
  disabled = false,
  size = "default",
  icon,
  className,
  ...props
}: RatingProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const currentValue = controlledValue !== undefined ? controlledValue : uncontrolledValue
  const displayValue = hoverValue !== null ? hoverValue : currentValue

  const handleSelect = (val: number) => {
    if (readOnly || disabled) return
    if (controlledValue === undefined) {
      setUncontrolledValue(val)
    }
    onValueChange?.(val)
  }

  const sizeClasses = {
    sm: "size-3.5",
    default: "size-4.5",
    lg: "size-6",
  }

  const items = Array.from({ length: max }, (_, index) => index + 1)

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      data-slot="rating"
      className={cn(
        "inline-flex items-center gap-1 select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onMouseLeave={() => !readOnly && setHoverValue(null)}
      {...props}
    >
      {items.map((starIndex) => {
        const isFull = displayValue >= starIndex
        const isHalf = precision === 0.5 && displayValue >= starIndex - 0.5 && displayValue < starIndex

        return (
          <span
            key={starIndex}
            className="relative cursor-pointer transition-transform hover:scale-110"
            onClick={() => handleSelect(starIndex)}
            onMouseMove={(e) => {
              if (readOnly || disabled) return
              if (precision === 0.5) {
                const rect = e.currentTarget.getBoundingClientRect()
                const isLeftHalf = e.clientX - rect.left < rect.width / 2
                setHoverValue(isLeftHalf ? starIndex - 0.5 : starIndex)
              } else {
                setHoverValue(starIndex)
              }
            }}
          >
            {/* Background empty star */}
            <StarIcon
              className={cn(
                "text-muted-foreground/30 transition-colors",
                sizeClasses[size]
              )}
            />

            {/* Filled or half filled overlay */}
            {(isFull || isHalf) && (
              <span
                className="absolute inset-0 overflow-hidden text-amber-500 fill-amber-500 transition-colors"
                style={{ width: isHalf ? "50%" : "100%" }}
              >
                <StarIcon className={cn("fill-amber-500 text-amber-500", sizeClasses[size])} />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
