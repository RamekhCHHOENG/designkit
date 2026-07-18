import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "small" | "medium" | "large" | "icon";
export type ButtonColor = "neutral" | "blue" | "green" | "violet";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  variant = "primary",
  size = "medium",
  color = "neutral",
  loading = false,
  disabled,
  className = "",
  children,
  ...props
}, ref) {
  return (
    <button
      {...props}
      ref={ref}
      className={`dk-button dk-button--${variant} dk-button--${size} ${className}`.trim()}
      data-color={color}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <span className="dk-button__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
});
