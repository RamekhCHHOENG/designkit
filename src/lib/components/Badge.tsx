import { forwardRef, type HTMLAttributes } from "react";

export type BadgeTone = "neutral" | "blue" | "green" | "amber" | "red" | "violet";
export type BadgeVariant = "soft" | "solid" | "outline";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
  variant?: BadgeVariant;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({
  tone = "neutral",
  variant = "soft",
  className = "",
  ...props
}, ref) {
  return (
    <span
      {...props}
      ref={ref}
      className={`dk-badge dk-badge--${variant} ${className}`.trim()}
      data-tone={tone}
    />
  );
});
