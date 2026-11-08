"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  pauseOnHover?: boolean;
  reverse?: boolean;
  fadeEdges?: boolean;
  speed?: number; // Duration in seconds
  vertical?: boolean;
  gap?: string;
  repeat?: number;
  children: React.ReactNode;
}

export function Marquee({
  pauseOnHover = false,
  reverse = false,
  fadeEdges = true,
  speed = 30,
  vertical = false,
  gap = "1rem",
  repeat = 4,
  className,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      style={
        {
          "--gap": gap,
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
      className={cn(
        "group relative flex overflow-hidden p-2",
        vertical ? "flex-col" : "flex-row",
        fadeEdges &&
          !vertical &&
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        fadeEdges &&
          vertical &&
          "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          aria-hidden={index > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)]",
            vertical
              ? "flex-col animate-marquee-vertical"
              : "flex-row animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
