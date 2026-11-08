import * as React from "react";
import { cn } from "@/lib/utils";

export type IconMotionTransition = "morph" | "flip" | "slide" | "fade";

export interface IconMotionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onToggle"> {
  isToggled?: boolean;
  onToggle?: (isToggled: boolean) => void;
  firstIcon?: React.ReactNode;
  secondIcon?: React.ReactNode;
  transition?: IconMotionTransition;
  size?: "sm" | "default" | "lg";
}

/**
 * Universal Icon Motion Wrapper.
 * Smoothly animates transitions between two icons or states with spring physics.
 */
export function IconMotion({
  isToggled = false,
  onToggle,
  firstIcon,
  secondIcon,
  transition = "morph",
  size = "default",
  className,
  children,
  onClick,
  ...props
}: IconMotionProps) {
  const [internalToggled, setInternalToggled] = React.useState(isToggled);

  const active = onToggle ? isToggled : internalToggled;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onToggle) {
      setInternalToggled(!internalToggled);
    }
    onToggle?.(!active);
    onClick?.(e);
  };

  const sizeClasses = {
    sm: "size-7 p-1 text-xs",
    default: "size-9 p-2 text-sm",
    lg: "size-11 p-2.5 text-base",
  };

  return (
    <button
      type="button"
      data-slot="icon-motion"
      onClick={handleClick}
      aria-pressed={active}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg border bg-background text-foreground hover:bg-muted/80 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring select-none overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* If custom children are passed (e.g. SVGs) */}
      {children ? (
        children
      ) : (
        <div className="relative size-full flex items-center justify-center">
          {/* First Icon (Default / False State) */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              transition === "morph" &&
                (!active
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 -rotate-90 pointer-events-none"),
              transition === "flip" &&
                (!active
                  ? "opacity-100 rotate-y-0"
                  : "opacity-0 [transform:rotateY(90deg)] pointer-events-none"),
              transition === "slide" &&
                (!active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-3 pointer-events-none"),
              transition === "fade" &&
                (!active ? "opacity-100" : "opacity-0 pointer-events-none")
            )}
          >
            {firstIcon}
          </div>

          {/* Second Icon (Toggled / True State) */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              transition === "morph" &&
                (active
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 rotate-90 pointer-events-none"),
              transition === "flip" &&
                (active
                  ? "opacity-100 rotate-y-0"
                  : "opacity-0 [transform:rotateY(-90deg)] pointer-events-none"),
              transition === "slide" &&
                (active
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"),
              transition === "fade" &&
                (active ? "opacity-100" : "opacity-0 pointer-events-none")
            )}
          >
            {secondIcon}
          </div>
        </div>
      )}
    </button>
  );
}

/**
 * Animated Morphing Hamburger to Close (X) icon.
 * Seamless line-by-line SVG transformation.
 */
export function MorphMenuToggle({
  isOpen = false,
  onToggle,
  className,
  ...props
}: {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [internalOpen, setInternalOpen] = React.useState(isOpen);
  const active = onToggle ? isOpen : internalOpen;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onToggle) setInternalOpen(!internalOpen);
    onToggle?.(!active);
    props.onClick?.(e);
  };

  return (
    <button
      type="button"
      data-slot="morph-menu-toggle"
      onClick={handleClick}
      aria-label={active ? "Close menu" : "Open menu"}
      aria-expanded={active}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-lg border bg-background hover:bg-muted/80 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <div className="relative size-4 flex flex-col justify-between">
        {/* Top line */}
        <span
          className={cn(
            "h-0.5 w-full bg-foreground rounded-full transition-all duration-300 origin-center ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            active && "translate-y-[7px] rotate-45"
          )}
        />
        {/* Middle line */}
        <span
          className={cn(
            "h-0.5 w-full bg-foreground rounded-full transition-all duration-200 ease-out",
            active && "opacity-0 scale-x-0"
          )}
        />
        {/* Bottom line */}
        <span
          className={cn(
            "h-0.5 w-full bg-foreground rounded-full transition-all duration-300 origin-center ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            active && "-translate-y-[7px] -rotate-45"
          )}
        />
      </div>
    </button>
  );
}

/**
 * Animated Play to Pause morph toggle.
 */
export function MorphPlayToggle({
  isPlaying = false,
  onToggle,
  className,
  ...props
}: {
  isPlaying?: boolean;
  onToggle?: (playing: boolean) => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [internalPlaying, setInternalPlaying] = React.useState(isPlaying);
  const active = onToggle ? isPlaying : internalPlaying;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onToggle) setInternalPlaying(!internalPlaying);
    onToggle?.(!active);
    props.onClick?.(e);
  };

  return (
    <button
      type="button"
      data-slot="morph-play-toggle"
      onClick={handleClick}
      aria-label={active ? "Pause" : "Play"}
      aria-pressed={active}
      className={cn(
        "relative flex size-9 items-center justify-center rounded-lg border bg-background hover:bg-muted/80 transition-colors shadow-2xs outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4.5 text-foreground transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      >
        {active ? (
          /* Pause bars */
          <>
            <rect x="6" y="4" width="4" height="16" rx="1.5" />
            <rect x="14" y="4" width="4" height="16" rx="1.5" />
          </>
        ) : (
          /* Play triangle */
          <path d="M7 5.5v13a1 1 0 0 0 1.55.83l10-6.5a1 1 0 0 0 0-1.66l-10-6.5A1 1 0 0 0 7 5.5z" />
        )}
      </svg>
    </button>
  );
}
