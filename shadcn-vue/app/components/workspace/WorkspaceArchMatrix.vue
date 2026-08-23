<script setup lang="ts">
import type { WorkspaceProject } from "~/types/workspace";
import { Card } from "~/registry/default/ui/card";
import { Badge } from "~/registry/default/ui/badge";

const props = defineProps<{
  projects: WorkspaceProject[];
}>();

const emit = defineEmits<{
  (e: "select", project: WorkspaceProject): void;
}>();

const infraServices = [
  {
    name: "PostgreSQL 17",
    port: "5432 / 5433",
    icon: "lucide:database",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    desc: "Primary relational database layer across all transactional services",
    filter: (p: WorkspaceProject) => p.techStack.database?.some(d => d.toLowerCase().includes("postgres")),
  },
  {
    name: "AIStor MinIO S3",
    port: "9100 / 9101",
    icon: "lucide:hard-drive",
    color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    desc: "S3-compatible object storage for receipts, PDFs, invoices, and card media",
    filter: (p: WorkspaceProject) => p.techStack.infra?.some(i => i.toLowerCase().includes("minio") || i.toLowerCase().includes("s3")) || p.id === "rental" || p.id === "foodie" || p.id === "export-services",
  },
  {
    name: "Redis 8 Cache",
    port: "6379",
    icon: "lucide:zap",
    color: "text-red-500 bg-red-500/10 border-red-500/20",
    desc: "In-memory caching, market rate streams, BullMQ queues, and fast sessions",
    filter: (p: WorkspaceProject) => p.techStack.infra?.some(i => i.toLowerCase().includes("redis")) || p.id === "trading" || p.id === "export-services" || p.id === "group-expense",
  },
  {
    name: "RabbitMQ 4",
    port: "5672 / 15672",
    icon: "lucide:message-square",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    desc: "Asynchronous messaging queue for microservice events & telemetry",
    filter: (p: WorkspaceProject) => p.techStack.infra?.some(i => i.toLowerCase().includes("rabbitmq")) || p.id === "services" || p.id === "trading",
  },
  {
    name: "Coolify PaaS",
    port: "443 (SSL)",
    icon: "lucide:cloud",
    color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    desc: "Self-hosted production orchestration and automated Git deployments",
    filter: () => true,
  },
];
</script>

<template>
  <div class="space-y-6">
    <div class="rounded-xl border bg-muted/20 p-4">
      <div class="flex items-center gap-2 mb-1">
        <Icon name="lucide:network" class="size-4.5 text-primary" />
        <h3 class="font-semibold text-sm">Monorepo Infrastructure Matrix</h3>
      </div>
      <p class="text-xs text-muted-foreground">
        Centralized Docker Compose cluster in <code class="font-mono text-primary font-semibold">services/</code> powering databases, object storage, and messaging queues for all workspace apps.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="service in infraServices"
        :key="service.name"
        class="flex flex-col justify-between rounded-xl border bg-card/60 p-4 gap-4 backdrop-blur-sm"
      >
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex size-8 items-center justify-center rounded-lg border" :class="service.color">
                <Icon :name="service.icon" class="size-4" />
              </div>
              <div>
                <h4 class="font-semibold text-sm">{{ service.name }}</h4>
                <span class="font-mono text-[11px] text-muted-foreground">Port {{ service.port }}</span>
              </div>
            </div>
            <Badge variant="outline" class="text-[10px] font-mono">Shared</Badge>
          </div>
          <p class="text-xs text-muted-foreground leading-relaxed">{{ service.desc }}</p>
        </div>

        <div class="space-y-1.5 pt-3 border-t border-border/40">
          <span class="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
            Connected Projects ({{ projects.filter(service.filter).length }})
          </span>
          <div class="flex flex-wrap gap-1">
            <button
              v-for="proj in projects.filter(service.filter)"
              :key="proj.id"
              type="button"
              class="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] font-medium hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
              @click="emit('select', proj)"
            >
              <span>{{ proj.name.split(' ')[0] }}</span>
              <Icon name="lucide:external-link" class="size-2.5 opacity-60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
