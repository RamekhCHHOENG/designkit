<script setup lang="ts">
import { ref } from "vue";
import { Popconfirm } from "@/registry/default/ui/popconfirm";
import { Trash2Icon, ArchiveIcon } from "lucide-vue-next";

const statusText = ref("Ready");
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Popconfirm
      title="Delete this project?"
      description="This action cannot be undone and all associated artifacts will be removed."
      variant="destructive"
      ok-text="Delete"
      @confirm="statusText = 'Project deleted'"
    >
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-md bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-2xs"
      >
        <Trash2Icon class="size-3.5" />
        <span>Delete Project</span>
      </button>
    </Popconfirm>

    <Popconfirm
      title="Archive workspace?"
      description="Workspace will enter read-only mode for all collaborators."
      variant="warning"
      ok-text="Archive"
      @confirm="statusText = 'Workspace archived'"
    >
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors shadow-2xs"
      >
        <ArchiveIcon class="size-3.5" />
        <span>Archive</span>
      </button>
    </Popconfirm>

    <span class="text-xs text-muted-foreground font-mono">Status: {{ statusText }}</span>
  </div>
</template>
