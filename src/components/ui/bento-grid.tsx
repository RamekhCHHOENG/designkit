"use client";

import * as React from "react";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[20rem] grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  className?: string;
  background?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  description: string;
  href?: string;
  cta?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

const colSpanClasses: Record<1 | 2 | 3, string> = {
  1: "col-span-1",
  2: "col-span-1 md:col-span-2",
  3: "col-span-1 md:col-span-3",
};

const rowSpanClasses: Record<1 | 2, string> = {
  1: "row-span-1",
  2: "row-span-2",
};

export function BentoCard({
  name,
  className,
  background,
  icon: Icon,
  description,
  href,
  cta = "Learn more",
  colSpan = 1,
  rowSpan = 1,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md dark:bg-card/70 dark:backdrop-blur-xl",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
      {...props}
    >
      {/* Background Graphic */}
      {background && (
        <div className="absolute inset-0 z-0 transition-transform duration-500 ease-out group-hover:scale-105">
          {background}
        </div>
      )}

      {/* Top Header */}
      <div className="relative z-10 flex flex-col gap-2">
        {Icon && (
          <div className="flex size-10 items-center justify-center rounded-xl bg-muted/80 text-foreground shadow-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-5" />
          </div>
        )}
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          {name}
        </h3>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Action */}
      <div className="relative z-10 flex items-center justify-between pt-4">
        {href ? (
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<a href={href} />}
            className="group/btn -ml-2 gap-1.5 text-xs font-medium text-foreground hover:bg-muted/80"
          >
            <span>{cta}</span>
            <ArrowRightIcon className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        ) : (
          <span className="text-xs font-medium text-muted-foreground">{cta}</span>
        )}
      </div>

      {/* Subtle Apple gradient border glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-foreground/10"
      />
    </div>
  );
}
