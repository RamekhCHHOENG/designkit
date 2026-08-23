<script setup lang="ts">
import type { WorkspaceProject } from "~/types/workspace";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/registry/default/ui/card";
import { Badge } from "~/registry/default/ui/badge";
import { Progress } from "~/registry/default/ui/progress";
import { Button } from "~/registry/default/ui/button";

const props = defineProps<{
  project: WorkspaceProject;
}>();

const emit = defineEmits<{
  (e: "select", project: WorkspaceProject): void;
}>();

const completedMilestones = computed(() => {
  return props.project.milestones.filter(m => m.completed).length;
});

const statusBadgeVariant = computed(() => {
  switch (props.project.status) {
    case "Production":
      return "default";
    case "Active":
      return "secondary";
    case "In Progress":
      return "outline";
    default:
      return "outline";
  }
});

const statusColorClasses = computed(() => {
  switch (props.project.status) {
    case "Production":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    case "Active":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "In Progress":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "Prototype":
      return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20";
  }
});

const progressColorClass = computed(() => {
  if (props.project.progress >= 90) return "bg-emerald-500";
  if (props.project.progress >= 75) return "bg-blue-500";
  if (props.project.progress >= 60) return "bg-amber-500";
  return "bg-violet-500";
});

const categoryIcon = computed(() => {
  switch (props.project.category) {
    case "Full-Stack": return "lucide:layers";
    case "Backend & API": return "lucide:server";
    case "Mobile App": return "lucide:smartphone";
    case "DevOps & Infra": return "lucide:boxes";
    case "AI & Agents": return "lucide:cpu";
    case "UI & Components": return "lucide:palette";
    default: return "lucide:wrench";
  }
});

const copied = ref(false);
function copyPath(event: Event) {
  event.stopPropagation();
  navigator.clipboard.writeText(props.project.path);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}
</script>

<template>
  <Card
    class="group relative flex flex-col justify-between overflow-hidden border-border/80 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer p-0"
    @click="emit('select', project)"
  >
    <!-- Top accent bar based on progress -->
    <div
      class="h-1 w-full transition-all"
      :class="progressColorClass"
    />

    <div class="flex flex-col p-5 gap-4 flex-1">
      <!-- Header info -->
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2.5">
          <div class="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/60 text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <Icon :name="categoryIcon" class="size-4.5" />
          </div>
          <div>
            <h3 class="font-semibold text-base tracking-tight group-hover:text-primary transition-colors leading-snug line-clamp-1">
              {{ project.name }}
            </h3>
            <div class="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground font-mono">
              <span>{{ project.path }}</span>
              <button
                type="button"
                class="opacity-0 group-hover:opacity-100 hover:text-foreground transition-opacity"
                title="Copy folder path"
                @click="copyPath"
              >
                <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3" />
              </button>
            </div>
          </div>
        </div>

        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border shrink-0"
          :class="statusColorClasses"
        >
          <span class="size-1.5 rounded-full animate-pulse" :class="progressColorClass" />
          {{ project.status }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
        {{ project.description }}
      </p>

      <!-- Progress Section -->
      <div class="space-y-1.5 rounded-lg bg-muted/40 p-3 border border-border/50">
        <div class="flex items-center justify-between text-xs font-medium">
          <span class="text-muted-foreground flex items-center gap-1">
            <Icon name="lucide:check-circle-2" class="size-3.5 text-primary" />
            Milestones: {{ completedMilestones }} / {{ project.milestones.length }}
          </span>
          <span class="font-semibold text-foreground">{{ project.progress }}%</span>
        </div>
        <Progress :model-value="project.progress" class="h-1.5" />
      </div>

      <!-- Tech Stack Badges -->
      <div class="flex flex-wrap gap-1.5 items-center">
        <span
          v-for="tech in [...(project.techStack.backend || []), ...(project.techStack.frontend || []), ...(project.techStack.mobile || [])].slice(0, 4)"
          :key="tech"
          class="inline-flex items-center rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
        >
          {{ tech }}
        </span>
        <span
          v-if="[...(project.techStack.backend || []), ...(project.techStack.frontend || []), ...(project.techStack.mobile || [])].length > 4"
          class="text-[10px] text-muted-foreground font-mono"
        >
          +{{ [...(project.techStack.backend || []), ...(project.techStack.frontend || []), ...(project.techStack.mobile || [])].length - 4 }}
        </span>
      </div>
    </div>

    <!-- Footer Stats & Actions -->
    <div class="flex items-center justify-between border-t border-border/60 bg-muted/20 px-5 py-3 text-xs text-muted-foreground">
      <div class="flex items-center gap-3">
        <span class="flex items-center gap-1" title="Graphify indexed nodes">
          <Icon name="lucide:git-graph" class="size-3.5 text-primary/80" />
          <span class="font-mono font-medium">{{ project.graphStats.nodes.toLocaleString() }}</span> nodes
        </span>
        <span v-if="project.ports && project.ports.length" class="flex items-center gap-1" title="Local ports">
          <Icon name="lucide:radio" class="size-3 text-amber-500" />
          <span class="font-mono">:{{ project.ports[0] }}</span>
        </span>
      </div>

      <div class="flex items-center gap-1 text-primary group-hover:translate-x-0.5 transition-transform font-medium">
        <span>Details</span>
        <Icon name="lucide:arrow-right" class="size-3.5" />
      </div>
    </div>
  </Card>
</template>
