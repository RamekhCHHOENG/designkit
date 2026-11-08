import * as React from "react";
import { Check, Copy, Columns2, Rows, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  oldLineNumber?: number;
  newLineNumber?: number;
  content: string;
}

export interface SplitDiffRow {
  left?: { line: number; content: string; type: "removed" | "unchanged" };
  right?: { line: number; content: string; type: "added" | "unchanged" };
}

export interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  oldValue: string;
  newValue: string;
  filename?: string;
  oldTitle?: string;
  newTitle?: string;
  viewMode?: "split" | "unified";
  showLineNumbers?: boolean;
}

// Simple LCS line diff algorithm
function computeLineDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const m = oldLines.length;
  const n = newLines.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (oldLines[i] === newLines[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = m;
  let j = n;

  const backtrack: DiffLine[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      backtrack.push({
        type: "unchanged",
        oldLineNumber: i,
        newLineNumber: j,
        content: oldLines[i - 1],
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      backtrack.push({
        type: "added",
        newLineNumber: j,
        content: newLines[j - 1],
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      backtrack.push({
        type: "removed",
        oldLineNumber: i,
        content: oldLines[i - 1],
      });
      i--;
    }
  }

  backtrack.reverse();
  return backtrack;
}

function buildSplitRows(lines: DiffLine[]): SplitDiffRow[] {
  const rows: SplitDiffRow[] = [];
  let idx = 0;

  while (idx < lines.length) {
    const cur = lines[idx];

    if (cur.type === "unchanged") {
      rows.push({
        left: { line: cur.oldLineNumber!, content: cur.content, type: "unchanged" },
        right: { line: cur.newLineNumber!, content: cur.content, type: "unchanged" },
      });
      idx++;
    } else if (cur.type === "removed") {
      // Look ahead for paired addition
      const next = lines[idx + 1];
      if (next && next.type === "added") {
        rows.push({
          left: { line: cur.oldLineNumber!, content: cur.content, type: "removed" },
          right: { line: next.newLineNumber!, content: next.content, type: "added" },
        });
        idx += 2;
      } else {
        rows.push({
          left: { line: cur.oldLineNumber!, content: cur.content, type: "removed" },
        });
        idx++;
      }
    } else {
      // Added
      rows.push({
        right: { line: cur.newLineNumber!, content: cur.content, type: "added" },
      });
      idx++;
    }
  }

  return rows;
}

export function DiffViewer({
  oldValue,
  newValue,
  filename,
  oldTitle = "Original",
  newTitle = "Modified",
  viewMode: initialViewMode = "split",
  showLineNumbers = true,
  className,
  ...props
}: DiffViewerProps) {
  const [viewMode, setViewMode] = React.useState<"split" | "unified">(initialViewMode);
  const [copied, setCopied] = React.useState(false);

  const diffLines = React.useMemo(
    () => computeLineDiff(oldValue, newValue),
    [oldValue, newValue]
  );

  const splitRows = React.useMemo(() => buildSplitRows(diffLines), [diffLines]);

  const stats = React.useMemo(() => {
    let additions = 0;
    let deletions = 0;
    for (const l of diffLines) {
      if (l.type === "added") additions++;
      if (l.type === "removed") deletions++;
    }
    return { additions, deletions };
  }, [diffLines]);

  const handleCopyNew = async () => {
    try {
      await navigator.clipboard.writeText(newValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {}
  };

  return (
    <div
      data-slot="diff-viewer"
      className={cn(
        "flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden text-xs font-mono",
        className
      )}
      {...props}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <FileCode2 className="size-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">
            {filename || "changes.diff"}
          </span>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-emerald-600 dark:text-emerald-400 font-semibold">
              +{stats.additions}
            </span>
            <span className="rounded bg-rose-500/10 px-1.5 py-0.2 text-rose-600 dark:text-rose-400 font-semibold">
              -{stats.deletions}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mode Switcher */}
          <div className="flex items-center rounded-lg border bg-background/60 p-0.5 text-xs">
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors",
                viewMode === "split"
                  ? "bg-muted font-medium text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Split side-by-side view"
              onClick={() => setViewMode("split")}
            >
              <Columns2 className="size-3.5" />
              <span className="hidden sm:inline">Split</span>
            </button>
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors",
                viewMode === "unified"
                  ? "bg-muted font-medium text-foreground shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Unified inline view"
              onClick={() => setViewMode("unified")}
            >
              <Rows className="size-3.5" />
              <span className="hidden sm:inline">Unified</span>
            </button>
          </div>

          {/* Copy modified code */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
            title="Copy modified content"
            onClick={handleCopyNew}
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Diff Table Stage */}
      <div className="overflow-x-auto bg-background">
        {viewMode === "split" ? (
          <table className="w-full border-collapse leading-relaxed">
            <thead className="border-b bg-muted/20 text-muted-foreground text-[11px] select-none">
              <tr>
                <th className="w-12 border-r px-2 py-1 text-right font-normal">#</th>
                <th className="w-1/2 border-r px-3 py-1 text-left font-medium">
                  {oldTitle}
                </th>
                <th className="w-12 border-r px-2 py-1 text-right font-normal">#</th>
                <th className="w-1/2 px-3 py-1 text-left font-medium">
                  {newTitle}
                </th>
              </tr>
            </thead>
            <tbody>
              {splitRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  {/* Left Column (Old) */}
                  <td
                    className={cn(
                      "w-12 select-none border-r px-2 py-0.5 text-right font-mono text-[11px]",
                      row.left?.type === "removed"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold"
                        : "text-muted-foreground/60 bg-muted/10"
                    )}
                  >
                    {showLineNumbers ? row.left?.line ?? "" : ""}
                  </td>
                  <td
                    className={cn(
                      "w-1/2 border-r px-3 py-0.5 whitespace-pre font-mono break-all",
                      row.left?.type === "removed"
                        ? "bg-rose-500/15 text-rose-900 dark:text-rose-200"
                        : "text-foreground"
                    )}
                  >
                    {row.left?.content ?? ""}
                  </td>

                  {/* Right Column (New) */}
                  <td
                    className={cn(
                      "w-12 select-none border-r px-2 py-0.5 text-right font-mono text-[11px]",
                      row.right?.type === "added"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-muted-foreground/60 bg-muted/10"
                    )}
                  >
                    {showLineNumbers ? row.right?.line ?? "" : ""}
                  </td>
                  <td
                    className={cn(
                      "w-1/2 px-3 py-0.5 whitespace-pre font-mono break-all",
                      row.right?.type === "added"
                        ? "bg-emerald-500/15 text-emerald-900 dark:text-emerald-200"
                        : "text-foreground"
                    )}
                  >
                    {row.right?.content ?? ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border-collapse leading-relaxed">
            <thead className="border-b bg-muted/20 text-muted-foreground text-[11px] select-none">
              <tr>
                <th className="w-10 border-r px-2 py-1 text-right font-normal">Old</th>
                <th className="w-10 border-r px-2 py-1 text-right font-normal">New</th>
                <th className="w-6 px-1 py-1 text-center font-normal">±</th>
                <th className="px-3 py-1 text-left font-medium">Content</th>
              </tr>
            </thead>
            <tbody>
              {diffLines.map((line, idx) => {
                const isAdded = line.type === "added";
                const isRemoved = line.type === "removed";
                return (
                  <tr
                    key={idx}
                    className={cn(
                      "transition-colors",
                      isAdded && "bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-950 dark:text-emerald-200",
                      isRemoved && "bg-rose-500/15 hover:bg-rose-500/20 text-rose-950 dark:text-rose-200",
                      !isAdded && !isRemoved && "hover:bg-muted/30 text-foreground"
                    )}
                  >
                    <td className="w-10 select-none border-r px-2 py-0.5 text-right font-mono text-[11px] text-muted-foreground/60">
                      {showLineNumbers ? line.oldLineNumber ?? "" : ""}
                    </td>
                    <td className="w-10 select-none border-r px-2 py-0.5 text-right font-mono text-[11px] text-muted-foreground/60">
                      {showLineNumbers ? line.newLineNumber ?? "" : ""}
                    </td>
                    <td className="w-6 select-none px-1 py-0.5 text-center font-semibold text-[11px]">
                      {isAdded ? "+" : isRemoved ? "-" : " "}
                    </td>
                    <td className="px-3 py-0.5 whitespace-pre font-mono break-all">
                      {line.content}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
