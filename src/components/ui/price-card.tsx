import * as React from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PriceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description?: string;
  monthlyPrice: number | string;
  annualPrice?: number | string;
  isAnnual?: boolean;
  currency?: string;
  billingPeriod?: string;
  badge?: string;
  features: string[];
  ctaText?: string;
  onCtaClick?: () => void;
  highlighted?: boolean;
}

export function PriceCard({
  name,
  description,
  monthlyPrice,
  annualPrice,
  isAnnual = false,
  currency = "$",
  billingPeriod,
  badge,
  features,
  ctaText = "Get Started",
  onCtaClick,
  highlighted = false,
  className,
  ...props
}: PriceCardProps) {
  const price = isAnnual && annualPrice !== undefined ? annualPrice : monthlyPrice;
  const period = billingPeriod || (isAnnual ? "per month, billed annually" : "per month");

  return (
    <div
      data-slot="price-card"
      className={cn(
        "relative flex flex-col justify-between rounded-3xl border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md max-w-sm w-full",
        highlighted && "border-primary shadow-xl ring-2 ring-primary/20 bg-linear-to-b from-primary/5 via-card to-card",
        className
      )}
      {...props}
    >
      {/* Popular Badge */}
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-md">
            <Sparkles className="size-3" />
            <span>{badge}</span>
          </span>
        </div>
      )}

      <div>
        {/* Tier Name & Description */}
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            {name}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Price Display */}
        <div className="flex items-baseline gap-1 my-4">
          <span className="text-sm font-semibold text-muted-foreground">{currency}</span>
          <span className="text-4xl font-extrabold tracking-tight text-foreground font-mono">
            {price}
          </span>
          <span className="text-xs text-muted-foreground ml-1">/{isAnnual ? "mo" : "mo"}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mb-6">{period}</p>

        {/* Feature List */}
        <div className="border-t pt-5 mb-6 flex flex-col gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Included features
          </span>
          <ul className="flex flex-col gap-2.5">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-2.5 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action CTA */}
      <button
        type="button"
        onClick={onCtaClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-semibold transition-all active:scale-[0.98] shadow-xs group",
          highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border"
        )}
      >
        <span>{ctaText}</span>
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}
