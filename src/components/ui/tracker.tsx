"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TrackerStatus =
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "idle";

export interface TrackerItem {
  key?: string | number;
  status: TrackerStatus;
  tooltip?: string;
  label?: string;
  date?: string;
}

export interface TrackerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TrackerItem[];
  hoverEffect?: boolean;
}

const statusColorClasses: Record<TrackerStatus, string> = {
  success: "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500",
  warning: "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500",
  error: "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-500",
  neutral: "bg-muted-foreground/30 hover:bg-muted-foreground/40",
  idle: "bg-muted hover:bg-muted/80",
};

export function Tracker({
  data,
  hoverEffect = true,
  className,
  ...props
}: TrackerProps) {
  const [activeItem, setActiveItem] = React.useState<{
    item: TrackerItem;
    x: number;
  } | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Status tracker"
      className={cn("relative flex w-full items-center gap-1", className)}
      onMouseLeave={() => setActiveItem(null)}
      {...props}
    >
      {/* Floating Tooltip */}
      {activeItem && (
        <div
          role="tooltip"
          className="pointer-events-none absolute -top-10 z-50 -translate-x-1/2 rounded-md border border-border bg-popover/95 px-2.5 py-1 text-xs font-medium text-popover-foreground shadow-md backdrop-blur-md transition-all animate-in fade-in-0 zoom-in-95"
          style={{ left: `${activeItem.x}px` }}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "size-1.5 rounded-full",
                activeItem.item.status === "success" && "bg-emerald-500",
                activeItem.item.status === "warning" && "bg-amber-500",
                activeItem.item.status === "error" && "bg-rose-500",
                activeItem.item.status === "neutral" && "bg-muted-foreground",
                activeItem.item.status === "idle" && "bg-muted-foreground/50"
              )}
            />
            <span>
              {activeItem.item.tooltip ??
                (activeItem.item.date
                  ? `${activeItem.item.date}: ${activeItem.item.status}`
                  : activeItem.item.status)}
            </span>
          </div>
        </div>
      )}

      {data.map((item, index) => {
        const itemKey = item.key ?? index;
        return (
          <div
            key={itemKey}
            tabIndex={0}
            role="status"
            aria-label={item.tooltip ?? item.status}
            onMouseEnter={(e) => {
              if (!containerRef.current) return;
              const containerRect = containerRef.current.getBoundingClientRect();
              const itemRect = e.currentTarget.getBoundingClientRect();
              setActiveItem({
                item,
                x: itemRect.left - containerRect.left + itemRect.width / 2,
              });
            }}
            className={cn(
              "h-8 flex-1 rounded-[3px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              statusColorClasses[item.status],
              hoverEffect && "hover:scale-y-110 active:scale-95"
            )}
          />
        );
      })}
    </div>
  );
}
