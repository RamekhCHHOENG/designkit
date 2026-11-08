import * as React from "react";
import { Wrench, ChevronDown, Check, Copy, Clock, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToolCallCardProps extends React.HTMLAttributes<HTMLDivElement> {
  toolName: string;
  status?: "pending" | "running" | "success" | "error";
  durationMs?: number;
  args?: Record<string, any>;
  result?: any;
  error?: string;
  requiresConfirmation?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  defaultOpen?: boolean;
}

export function ToolCallCard({
  toolName,
  status = "success",
  durationMs,
  args,
  result,
  error,
  requiresConfirmation = false,
  onConfirm,
  onCancel,
  defaultOpen = false,
  className,
  ...props
}: ToolCallCardProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || status === "running" || requiresConfirmation);
  const [copied, setCopied] = React.useState(false);

  const formattedDuration = React.useMemo(() => {
    if (durationMs === undefined) return null;
    if (durationMs < 1000) return `${durationMs}ms`;
    return `${(durationMs / 1000).toFixed(2)}s`;
  }, [durationMs]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const payload = JSON.stringify({ tool: toolName, args, result, error }, null, 2);
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const statusConfig = {
    pending: {
      badgeClass: "bg-muted text-muted-foreground border-border",
      icon: <Clock className="size-3" />,
      label: "Pending",
    },
    running: {
      badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      icon: <Loader2 className="size-3 animate-spin" />,
      label: "Executing",
    },
    success: {
      badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      icon: <Check className="size-3 stroke-[3]" />,
      label: "Completed",
    },
    error: {
      badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
      icon: <AlertCircle className="size-3" />,
      label: "Failed",
    },
  }[status];

  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-2xs overflow-hidden transition-all text-xs",
        status === "running" && "border-amber-500/30",
        status === "error" && "border-destructive/40",
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3.5 py-2.5 bg-muted/20 hover:bg-muted/40 cursor-pointer select-none transition-colors gap-3"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground shadow-2xs">
            <Wrench className="size-3.5 text-primary" />
          </div>
          <div className="flex items-center gap-2 truncate">
            <span className="font-mono font-semibold text-foreground truncate">{toolName}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium shrink-0",
                statusConfig.badgeClass
              )}
            >
              {statusConfig.icon}
              <span>{statusConfig.label}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {formattedDuration && (
            <span className="font-mono text-[11px] text-muted-foreground">{formattedDuration}</span>
          )}

          <button
            type="button"
            onClick={handleCopy}
            title="Copy tool payload"
            className="flex size-6 items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
          </button>

          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </div>

      {/* Confirmation Banner */}
      {requiresConfirmation && status === "pending" && (
        <div className="flex items-center justify-between border-t border-b bg-amber-500/10 px-4 py-2.5 text-amber-800 dark:text-amber-200 gap-3">
          <span className="font-medium text-xs">Action requires user approval to execute.</span>
          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded px-2.5 py-1 text-xs font-medium border border-border hover:bg-muted text-foreground transition-colors"
              >
                Deny
              </button>
            )}
            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                className="rounded bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs"
              >
                Approve
              </button>
            )}
          </div>
        </div>
      )}

      {/* Collapsible Details Body */}
      {isOpen && (
        <div className="border-t p-3.5 space-y-3 bg-muted/5 font-mono text-[11px]">
          {/* Input Arguments */}
          {args && Object.keys(args).length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-muted-foreground block mb-1">
                Arguments
              </span>
              <pre className="p-2.5 rounded-lg border bg-background text-foreground/90 overflow-x-auto leading-relaxed">
                {JSON.stringify(args, null, 2)}
              </pre>
            </div>
          )}

          {/* Execution Result */}
          {result !== undefined && (
            <div>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-muted-foreground block mb-1">
                Output
              </span>
              <pre className="p-2.5 rounded-lg border bg-background text-foreground/90 overflow-x-auto leading-relaxed max-h-56">
                {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div>
              <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-destructive block mb-1">
                Error
              </span>
              <div className="p-2.5 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive leading-relaxed">
                {error}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
