<script setup lang="ts">
import { ref } from "vue";
import { FileTree, type FileTreeNode } from "@/registry/default/ui/file-tree";

const MOCK_FILES: FileTreeNode[] = [
  {
    id: "src",
    name: "src",
    isFolder: true,
    children: [
      {
        id: "components",
        name: "components",
        isFolder: true,
        children: [
          { id: "button.vue", name: "button.vue", size: "2.4 KB" },
          { id: "dialog.vue", name: "dialog.vue", size: "4.1 KB" },
          { id: "diff-viewer.vue", name: "diff-viewer.vue", badge: "New", size: "5.8 KB" },
        ],
      },
      {
        id: "styles",
        name: "styles",
        isFolder: true,
        children: [{ id: "globals.css", name: "globals.css", size: "1.2 KB" }],
      },
      { id: "app.vue", name: "app.vue", size: "840 B" },
      { id: "schema.json", name: "schema.json", size: "3.2 KB" },
    ],
  },
  { id: "package.json", name: "package.json", size: "1.8 KB" },
  { id: "README.md", name: "README.md", size: "6.4 KB" },
];

const selected = ref("diff-viewer.vue");
</script>

<template>
  <div class="w-full max-w-sm p-4">
    <FileTree
      :data="MOCK_FILES"
      :selected-id="selected"
      :default-expanded-ids="['src', 'components']"
      @select="(n) => selected = n.id"
    />
  </div>
</template>
