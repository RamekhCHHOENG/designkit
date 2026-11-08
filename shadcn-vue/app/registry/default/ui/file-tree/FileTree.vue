<script setup lang="ts">
import { ref, computed, watch, type HTMLAttributes } from "vue";
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
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface FileTreeNode {
  id: string;
  name: string;
  isFolder?: boolean;
  children?: FileTreeNode[];
  badge?: string;
  size?: string;
}

export interface FileTreeProps {
  data: FileTreeNode[];
  selectedId?: string;
  defaultExpandedIds?: string[];
  searchable?: boolean;
  title?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<FileTreeProps>(), {
  defaultExpandedIds: () => [],
  searchable: true,
  title: "Files",
});

const emit = defineEmits<{
  (e: "select", node: FileTreeNode): void;
}>();

const currentSelectedId = ref(props.selectedId || "");
const expandedIds = ref<Set<string>>(new Set(props.defaultExpandedIds));
const searchQuery = ref("");

function toggleFolder(id: string, e: MouseEvent) {
  e.stopPropagation();
  const next = new Set(expandedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  expandedIds.value = next;
}

function handleSelect(node: FileTreeNode) {
  currentSelectedId.value = node.id;
  emit("select", node);
}

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "vue":
      return FileCode2;
    case "json":
      return FileJson;
    case "md":
    case "mdx":
    case "txt":
      return FileText;
    case "css":
    case "scss":
      return Palette;
    case "svg":
    case "png":
    case "jpg":
    case "webp":
      return ImageIcon;
    default:
      return File;
  }
}

function getFileIconClass(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
    case "vue":
      return "text-blue-500";
    case "json":
      return "text-amber-500";
    case "md":
    case "mdx":
    case "txt":
      return "text-zinc-400";
    case "css":
    case "scss":
      return "text-pink-500";
    case "svg":
    case "png":
    case "jpg":
    case "webp":
      return "text-emerald-500";
    default:
      return "text-muted-foreground";
  }
}

const allFolderIds = computed(() => {
  const ids: string[] = [];
  function scan(nodes: FileTreeNode[]) {
    for (const n of nodes) {
      if (n.isFolder || n.children) {
        ids.push(n.id);
        if (n.children) scan(n.children);
      }
    }
  }
  scan(props.data);
  return ids;
});

function expandAll() {
  expandedIds.value = new Set(allFolderIds.value);
}

function collapseAll() {
  expandedIds.value = new Set();
}

const filteredData = computed(() => {
  if (!searchQuery.value.trim()) return props.data;
  const q = searchQuery.value.toLowerCase();

  function filterNodes(nodes: FileTreeNode[]): FileTreeNode[] {
    const res: FileTreeNode[] = [];
    for (const node of nodes) {
      if (node.isFolder && node.children) {
        const sub = filterNodes(node.children);
        if (sub.length > 0 || node.name.toLowerCase().includes(q)) {
          res.push({ ...node, children: sub });
        }
      } else if (node.name.toLowerCase().includes(q)) {
        res.push(node);
      }
    }
    return res;
  }
  return filterNodes(props.data);
});

watch(searchQuery, (newQ) => {
  if (newQ.trim()) expandAll();
});
</script>

<template>
  <div
    role="tree"
    data-slot="file-tree"
    :class="
      cn(
        'flex flex-col rounded-xl border bg-card text-card-foreground p-3 shadow-xs text-xs',
        props.class
      )
    "
  >
    <!-- Header -->
    <div class="flex items-center justify-between pb-2 mb-2 border-b">
      <span class="font-semibold text-foreground tracking-tight">{{ title }}</span>
      <button
        type="button"
        class="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        @click="expandedIds.size > 0 ? collapseAll() : expandAll()"
      >
        <ChevronsUpDown class="size-3" />
        <span>{{ expandedIds.size > 0 ? 'Collapse' : 'Expand' }}</span>
      </button>
    </div>

    <!-- Search -->
    <div v-if="searchable" class="relative mb-2">
      <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground/70" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search files…"
        class="w-full rounded-lg border bg-muted/30 pl-7 pr-3 py-1 text-xs outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-mono placeholder:font-sans"
      />
    </div>

    <!-- Tree Body -->
    <div class="max-h-80 overflow-auto">
      <ul v-if="filteredData.length > 0" class="flex flex-col gap-0.5">
        <template v-for="node in filteredData" :key="node.id">
          <!-- Recursive template -->
          <li class="select-none text-xs">
            <div
              role="treeitem"
              :aria-selected="currentSelectedId === node.id"
              :class="
                cn(
                  'flex items-center gap-1.5 rounded-md px-2 py-1 cursor-pointer transition-colors group',
                  currentSelectedId === node.id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )
              "
              @click="() => {
                if (node.isFolder || node.children) toggleFolder(node.id, $event as any);
                handleSelect(node);
              }"
            >
              <!-- Folder Chevron -->
              <button
                v-if="node.isFolder || node.children"
                type="button"
                class="p-0.5 hover:text-foreground transition-transform"
                @click.stop="(e) => toggleFolder(node.id, e)"
              >
                <ChevronRight
                  :class="
                    cn(
                      'size-3 shrink-0 transition-transform',
                      expandedIds.has(node.id) ? 'rotate-90' : ''
                    )
                  "
                />
              </button>
              <span v-else class="w-3" />

              <!-- Icon -->
              <div class="shrink-0">
                <template v-if="node.isFolder || node.children">
                  <FolderOpen
                    v-if="expandedIds.has(node.id)"
                    class="size-3.5 text-amber-500 fill-amber-500/20"
                  />
                  <Folder v-else class="size-3.5 text-amber-500 fill-amber-500/20" />
                </template>
                <component
                  :is="getFileIcon(node.name)"
                  v-else
                  :class="cn('size-3.5', getFileIconClass(node.name))"
                />
              </div>

              <!-- Name -->
              <span class="truncate flex-1 font-mono text-[11px]">{{ node.name }}</span>

              <!-- Badge / Size -->
              <span
                v-if="node.badge"
                :class="
                  cn(
                    'rounded px-1.5 py-0.2 text-[9px] font-sans uppercase tracking-wider font-semibold',
                    currentSelectedId === node.id
                      ? 'bg-white/20 text-white'
                      : 'bg-muted text-muted-foreground'
                  )
                "
              >
                {{ node.badge }}
              </span>
              <span
                v-if="node.size"
                :class="
                  cn(
                    'text-[10px] font-mono',
                    currentSelectedId === node.id ? 'text-white/80' : 'text-muted-foreground/60'
                  )
                "
              >
                {{ node.size }}
              </span>
            </div>

            <!-- Sub tree -->
            <div
              v-if="(node.isFolder || node.children) && expandedIds.has(node.id) && node.children"
              class="relative pl-3.5 border-l border-border/40 ml-2 mt-0.5"
            >
              <ul class="flex flex-col gap-0.5">
                <li
                  v-for="subNode in node.children"
                  :key="subNode.id"
                  :class="
                    cn(
                      'flex items-center gap-1.5 rounded-md px-2 py-1 cursor-pointer transition-colors group select-none',
                      currentSelectedId === subNode.id
                        ? 'bg-primary text-primary-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )
                  "
                  @click="handleSelect(subNode)"
                >
                  <component
                    :is="getFileIcon(subNode.name)"
                    :class="cn('size-3.5 shrink-0', getFileIconClass(subNode.name))"
                  />
                  <span class="truncate flex-1 font-mono text-[11px]">{{ subNode.name }}</span>
                  <span v-if="subNode.size" class="text-[10px] font-mono text-muted-foreground/60">
                    {{ subNode.size }}
                  </span>
                </li>
              </ul>
            </div>
          </li>
        </template>
      </ul>

      <div v-else class="py-6 text-center text-xs text-muted-foreground">
        No files found for "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>
