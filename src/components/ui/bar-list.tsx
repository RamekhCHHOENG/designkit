import * as React from "react";
import { cn } from "@/lib/utils";

export interface BarListItem {
  name: string;
  value: number;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

export interface BarListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarListItem[];
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
  color?: string;
  sort?: "desc" | "asc" | "none";
}

export function BarList({
  data,
  valueFormatter = (val) => val.toLocaleString(),
  showAnimation = true,
  color = "bg-primary/10 dark:bg-primary/20",
  sort = "desc",
  className,
  ...props
}: BarListProps) {
  const sortedData = React.useMemo(() => {
    if (sort === "none") return data;
    const copied = [...data];
    return copied.sort((a, b) =>
      sort === "desc" ? b.value - a.value : a.value - b.value
    );
  }, [data, sort]);

  const maxValue = React.useMemo(() => {
    return Math.max(...data.map((d) => d.value), 0);
  }, [data]);

  return (
    <div
      data-slot="bar-list"
      className={cn("flex flex-col gap-2 w-full", className)}
      role="list"
      {...props}
    >
      {sortedData.map((item, index) => {
        const percent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
        const Icon = item.icon;

        const rowContent = (
          <div className="relative flex items-center justify-between h-9 px-2.5 rounded-md overflow-hidden group hover:bg-muted/40 transition-colors">
            {/* Background Relative Bar */}
            <div
              className={cn(
                "absolute inset-y-0 left-0 rounded-md transition-all duration-500 ease-out",
                item.color ?? color
              )}
              style={{
                width: `${percent}%`,
                transitionDuration: showAnimation ? "500ms" : "0ms",
              }}
            />

            {/* Label with optional icon */}
            <div className="relative flex items-center gap-2 truncate z-10">
              {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" />}
              <span className="text-sm font-medium text-foreground truncate">
                {item.name}
              </span>
            </div>

            {/* Value */}
            <span className="relative z-10 text-sm font-semibold font-mono text-foreground shrink-0 pl-4">
              {valueFormatter(item.value)}
            </span>
          </div>
        );

        if (item.href) {
          return (
            <a
              key={item.name + index}
              href={item.href}
              className="block outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              role="listitem"
            >
              {rowContent}
            </a>
          );
        }

        return (
          <div key={item.name + index} role="listitem">
            {rowContent}
          </div>
        );
      })}
    </div>
  );
}
