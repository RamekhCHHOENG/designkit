import * as React from "react";
import { ChevronRight, ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CascaderOption {
  value: string;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface CascaderProps {
  options: CascaderOption[];
  value?: string[];
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  separator?: string;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
}

export function Cascader({
  options,
  value: controlledValue,
  onChange,
  placeholder = "Select...",
  separator = " / ",
  disabled = false,
  allowClear = true,
  className,
}: CascaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const [activePath, setActivePath] = React.useState<CascaderOption[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const activeValue = controlledValue ?? internalValue;

  // Find selected options hierarchy from activeValue
  const selectedOptions = React.useMemo(() => {
    const list: CascaderOption[] = [];
    let currentOptions = options;
    for (const val of activeValue) {
      const match = currentOptions?.find((o) => o.value === val);
      if (match) {
        list.push(match);
        currentOptions = match.children || [];
      } else {
        break;
      }
    }
    return list;
  }, [options, activeValue]);

  const displayString = React.useMemo(() => {
    if (selectedOptions.length === 0) return "";
    return selectedOptions.map((o) => o.label).join(separator);
  }, [selectedOptions, separator]);

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (
    option: CascaderOption,
    columnIdx: number
  ) => {
    if (option.disabled) return;

    const nextPath = [...activePath.slice(0, columnIdx), option];
    setActivePath(nextPath);

    // If leaf node (no children), complete selection
    if (!option.children || option.children.length === 0) {
      const newVals = nextPath.map((o) => o.value);
      setInternalValue(newVals);
      onChange?.(newVals, nextPath);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalValue([]);
    setActivePath([]);
    onChange?.([], []);
  };

  // Build columns to render
  const columns: CascaderOption[][] = [options];
  for (const opt of activePath) {
    if (opt.children && opt.children.length > 0) {
      columns.push(opt.children);
    }
  }

  return (
    <div
      ref={containerRef}
      data-slot="cascader"
      className={cn("relative inline-block w-full max-w-sm text-xs", className)}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-lg border bg-background px-3 py-1 text-xs text-foreground shadow-2xs transition-all hover:bg-muted/30 focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "truncate",
            !displayString && "text-muted-foreground"
          )}
        >
          {displayString || placeholder}
        </span>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {allowClear && displayString && !disabled && (
            <span
              onClick={handleClear}
              className="rounded-full p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "size-3.5 text-muted-foreground transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Cascading Dropdown Panels */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 flex rounded-xl border bg-popover text-popover-foreground shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
          {columns.map((colOptions, colIdx) => {
            const activeInCol = activePath[colIdx];
            return (
              <ul
                key={colIdx}
                className="max-h-60 w-44 overflow-y-auto border-r last:border-r-0 p-1 flex flex-col gap-0.5 bg-background"
              >
                {colOptions.map((opt) => {
                  const isSelected = activeInCol?.value === opt.value;
                  const hasChildren = Boolean(
                    opt.children && opt.children.length > 0
                  );

                  return (
                    <li
                      key={opt.value}
                      onClick={() => handleSelectOption(opt, colIdx)}
                      className={cn(
                        "flex items-center justify-between rounded-md px-2.5 py-1.5 cursor-pointer select-none transition-colors",
                        opt.disabled && "opacity-40 cursor-not-allowed",
                        isSelected
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span className="truncate">{opt.label}</span>
                      {hasChildren ? (
                        <ChevronRight className="size-3 text-muted-foreground shrink-0" />
                      ) : isSelected ? (
                        <Check className="size-3 text-primary shrink-0" />
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      )}
    </div>
  );
}
