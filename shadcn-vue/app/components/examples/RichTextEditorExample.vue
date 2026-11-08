<script setup lang="ts">
import { ref } from "vue";
import { RichTextEditor } from "@/registry/default/ui/rich-text-editor";

const content = ref(
  `<h2>Project Milestone Overview</h2><p>DesignKit is expanding with advanced rich content editing, modern media playback, and fluid micro-interactions.</p><blockquote>"Great design is making something memorable and meaningful."</blockquote><ul><li>Clean typography hierarchy</li><li>Integrated markdown/source toggle</li><li>Real-time word &amp; character analytics</li></ul>`
);
</script>

<template>
  <div class="flex flex-col gap-4 w-full max-w-2xl p-4">
    <RichTextEditor
      v-model="content"
      min-height="180px"
      placeholder="Type notes or announcements..."
    />
  </div>
</template>
