<script setup lang="ts">
import { workspaceProjects } from "~/config/workspace-projects";
import type { WorkspaceProject, ProjectCategory, ProjectStatus } from "~/types/workspace";
import WorkspaceStatsHero from "~/components/workspace/WorkspaceStatsHero.vue";
import WorkspaceProjectCard from "~/components/workspace/WorkspaceProjectCard.vue";
import WorkspaceProjectModal from "~/components/workspace/WorkspaceProjectModal.vue";
import WorkspaceKanbanView from "~/components/workspace/WorkspaceKanbanView.vue";
import WorkspaceArchMatrix from "~/components/workspace/WorkspaceArchMatrix.vue";
import { Button } from "~/registry/default/ui/button";
import { Input } from "~/registry/default/ui/input";
import { Badge } from "~/registry/default/ui/badge";

useSeoMeta({
  title: "Workspace Projects & Progress — DesignKit",
  description: "Interactive project tracker and portfolio for all 27 applications and microservices in the AGI Assistant workspace.",
});

const searchQuery = ref("");
const selectedCategory = ref<string>("All");
const selectedStatus = ref<string>("All");
const sortBy = ref<"progress-desc" | "progress-asc" | "name" | "nodes">("progress-desc");
const viewMode = ref<"grid" | "kanban" | "matrix">("grid");

const selectedProject = ref<WorkspaceProject | null>(null);
const modalOpen = ref(false);

function handleSelectProject(project: WorkspaceProject) {
  selectedProject.value = project;
  modalOpen.value = true;
}

const categories: string[] = [
  "All",
  "Full-Stack",
  "Backend & API",
  "Mobile App",
  "DevOps & Infra",
  "AI & Agents",
  "UI & Components",
  "Tools & Productivity",
];

const filteredProjects = computed(() => {
  return workspaceProjects.filter((project) => {
    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const matchName = project.name.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchPath = project.path.toLowerCase().includes(q);
      const matchTech = Object.values(project.techStack)
        .flat()
        .some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchPath && !matchTech) return false;
    }

    // Category
    if (selectedCategory.value !== "All" && project.category !== selectedCategory.value) {
      return false;
    }

    // Status
    if (selectedStatus.value !== "All" && project.status !== selectedStatus.value) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy.value === "progress-desc") return b.progress - a.progress;
    if (sortBy.value === "progress-asc") return a.progress - b.progress;
    if (sortBy.value === "name") return a.name.localeCompare(b.name);
    if (sortBy.value === "nodes") return b.graphStats.nodes - a.graphStats.nodes;
    return 0;
  });
});
</script>

<template>
  <div class="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 py-8">
    <!-- Hero & Overall Statistics -->
    <WorkspaceStatsHero :projects="workspaceProjects" />

    <!-- Navigation & Filter Bar -->
    <div class="flex flex-col gap-4 rounded-xl border bg-card/50 p-4 backdrop-blur-sm shadow-sm">
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search projects, stack (React, FastAPI, Rust), or paths..."
            class="h-9 w-full rounded-lg border border-input bg-background/80 pl-9 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            @click="searchQuery = ''"
          >
            <Icon name="lucide:x" class="size-3.5" />
          </button>
        </div>

        <!-- Controls: View Switcher & Sort -->
        <div class="flex items-center gap-2 flex-wrap">
          <!-- View switcher -->
          <div class="flex items-center rounded-lg border bg-muted/40 p-0.5">
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
              :class="viewMode === 'grid' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
              @click="viewMode = 'grid'"
            >
              <Icon name="lucide:layout-grid" class="size-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
              :class="viewMode === 'kanban' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
              @click="viewMode = 'kanban'"
            >
              <Icon name="lucide:kanban" class="size-3.5" />
              <span>Kanban</span>
            </button>
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
              :class="viewMode === 'matrix' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'"
              @click="viewMode = 'matrix'"
            >
              <Icon name="lucide:network" class="size-3.5" />
              <span>Infra Matrix</span>
            </button>
          </div>

          <!-- Sort selector -->
          <div class="flex items-center gap-1 rounded-lg border bg-background px-2.5 py-1 text-xs text-muted-foreground">
            <Icon name="lucide:arrow-up-down" class="size-3.5" />
            <select
              v-model="sortBy"
              class="bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer"
            >
              <option value="progress-desc">Progress: High to Low</option>
              <option value="progress-asc">Progress: Low to High</option>
              <option value="nodes">Graph Nodes: Most Connected</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer"
          :class="selectedCategory === cat ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Active View Content -->
    <main>
      <!-- 1. Grid Cards View -->
      <div v-if="viewMode === 'grid'" class="space-y-4">
        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {{ filteredProjects.length }} of {{ workspaceProjects.length }} projects</span>
          <span v-if="searchQuery || selectedCategory !== 'All'">
            Filtered by: <span class="font-semibold text-foreground">{{ selectedCategory }}</span>
            <span v-if="searchQuery">, matching "{{ searchQuery }}"</span>
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <WorkspaceProjectCard
            v-for="proj in filteredProjects"
            :key="proj.id"
            :project="proj"
            @select="handleSelectProject"
          />
        </div>

        <div
          v-if="filteredProjects.length === 0"
          class="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center"
        >
          <div class="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
            <Icon name="lucide:folder-search" class="size-6" />
          </div>
          <h3 class="font-semibold text-base">No matching projects found</h3>
          <p class="text-xs text-muted-foreground max-w-sm mt-1">
            Try adjusting your search query or switching the category filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            class="mt-4"
            @click="searchQuery = ''; selectedCategory = 'All'; selectedStatus = 'All'"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      <!-- 2. Kanban Board View -->
      <WorkspaceKanbanView
        v-else-if="viewMode === 'kanban'"
        :projects="filteredProjects"
        @select="handleSelectProject"
      />

      <!-- 3. Infrastructure Topology Matrix -->
      <WorkspaceArchMatrix
        v-else-if="viewMode === 'matrix'"
        :projects="workspaceProjects"
        @select="handleSelectProject"
      />
    </main>

    <!-- Detail Dialog Modal -->
    <WorkspaceProjectModal
      :project="selectedProject"
      :open="modalOpen"
      @update:open="modalOpen = $event"
    />
  </div>
</template>
