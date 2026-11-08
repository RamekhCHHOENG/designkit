<script setup lang="ts">
import { ref } from "vue";
import { RichTextEditor } from "@/registry/default/ui/rich-text-editor";
import { Button } from "@/registry/default/ui/button";

const comment = ref("");
</script>

<template>
  <div class="w-full max-w-md flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm">
    <div class="flex items-center justify-between pb-1">
      <span class="text-xs font-semibold text-foreground">Post a Review</span>
      <span class="text-[11px] text-muted-foreground">Markdown supported</span>
    </div>

    <RichTextEditor
      v-model="comment"
      min-height="110px"
      placeholder="Share your thoughts with the team..."
      :show-word-count="false"
      :show-source-toggle="false"
    />

    <div class="flex items-center justify-end gap-2 pt-1">
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button size="sm" :disabled="!comment.trim()">Submit Review</Button>
    </div>
  </div>
</template>
