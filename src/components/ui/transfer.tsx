import * as React from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface TransferProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  dataSource: TransferItem[];
  targetKeys: string[]; // Keys in right list
  onChange?: (targetKeys: string[], direction: "left" | "right", moveKeys: string[]) => void;
  titles?: [string, string];
  searchable?: boolean;
}

export function Transfer({
  dataSource,
  targetKeys,
  onChange,
  titles = ["Available", "Selected"],
  searchable = true,
  className,
  ...props
}: TransferProps) {
  const [selectedLeft, setSelectedLeft] = React.useState<Set<string>>(new Set());
  const [selectedRight, setSelectedRight] = React.useState<Set<string>>(new Set());
  const [searchLeft, setSearchLeft] = React.useState("");
  const [searchRight, setSearchRight] = React.useState("");

  const targetSet = React.useMemo(() => new Set(targetKeys), [targetKeys]);

  const leftItems = React.useMemo(
    () => dataSource.filter((item) => !targetSet.has(item.key)),
    [dataSource, targetSet]
  );

  const rightItems = React.useMemo(
    () => dataSource.filter((item) => targetSet.has(item.key)),
    [dataSource, targetSet]
  );

  const filteredLeft = React.useMemo(() => {
    if (!searchLeft.trim()) return leftItems;
    const q = searchLeft.toLowerCase();
    return leftItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [leftItems, searchLeft]);

  const filteredRight = React.useMemo(() => {
    if (!searchRight.trim()) return rightItems;
    const q = searchRight.toLowerCase();
    return rightItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [rightItems, searchRight]);

  const toggleLeftItem = (key: string) => {
    setSelectedLeft((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleRightItem = (key: string) => {
    setSelectedRight((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const moveRight = () => {
    const moveKeys = Array.from(selectedLeft);
    if (moveKeys.length === 0) return;
    const nextTargetKeys = [...targetKeys, ...moveKeys];
    setSelectedLeft(new Set());
    onChange?.(nextTargetKeys, "right", moveKeys);
  };

  const moveLeft = () => {
    const moveKeys = Array.from(selectedRight);
    if (moveKeys.length === 0) return;
    const moveSet = new Set(moveKeys);
    const nextTargetKeys = targetKeys.filter((k) => !moveSet.has(k));
    setSelectedRight(new Set());
    onChange?.(nextTargetKeys, "left", moveKeys);
  };

  const moveAllRight = () => {
    const moveKeys = leftItems.map((i) => i.key);
    const nextTargetKeys = [...targetKeys, ...moveKeys];
    setSelectedLeft(new Set());
    onChange?.(nextTargetKeys, "right", moveKeys);
  };

  const moveAllLeft = () => {
    setSelectedRight(new Set());
    onChange?.([], "left", targetKeys);
  };

  const renderPanel = (
    panelTitle: string,
    items: TransferItem[],
    selectedSet: Set<string>,
    toggleFn: (key: string) => void,
    searchValue: string,
    setSearchFn: (v: string) => void
  ) => {
    return (
      <div className="flex flex-1 flex-col rounded-xl border bg-card text-card-foreground shadow-xs overflow-hidden min-w-[200px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-2 text-xs font-semibold">
          <span>{panelTitle}</span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {selectedSet.size}/{items.length}
          </span>
        </div>

        {/* Search */}
        {searchable && (
          <div className="relative border-b p-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchFn(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-md border bg-muted/20 pl-7 pr-2 py-1 text-xs outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
          </div>
        )}

        {/* List */}
        <ul className="flex-1 max-h-56 overflow-auto p-1.5 flex flex-col gap-0.5">
          {items.length > 0 ? (
            items.map((item) => {
              const isChecked = selectedSet.has(item.key);
              return (
                <li
                  key={item.key}
                  onClick={() => !item.disabled && toggleFn(item.key)}
                  className={cn(
                    "flex items-start gap-2.5 rounded-lg px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors",
                    item.disabled && "opacity-40 cursor-not-allowed",
                    isChecked
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={item.disabled}
                    onChange={() => {}}
                    className="mt-0.5 size-3.5 rounded border-muted-foreground/40 accent-primary cursor-pointer"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{item.title}</span>
                    {item.description && (
                      <span className="text-[10px] text-muted-foreground truncate">
                        {item.description}
                      </span>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No items
            </div>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div
      data-slot="transfer"
      className={cn("flex items-center gap-3 w-full max-w-2xl", className)}
      {...props}
    >
      {/* Left List */}
      {renderPanel(
        titles[0],
        filteredLeft,
        selectedLeft,
        toggleLeftItem,
        searchLeft,
        setSearchLeft
      )}

      {/* Center Actions */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <button
          type="button"
          disabled={leftItems.length === 0}
          onClick={moveAllRight}
          title="Move all right"
          className="flex size-7 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        >
          <ChevronsRight className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={selectedLeft.size === 0}
          onClick={moveRight}
          title="Move selected right"
          className="flex size-7 items-center justify-center rounded-lg border bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        >
          <ChevronRight className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={selectedRight.size === 0}
          onClick={moveLeft}
          title="Move selected left"
          className="flex size-7 items-center justify-center rounded-lg border bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        >
          <ChevronLeft className="size-3.5" />
        </button>
        <button
          type="button"
          disabled={rightItems.length === 0}
          onClick={moveAllLeft}
          title="Move all left"
          className="flex size-7 items-center justify-center rounded-lg border bg-background text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-all shadow-2xs"
        >
          <ChevronsLeft className="size-3.5" />
        </button>
      </div>

      {/* Right List */}
      {renderPanel(
        titles[1],
        filteredRight,
        selectedRight,
        toggleRightItem,
        searchRight,
        setSearchRight
      )}
    </div>
  );
}
