import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  target?: React.RefObject<HTMLElement | null>;
  orientation?: "horizontal" | "vertical";
  gradient?: boolean;
}

export function ScrollProgress({
  className,
  target,
  orientation = "horizontal",
  gradient = false,
  ...props
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      let current = 0;
      let total = 0;

      if (target?.current) {
        const el = target.current;
        if (orientation === "horizontal") {
          current = el.scrollLeft;
          total = el.scrollWidth - el.clientWidth;
        } else {
          current = el.scrollTop;
          total = el.scrollHeight - el.clientHeight;
        }
      } else if (typeof window !== "undefined") {
        if (orientation === "horizontal") {
          current = window.scrollX || document.documentElement.scrollLeft;
          total = document.documentElement.scrollWidth - window.innerWidth;
        } else {
          current = window.scrollY || document.documentElement.scrollTop;
          total = document.documentElement.scrollHeight - window.innerHeight;
        }
      }

      const calculated = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0;
      setProgress(calculated);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();

    const scrollTarget = target?.current || window;
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [target, orientation]);

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      data-slot="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "pointer-events-none fixed z-50 transition-transform duration-75 ease-out",
        isHorizontal
          ? "top-0 left-0 right-0 h-1 origin-left"
          : "top-0 right-0 bottom-0 w-1 origin-top",
        gradient
          ? "bg-gradient-to-r from-primary via-indigo-500 to-sky-400"
          : "bg-primary",
        className
      )}
      style={{
        transform: isHorizontal ? `scaleX(${progress})` : `scaleY(${progress})`,
      }}
      {...props}
    />
  );
}
