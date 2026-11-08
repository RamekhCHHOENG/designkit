<script setup lang="ts">
import { ref, computed, type HTMLAttributes } from "vue";
import { Check, Copy, Columns2, Rows, FileCode2 } from "lucide-vue-next";
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

export interface DiffViewerProps {
  oldValue: string;
  newValue: string;
  filename?: string;
  oldTitle?: string;
  newTitle?: string;
  viewMode?: "split" | "unified";
  showLineNumbers?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<DiffViewerProps>(), {
  oldTitle: "Original",
  newTitle: "Modified",
  viewMode: "split",
  showLineNumbers: true,
});

const currentViewMode = ref<"split" | "unified">(props.viewMode);
const copied = ref(false);

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

const diffLines = computed(() => computeLineDiff(props.oldValue, props.newValue));

const splitRows = computed(() => {
  const lines = diffLines.value;
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
      rows.push({
        right: { line: cur.newLineNumber!, content: cur.content, type: "added" },
      });
      idx++;
    }
  }

  return rows;
});

const stats = computed(() => {
  let additions = 0;
  let deletions = 0;
  for (const l of diffLines.value) {
    if (l.type === "added") additions++;
    if (l.type === "removed") deletions++;
  }
  return { additions, deletions };
});

async function copyModified() {
  try {
    await navigator.clipboard.writeText(props.newValue);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (err) {}
}
</script>

<template>
  <div
    data-slot="diff-viewer"
    :class="
      cn(
        'flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden text-xs font-mono',
        props.class
      )
    "
  >
    <!-- Header Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-2.5">
      <div class="flex items-center gap-2.5">
        <FileCode2 class="size-4 text-muted-foreground" />
        <span class="font-semibold text-foreground">{{ filename || 'changes.diff' }}</span>
        <div class="flex items-center gap-1.5 text-[11px]">
          <span class="rounded bg-emerald-500/10 px-1.5 py-0.2 text-emerald-600 dark:text-emerald-400 font-semibold">
            +{{ stats.additions }}
          </span>
          <span class="rounded bg-rose-500/10 px-1.5 py-0.2 text-rose-600 dark:text-rose-400 font-semibold">
            -{{ stats.deletions }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <!-- Switcher -->
        <div class="flex items-center rounded-lg border bg-background/60 p-0.5 text-xs">
          <button
            type="button"
            :class="
              cn(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors',
                currentViewMode === 'split'
                  ? 'bg-muted font-medium text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              )
            "
            title="Split side-by-side view"
            @click="currentViewMode = 'split'"
          >
            <Columns2 class="size-3.5" />
            <span class="hidden sm:inline">Split</span>
          </button>
          <button
            type="button"
            :class="
              cn(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors',
                currentViewMode === 'unified'
                  ? 'bg-muted font-medium text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              )
            "
            title="Unified inline view"
            @click="currentViewMode = 'unified'"
          >
            <Rows class="size-3.5" />
            <span class="hidden sm:inline">Unified</span>
          </button>
        </div>

        <!-- Copy -->
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-2xs"
          title="Copy modified content"
          @click="copyModified"
        >
          <Check v-if="copied" class="size-3.5 text-emerald-500" />
          <Copy v-else class="size-3.5" />
          <span class="hidden sm:inline">{{ copied ? 'Copied' : 'Copy' }}</span>
        </button>
      </div>
    </div>

    <!-- Diff Content -->
    <div class="overflow-x-auto bg-background">
      <table v-if="currentViewMode === 'split'" class="w-full border-collapse leading-relaxed">
        <thead class="border-b bg-muted/20 text-muted-foreground text-[11px] select-none">
          <tr>
            <th class="w-12 border-r px-2 py-1 text-right font-normal">#</th>
            <th class="w-1/2 border-r px-3 py-1 text-left font-medium">{{ oldTitle }}</th>
            <th class="w-12 border-r px-2 py-1 text-right font-normal">#</th>
            <th class="w-1/2 px-3 py-1 text-left font-medium">{{ newTitle }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in splitRows" :key="idx" class="hover:bg-muted/30 transition-colors">
            <td
              :class="
                cn(
                  'w-12 select-none border-r px-2 py-0.5 text-right font-mono text-[11px]',
                  row.left?.type === 'removed'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold'
                    : 'text-muted-foreground/60 bg-muted/10'
                )
              "
            >
              {{ showLineNumbers ? row.left?.line ?? '' : '' }}
            </td>
            <td
              :class="
                cn(
                  'w-1/2 border-r px-3 py-0.5 whitespace-pre font-mono break-all',
                  row.left?.type === 'removed'
                    ? 'bg-rose-500/15 text-rose-900 dark:text-rose-200'
                    : 'text-foreground'
                )
              "
            >
              {{ row.left?.content ?? '' }}
            </td>

            <td
              :class="
                cn(
                  'w-12 select-none border-r px-2 py-0.5 text-right font-mono text-[11px]',
                  row.right?.type === 'added'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-muted-foreground/60 bg-muted/10'
                )
              "
            >
              {{ showLineNumbers ? row.right?.line ?? '' : '' }}
            </td>
            <td
              :class="
                cn(
                  'w-1/2 px-3 py-0.5 whitespace-pre font-mono break-all',
                  row.right?.type === 'added'
                    ? 'bg-emerald-500/15 text-emerald-900 dark:text-emerald-200'
                    : 'text-foreground'
                )
              "
            >
              {{ row.right?.content ?? '' }}
            </td>
          </tr>
        </tbody>
      </table>

      <table v-else class="w-full border-collapse leading-relaxed">
        <thead class="border-b bg-muted/20 text-muted-foreground text-[11px] select-none">
          <tr>
            <th class="w-10 border-r px-2 py-1 text-right font-normal">Old</th>
            <th class="w-10 border-r px-2 py-1 text-right font-normal">New</th>
            <th class="w-6 px-1 py-1 text-center font-normal">±</th>
            <th class="px-3 py-1 text-left font-medium">Content</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(line, idx) in diffLines"
            :key="idx"
            :class="
              cn(
                'transition-colors',
                line.type === 'added' && 'bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-950 dark:text-emerald-200',
                line.type === 'removed' && 'bg-rose-500/15 hover:bg-rose-500/20 text-rose-950 dark:text-rose-200',
                line.type === 'unchanged' && 'hover:bg-muted/30 text-foreground'
              )
            "
          >
            <td class="w-10 select-none border-r px-2 py-0.5 text-right font-mono text-[11px] text-muted-foreground/60">
              {{ showLineNumbers ? line.oldLineNumber ?? '' : '' }}
            </td>
            <td class="w-10 select-none border-r px-2 py-0.5 text-right font-mono text-[11px] text-muted-foreground/60">
              {{ showLineNumbers ? line.newLineNumber ?? '' : '' }}
            </td>
            <td class="w-6 select-none px-1 py-0.5 text-center font-semibold text-[11px]">
              {{ line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' ' }}
            </td>
            <td class="px-3 py-0.5 whitespace-pre font-mono break-all">
              {{ line.content }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
