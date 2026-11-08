import * as React from "react";
import { ArrowUp, Paperclip, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PromptAttachment {
  id: string;
  name: string;
  size?: string;
  type?: string;
}

export interface PromptInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onSubmit"> {
  value?: string;
  defaultValue?: string;
  onSubmit?: (value: string, attachments?: PromptAttachment[]) => void;
  onStop?: () => void;
  isStreaming?: boolean;
  attachments?: PromptAttachment[];
  onRemoveAttachment?: (id: string) => void;
  onAttachClick?: () => void;
  addonLeading?: React.ReactNode;
  maxHeight?: number;
}

export function PromptInput({
  value,
  defaultValue,
  onSubmit,
  onStop,
  isStreaming = false,
  attachments = [],
  onRemoveAttachment,
  onAttachClick,
  addonLeading,
  maxHeight = 240,
  className,
  placeholder = "Ask anything or type a prompt...",
  onChange,
  onKeyDown,
  disabled,
  ...props
}: PromptInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [currentValue, maxHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleSubmit = () => {
    if (isStreaming) {
      onStop?.();
      return;
    }
    const trimmed = currentValue.trim();
    if (!trimmed && attachments.length === 0) return;
    onSubmit?.(trimmed, attachments);
    if (value === undefined) {
      setInternalValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    onKeyDown?.(e);
  };

  return (
    <div
      data-slot="prompt-input"
      className={cn(
        "relative flex flex-col rounded-2xl border bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring transition-all",
        disabled && "opacity-60 pointer-events-none",
        className
      )}
    >
      {/* Attachments Chip Bar */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 p-3 pb-1 border-b border-border/40">
          {attachments.map((file) => (
            <span
              key={file.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-xs text-foreground font-medium"
            >
              <Paperclip className="size-3 text-muted-foreground" />
              <span className="truncate max-w-[140px]">{file.name}</span>
              {onRemoveAttachment && (
                <button
                  type="button"
                  onClick={() => onRemoveAttachment(file.id)}
                  className="p-0.5 rounded-full hover:bg-muted-foreground/20 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-start px-3 pt-3">
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          className="w-full resize-none bg-transparent outline-none text-sm placeholder:text-muted-foreground leading-relaxed min-h-[36px]"
          {...props}
        />
      </div>

      {/* Footer Toolbar */}
      <div className="flex items-center justify-between px-3 pb-3 pt-1">
        <div className="flex items-center gap-1.5">
          {onAttachClick && (
            <button
              type="button"
              onClick={onAttachClick}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Attach files"
              aria-label="Attach files"
            >
              <Paperclip className="size-4" />
            </button>
          )}
          {addonLeading}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || (!isStreaming && !currentValue.trim() && attachments.length === 0)}
          className={cn(
            "flex size-8 items-center justify-center rounded-full transition-all shadow-xs shrink-0",
            isStreaming
              ? "bg-rose-500 text-white hover:bg-rose-600"
              : "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none"
          )}
          title={isStreaming ? "Stop generating" : "Send prompt"}
          aria-label={isStreaming ? "Stop generating" : "Send prompt"}
        >
          {isStreaming ? (
            <Square className="size-3.5 fill-current" />
          ) : (
            <ArrowUp className="size-4 stroke-[2.5]" />
          )}
        </button>
      </div>
    </div>
  );
}
