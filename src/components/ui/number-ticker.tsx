"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface NumberTickerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  initialValue?: number;
  direction?: "up" | "down";
  duration?: number; // Duration in seconds
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
}

export function NumberTicker({
  value,
  initialValue = 0,
  direction = "up",
  duration = 2,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  className,
  ...props
}: NumberTickerProps) {
  const [currentValue, setCurrentValue] = React.useState(
    direction === "down" ? value : initialValue
  );
  const ref = React.useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setCurrentValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startVal = direction === "down" ? value : initialValue;
          const endVal = direction === "down" ? initialValue : value;
          const startTime = performance.now();
          const durationMs = duration * 1000;

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // easeOutExpo smoothing curve
            const easeProgress =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const nextVal = startVal + (endVal - startVal) * easeProgress;

            setCurrentValue(nextVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCurrentValue(endVal);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, initialValue, direction, duration, hasAnimated]);

  const formatter = React.useMemo(() => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  }, [locale, decimalPlaces]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {prefix}
      {formatter.format(currentValue)}
      {suffix}
    </span>
  );
}
