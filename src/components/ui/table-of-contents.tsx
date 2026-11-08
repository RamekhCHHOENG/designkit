import * as React from "react";
import { ListTree, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
  level: number; // 2 for H2, 3 for H3, etc.
}

export interface TableOfContentsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: TocItem[];
  containerSelector?: string;
  activeId?: string;
  onItemClick?: (id: string) => void;
  title?: string;
  showProgress?: boolean;
}

export function TableOfContents({
  items: userItems,
  containerSelector,
  activeId: controlledActiveId,
  onItemClick,
  title = "On this page",
  showProgress = true,
  className,
  ...props
}: TableOfContentsProps) {
  const [internalItems, setInternalItems] = React.useState<TocItem[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");
  const [readingProgress, setReadingProgress] = React.useState(0);

  const items = userItems ?? internalItems;
  const currentActiveId = controlledActiveId ?? activeId;

  // Auto-scan headings from containerSelector if items are not passed
  React.useEffect(() => {
    if (userItems && userItems.length > 0) return;
    if (typeof window === "undefined") return;

    const root = containerSelector
      ? document.querySelector(containerSelector)
      : document.querySelector("main") || document.body;

    if (!root) return;

    const headings = root.querySelectorAll("h2, h3, h4");
    const scanned: TocItem[] = [];

    headings.forEach((el, index) => {
      const id = el.id || `heading-${index}`;
      if (!el.id) el.id = id;
      const level = parseInt(el.tagName[1], 10);
      scanned.push({
        id,
        title: el.textContent || `Section ${index + 1}`,
        level,
      });
    });

    setInternalItems(scanned);
  }, [userItems, containerSelector]);

  // Track active heading via IntersectionObserver & scroll progress
  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      items.length === 0
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const current = window.scrollY;
        setReadingProgress(Math.min(100, Math.max(0, (current / total) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const scrollToId = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // Account for fixed header
      const y =
        el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      onItemClick?.(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      data-slot="table-of-contents"
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card/60 p-4 text-xs backdrop-blur-md shadow-2xs",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <ListTree className="size-3.5 text-primary" />
          <span>{title}</span>
        </div>
        {showProgress && (
          <span className="font-mono text-[10px] text-muted-foreground">
            {Math.round(readingProgress)}%
          </span>
        )}
      </div>

      {/* Reading Progress Line */}
      {showProgress && (
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {/* Headings List */}
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = currentActiveId === item.id;
          const indent =
            item.level === 3 ? "pl-3" : item.level >= 4 ? "pl-6" : "pl-0";

          return (
            <li key={item.id} className={cn("relative", indent)}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToId(item.id, e)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2 py-1 transition-all group",
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <ChevronRight
                  className={cn(
                    "size-3 shrink-0 transition-transform",
                    isActive
                      ? "text-primary rotate-90"
                      : "text-muted-foreground/40 group-hover:translate-x-0.5"
                  )}
                />
                <span className="truncate">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
