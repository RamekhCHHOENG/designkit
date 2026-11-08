<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Circle,
  ChevronDown,
  Wrench,
  Brain,
  Bot,
  MessageSquare,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface TraceStep {
  id: string | number;
  name: string;
  type?: "tool" | "reasoning" | "subagent" | "message" | "custom";
  status: "running" | "success" | "error" | "pending";
  durationMs?: number;
  summary?: string;
  details?: any;
}

export interface TraceProps {
  steps: TraceStep[];
  activeStepId?: string | number;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TraceProps>();

const emit = defineEmits<{
  (e: "step-click", step: TraceStep): void;
}>();

const expandedSteps = ref<Record<string | number, boolean>>({});

function toggleExpand(id: string | number) {
  expandedSteps.value[id] = !expandedSteps.value[id];
}
</script>

<template>
  <div
    data-slot="trace"
    role="feed"
    aria-label="Execution Trace"
    :class="cn('flex flex-col w-full relative', props.class)"
  >
    <div
      v-for="(step, idx) in steps"
      :key="step.id"
      class="relative flex gap-3.5 group"
    >
      <!-- Timeline Connector Line -->
      <div
        v-if="idx !== steps.length - 1"
        class="absolute left-[15px] top-7 bottom-0 w-[2px] bg-border/70"
        aria-hidden="true"
      />

      <!-- Node Status Icon -->
      <div
        class="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-background border shadow-2xs"
      >
        <Loader2
          v-if="step.status === 'running'"
          class="size-4 animate-spin text-primary"
        />
        <CheckCircle2
          v-else-if="step.status === 'success'"
          class="size-4 text-emerald-500"
        />
        <AlertCircle
          v-else-if="step.status === 'error'"
          class="size-4 text-rose-500"
        />
        <Circle v-else class="size-4 text-muted-foreground/50" />
      </div>

      <!-- Step Content Area -->
      <div class="flex-1 pb-6 pt-1">
        <div
          :class="
            cn(
              'flex items-center justify-between p-2.5 rounded-lg border bg-card/60 hover:bg-muted/40 cursor-pointer transition-all',
              activeStepId === step.id && 'ring-1 ring-primary border-primary/50',
              step.status === 'error' && 'border-rose-500/30 bg-rose-500/5'
            )
          "
          @click="
            toggleExpand(step.id);
            emit('step-click', step);
          "
        >
          <div class="flex items-center gap-2 truncate">
            <!-- Type Icon -->
            <Wrench v-if="step.type === 'tool'" class="size-3 text-amber-500" />
            <Brain
              v-else-if="step.type === 'reasoning'"
              class="size-3 text-purple-500"
            />
            <Bot v-else-if="step.type === 'subagent'" class="size-3 text-blue-500" />
            <MessageSquare
              v-else-if="step.type === 'message'"
              class="size-3 text-emerald-500"
            />

            <span class="text-sm font-medium text-foreground truncate">
              {{ step.name }}
            </span>

            <span
              v-if="step.type"
              class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase"
            >
              {{ step.type }}
            </span>
          </div>

          <div
            class="flex items-center gap-2 text-xs text-muted-foreground shrink-0 ml-2"
          >
            <span v-if="step.durationMs !== undefined" class="font-mono text-[11px]">
              {{
                step.durationMs < 1000
                  ? `${step.durationMs}ms`
                  : `${(step.durationMs / 1000).toFixed(2)}s`
              }}
            </span>

            <ChevronDown
              v-if="step.details"
              :class="
                cn(
                  'size-3.5 transition-transform duration-200',
                  expandedSteps[step.id] && 'rotate-180'
                )
              "
            />
          </div>
        </div>

        <!-- Collapsible Details Payload -->
        <div
          v-if="expandedSteps[step.id] && step.details"
          class="mt-2 p-3 rounded-lg border bg-muted/40 text-xs font-mono text-muted-foreground overflow-auto"
        >
          <component :is="step.details" v-if="typeof step.details === 'object' && step.details !== null && !Array.isArray(step.details)" />
          <pre v-else class="whitespace-pre-wrap">{{ step.details }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
