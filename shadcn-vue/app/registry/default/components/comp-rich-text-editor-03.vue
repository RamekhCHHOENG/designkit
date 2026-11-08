<script setup lang="ts">
import { ref } from "vue";
import { RichTextEditor } from "@/registry/default/ui/rich-text-editor";
import { Badge } from "@/registry/default/ui/badge";

const notes = ref(
  `<h2>Release Notes v2.4.0</h2><blockquote>"Fluid animations with zero layout shift."</blockquote><p>We are delighted to introduce <strong>Icon Motion</strong> and <strong>Video Player</strong> primitives.</p>`
);
</script>

<template>
  <div class="w-full max-w-lg flex flex-col gap-2.5">
    <div class="flex items-center gap-2">
      <Badge variant="outline" class="text-xs">Changelog Entry</Badge>
      <span class="text-xs text-muted-foreground">Draft mode</span>
    </div>
    <RichTextEditor
      v-model="notes"
      min-height="150px"
      :show-word-count="true"
      :show-source-toggle="true"
    />
  </div>
</template>
