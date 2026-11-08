<script setup lang="ts">
import { FileDropzone } from "@/registry/default/ui/file-dropzone";
</script>

<template>
  <div class="max-w-md p-6">
    <FileDropzone :max-files="3" accept="image/*,application/pdf" />
  </div>
</template>
