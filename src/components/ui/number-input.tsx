"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "prefix"> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  precision?: number
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  controls?: "stepper" | "buttons" | "none"
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      min = -Infinity,
      max = Infinity,
      step = 1,
      precision,
      prefix,
      suffix,
      controls = "stepper",
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<number | undefined>(defaultValue)
    const currentValue = controlledValue !== undefined ? controlledValue : uncontrolledValue

    const clamp = (val: number) => {
      let clamped = Math.max(min, Math.min(max, val))
      if (precision !== undefined) {
        clamped = parseFloat(clamped.toFixed(precision))
      }
      return clamped
    }

    const updateValue = (nextVal: number | undefined) => {
      if (disabled) return
      const finalVal = nextVal !== undefined ? clamp(nextVal) : undefined
      if (controlledValue === undefined) {
        setUncontrolledValue(finalVal)
      }
      onValueChange?.(finalVal)
    }

    const handleIncrement = () => {
      const base = currentValue ?? (min !== -Infinity ? min : 0)
      updateValue(base + step)
    }

    const handleDecrement = () => {
      const base = currentValue ?? (max !== Infinity ? max : 0)
      updateValue(base - step)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.trim()
      if (raw === "" || raw === "-") {
        updateValue(undefined)
        return
      }
      const parsed = parseFloat(raw)
      if (!isNaN(parsed)) {
        updateValue(parsed)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        handleIncrement()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        handleDecrement()
      }
    }

    return (
      <div
        data-slot="number-input-container"
        className={cn(
          "relative flex items-center h-8 w-full rounded-lg border border-input bg-transparent text-sm transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "opacity-50 pointer-events-none bg-input/50",
          className
        )}
      >
        {prefix && (
          <span className="flex items-center pl-2.5 text-xs text-muted-foreground select-none">
            {prefix}
          </span>
        )}

        {controls === "buttons" && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || (currentValue !== undefined && currentValue <= min)}
            onClick={handleDecrement}
            className="flex h-full w-7 items-center justify-center text-muted-foreground hover:text-foreground border-r border-input disabled:opacity-30 outline-none"
          >
            <MinusIcon className="size-3" />
          </button>
        )}

        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          role="spinbutton"
          aria-valuenow={currentValue}
          aria-valuemin={min !== -Infinity ? min : undefined}
          aria-valuemax={max !== Infinity ? max : undefined}
          value={currentValue !== undefined ? currentValue : ""}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            "h-full w-full bg-transparent px-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground",
            controls === "buttons" && "text-center px-1"
          )}
          {...props}
        />

        {suffix && (
          <span className="flex items-center pr-2.5 text-xs text-muted-foreground select-none">
            {suffix}
          </span>
        )}

        {controls === "buttons" && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || (currentValue !== undefined && currentValue >= max)}
            onClick={handleIncrement}
            className="flex h-full w-7 items-center justify-center text-muted-foreground hover:text-foreground border-l border-input disabled:opacity-30 outline-none"
          >
            <PlusIcon className="size-3" />
          </button>
        )}

        {controls === "stepper" && (
          <div className="flex flex-col h-full border-l border-input w-6 shrink-0 divide-y divide-input">
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || (currentValue !== undefined && currentValue >= max)}
              onClick={handleIncrement}
              className="flex flex-1 items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 outline-none"
            >
              <ChevronUpIcon className="size-3" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || (currentValue !== undefined && currentValue <= min)}
              onClick={handleDecrement}
              className="flex flex-1 items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 outline-none"
            >
              <ChevronDownIcon className="size-3" />
            </button>
          </div>
        )}
      </div>
    )
  }
)

NumberInput.displayName = "NumberInput"
