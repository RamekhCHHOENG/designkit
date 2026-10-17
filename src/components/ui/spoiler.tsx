"use client"

import * as React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number
  showLabel?: React.ReactNode
  hideLabel?: React.ReactNode
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
}

export function Spoiler({
  maxHeight = 100,
  showLabel = "Show more",
  hideLabel = "Show less",
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  className,
  children,
  ...props
}: SpoilerProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded)
  const [contentHeight, setContentHeight] = React.useState<number>(0)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : uncontrolledExpanded

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [children])

  const toggleExpanded = () => {
    const next = !isExpanded
    if (controlledExpanded === undefined) {
      setUncontrolledExpanded(next)
    }
    onExpandedChange?.(next)
  }

  const needsCollapse = contentHeight > maxHeight

  return (
    <div data-slot="spoiler" className={cn("relative w-full", className)} {...props}>
      <div
        ref={contentRef}
        style={{
          maxHeight: !needsCollapse || isExpanded ? undefined : `${maxHeight}px`,
        }}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          needsCollapse && !isExpanded && "relative"
        )}
      >
        {children}

        {needsCollapse && !isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      {needsCollapse && (
        <div className="pt-2">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={toggleExpanded}
            className="text-primary hover:text-primary gap-1 font-medium"
          >
            <span>{isExpanded ? hideLabel : showLabel}</span>
            {isExpanded ? (
              <ChevronUpIcon className="size-3.5" />
            ) : (
              <ChevronDownIcon className="size-3.5" />
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
