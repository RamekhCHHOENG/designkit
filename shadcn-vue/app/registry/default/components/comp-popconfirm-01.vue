<script setup lang="ts">
import { ref } from "vue";
import { Popconfirm } from "@/registry/default/ui/popconfirm";
import { Trash2Icon } from "lucide-vue-next";

const statusText = ref("Ready");
</script>

<template>
  <div class="flex items-center gap-3 p-2">
    <Popconfirm
      title="Delete project?"
      description="This action cannot be undone."
      variant="destructive"
      ok-text="Delete"
      @confirm="statusText = 'Deleted'"
    >
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-2xs"
      >
        <Trash2Icon class="size-3.5" />
        <span>Delete Project</span>
      </button>
    </Popconfirm>
    <span class="text-xs text-muted-foreground font-mono">{{ statusText }}</span>
  </div>
</template>
