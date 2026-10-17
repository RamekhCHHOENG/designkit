"use client"

import * as React from "react"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "prefix"> {
  title?: React.ReactNode
  value: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  trend?: {
    value: number | string
    direction?: "up" | "down"
    label?: string
  }
  description?: React.ReactNode
}

export function Statistic({
  title,
  value,
  prefix,
  suffix,
  trend,
  description,
  className,
  ...props
}: StatisticProps) {
  return (
    <div
      data-slot="statistic"
      className={cn(
        "flex flex-col gap-1 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs",
        className
      )}
      {...props}
    >
      {title && (
        <span className="text-xs font-medium text-muted-foreground select-none">
          {title}
        </span>
      )}

      <div className="flex items-baseline gap-1 font-semibold tracking-tight text-2xl text-foreground">
        {prefix && <span className="text-lg font-normal text-muted-foreground">{prefix}</span>}
        <span>{value}</span>
        {suffix && <span className="text-sm font-normal text-muted-foreground">{suffix}</span>}
      </div>

      {(trend || description) && (
        <div className="mt-1 flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium text-[11px]",
                trend.direction === "up" || (typeof trend.value === "number" && trend.value >= 0)
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}
            >
              {trend.direction === "up" || (typeof trend.value === "number" && trend.value >= 0) ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              <span>{trend.value}</span>
            </span>
          )}
          {description && (
            <span className="text-muted-foreground truncate">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}
