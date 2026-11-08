import * as React from "react";
import { AtSign, Hash, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MentionOption {
  value: string;
  label: string;
  avatar?: string;
  description?: string;
}

export interface MentionsProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  options: MentionOption[];
  prefix?: string;
  onMentionSelect?: (option: MentionOption) => void;
}

export function Mentions({
  options,
  prefix = "@",
  value: controlledValue,
  onChange,
  onMentionSelect,
  placeholder = "Type @ to mention someone...",
  className,
  ...props
}: MentionsProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? String(controlledValue) : internalValue;

  const filteredOptions = React.useMemo(() => {
    if (!query) return options.slice(0, 5);
    const q = query.toLowerCase();
    return options
      .filter(
        (o) =>
          o.label.toLowerCase().includes(q) ||
          o.value.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [options, query]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onChange?.(e);

    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = val.slice(0, cursorPos);
    const lastPrefixIndex = textBeforeCursor.lastIndexOf(prefix);

    if (lastPrefixIndex !== -1) {
      const match = textBeforeCursor.slice(lastPrefixIndex + prefix.length);
      // Valid mention if no whitespace between prefix and cursor
      if (!/\s/.test(match)) {
        setQuery(match);
        setIsOpen(true);
        setActiveIndex(0);
        return;
      }
    }

    setIsOpen(false);
  };

  const insertMention = (option: MentionOption) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPos);
    const lastPrefixIndex = textBeforeCursor.lastIndexOf(prefix);

    if (lastPrefixIndex !== -1) {
      const before = value.slice(0, lastPrefixIndex);
      const after = value.slice(cursorPos);
      const inserted = `${prefix}${option.value} `;
      const newVal = `${before}${inserted}${after}`;

      setInternalValue(newVal);
      setIsOpen(false);
      onMentionSelect?.(option);

      // Trigger synthetic change event
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(textarea, newVal);
      const event = new Event("input", { bubbles: true });
      textarea.dispatchEvent(event);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          before.length + inserted.length,
          before.length + inserted.length
        );
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isOpen || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
      );
    } else if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      insertMention(filteredOptions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div data-slot="mentions" className="relative w-full text-xs">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full min-h-[90px] rounded-xl border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground outline-none shadow-2xs transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 leading-relaxed resize-y",
          className
        )}
        {...props}
      />

      {/* Autocomplete Popup */}
      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={menuRef}
          className="absolute left-3 bottom-full mb-1.5 z-50 w-60 rounded-xl border bg-popover text-popover-foreground shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 p-1 bg-background"
        >
          <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1 border-b mb-1">
            {prefix === "@" ? <AtSign className="size-3" /> : <Hash className="size-3" />}
            <span>Suggestions</span>
          </div>
          <ul className="flex flex-col gap-0.5">
            {filteredOptions.map((opt, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li
                  key={opt.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    insertMention(opt);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer select-none transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {opt.avatar ? (
                    <img
                      src={opt.avatar}
                      alt={opt.label}
                      className="size-5 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div
                      className={cn(
                        "size-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0",
                        isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {opt.label[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="truncate">{opt.label}</span>
                    {opt.description && (
                      <span
                        className={cn(
                          "text-[10px] truncate",
                          isActive ? "text-white/80" : "text-muted-foreground"
                        )}
                      >
                        {opt.description}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
