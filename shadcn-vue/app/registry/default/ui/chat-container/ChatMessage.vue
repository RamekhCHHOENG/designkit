<script setup lang="ts">
import { computed } from "vue";
import { UserIcon, BotIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    role?: "user" | "assistant" | "system";
    authorName?: string;
    timestamp?: string;
    status?: "streaming" | "complete" | "error";
    branchTotal?: number;
    branchIndex?: number;
    class?: string;
  }>(),
  {
    role: "assistant",
    status: "complete",
    branchIndex: 0,
  }
);

const emit = defineEmits<{
  (e: "branch-change", nextIndex: number): void;
}>();

const isUser = computed(() => props.role === "user");
</script>

<template>
  <div :class="cn('group flex w-full gap-3 text-sm', isUser ? 'flex-row-reverse' : 'flex-row', props.class)">
    <!-- Avatar -->
    <slot name="avatar">
      <div
        v-if="isUser"
        class="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold"
      >
        <UserIcon class="size-4" />
      </div>
      <div
        v-else
        class="flex size-7 shrink-0 items-center justify-center rounded-full border bg-muted/60 text-foreground text-xs font-semibold shadow-2xs"
      >
        <BotIcon class="size-4 text-primary" />
      </div>
    </slot>

    <!-- Message Bubble -->
    <div :class="cn('flex max-w-[85%] flex-col gap-1.5', isUser ? 'items-end' : 'items-start')">
      <div v-if="authorName || timestamp" class="flex items-center gap-2 text-[11px] text-muted-foreground px-1">
        <span v-if="authorName" class="font-medium text-foreground/80">{{ authorName }}</span>
        <span v-if="timestamp">{{ timestamp }}</span>
      </div>

      <div
        :class="
          cn(
            'rounded-2xl px-4 py-2.5 leading-relaxed text-sm shadow-2xs',
            isUser ? 'rounded-tr-xs bg-primary text-primary-foreground' : 'rounded-tl-xs border bg-card text-card-foreground',
            status === 'error' && 'border-destructive/40 bg-destructive/10 text-destructive'
          )
        "
      >
        <slot />
        <span v-if="status === 'streaming'" class="inline-block size-1.5 ml-1 animate-pulse rounded-full bg-primary align-middle" />
      </div>

      <!-- Branch Switcher -->
      <div class="flex items-center gap-2 pt-0.5">
        <div
          v-if="branchTotal && branchTotal > 1"
          class="flex items-center gap-1 rounded-md border bg-muted/40 px-1.5 py-0.5 text-[11px] text-muted-foreground select-none"
        >
          <button
            type="button"
            :disabled="branchIndex <= 0"
            @click="emit('branch-change', branchIndex - 1)"
            class="hover:text-foreground disabled:opacity-40"
          >
            <ChevronLeftIcon class="size-3" />
          </button>
          <span>{{ branchIndex + 1 }} / {{ branchTotal }}</span>
          <button
            type="button"
            :disabled="branchIndex >= branchTotal - 1"
            @click="emit('branch-change', branchIndex + 1)"
            class="hover:text-foreground disabled:opacity-40"
          >
            <ChevronRightIcon class="size-3" />
          </button>
        </div>

        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
