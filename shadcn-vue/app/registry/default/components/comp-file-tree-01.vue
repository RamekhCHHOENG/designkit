<script setup lang="ts">
import { FileTree } from "@/registry/default/ui/file-tree";

const treeData = [
  {
    id: "src",
    name: "src",
    type: "folder" as const,
    children: [
      {
        id: "components",
        name: "components",
        type: "folder" as const,
        children: [
          { id: "button.tsx", name: "button.tsx", type: "file" as const, badge: "UI" },
          { id: "dialog.tsx", name: "dialog.tsx", type: "file" as const, badge: "UI" },
          { id: "video-player.tsx", name: "video-player.tsx", type: "file" as const, badge: "New" },
        ],
      },
      { id: "main.ts", name: "main.ts", type: "file" as const },
      { id: "app.vue", name: "app.vue", type: "file" as const },
    ],
  },
  { id: "package.json", name: "package.json", type: "file" as const, badge: "JSON" },
  { id: "README.md", name: "README.md", type: "file" as const },
];
</script>

<template>
  <div class="w-full max-w-sm rounded-xl border bg-card p-4 shadow-xs">
    <FileTree :data="treeData" :default-expanded-keys="['src', 'components']" />
  </div>
</template>
