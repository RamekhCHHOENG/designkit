"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DescriptionsItem {
  key?: string
  label: React.ReactNode
  children: React.ReactNode
  span?: number
}

export interface DescriptionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  extra?: React.ReactNode
  bordered?: boolean
  column?: 1 | 2 | 3 | 4
  layout?: "horizontal" | "vertical"
  items?: DescriptionsItem[]
}

export function Descriptions({
  title,
  extra,
  bordered = true,
  column = 2,
  layout = "horizontal",
  items = [],
  className,
  children,
  ...props
}: DescriptionsProps) {
  const colClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[column]

  return (
    <div
      data-slot="descriptions"
      className={cn("w-full space-y-2 text-sm", className)}
      {...props}
    >
      {(title || extra) && (
        <div className="flex items-center justify-between pb-1">
          {title && <h4 className="font-semibold text-foreground">{title}</h4>}
          {extra && <div className="text-xs text-muted-foreground">{extra}</div>}
        </div>
      )}

      <div
        className={cn(
          "grid gap-px overflow-hidden rounded-lg",
          bordered ? "border border-border bg-border shadow-xs" : "divide-y divide-border",
          colClass
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.key ?? index}
            className={cn(
              "flex bg-card p-3",
              layout === "vertical" ? "flex-col gap-1" : "flex-row justify-between items-center gap-4"
            )}
            style={item.span ? { gridColumn: `span ${item.span}` } : undefined}
          >
            <span className="font-medium text-xs text-muted-foreground select-none">
              {item.label}
            </span>
            <span className="text-foreground text-xs font-normal text-right">
              {item.children}
            </span>
          </div>
        ))}
        {children}
      </div>
    </div>
  )
}
