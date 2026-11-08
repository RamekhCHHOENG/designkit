import * as React from "react";
import { Plus, X, Filter, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActiveFilter {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface FilterFieldDefinition {
  key: string;
  label: string;
  operators?: string[];
  options?: string[]; // predefined values
}

export interface FilterChipsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  fields: FilterFieldDefinition[];
  filters: ActiveFilter[];
  onChange: (filters: ActiveFilter[]) => void;
  onClearAll?: () => void;
}

export function FilterChips({
  fields,
  filters,
  onChange,
  onClearAll,
  className,
  ...props
}: FilterChipsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedFieldKey, setSelectedFieldKey] = React.useState(
    fields[0]?.key || ""
  );
  const [selectedOp, setSelectedOp] = React.useState("is");
  const [filterValue, setFilterValue] = React.useState("");

  const popoverRef = React.useRef<HTMLDivElement>(null);

  const selectedField = fields.find((f) => f.key === selectedFieldKey) || fields[0];
  const operators = selectedField?.operators || ["is", "is not", "contains"];

  // Click outside to close add filter menu
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const removeFilter = (id: string) => {
    onChange(filters.filter((f) => f.id !== id));
  };

  const handleAddFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filterValue.trim()) return;

    const newFilter: ActiveFilter = {
      id: `filter-${Date.now()}`,
      field: selectedField?.label || selectedFieldKey,
      operator: selectedOp,
      value: filterValue.trim(),
    };

    onChange([...filters, newFilter]);
    setFilterValue("");
    setIsOpen(false);
  };

  return (
    <div
      data-slot="filter-chips"
      className={cn("flex flex-wrap items-center gap-2 text-xs", className)}
      {...props}
    >
      {/* Icon badge */}
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs pr-1 font-medium select-none">
        <Filter className="size-3.5" />
        <span>Filters</span>
      </div>

      {/* Active Filter Chips */}
      {filters.map((f) => (
        <span
          key={f.id}
          className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 pl-2.5 pr-1.5 py-0.5 text-xs text-foreground transition-all hover:bg-muted group"
        >
          <span className="font-medium text-muted-foreground">{f.field}</span>
          <span className="text-[10px] text-muted-foreground/60">{f.operator}</span>
          <span className="font-semibold text-primary">{f.value}</span>
          <button
            type="button"
            onClick={() => removeFilter(f.id)}
            className="flex size-4 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
            title="Remove filter"
          >
            <X className="size-3" />
          </button>
        </span>
      ))}

      {/* Add Filter Button & Popover */}
      <div ref={popoverRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-dashed px-2.5 py-0.5 text-xs font-medium text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors",
            isOpen && "border-primary text-primary"
          )}
        >
          <Plus className="size-3" />
          <span>Add filter</span>
        </button>

        {isOpen && (
          <form
            onSubmit={handleAddFilter}
            className="absolute left-0 top-full mt-2 z-50 w-72 rounded-xl border bg-card p-3 text-card-foreground shadow-xl animate-in fade-in-0 zoom-in-95 flex flex-col gap-2.5 bg-background"
          >
            <div className="font-semibold text-xs border-b pb-1 text-foreground">
              Add New Filter
            </div>

            {/* Field Select */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-muted-foreground font-medium">Field</label>
              <select
                value={selectedFieldKey}
                onChange={(e) => {
                  setSelectedFieldKey(e.target.value);
                  const f = fields.find((item) => item.key === e.target.value);
                  setSelectedOp(f?.operators?.[0] || "is");
                }}
                className="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50"
              >
                {fields.map((f) => (
                  <option key={f.key} value={f.key}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Operator */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-muted-foreground font-medium">Condition</label>
              <select
                value={selectedOp}
                onChange={(e) => setSelectedOp(e.target.value)}
                className="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50"
              >
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>

            {/* Value */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-muted-foreground font-medium">Value</label>
              {selectedField?.options ? (
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50"
                >
                  <option value="">Select value...</option>
                  {selectedField.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Enter filter value..."
                  className="rounded-md border bg-muted/20 px-2 py-1 text-xs outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                />
              )}
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-2 pt-1 border-t mt-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!filterValue.trim()}
                className="rounded-md bg-primary text-primary-foreground px-3 py-1 text-xs font-medium hover:bg-primary/90 disabled:opacity-40"
              >
                Apply
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Clear All */}
      {filters.length > 0 && (
        <button
          type="button"
          onClick={() => {
            onChange([]);
            onClearAll?.();
          }}
          className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
