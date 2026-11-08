import * as React from "react";
import { ArrowDown, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, ChevronLeft, ChevronRight, Sparkles, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Chat Container Root ---
export interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
  onScrollToBottom?: () => void;
  children: React.ReactNode;
}

export function ChatContainer({
  autoScroll = true,
  className,
  children,
  ...props
}: ChatContainerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [userHasScrolledUp, setUserHasScrolledUp] = React.useState(false);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (!scrollRef.current) return;
    if (typeof scrollRef.current.scrollTo === "function") {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior,
      });
    } else {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    setUserHasScrolledUp(false);
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const isUp = distanceFromBottom > 120;
    setShowScrollButton(isUp);
    setUserHasScrolledUp(isUp);
  };

  // Auto-scroll when children change if user hasn't scrolled up
  React.useEffect(() => {
    if (autoScroll && !userHasScrolledUp) {
      scrollToBottom("auto");
    }
  }, [children, autoScroll, userHasScrolledUp]);

  return (
    <div className={cn("relative flex h-full w-full flex-col overflow-hidden bg-background", className)} {...props}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth"
      >
        {children}
      </div>

      {showScrollButton && (
        <button
          type="button"
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-4 right-6 flex items-center gap-1.5 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur-md transition-all hover:bg-muted animate-in fade-in zoom-in-95"
          aria-label="Scroll to latest messages"
        >
          <ArrowDown className="size-3.5" />
          <span>Latest</span>
        </button>
      )}
    </div>
  );
}

// --- Chat Message Bubble ---
export interface ChatMessageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  role: "user" | "assistant" | "system";
  content: string | React.ReactNode;
  authorName?: string;
  avatar?: React.ReactNode;
  timestamp?: string;
  status?: "streaming" | "complete" | "error";
  branchTotal?: number;
  branchIndex?: number;
  onBranchChange?: (nextIndex: number) => void;
  actions?: React.ReactNode;
}

export function ChatMessage({
  role,
  content,
  authorName,
  avatar,
  timestamp,
  status = "complete",
  branchTotal,
  branchIndex = 0,
  onBranchChange,
  actions,
  className,
  children,
  ...props
}: ChatMessageProps) {
  const isUser = role === "user";

  const defaultAvatar = isUser ? (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
      <User className="size-4" />
    </div>
  ) : (
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted/60 text-foreground text-xs font-semibold shadow-2xs">
      <Bot className="size-4 text-primary" />
    </div>
  );

  return (
    <div
      className={cn(
        "group flex w-full gap-3 text-sm",
        isUser ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    >
      {/* Avatar */}
      {avatar || defaultAvatar}

      {/* Message Content & Meta */}
      <div className={cn("flex max-w-[85%] flex-col gap-1.5", isUser ? "items-end" : "items-start")}>
        {/* Header (Author & Timestamp) */}
        {(authorName || timestamp) && (
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground px-1">
            {authorName && <span className="font-medium text-foreground/80">{authorName}</span>}
            {timestamp && <span>{timestamp}</span>}
          </div>
        )}

        {/* Message Bubble Body */}
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 leading-relaxed text-sm shadow-2xs",
            isUser
              ? "rounded-tr-xs bg-primary text-primary-foreground"
              : "rounded-tl-xs border bg-card text-card-foreground",
            status === "error" && "border-destructive/40 bg-destructive/10 text-destructive"
          )}
        >
          {content}
          {children}

          {status === "streaming" && (
            <span className="inline-block size-1.5 ml-1 animate-pulse rounded-full bg-primary align-middle" />
          )}
        </div>

        {/* Footer: Branch Switcher & Action Toolbar */}
        <div className={cn("flex items-center gap-2 pt-0.5", isUser ? "justify-end" : "justify-start")}>
          {branchTotal && branchTotal > 1 && (
            <div className="flex items-center gap-1 rounded-md border bg-muted/40 px-1.5 py-0.5 text-[11px] text-muted-foreground select-none">
              <button
                type="button"
                disabled={branchIndex <= 0}
                onClick={() => onBranchChange?.(branchIndex - 1)}
                className="hover:text-foreground disabled:opacity-40"
              >
                <ChevronLeft className="size-3" />
              </button>
              <span>
                {branchIndex + 1} / {branchTotal}
              </span>
              <button
                type="button"
                disabled={branchIndex >= branchTotal - 1}
                onClick={() => onBranchChange?.(branchIndex + 1)}
                className="hover:text-foreground disabled:opacity-40"
              >
                <ChevronRight className="size-3" />
              </button>
            </div>
          )}

          {actions}
        </div>
      </div>
    </div>
  );
}

// --- Chat Actions Toolbar ---
export interface ChatMessageActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  textToCopy?: string;
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onRegenerate?: () => void;
}

export function ChatMessageActions({
  textToCopy,
  onThumbsUp,
  onThumbsDown,
  onRegenerate,
  className,
  ...props
}: ChatMessageActionsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className={cn("flex items-center gap-0.5 text-muted-foreground", className)} {...props}>
      {textToCopy && (
        <button
          type="button"
          onClick={handleCopy}
          title="Copy response"
          className="flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground transition-colors"
        >
          {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
        </button>
      )}

      {onThumbsUp && (
        <button
          type="button"
          onClick={onThumbsUp}
          title="Good response"
          className="flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground transition-colors"
        >
          <ThumbsUp className="size-3" />
        </button>
      )}

      {onThumbsDown && (
        <button
          type="button"
          onClick={onThumbsDown}
          title="Poor response"
          className="flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground transition-colors"
        >
          <ThumbsDown className="size-3" />
        </button>
      )}

      {onRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          title="Regenerate response"
          className="flex size-6 items-center justify-center rounded hover:bg-muted hover:text-foreground transition-colors"
        >
          <RotateCcw className="size-3" />
        </button>
      )}
    </div>
  );
}
