"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface TourStep {
  title: React.ReactNode
  description: React.ReactNode
  target: () => HTMLElement | null
  placement?: "top" | "bottom" | "left" | "right"
}

export interface TourProps {
  open?: boolean
  onClose?: () => void
  steps: TourStep[]
  current?: number
  onStepChange?: (current: number) => void
}

export function Tour({
  open = false,
  onClose,
  steps,
  current: controlledCurrent,
  onStepChange,
}: TourProps) {
  const [internalCurrent, setInternalCurrent] = React.useState(0)
  const [targetRect, setTargetRect] = React.useState<DOMRect | null>(null)

  const activeStepIndex = controlledCurrent !== undefined ? controlledCurrent : internalCurrent
  const step = steps[activeStepIndex]

  const updateStep = (index: number) => {
    if (controlledCurrent === undefined) {
      setInternalCurrent(index)
    }
    onStepChange?.(index)
  }

  React.useEffect(() => {
    if (!open || !step) {
      setTargetRect(null)
      return
    }

    const el = step.target()
    if (el) {
      const rect = el.getBoundingClientRect()
      setTargetRect(rect)
      el.scrollIntoView({ behavior: "smooth", block: "center" })
    } else {
      setTargetRect(null)
    }
  }, [open, activeStepIndex, step])

  if (!open || !step) return null

  const isFirst = activeStepIndex === 0
  const isLast = activeStepIndex === steps.length - 1

  return (
    <div data-slot="tour-portal" className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black/40 transition-opacity backdrop-blur-xs" onClick={onClose} />

      {/* Target element spotlight cutout border */}
      {targetRect && (
        <div
          className="absolute rounded-lg ring-4 ring-primary/80 transition-all duration-300 pointer-events-none"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* Floating Tour Popover Box */}
      <div
        className="absolute z-50 w-80 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl transition-all duration-300"
        style={{
          top: targetRect ? Math.min(window.innerHeight - 200, Math.max(16, targetRect.bottom + 12)) : "50%",
          left: targetRect ? Math.min(window.innerWidth - 340, Math.max(16, targetRect.left)) : "50%",
          transform: !targetRect ? "translate(-50%, -50%)" : undefined,
        }}
      >
        <div className="flex items-start justify-between gap-2 pb-1">
          <h4 className="font-semibold text-sm text-foreground">{step.title}</h4>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground outline-none"
            aria-label="Close tour"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        <div className="text-xs text-muted-foreground leading-relaxed py-1.5">
          {step.description}
        </div>

        <div className="flex items-center justify-between pt-3 mt-1 border-t border-border">
          <div className="flex items-center gap-1">
            {steps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  i === activeStepIndex ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            {!isFirst && (
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() => updateStep(activeStepIndex - 1)}
              >
                Back
              </Button>
            )}

            <Button
              type="button"
              size="xs"
              onClick={() => {
                if (isLast) {
                  onClose?.()
                } else {
                  updateStep(activeStepIndex + 1)
                }
              }}
            >
              {isLast ? "Done" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
