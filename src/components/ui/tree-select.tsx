import * as React from "react";
import { ChevronDown, ChevronRight, Folder, File, Check, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TreeSelectNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeSelectNode[];
  disabled?: boolean;
}

export interface TreeSelectProps {
  treeData: TreeSelectNode[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TreeSelect({
  treeData,
  value: controlledValue,
  defaultValue,
  onValueChange,
  multiple = false,
  searchable = true,
  clearable = true,
  placeholder = "Select an item...",
  disabled = false,
  className,
}: TreeSelectProps) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue ?? (multiple ? [] : "")
  );
  const selectedValues = React.useMemo<string[]>(() => {
    const raw = isControlled ? controlledValue : internalValue;
    if (!raw) return [];
    return Array.isArray(raw) ? raw : [raw];
  }, [isControlled, controlledValue, internalValue]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(() => {
    // Default expand root nodes
    return new Set(treeData.map((n) => n.id));
  });

  const containerRef = React.useRef<HTMLDivElement>(null);

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

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectNode = (node: TreeSelectNode) => {
    if (node.disabled) return;

    if (multiple) {
      const exists = selectedValues.includes(node.id);
      const next = exists
        ? selectedValues.filter((id) => id !== node.id)
        : [...selectedValues, node.id];
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    } else {
      if (!isControlled) setInternalValue(node.id);
      onValueChange?.(node.id);
      setIsOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = multiple ? [] : "";
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  // Find label for single value display
  const findNodeLabel = (nodes: TreeSelectNode[], id: string): string | null => {
    for (const n of nodes) {
      if (n.id === id) return n.label;
      if (n.children) {
        const found = findNodeLabel(n.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Filter nodes matching search query
  const filterNodes = (nodes: TreeSelectNode[], q: string): TreeSelectNode[] => {
    if (!q.trim()) return nodes;
    const lower = q.toLowerCase();

    return nodes
      .map((node) => {
        const matchesCurrent = node.label.toLowerCase().includes(lower);
        const filteredChildren = node.children ? filterNodes(node.children, q) : [];
        if (matchesCurrent || filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
          };
        }
        return null;
      })
      .filter(Boolean) as TreeSelectNode[];
  };

  const displayedNodes = React.useMemo(() => {
    return filterNodes(treeData, searchQuery);
  }, [treeData, searchQuery]);

  const renderNode = (node: TreeSelectNode, level: number = 0) => {
    const hasChildren = Boolean(node.children && node.children.length > 0);
    const isExpanded = expandedIds.has(node.id) || Boolean(searchQuery.trim());
    const isSelected = selectedValues.includes(node.id);

    return (
      <div key={node.id} className="select-none text-xs">
        <div
          onClick={() => handleSelectNode(node)}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          className={cn(
            "flex items-center justify-between rounded-md py-1.5 pr-2 transition-colors cursor-pointer",
            isSelected ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground",
            node.disabled && "opacity-50 pointer-events-none"
          )}
        >
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => toggleExpand(node.id, e)}
                className="size-4 shrink-0 rounded flex items-center justify-center hover:bg-muted-foreground/20 text-muted-foreground"
              >
                <ChevronRight
                  className={cn("size-3.5 transition-transform duration-150", isExpanded && "rotate-90")}
                />
              </button>
            ) : (
              <span className="size-4 shrink-0" />
            )}

            {node.icon || (hasChildren ? <Folder className="size-3.5 text-muted-foreground shrink-0" /> : <File className="size-3.5 text-muted-foreground shrink-0" />)}

            <span className="truncate">{node.label}</span>
          </div>

          {isSelected && <Check className="size-3.5 text-primary shrink-0 ml-2" />}
        </div>

        {hasChildren && isExpanded && (
          <div className="border-l border-border/40 ml-3.5">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full sm:w-72", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-1.5 text-sm shadow-xs transition-colors text-start",
          "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 min-w-0 pr-2">
          {selectedValues.length === 0 ? (
            <span className="text-xs text-muted-foreground">{placeholder}</span>
          ) : multiple ? (
            selectedValues.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
              >
                {findNodeLabel(treeData, id) || id}
              </span>
            ))
          ) : (
            <span className="text-xs font-medium text-foreground truncate">
              {findNodeLabel(treeData, selectedValues[0]) || selectedValues[0]}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {clearable && selectedValues.length > 0 && !disabled && (
            <span
              onClick={handleClear}
              className="rounded p-0.5 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn("size-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-64 max-h-72 overflow-y-auto rounded-lg border bg-popover p-2 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          {searchable && (
            <div className="relative mb-2 flex items-center border-b pb-2">
              <Search className="size-3.5 text-muted-foreground absolute left-2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search nodes..."
                className="w-full bg-transparent pl-7 pr-2 py-0.5 text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
          )}

          <div className="space-y-0.5">
            {displayedNodes.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground">No matching nodes</div>
            ) : (
              displayedNodes.map((node) => renderNode(node, 0))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
