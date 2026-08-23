<script setup lang="ts">
import type { WorkspaceProject } from "~/types/workspace";
import { Card } from "~/registry/default/ui/card";
import { Badge } from "~/registry/default/ui/badge";

const props = defineProps<{
  projects: WorkspaceProject[];
}>();

const totalProjects = computed(() => props.projects.length);

const activeProjects = computed(() => {
  return props.projects.filter(p => p.status === "Active" || p.status === "In Progress" || p.status === "Production").length;
});

const productionProjects = computed(() => {
  return props.projects.filter(p => p.status === "Production").length;
});

const averageProgress = computed(() => {
  if (!props.projects.length) return 0;
  const total = props.projects.reduce((sum, p) => sum + p.progress, 0);
  return Math.round(total / props.projects.length);
});

const totalGraphNodes = computed(() => {
  return props.projects.reduce((sum, p) => sum + (p.graphStats?.nodes || 0), 0);
});
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-card/80 via-card/50 to-muted/20 p-6 md:p-8 backdrop-blur shadow-sm">
    <!-- Background Glow Effect -->
    <div class="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/10 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-emerald-500/10 blur-3xl" />

    <div class="relative flex flex-col gap-6">
      <!-- Title & Intro -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <Badge variant="outline" class="border-primary/30 bg-primary/10 text-primary gap-1.5 text-xs font-semibold py-1">
              <span class="size-2 rounded-full bg-emerald-500 animate-pulse" />
              AGI Assistant Monorepo
            </Badge>
            <Badge variant="secondary" class="font-mono text-xs">
              27 Repos Synced
            </Badge>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Workspace Project Portfolio & Progress
          </h1>
          <p class="text-xs md:text-sm text-muted-foreground max-w-2xl">
            Live visualization of all application projects, microservices, mobile apps, and shared infrastructure built with the monorepo architecture.
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <div class="flex items-center gap-1.5 rounded-lg border bg-background/80 px-3 py-2 text-xs">
            <Icon name="lucide:git-graph" class="size-4 text-primary" />
            <div>
              <span class="text-[10px] text-muted-foreground block leading-none">Graphify Index</span>
              <span class="font-mono font-bold text-foreground">157,344 nodes</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div class="flex flex-col gap-1 rounded-xl border bg-background/60 p-3.5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-medium">Total Projects</span>
            <Icon name="lucide:folder-git-2" class="size-4 text-primary" />
          </div>
          <span class="text-2xl font-bold tracking-tight">{{ totalProjects }}</span>
          <span class="text-[11px] text-muted-foreground">Across flat monorepo</span>
        </div>

        <div class="flex flex-col gap-1 rounded-xl border bg-background/60 p-3.5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-medium">Active / In Progress</span>
            <Icon name="lucide:activity" class="size-4 text-emerald-500" />
          </div>
          <span class="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            {{ activeProjects }}
          </span>
          <span class="text-[11px] text-muted-foreground">{{ productionProjects }} in production</span>
        </div>

        <div class="flex flex-col gap-1 rounded-xl border bg-background/60 p-3.5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-medium">Average Progress</span>
            <Icon name="lucide:trending-up" class="size-4 text-blue-500" />
          </div>
          <span class="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            {{ averageProgress }}%
          </span>
          <span class="text-[11px] text-muted-foreground">Milestone completion</span>
        </div>

        <div class="flex flex-col gap-1 rounded-xl border bg-background/60 p-3.5 backdrop-blur-sm">
          <div class="flex items-center justify-between text-muted-foreground">
            <span class="text-xs font-medium">Knowledge Graph</span>
            <Icon name="lucide:cpu" class="size-4 text-violet-500" />
          </div>
          <span class="text-2xl font-bold tracking-tight text-violet-600 dark:text-violet-400 font-mono">
            {{ (totalGraphNodes / 1000).toFixed(0) }}k+
          </span>
          <span class="text-[11px] text-muted-foreground">Extracted AST symbols</span>
        </div>
      </div>
    </div>
  </div>
</template>
