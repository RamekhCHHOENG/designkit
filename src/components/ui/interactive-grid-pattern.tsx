import * as React from "react";
import { cn } from "@/lib/utils";

export interface InteractiveGridPatternProps
  extends React.HTMLAttributes<HTMLDivElement> {
  width?: number; // Size of each square in px (default: 32)
  height?: number;
  squares?: [number, number]; // [horizontalCount, verticalCount]
  className?: string;
}

export function InteractiveGridPattern({
  width = 36,
  height = 36,
  squares = [24, 16],
  className,
  ...props
}: InteractiveGridPatternProps) {
  const [hoveredSquare, setHoveredSquare] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const [cols, rows] = squares;

  return (
    <div
      data-slot="interactive-grid-pattern"
      className={cn(
        "relative overflow-hidden pointer-events-auto select-none",
        className
      )}
      {...props}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${width}px)`,
          gridTemplateRows: `repeat(${rows}, ${height}px)`,
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const isHovered =
              hoveredSquare?.x === c && hoveredSquare?.y === r;
            return (
              <div
                key={`${r}-${c}`}
                onMouseEnter={() => setHoveredSquare({ x: c, y: r })}
                onMouseLeave={() => setHoveredSquare(null)}
                className={cn(
                  "border-r border-b border-border/30 transition-all duration-500",
                  isHovered
                    ? "bg-primary/20 border-primary/50 shadow-inner duration-75"
                    : "hover:bg-primary/10"
                )}
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
