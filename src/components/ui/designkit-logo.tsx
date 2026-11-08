import * as React from "react";
import { cn } from "@/lib/utils";

export interface DesignKitLogoProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string;
  variant?: "mark" | "badge" | "full";
  className?: string;
}

export function DesignKitLogo({
  size = 24,
  variant = "badge",
  className,
  ...props
}: DesignKitLogoProps) {
  const id = React.useId().replace(/:/g, "");

  if (variant === "full") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 168 40"
        fill="none"
        width={typeof size === "number" ? size * 4.2 : size}
        height={size}
        className={cn("inline-block shrink-0 select-none", className)}
        {...props}
      >
        <defs>
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>
          <linearGradient id={`border-${id}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id={`prism-${id}`} x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#6366f1" />
            <stop offset="70%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id={`glass-${id}`} x1="16" y1="12" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
          </linearGradient>
          <filter id={`glow-${id}`} x="2" y="2" width="36" height="36" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#6366f1" floodOpacity="0.35" />
          </filter>
        </defs>

        <rect x="1" y="1" width="38" height="38" rx="10" fill={`url(#bg-${id})`} />
        <rect x="1.5" y="1.5" width="37" height="37" rx="9.5" fill="none" stroke={`url(#border-${id})`} strokeWidth="1" />
        <g filter={`url(#glow-${id})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 9.5C10 8.67157 10.6716 8 11.5 8H20.5C26.0228 8 30.5 12.4772 30.5 18C30.5 23.5228 26.0228 28 20.5 28H11.5C10.6716 28 10 27.3284 10 26.5V9.5ZM14.5 12.5V23.5H20C23.0376 23.5 25.5 21.0376 25.5 18C25.5 14.9624 23.0376 12.5 20 12.5H14.5Z"
            fill={`url(#prism-${id})`}
          />
          <path
            d="M17.5 13.5L22.5 18L17.5 22.5"
            stroke={`url(#glass-${id})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14.5" cy="18" r="1.5" fill="#ffffff" />
        </g>

        <g transform="translate(50, 26)">
          <text
            fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif"
            fontSize="20"
            fontWeight="700"
            letterSpacing="-0.03em"
            className="fill-foreground"
          >
            Design<tspan fill={`url(#prism-${id})`}>Kit</tspan>
          </text>
        </g>
      </svg>
    );
  }

  if (variant === "mark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="none"
        width={size}
        height={size}
        className={cn("inline-block shrink-0 select-none", className)}
        {...props}
      >
        <defs>
          <linearGradient id={`prism-${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#6366f1" />
            <stop offset="70%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id={`glass-${id}`} x1="12" y1="8" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 5.5C6 4.67157 6.67157 4 7.5 4H16.5C22.0228 4 26.5 8.47715 26.5 14C26.5 19.5228 22.0228 24 16.5 24H7.5C6.67157 24 6 23.3284 6 22.5V5.5ZM10.5 8.5V19.5H16C19.0376 19.5 21.5 17.0376 21.5 14C21.5 10.9624 19.0376 8.5 16 8.5H10.5Z"
          fill={`url(#prism-${id})`}
        />
        <path
          d="M13.5 9.5L18.5 14L13.5 18.5"
          stroke={`url(#glass-${id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10.5" cy="14" r="1.5" fill="#ffffff" />
      </svg>
    );
  }

  // Default: variant === "badge" (The iconic Apple Squircle with dimensional glow)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      width={size}
      height={size}
      className={cn("inline-block shrink-0 select-none", className)}
      {...props}
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id={`border-${id}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`prism-${id}`} x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="35%" stopColor="#6366f1" />
          <stop offset="70%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id={`glass-${id}`} x1="16" y1="12" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
        </linearGradient>
        <filter id={`glow-${id}`} x="2" y="2" width="36" height="36" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#6366f1" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect x="1" y="1" width="38" height="38" rx="10" fill={`url(#bg-${id})`} />
      <rect x="1.5" y="1.5" width="37" height="37" rx="9.5" fill="none" stroke={`url(#border-${id})`} strokeWidth="1" />
      <g filter={`url(#glow-${id})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 9.5C10 8.67157 10.6716 8 11.5 8H20.5C26.0228 8 30.5 12.4772 30.5 18C30.5 23.5228 26.0228 28 20.5 28H11.5C10.6716 28 10 27.3284 10 26.5V9.5ZM14.5 12.5V23.5H20C23.0376 23.5 25.5 21.0376 25.5 18C25.5 14.9624 23.0376 12.5 20 12.5H14.5Z"
          fill={`url(#prism-${id})`}
        />
        <path
          d="M17.5 13.5L22.5 18L17.5 22.5"
          stroke={`url(#glass-${id})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="18" r="1.5" fill="#ffffff" />
      </g>
    </svg>
  );
}
