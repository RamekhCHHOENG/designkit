import { forwardRef, type HTMLAttributes } from "react";

export type CardVariant = "default" | "elevated" | "interactive";

export type CardProps = HTMLAttributes<HTMLElement> & {
  variant?: CardVariant;
};

export const Card = forwardRef<HTMLElement, CardProps>(function Card({
  variant = "default",
  className = "",
  ...props
}, ref) {
  return <article {...props} ref={ref} className={`dk-card dk-card--${variant} ${className}`.trim()} />;
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardHeader({ className = "", ...props }, ref) {
  return <div {...props} ref={ref} className={`dk-card__header ${className}`.trim()} />;
});

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function CardTitle({ className = "", ...props }, ref) {
  return <h3 {...props} ref={ref} className={`dk-card__title ${className}`.trim()} />;
});

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(function CardDescription({ className = "", ...props }, ref) {
  return <p {...props} ref={ref} className={`dk-card__description ${className}`.trim()} />;
});

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardContent({ className = "", ...props }, ref) {
  return <div {...props} ref={ref} className={`dk-card__content ${className}`.trim()} />;
});

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CardFooter({ className = "", ...props }, ref) {
  return <div {...props} ref={ref} className={`dk-card__footer ${className}`.trim()} />;
});
