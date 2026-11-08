<script setup lang="ts">
import { ref } from "vue";
import { Tree, TreeItem, TreeItemLabel } from "@/registry/default/ui/tree";
import { FolderIcon, FileIcon } from "lucide-vue-next";

interface TreeNode {
  title: string;
  icon?: any;
  children?: TreeNode[];
}

const treeData: TreeNode[] = [
  {
    title: "src",
    icon: FolderIcon,
    children: [
      {
        title: "components",
        icon: FolderIcon,
        children: [
          { title: "Button.vue", icon: FileIcon },
          { title: "Dialog.vue", icon: FileIcon },
        ],
      },
      { title: "App.vue", icon: FileIcon },
      { title: "main.ts", icon: FileIcon },
    ],
  },
  {
    title: "public",
    icon: FolderIcon,
    children: [
      { title: "favicon.ico", icon: FileIcon },
      { title: "robots.txt", icon: FileIcon },
    ],
  },
  { title: "package.json", icon: FileIcon },
];

const selected = ref<TreeNode[]>([]);
</script>

<template>
  <div class="w-full max-w-sm rounded-lg border p-4">
    <Tree
      v-model="selected"
      :items="treeData"
      :get-key="(item: TreeNode) => item.title"
      :get-children="(item: TreeNode) => item.children"
      v-slot="{ flattenItems }"
    >
      <TreeItem
        v-for="item in flattenItems"
        :key="item._id"
        v-bind="item.bind"
        :has-children="item.hasChildren"
      >
        <TreeItemLabel :has-children="item.hasChildren">
          <component :is="item.value.icon" class="size-4 text-muted-foreground mr-1" />
          <span>{{ item.value.title }}</span>
        </TreeItemLabel>
      </TreeItem>
    </Tree>
  </div>
</template>
