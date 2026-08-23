<script setup lang="ts">
import type { WorkspaceProject } from "~/types/workspace";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "~/registry/default/ui/dialog";
import { Badge } from "~/registry/default/ui/badge";
import { Progress } from "~/registry/default/ui/progress";
import { Button } from "~/registry/default/ui/button";

const props = defineProps<{
  project: WorkspaceProject | null;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const copiedCmd = ref<string | null>(null);

function copyCommand(cmd: string) {
  navigator.clipboard.writeText(cmd);
  copiedCmd.value = cmd;
  setTimeout(() => (copiedCmd.value = null), 2000);
}

const statusColorClasses = computed(() => {
  if (!props.project) return "";
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
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent v-if="project" class="max-w-2xl max-h-[85vh] overflow-y-auto p-6 gap-6">
      <!-- Header -->
      <DialogHeader class="gap-2">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border"
              :class="statusColorClasses"
            >
              <span class="size-1.5 rounded-full bg-current" />
              {{ project.status }}
            </span>
            <Badge variant="outline" class="text-xs">
              {{ project.category }}
            </Badge>
          </div>
          <span class="font-mono text-xs text-muted-foreground">
            {{ project.path }}
          </span>
        </div>

        <DialogTitle class="text-2xl font-bold tracking-tight">
          {{ project.name }}
        </DialogTitle>
        <DialogDescription class="text-sm leading-relaxed text-muted-foreground">
          {{ project.longDescription || project.description }}
        </DialogDescription>
      </DialogHeader>

      <!-- Progress & Metrics bar -->
      <div class="rounded-xl border bg-muted/40 p-4 space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span class="font-medium flex items-center gap-1.5">
            <Icon name="lucide:trending-up" class="size-4 text-primary" />
            Overall Progress
          </span>
          <span class="font-mono font-bold text-base text-primary">{{ project.progress }}%</span>
        </div>
        <Progress :model-value="project.progress" class="h-2" />

        <div class="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-xs">
          <div>
            <span class="text-muted-foreground block">Graphify Nodes</span>
            <span class="font-mono font-semibold">{{ project.graphStats.nodes.toLocaleString() }}</span>
          </div>
          <div>
            <span class="text-muted-foreground block">Priority</span>
            <span class="font-semibold">{{ project.priority }}</span>
          </div>
          <div>
            <span class="text-muted-foreground block">Local Ports</span>
            <span class="font-mono font-semibold">{{ project.ports ? project.ports.join(', ') : 'N/A' }}</span>
          </div>
        </div>
      </div>

      <!-- Key Capabilities / Features -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Icon name="lucide:sparkles" class="size-3.5 text-primary" />
          Key Features & Capabilities
        </h4>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <li
            v-for="feat in project.keyFeatures"
            :key="feat"
            class="flex items-start gap-2 rounded-lg border bg-card p-2.5"
          >
            <Icon name="lucide:check" class="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <span class="leading-tight text-foreground/90">{{ feat }}</span>
          </li>
        </ul>
      </div>

      <!-- Milestones list -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Icon name="lucide:list-checks" class="size-3.5 text-primary" />
          Project Milestones
        </h4>
        <div class="space-y-1.5">
          <div
            v-for="milestone in project.milestones"
            :key="milestone.title"
            class="flex items-center justify-between rounded-lg border px-3 py-2 text-xs"
            :class="milestone.completed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-muted/30'"
          >
            <div class="flex items-center gap-2">
              <Icon
                :name="milestone.completed ? 'lucide:check-circle-2' : 'lucide:circle'"
                class="size-4"
                :class="milestone.completed ? 'text-emerald-500' : 'text-muted-foreground'"
              />
              <span :class="milestone.completed ? 'text-foreground font-medium' : 'text-muted-foreground'">
                {{ milestone.title }}
              </span>
            </div>
            <Badge v-if="milestone.completed" variant="secondary" class="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Done
            </Badge>
            <span v-else class="text-[10px] text-muted-foreground font-mono">In Progress</span>
          </div>
        </div>
      </div>

      <!-- Tech Stack Breakdown -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Icon name="lucide:cpu" class="size-3.5 text-primary" />
          Tech Stack
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div v-if="project.techStack.backend" class="rounded-lg border p-3 bg-muted/20">
            <span class="text-[11px] font-semibold text-muted-foreground block mb-1.5">Backend & API</span>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="t in project.techStack.backend" :key="t" class="rounded bg-background px-2 py-0.5 text-xs font-mono border">
                {{ t }}
              </span>
            </div>
          </div>

          <div v-if="project.techStack.frontend" class="rounded-lg border p-3 bg-muted/20">
            <span class="text-[11px] font-semibold text-muted-foreground block mb-1.5">Frontend UI</span>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="t in project.techStack.frontend" :key="t" class="rounded bg-background px-2 py-0.5 text-xs font-mono border">
                {{ t }}
              </span>
            </div>
          </div>

          <div v-if="project.techStack.mobile" class="rounded-lg border p-3 bg-muted/20">
            <span class="text-[11px] font-semibold text-muted-foreground block mb-1.5">Mobile Stack</span>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="t in project.techStack.mobile" :key="t" class="rounded bg-background px-2 py-0.5 text-xs font-mono border">
                {{ t }}
              </span>
            </div>
          </div>

          <div v-if="project.techStack.database" class="rounded-lg border p-3 bg-muted/20">
            <span class="text-[11px] font-semibold text-muted-foreground block mb-1.5">Database & Storage</span>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="t in project.techStack.database" :key="t" class="rounded bg-background px-2 py-0.5 text-xs font-mono border">
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Run Commands -->
      <div v-if="project.quickCommands && project.quickCommands.length" class="space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Icon name="lucide:terminal" class="size-3.5 text-primary" />
          Quick Run Commands
        </h4>
        <div class="space-y-2">
          <div
            v-for="cmd in project.quickCommands"
            :key="cmd.label"
            class="flex items-center justify-between rounded-lg border bg-zinc-950 px-3.5 py-2 text-xs font-mono text-zinc-200"
          >
            <div class="flex items-center gap-2 overflow-x-auto">
              <span class="text-zinc-500 select-none">$</span>
              <span>{{ cmd.cmd }}</span>
            </div>
            <button
              type="button"
              class="shrink-0 text-zinc-400 hover:text-white transition-colors"
              title="Copy command"
              @click="copyCommand(cmd.cmd)"
            >
              <Icon :name="copiedCmd === cmd.cmd ? 'lucide:check' : 'lucide:copy'" class="size-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </div>

      <DialogFooter class="sm:justify-between items-center border-t pt-4">
        <span class="text-xs text-muted-foreground">
          Last active: {{ project.lastUpdated || 'Recently' }}
        </span>
        <DialogClose as-child>
          <Button variant="outline" size="sm">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
