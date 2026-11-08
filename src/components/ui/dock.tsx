"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DockContextValue {
  mouseX: number | null;
  mouseY: number | null;
  magnification: number;
  distance: number;
  baseSize: number;
  direction: "horizontal" | "vertical";
}

const DockContext = React.createContext<DockContextValue>({
  mouseX: null,
  mouseY: null,
  magnification: 64,
  distance: 140,
  baseSize: 40,
  direction: "horizontal",
});

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  magnification?: number;
  distance?: number;
  baseSize?: number;
  direction?: "horizontal" | "vertical";
  children: React.ReactNode;
}

export function Dock({
  magnification = 64,
  distance = 140,
  baseSize = 40,
  direction = "horizontal",
  className,
  children,
  ...props
}: DockProps) {
  const [coords, setCoords] = React.useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setCoords({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const handleMouseLeave = React.useCallback(() => {
    setCoords({ x: null, y: null });
  }, []);

  return (
    <DockContext.Provider
      value={{
        mouseX: coords.x,
        mouseY: coords.y,
        magnification,
        distance,
        baseSize,
        direction,
      }}
    >
      <div
        role="toolbar"
        aria-orientation={direction}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-background/70 px-3 py-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-card/70",
          direction === "vertical" ? "flex-col py-3 px-2 w-max" : "flex-row w-max",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

export interface DockIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label?: string;
  children: React.ReactNode;
}

export function DockIcon({
  active = false,
  label,
  className,
  children,
  onClick,
  ...props
}: DockIconProps) {
  const { mouseX, mouseY, magnification, distance, baseSize, direction } =
    React.useContext(DockContext);
  const ref = React.useRef<HTMLButtonElement>(null);

  const [currentSize, setCurrentSize] = React.useState(baseSize);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const iconCenter =
      direction === "horizontal"
        ? rect.left + rect.width / 2
        : rect.top + rect.height / 2;

    const pointer = direction === "horizontal" ? mouseX : mouseY;

    if (pointer === null) {
      setCurrentSize(baseSize);
      return;
    }

    const dist = Math.abs(pointer - iconCenter);

    if (dist < distance) {
      // Smooth cosine interpolation
      const scaleFactor = Math.cos((dist / distance) * (Math.PI / 2));
      const targetSize = baseSize + (magnification - baseSize) * scaleFactor;
      setCurrentSize(targetSize);
    } else {
      setCurrentSize(baseSize);
    }
  }, [mouseX, mouseY, magnification, distance, baseSize, direction]);

  return (
    <div className="group relative flex flex-col items-center">
      {label && isHovered && (
        <div
          role="tooltip"
          className="pointer-events-none absolute -top-9 z-50 rounded-md border border-border bg-popover/90 px-2 py-0.5 text-[11px] font-medium text-popover-foreground shadow-md backdrop-blur-md transition-all duration-150 animate-in fade-in-0 zoom-in-95"
        >
          {label}
        </div>
      )}
      <button
        ref={ref}
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        aria-label={label}
        style={{
          width: `${currentSize}px`,
          height: `${currentSize}px`,
        }}
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-muted/60 text-foreground transition-[width,height,transform] duration-75 ease-out hover:bg-muted active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-muted/40",
          className
        )}
        {...props}
      >
        <div className="flex size-full items-center justify-center p-2">
          {children}
        </div>
      </button>
      {active && (
        <span
          aria-hidden="true"
          className="mt-1 size-1 rounded-full bg-foreground/70"
        />
      )}
    </div>
  );
}

export function DockSeparator({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { direction } = React.useContext(DockContext);
  return (
    <div
      role="separator"
      className={cn(
        "bg-border/60",
        direction === "vertical" ? "my-1 h-px w-6" : "mx-1 h-6 w-px",
        className
      )}
    />
  );
}
