"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RingProgressSection {
  value: number // percentage (0 - 100)
  color?: string
  tooltip?: string
}

export interface RingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  thickness?: number
  value?: number // single value shortcut
  sections?: RingProgressSection[]
  label?: React.ReactNode
  roundCaps?: boolean
}

export function RingProgress({
  size = 120,
  thickness = 10,
  value,
  sections: propSections,
  label,
  roundCaps = true,
  className,
  ...props
}: RingProgressProps) {
  const sections: RingProgressSection[] = React.useMemo(() => {
    if (propSections && propSections.length > 0) return propSections
    if (value !== undefined) {
      return [{ value, color: "var(--primary)" }]
    }
    return []
  }, [propSections, value])

  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius

  // Calculate offsets for cumulative segments
  let accumulatedPercent = 0

  return (
    <div
      data-slot="ring-progress"
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform"
      >
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          className="stroke-muted fill-transparent"
        />

        {/* Dynamic section arcs */}
        {sections.map((section, index) => {
          const strokeDashoffset = circumference - (section.value / 100) * circumference
          const rotateOffset = (accumulatedPercent / 100) * 360
          accumulatedPercent += section.value

          return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={thickness}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap={roundCaps ? "round" : "butt"}
              stroke={section.color ?? "var(--primary)"}
              className="fill-transparent transition-all duration-500 ease-out"
              style={{
                transformOrigin: "center",
                transform: `rotate(${rotateOffset}deg)`,
              }}
            >
              {section.tooltip && <title>{section.tooltip}</title>}
            </circle>
          )
        })}
      </svg>

      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {label}
        </div>
      )}
    </div>
  )
}
