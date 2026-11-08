<script setup lang="ts">
import { TableOfContents } from "@/registry/default/ui/table-of-contents";

const items = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "installation", text: "Installation", level: 2 },
  { id: "package-setup", text: "Package Setup", level: 3 },
  { id: "tokens", text: "Design Tokens", level: 3 },
  { id: "usage", text: "Usage Guidelines", level: 2 },
  { id: "accessibility", text: "Accessibility & Semantics", level: 2 },
];
</script>

<template>
  <div class="w-full max-w-sm rounded-xl border bg-card p-4 shadow-xs">
    <TableOfContents :items="items" active-id="package-setup" />
  </div>
</template>
