import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0 to 4
}

export interface ContributionGraphProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data?: ContributionDay[];
  weeks?: number; // default: 52
  startDate?: Date;
  colors?: string[];
  showLegend?: boolean;
}

const DEFAULT_COLORS = [
  "bg-muted/60",
  "bg-emerald-200 dark:bg-emerald-950/70",
  "bg-emerald-300 dark:bg-emerald-800/80",
  "bg-emerald-400 dark:bg-emerald-600",
  "bg-emerald-500 dark:bg-emerald-400",
];

export function ContributionGraph({
  data,
  weeks = 52,
  startDate,
  colors = DEFAULT_COLORS,
  showLegend = true,
  className,
  ...props
}: ContributionGraphProps) {
  // Generate mock data if none provided
  const generatedData = React.useMemo(() => {
    if (data && data.length > 0) return data;

    const list: ContributionDay[] = [];
    const totalDays = weeks * 7;
    const end = new Date();

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(d.getDate() - i);
      const rand = Math.random();
      const level = rand > 0.85 ? 4 : rand > 0.7 ? 3 : rand > 0.5 ? 2 : rand > 0.3 ? 1 : 0;
      list.push({
        date: d.toISOString().split("T")[0],
        count: level > 0 ? Math.floor(Math.random() * 8) + 1 : 0,
        level,
      });
    }
    return list;
  }, [data, weeks]);

  // Group by weeks
  const weekColumns = React.useMemo(() => {
    const cols: ContributionDay[][] = [];
    for (let i = 0; i < generatedData.length; i += 7) {
      cols.push(generatedData.slice(i, i + 7));
    }
    return cols;
  }, [generatedData]);

  const totalContributions = React.useMemo(
    () => generatedData.reduce((sum, d) => sum + d.count, 0),
    [generatedData]
  );

  return (
    <div
      data-slot="contribution-graph"
      className={cn(
        "flex flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground shadow-xs overflow-x-auto text-xs",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-1 border-b">
        <span className="font-semibold text-foreground">
          {totalContributions.toLocaleString()} contributions in the last year
        </span>
      </div>

      <div className="flex gap-1 overflow-x-auto py-1">
        {weekColumns.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1 shrink-0">
            {week.map((day, dIdx) => (
              <div
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className={cn(
                  "size-2.5 sm:size-3 rounded-xs border border-border/30 transition-transform hover:scale-125 cursor-pointer",
                  colors[Math.min(day.level, colors.length - 1)]
                )}
              />
            ))}
          </div>
        ))}
      </div>

      {showLegend && (
        <div className="flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground pt-1">
          <span>Less</span>
          {colors.map((c, i) => (
            <div
              key={i}
              className={cn("size-2.5 rounded-xs border border-border/30", c)}
            />
          ))}
          <span>More</span>
        </div>
      )}
    </div>
  );
}
