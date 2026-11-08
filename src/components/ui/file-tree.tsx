import * as React from "react";
import {
  Folder,
  FolderOpen,
  File,
  FileCode2,
  FileJson,
  FileText,
  Image as ImageIcon,
  Palette,
  ChevronRight,
  Search,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileTreeNode {
  id: string;
  name: string;
  isFolder?: boolean;
  children?: FileTreeNode[];
  icon?: React.ReactNode;
  badge?: string;
  size?: string;
}

export interface FileTreeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  data: FileTreeNode[];
  selectedId?: string;
  onSelect?: (node: FileTreeNode) => void;
  defaultExpandedIds?: string[];
  searchable?: boolean;
  title?: string;
}

function getFileIcon(name: string): React.ReactNode {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "vue":
      return <FileCode2 className="size-3.5 text-blue-500" />;
    case "json":
      return <FileJson className="size-3.5 text-amber-500" />;
    case "md":
    case "mdx":
    case "txt":
      return <FileText className="size-3.5 text-zinc-400" />;
    case "css":
    case "scss":
      return <Palette className="size-3.5 text-pink-500" />;
    case "svg":
    case "png":
    case "jpg":
    case "webp":
      return <ImageIcon className="size-3.5 text-emerald-500" />;
    default:
      return <File className="size-3.5 text-muted-foreground" />;
  }
}

export function FileTree({
  data,
  selectedId: controlledSelectedId,
  onSelect,
  defaultExpandedIds = [],
  searchable = true,
  title = "Files",
  className,
  ...props
}: FileTreeProps) {
  const [selectedId, setSelectedId] = React.useState<string>(
    controlledSelectedId ?? ""
  );
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(defaultExpandedIds)
  );
  const [searchQuery, setSearchQuery] = React.useState("");

  const activeSelectedId = controlledSelectedId ?? selectedId;

  const toggleFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelect = (node: FileTreeNode) => {
    setSelectedId(node.id);
    onSelect?.(node);
  };

  // Collect all folder IDs
  const allFolderIds = React.useMemo(() => {
    const ids: string[] = [];
    function scan(nodes: FileTreeNode[]) {
      for (const n of nodes) {
        if (n.isFolder || n.children) {
          ids.push(n.id);
          if (n.children) scan(n.children);
        }
      }
    }
    scan(data);
    return ids;
  }, [data]);

  const expandAll = () => setExpandedIds(new Set(allFolderIds));
  const collapseAll = () => setExpandedIds(new Set());

  // Filter tree nodes if search query is active
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();

    function filterNodes(nodes: FileTreeNode[]): FileTreeNode[] {
      const results: FileTreeNode[] = [];
      for (const node of nodes) {
        if (node.isFolder && node.children) {
          const matchingChildren = filterNodes(node.children);
          if (
            matchingChildren.length > 0 ||
            node.name.toLowerCase().includes(query)
          ) {
            results.push({ ...node, children: matchingChildren });
          }
        } else if (node.name.toLowerCase().includes(query)) {
          results.push(node);
        }
      }
      return results;
    }

    return filterNodes(data);
  }, [data, searchQuery]);

  // Auto-expand all when searching
  React.useEffect(() => {
    if (searchQuery.trim()) {
      expandAll();
    }
  }, [searchQuery]);

  const renderTree = (nodes: FileTreeNode[], depth = 0) => {
    return (
      <ul className="flex flex-col gap-0.5">
        {nodes.map((node) => {
          const isFolder = node.isFolder || Boolean(node.children);
          const isExpanded = expandedIds.has(node.id);
          const isSelected = activeSelectedId === node.id;

          return (
            <li key={node.id} className="select-none text-xs">
              <div
                role="treeitem"
                aria-selected={isSelected}
                tabIndex={0}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2 py-1 cursor-pointer transition-colors group",
                  isSelected
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                style={{ paddingLeft: `${depth * 14 + 8}px` }}
                onClick={() => {
                  if (isFolder) {
                    toggleFolder(node.id, {} as any);
                  }
                  handleSelect(node);
                }}
              >
                {/* Chevron for folder */}
                {isFolder ? (
                  <button
                    type="button"
                    className="p-0.5 hover:text-foreground transition-transform"
                    onClick={(e) => toggleFolder(node.id, e)}
                  >
                    <ChevronRight
                      className={cn(
                        "size-3 shrink-0 transition-transform",
                        isExpanded ? "rotate-90" : ""
                      )}
                    />
                  </button>
                ) : (
                  <span className="w-3" />
                )}

                {/* Node Icon */}
                <div className="shrink-0">
                  {node.icon ? (
                    node.icon
                  ) : isFolder ? (
                    isExpanded ? (
                      <FolderOpen className="size-3.5 text-amber-500 fill-amber-500/20" />
                    ) : (
                      <Folder className="size-3.5 text-amber-500 fill-amber-500/20" />
                    )
                  ) : (
                    getFileIcon(node.name)
                  )}
                </div>

                {/* Name */}
                <span className="truncate flex-1 font-mono text-[11px]">
                  {node.name}
                </span>

                {/* Badge or Size */}
                {node.badge && (
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.2 text-[9px] font-sans uppercase tracking-wider font-semibold",
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {node.badge}
                  </span>
                )}
                {node.size && (
                  <span
                    className={cn(
                      "text-[10px] font-mono",
                      isSelected ? "text-white/80" : "text-muted-foreground/60"
                    )}
                  >
                    {node.size}
                  </span>
                )}
              </div>

              {/* Children */}
              {isFolder && isExpanded && node.children && (
                <div className="relative">
                  <div
                    className="absolute left-0 top-0 bottom-0 border-l border-border/40"
                    style={{ left: `${depth * 14 + 14}px` }}
                  />
                  {renderTree(node.children, depth + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      role="tree"
      data-slot="file-tree"
      className={cn(
        "flex flex-col rounded-xl border bg-card text-card-foreground p-3 shadow-xs",
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b">
        <span className="text-xs font-semibold text-foreground tracking-tight">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Expand / Collapse All"
            onClick={expandedIds.size > 0 ? collapseAll : expandAll}
          >
            <ChevronsUpDown className="size-3" />
            <span>{expandedIds.size > 0 ? "Collapse" : "Expand"}</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      {searchable && (
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files…"
            className="w-full rounded-lg border bg-muted/30 pl-7 pr-3 py-1 text-xs outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-mono placeholder:font-sans"
          />
        </div>
      )}

      {/* Files List */}
      <div className="max-h-80 overflow-auto">
        {filteredData.length > 0 ? (
          renderTree(filteredData)
        ) : (
          <div className="py-6 text-center text-xs text-muted-foreground">
            No files found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}
