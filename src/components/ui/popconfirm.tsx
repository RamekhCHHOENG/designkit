import * as React from "react";
import { AlertTriangle, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PopconfirmProps {
  title: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  variant?: "default" | "destructive" | "warning";
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactElement<any>;
  className?: string;
}

export function Popconfirm({
  title,
  description,
  okText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "warning",
  icon,
  disabled = false,
  children,
  className,
}: PopconfirmProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  // Close when clicking outside
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        onCancel?.();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onCancel?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await onConfirm?.();
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    onCancel?.();
  };

  const defaultIcon = {
    destructive: <AlertTriangle className="size-4 text-destructive shrink-0" />,
    warning: <AlertTriangle className="size-4 text-amber-500 shrink-0" />,
    default: <Info className="size-4 text-primary shrink-0" />,
  }[variant];

  return (
    <div ref={anchorRef} className="relative inline-block">
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: handleTriggerClick,
        "aria-expanded": isOpen,
      })}

      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-xl border bg-popover p-3.5 text-popover-foreground shadow-lg outline-none animate-in fade-in-0 zoom-in-95",
            className
          )}
        >
          {/* Popover Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-popover" />

          <div className="flex items-start gap-2.5">
            {icon || defaultIcon}
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold text-xs leading-none text-foreground">{title}</h4>
              {description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-2 pt-1 border-t">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="rounded-md border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-2xs transition-colors",
                variant === "destructive"
                  ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {loading ? "..." : okText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
