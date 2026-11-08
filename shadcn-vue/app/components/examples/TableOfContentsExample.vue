<script setup lang="ts">
import { TableOfContents, type TocItem } from "@/registry/default/ui/table-of-contents";

const TOC_ITEMS: TocItem[] = [
  { id: "intro", title: "Introduction & Core Philosophy", level: 2 },
  { id: "installation", title: "Installation & Dependencies", level: 2 },
  { id: "tailwind", title: "Tailwind CSS v4 Configuration", level: 3 },
  { id: "base-ui", title: "Base UI Primitives Integration", level: 3 },
  { id: "theming", title: "OKLCH Theming & Design Tokens", level: 2 },
  { id: "troubleshooting", title: "Troubleshooting & FAQ", level: 2 },
];
</script>

<template>
  <div class="w-full max-w-sm p-4">
    <TableOfContents
      :items="TOC_ITEMS"
      active-id="tailwind"
      title="Documentation Index"
    />
  </div>
</template>
