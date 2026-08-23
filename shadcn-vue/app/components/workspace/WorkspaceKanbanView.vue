<script setup lang="ts">
import type { WorkspaceProject, ProjectStatus } from "~/types/workspace";
import WorkspaceProjectCard from "./WorkspaceProjectCard.vue";
import { Badge } from "~/registry/default/ui/badge";

const props = defineProps<{
  projects: WorkspaceProject[];
}>();

const emit = defineEmits<{
  (e: "select", project: WorkspaceProject): void;
}>();

const columns: { status: ProjectStatus; title: string; color: string; desc: string }[] = [
  { status: "Prototype", title: "Prototype & Research", color: "border-violet-500/30 bg-violet-500/5", desc: "Proof of concepts & experiments" },
  { status: "In Progress", title: "In Active Development", color: "border-amber-500/30 bg-amber-500/5", desc: "Under construction" },
  { status: "Active", title: "Feature Complete / Testing", color: "border-blue-500/30 bg-blue-500/5", desc: "Refining & staging" },
  { status: "Production", title: "Production / Stable", color: "border-emerald-500/30 bg-emerald-500/5", desc: "Deployed & live" },
];

function getProjectsForStatus(status: ProjectStatus) {
  return props.projects.filter(p => p.status === status);
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
    <div
      v-for="col in columns"
      :key="col.status"
      class="flex flex-col gap-3 rounded-xl border p-3.5 bg-muted/20"
      :class="col.color"
    >
      <!-- Column Header -->
      <div class="flex items-center justify-between pb-2 border-b border-border/40">
        <div>
          <h3 class="font-semibold text-sm">{{ col.title }}</h3>
          <p class="text-[11px] text-muted-foreground">{{ col.desc }}</p>
        </div>
        <Badge variant="secondary" class="font-mono text-xs">
          {{ getProjectsForStatus(col.status).length }}
        </Badge>
      </div>

      <!-- Project Cards List -->
      <div class="flex flex-col gap-3 min-h-[200px]">
        <WorkspaceProjectCard
          v-for="project in getProjectsForStatus(col.status)"
          :key="project.id"
          :project="project"
          @select="emit('select', $event)"
        />

        <div
          v-if="getProjectsForStatus(col.status).length === 0"
          class="flex flex-1 items-center justify-center rounded-lg border border-dashed p-6 text-center text-xs text-muted-foreground"
        >
          No projects in this stage
        </div>
      </div>
    </div>
  </div>
</template>
