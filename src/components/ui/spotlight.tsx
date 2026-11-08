"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  fillOpacity?: number;
  variant?: "background" | "border" | "both";
  children?: React.ReactNode;
}

export function Spotlight({
  size = 350,
  color,
  fillOpacity = 0.15,
  variant = "background",
  className,
  children,
  ...props
}: SpotlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handlePointerLeave = React.useCallback(() => {
    setPosition(null);
  }, []);

  const glowColor = color ?? "var(--primary, oklch(0.6 0.2 260))";

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-colors dark:bg-card/70",
        className
      )}
      {...props}
    >
      {/* Background radial spotlight */}
      {position && (variant === "background" || variant === "both") && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 80%)`,
            opacity: fillOpacity,
          }}
        />
      )}

      {/* Border-only spotlight */}
      {position && (variant === "border" || variant === "both") && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl border transition-opacity duration-300"
          style={{
            borderColor: "transparent",
            maskImage: `radial-gradient(${size * 0.75}px circle at ${position.x}px ${position.y}px, black 40%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(${size * 0.75}px circle at ${position.x}px ${position.y}px, black 40%, transparent 80%)`,
            borderImage: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 70%) 1`,
          }}
        />
      )}

      <div className="relative z-20">{children}</div>
    </div>
  );
}
