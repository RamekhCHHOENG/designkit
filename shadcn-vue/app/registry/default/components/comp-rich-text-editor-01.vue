<script setup lang="ts">
import { ref } from "vue";
import { RichTextEditor } from "@/registry/default/ui/rich-text-editor";

const content = ref(
  `<h3>Design System Documentation</h3><p>DesignKit components are built with accessibility, strict TypeScript safety, and dual-framework parity across React and Vue.</p><ul><li>Unified OKLCH colors</li><li>Keyboard navigation</li><li>SSR hydration safe</li></ul>`
);
</script>

<template>
  <div class="w-full max-w-lg">
    <RichTextEditor
      v-model="content"
      min-height="160px"
      placeholder="Type document content..."
    />
  </div>
</template>
