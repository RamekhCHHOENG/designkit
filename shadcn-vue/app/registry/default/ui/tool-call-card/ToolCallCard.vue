<script setup lang="ts">
import { ref, computed } from "vue";
import { WrenchIcon, ChevronDownIcon, CheckIcon, CopyIcon, ClockIcon, AlertCircleIcon, Loader2Icon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    toolName: string;
    status?: "pending" | "running" | "success" | "error";
    durationMs?: number;
    args?: Record<string, any>;
    result?: any;
    error?: string;
    requiresConfirmation?: boolean;
    defaultOpen?: boolean;
    class?: string;
  }>(),
  {
    status: "success",
    requiresConfirmation: false,
    defaultOpen: false,
  }
);

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const isOpen = ref(props.defaultOpen || props.status === "running" || props.requiresConfirmation);
const copied = ref(false);

const formattedDuration = computed(() => {
  if (props.durationMs === undefined) return null;
  if (props.durationMs < 1000) return `${props.durationMs}ms`;
  return `${(props.durationMs / 1000).toFixed(2)}s`;
});

async function copyPayload() {
  try {
    const payload = JSON.stringify({ tool: props.toolName, args: props.args, result: props.result, error: props.error }, null, 2);
    await navigator.clipboard.writeText(payload);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {}
}
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border bg-card text-card-foreground shadow-2xs overflow-hidden transition-all text-xs',
        status === 'running' && 'border-amber-500/30',
        status === 'error' && 'border-destructive/40',
        props.class
      )
    "
  >
    <div
      @click="isOpen = !isOpen"
      class="flex items-center justify-between px-3.5 py-2.5 bg-muted/20 hover:bg-muted/40 cursor-pointer select-none transition-colors gap-3"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="flex size-7 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground shadow-2xs">
          <WrenchIcon class="size-3.5 text-primary" />
        </div>
        <div class="flex items-center gap-2 truncate">
          <span class="font-mono font-semibold text-foreground truncate">{{ toolName }}</span>
          <span
            :class="
              cn(
                'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium shrink-0',
                status === 'running' && 'bg-amber-500/10 text-amber-600 border-amber-500/20',
                status === 'success' && 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                status === 'error' && 'bg-destructive/10 text-destructive border-destructive/20',
                status === 'pending' && 'bg-muted text-muted-foreground border-border'
              )
            "
          >
            <Loader2Icon v-if="status === 'running'" class="size-3 animate-spin" />
            <CheckIcon v-else-if="status === 'success'" class="size-3 stroke-[3]" />
            <AlertCircleIcon v-else-if="status === 'error'" class="size-3" />
            <ClockIcon v-else class="size-3" />
            <span class="capitalize">{{ status }}</span>
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <span v-if="formattedDuration" class="font-mono text-[11px] text-muted-foreground">{{ formattedDuration }}</span>
        <button
          type="button"
          @click.stop="copyPayload"
          class="flex size-6 items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <CheckIcon v-if="copied" class="size-3 text-emerald-500" />
          <CopyIcon v-else class="size-3" />
        </button>
        <ChevronDownIcon :class="cn('size-4 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')" />
      </div>
    </div>

    <!-- Confirmation Banner -->
    <div
      v-if="requiresConfirmation && status === 'pending'"
      class="flex items-center justify-between border-t border-b bg-amber-500/10 px-4 py-2.5 text-amber-800 dark:text-amber-200 gap-3"
    >
      <span class="font-medium text-xs">Action requires user approval to execute.</span>
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="emit('cancel')"
          class="rounded px-2.5 py-1 text-xs font-medium border border-border hover:bg-muted text-foreground transition-colors"
        >
          Deny
        </button>
        <button
          type="button"
          @click="emit('confirm')"
          class="rounded bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-2xs"
        >
          Approve
        </button>
      </div>
    </div>

    <!-- Collapsible Body -->
    <div v-if="isOpen" class="border-t p-3.5 space-y-3 bg-muted/5 font-mono text-[11px]">
      <div v-if="args && Object.keys(args).length > 0">
        <span class="text-[10px] uppercase font-sans font-semibold tracking-wider text-muted-foreground block mb-1">
          Arguments
        </span>
        <pre class="p-2.5 rounded-lg border bg-background text-foreground/90 overflow-x-auto leading-relaxed">{{ JSON.stringify(args, null, 2) }}</pre>
      </div>

      <div v-if="result !== undefined">
        <span class="text-[10px] uppercase font-sans font-semibold tracking-wider text-muted-foreground block mb-1">
          Output
        </span>
        <pre class="p-2.5 rounded-lg border bg-background text-foreground/90 overflow-x-auto leading-relaxed max-h-56">{{ typeof result === "string" ? result : JSON.stringify(result, null, 2) }}</pre>
      </div>

      <div v-if="error">
        <span class="text-[10px] uppercase font-sans font-semibold tracking-wider text-destructive block mb-1">
          Error
        </span>
        <div class="p-2.5 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive leading-relaxed">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
