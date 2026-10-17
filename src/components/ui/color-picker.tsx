"use client"

import * as React from "react"
import { PipetteIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onValueChange?: (color: string) => void
  presets?: string[]
  disabled?: boolean
  className?: string
  showEyeDropper?: boolean
}

const DEFAULT_PRESETS = [
  "#000000",
  "#ffffff",
  "#64748b",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
]

export function ColorPicker({
  value: controlledValue,
  defaultValue = "#3b82f6",
  onValueChange,
  presets = DEFAULT_PRESETS,
  disabled = false,
  className,
  showEyeDropper = true,
}: ColorPickerProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)

  const currentColor = controlledValue !== undefined ? controlledValue : uncontrolledValue

  const updateColor = (color: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(color)
    }
    onValueChange?.(color)
  }

  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper()
        const result = await eyeDropper.open()
        if (result?.sRGBHex) {
          updateColor(result.sRGBHex)
        }
      } catch (err) {
        // EyeDropper cancelled or unsupported
      }
    }
  }

  const hasEyeDropper = typeof window !== "undefined" && "EyeDropper" in window && showEyeDropper

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        disabled={disabled}
        className={cn(
          "flex h-8 items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors",
          "hover:bg-muted/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-input/50",
          className
        )}
      >
        <span
          className="size-4 shrink-0 rounded-full border border-black/10 shadow-xs dark:border-white/20"
          style={{ backgroundColor: currentColor }}
        />
        <span className="font-mono text-xs uppercase text-foreground">{currentColor}</span>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-3 p-3" align="start">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-12 shrink-0 rounded-md border border-border shadow-xs"
            style={{ backgroundColor: currentColor }}
          />
          <input
            type="text"
            value={currentColor}
            onChange={(e) => updateColor(e.target.value)}
            className="h-8 w-full rounded-md border border-input bg-transparent px-2.5 font-mono text-xs uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="#000000"
          />
          {hasEyeDropper && (
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              onClick={handleEyeDropper}
              title="Pick color from screen"
            >
              <PipetteIcon className="size-3.5" />
            </Button>
          )}
        </div>

        {/* Color input palette range */}
        <div>
          <input
            type="color"
            value={currentColor.startsWith("#") && currentColor.length === 7 ? currentColor : "#3b82f6"}
            onChange={(e) => updateColor(e.target.value)}
            className="h-8 w-full cursor-pointer appearance-none rounded-md border border-input bg-transparent p-0.5"
          />
        </div>

        {/* Swatches presets */}
        {presets.length > 0 && (
          <div className="space-y-1.5 pt-1 border-t border-border">
            <span className="text-[11px] font-medium text-muted-foreground">Presets</span>
            <div className="grid grid-cols-6 gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => updateColor(preset)}
                  className={cn(
                    "size-7 rounded-md border border-black/10 shadow-xs transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring dark:border-white/20",
                    preset === currentColor && "ring-2 ring-primary ring-offset-1"
                  )}
                  style={{ backgroundColor: preset }}
                  title={preset}
                />
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
