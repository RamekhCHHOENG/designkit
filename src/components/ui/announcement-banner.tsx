import * as React from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnnouncementBannerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  message: string;
  href?: string;
  linkText?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  variant?: "pill" | "bar";
}

export function AnnouncementBanner({
  badge = "New",
  message,
  href,
  linkText,
  dismissible = true,
  onDismiss,
  variant = "pill",
  className,
  ...props
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    onDismiss?.();
  };

  const content = (
    <>
      {badge && (
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20 shrink-0">
          <Sparkles className="size-2.5" />
          <span>{badge}</span>
        </span>
      )}
      <span className="truncate text-xs font-medium text-foreground">{message}</span>
      {linkText && (
        <span className="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline text-xs shrink-0 group">
          <span>{linkText}</span>
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  if (variant === "bar") {
    return (
      <div
        data-slot="announcement-banner"
        className={cn(
          "w-full border-b bg-gradient-to-r from-primary/10 via-background to-primary/10 px-4 py-2 text-xs flex items-center justify-between gap-3 shadow-2xs",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex items-center gap-2.5 overflow-hidden">
          {href ? (
            <a href={href} className="flex items-center gap-2.5 overflow-hidden">
              {content}
            </a>
          ) : (
            content
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    );
  }

  // Default "pill" variant
  return (
    <div
      data-slot="announcement-banner"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border bg-background/80 backdrop-blur-md pl-1.5 pr-2 py-1 shadow-sm transition-all hover:bg-muted/40",
        className
      )}
      {...props}
    >
      {href ? (
        <a href={href} className="flex items-center gap-2 overflow-hidden">
          {content}
        </a>
      ) : (
        content
      )}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ml-1"
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  );
}
