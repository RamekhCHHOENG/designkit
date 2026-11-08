import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollShadowProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
  size?: number;
  hideScrollBar?: boolean;
  offset?: number;
}

export function ScrollShadow({
  children,
  className,
  orientation = "vertical",
  size = 40,
  hideScrollBar = false,
  offset = 0,
  ...props
}: ScrollShadowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showStart, setShowStart] = React.useState(false);
  const [showEnd, setShowEnd] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (orientation === "vertical") {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      setShowStart(hasOverflow && el.scrollTop > offset);
      setShowEnd(hasOverflow && el.scrollTop + el.clientHeight < el.scrollHeight - offset - 1);
    } else {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setShowStart(hasOverflow && el.scrollLeft > offset);
      setShowEnd(hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - offset - 1);
    }
  }, [orientation, offset]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  const isVertical = orientation === "vertical";

  return (
    <div
      data-slot="scroll-shadow"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Top / Left Shadow */}
      <div
        data-slot="scroll-shadow-start"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute z-10 transition-opacity duration-300",
          isVertical
            ? "top-0 left-0 right-0 bg-gradient-to-b from-background to-transparent"
            : "top-0 bottom-0 left-0 bg-gradient-to-r from-background to-transparent",
          showStart ? "opacity-100" : "opacity-0"
        )}
        style={{
          height: isVertical ? `${size}px` : "100%",
          width: isVertical ? "100%" : `${size}px`,
        }}
      />

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        data-slot="scroll-shadow-content"
        className={cn(
          "h-full w-full",
          isVertical ? "overflow-y-auto overflow-x-hidden" : "overflow-x-auto overflow-y-hidden",
          hideScrollBar && "scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {children}
      </div>

      {/* Bottom / Right Shadow */}
      <div
        data-slot="scroll-shadow-end"
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute z-10 transition-opacity duration-300",
          isVertical
            ? "bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent"
            : "top-0 bottom-0 right-0 bg-gradient-to-l from-background to-transparent",
          showEnd ? "opacity-100" : "opacity-0"
        )}
        style={{
          height: isVertical ? `${size}px` : "100%",
          width: isVertical ? "100%" : `${size}px`,
        }}
      />
    </div>
  );
}
