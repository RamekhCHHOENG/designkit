"use client";

import * as React from "react";
import { ChevronsLeftRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComparisonSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  before: React.ReactNode;
  after: React.ReactNode;
  initialPosition?: number; // 0 - 100
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
}

export function ComparisonSlider({
  before,
  after,
  initialPosition = 50,
  beforeLabel = "Before",
  afterLabel = "After",
  aspectRatio = "16/9",
  className,
  ...props
}: ComparisonSliderProps) {
  const [position, setPosition] = React.useState(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updatePosition = React.useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(percentage);
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Capture might already be released
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
      style={{ aspectRatio }}
      className={cn(
        "group relative select-none overflow-hidden rounded-2xl border border-border/80 bg-muted cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {/* After layer (background full container) */}
      <div className="absolute inset-0 size-full">{after}</div>

      {/* Before layer (clipped via clipPath or absolute width) */}
      <div
        className="absolute inset-0 size-full overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        {before}
      </div>

      {/* Labels */}
      {beforeLabel && (
        <span
          className={cn(
            "pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-md transition-opacity duration-200",
            position < 15 ? "opacity-0" : "opacity-100"
          )}
        >
          {beforeLabel}
        </span>
      )}
      {afterLabel && (
        <span
          className={cn(
            "pointer-events-none absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-md backdrop-blur-md transition-opacity duration-200",
            position > 85 ? "opacity-0" : "opacity-100"
          )}
        >
          {afterLabel}
        </span>
      )}

      {/* Divider line and glass handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-30 w-px bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border border-white/50 bg-background/80 text-foreground shadow-2xl backdrop-blur-md transition-transform group-hover:scale-110 active:scale-95 dark:bg-card/80">
          <ChevronsLeftRightIcon className="size-4" />
        </div>
      </div>
    </div>
  );
}
