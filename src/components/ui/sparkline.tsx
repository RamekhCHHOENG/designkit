"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[];
  type?: "area" | "line" | "bar";
  color?: string;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  curve?: "linear" | "smooth";
  showTooltip?: boolean;
}

export function Sparkline({
  data,
  type = "area",
  color = "var(--primary, oklch(0.6 0.2 260))",
  width = 120,
  height = 36,
  strokeWidth = 2,
  curve = "smooth",
  showTooltip = true,
  className,
  ...props
}: SparklineProps) {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  if (!data || data.length === 0) {
    return null;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const svgWidth = 100;
  const svgHeight = 40;
  const padding = strokeWidth * 2;

  const points = data.map((val, idx) => {
    const x =
      data.length > 1
        ? (idx / (data.length - 1)) * (svgWidth - padding * 2) + padding
        : svgWidth / 2;
    const y =
      svgHeight -
      padding -
      ((val - min) / range) * (svgHeight - padding * 2);
    return { x, y, val };
  });

  // Build SVG path
  let pathD = "";
  if (points.length > 0) {
    if (curve === "linear" || points.length < 3) {
      pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    } else {
      // Catmull-Rom or cubic bezier smoothing
      pathD = `M ${points[0]!.x} ${points[0]!.y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? 0 : i - 1]!;
        const p1 = points[i]!;
        const p2 = points[i + 1]!;
        const p3 = points[i + 2 < points.length ? i + 2 : i + 1]!;

        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;

        pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }
    }
  }

  const areaD = `${pathD} L ${points[points.length - 1]!.x} ${svgHeight} L ${points[0]!.x} ${svgHeight} Z`;
  const gradientId = React.useId();

  return (
    <div
      role="img"
      aria-label={`Sparkline chart with ${data.length} points, min ${min}, max ${max}`}
      style={{ width, height }}
      onMouseLeave={() => setHoverIndex(null)}
      className={cn("relative inline-flex items-center select-none", className)}
      {...props}
    >
      {/* Tooltip */}
      {showTooltip && hoverIndex !== null && points[hoverIndex] && (
        <div
          role="tooltip"
          className="pointer-events-none absolute -top-8 z-30 -translate-x-1/2 rounded bg-popover px-2 py-0.5 text-[10px] font-semibold text-popover-foreground shadow-xs border border-border"
          style={{
            left: `${(points[hoverIndex]!.x / svgWidth) * 100}%`,
          }}
        >
          {points[hoverIndex]!.val}
        </div>
      )}

      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="size-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {type === "bar" ? (
          points.map((p, i) => {
            const barWidth = (svgWidth / points.length) * 0.7;
            const barHeight = Math.max(2, svgHeight - p.y);
            return (
              <rect
                key={i}
                x={p.x - barWidth / 2}
                y={p.y}
                width={barWidth}
                height={barHeight}
                rx={1.5}
                fill={color}
                opacity={hoverIndex === i ? 1 : 0.8}
                onMouseEnter={() => setHoverIndex(i)}
                className="transition-opacity cursor-pointer"
              />
            );
          })
        ) : (
          <>
            {type === "area" && <path d={areaD} fill={`url(#${gradientId})`} />}
            <path
              d={pathD}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {showTooltip &&
              points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={hoverIndex === i ? 4 : 2}
                  fill={color}
                  stroke="var(--background, #fff)"
                  strokeWidth={1}
                  onMouseEnter={() => setHoverIndex(i)}
                  className="transition-all cursor-pointer"
                />
              ))}
          </>
        )}
      </svg>
    </div>
  );
}
