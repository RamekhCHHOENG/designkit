import * as React from "react";
import { ChevronRight, Sparkles, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThinkingBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  isStreaming?: boolean;
  durationMs?: number;
  tokens?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function ThinkingBlock({
  title = "Thinking Process",
  isStreaming = false,
  durationMs,
  tokens,
  defaultOpen = false,
  children,
  className,
  ...props
}: ThinkingBlockProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || isStreaming);
  const [copied, setCopied] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Auto-expand while streaming
  React.useEffect(() => {
    if (isStreaming) {
      setIsOpen(true);
    }
  }, [isStreaming]);

  const durationFormatted = React.useMemo(() => {
    if (!durationMs) return null;
    if (durationMs < 1000) return `${durationMs}ms`;
    return `${(durationMs / 1000).toFixed(1)}s`;
  }, [durationMs]);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!contentRef.current) return;
    try {
      await navigator.clipboard.writeText(contentRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div
      data-slot="thinking-block"
      className={cn(
        "rounded-xl border bg-muted/30 dark:bg-muted/15 overflow-hidden transition-all text-xs",
        isStreaming && "border-primary/40 ring-1 ring-primary/20",
        className
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <ChevronRight
            className={cn(
              "size-3.5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-90"
            )}
          />
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            {isStreaming ? (
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-primary" />
              </span>
            ) : (
              <Sparkles className="size-3.5 text-primary" />
            )}
            <span>{title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          {tokens && <span>{tokens.toLocaleString()} tokens</span>}
          {durationFormatted && (
            <>
              {tokens && <span>•</span>}
              <span>{durationFormatted}</span>
            </>
          )}

          <div
            role="button"
            tabIndex={0}
            onClick={handleCopy}
            className="p-1 rounded hover:bg-background/80 transition-colors text-muted-foreground hover:text-foreground ml-1"
            title="Copy thinking output"
            aria-label="Copy thinking output"
          >
            {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          ref={contentRef}
          className="px-4 pb-3 pt-1 text-muted-foreground leading-relaxed border-t border-border/40 font-mono text-[11px] whitespace-pre-wrap select-text bg-background/50"
        >
          {children}
        </div>
      )}
    </div>
  );
}
