<script setup lang="ts">
import { DiffViewer } from "@/registry/default/ui/diff-viewer";

const oldConfig = `{
  "name": "designkit-app",
  "version": "1.0.0",
  "private": true
}`;

const newConfig = `{
  "name": "designkit-app",
  "version": "1.1.0",
  "private": true,
  "type": "module"
}`;
</script>

<template>
  <div class="w-full max-w-xl">
    <DiffViewer
      :old-value="oldConfig"
      :new-value="newConfig"
      filename="package.json"
      mode="unified"
    />
  </div>
</template>
