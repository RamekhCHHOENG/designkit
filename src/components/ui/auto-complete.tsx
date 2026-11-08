import * as React from "react";
import { Search, X, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AutoCompleteOption {
  value: string;
  label?: string;
  description?: string;
  group?: string;
  disabled?: boolean;
}

export interface AutoCompleteProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onSelect" | "value" | "defaultValue"> {
  options: AutoCompleteOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSelectOption?: (option: AutoCompleteOption) => void;
  isLoading?: boolean;
  clearable?: boolean;
  highlightMatches?: boolean;
  filterOption?: (query: string, option: AutoCompleteOption) => boolean;
  emptyMessage?: string;
}

export const AutoComplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      onSelectOption,
      isLoading = false,
      clearable = true,
      highlightMatches = true,
      filterOption,
      emptyMessage = "No results found",
      className,
      placeholder = "Type to search...",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const query = isControlled ? controlledValue : internalValue;

    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const filteredOptions = React.useMemo(() => {
      if (!query.trim()) return options;
      if (filterOption) {
        return options.filter((opt) => filterOption(query, opt));
      }
      const q = query.toLowerCase();
      return options.filter(
        (opt) =>
          (opt.label || opt.value).toLowerCase().includes(q) ||
          (opt.description && opt.description.toLowerCase().includes(q))
      );
    }, [options, query, filterOption]);

    // Close when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const updateQuery = (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    };

    const handleSelect = (option: AutoCompleteOption) => {
      if (option.disabled) return;
      const displayVal = option.label || option.value;
      updateQuery(displayVal);
      onSelectOption?.(option);
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % Math.max(1, filteredOptions.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + filteredOptions.length) % Math.max(1, filteredOptions.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const renderHighlightedText = (text: string, highlight: string) => {
      if (!highlightMatches || !highlight.trim()) return text;
      const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
      return (
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
              <mark key={i} className="bg-primary/20 text-primary font-semibold rounded-xs px-0.5">
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </span>
      );
    };

    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-4 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            value={query}
            placeholder={placeholder}
            onChange={(e) => {
              updateQuery(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(0);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors",
              "pl-9 pr-8 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            )}
            {...props}
          />

          <div className="absolute right-2.5 flex items-center gap-1">
            {isLoading && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
            {clearable && query && !disabled && (
              <button
                type="button"
                onClick={() => {
                  updateQuery("");
                  inputRef.current?.focus();
                }}
                className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-sm"
                aria-label="Clear input"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground">{emptyMessage}</div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = (opt.label || opt.value) === query;
                const isHighlighted = idx === highlightedIndex;

                return (
                  <div
                    key={opt.value + idx}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    onClick={() => handleSelect(opt)}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center justify-between rounded-sm px-2.5 py-1.5 text-xs outline-none transition-colors",
                      isHighlighted ? "bg-accent text-accent-foreground" : "",
                      opt.disabled ? "pointer-events-none opacity-50" : ""
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {renderHighlightedText(opt.label || opt.value, query)}
                      </span>
                      {opt.description && (
                        <span className="text-[11px] text-muted-foreground">
                          {renderHighlightedText(opt.description, query)}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="size-3.5 text-primary shrink-0 ml-2" />}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }
);

AutoComplete.displayName = "AutoComplete";
