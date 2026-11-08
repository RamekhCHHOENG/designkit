<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import {
  CheckCircle2Icon,
  AlertTriangleIcon,
  XCircleIcon,
  InfoIcon,
  LockIcon,
  ServerCrashIcon,
} from "lucide-vue-next";
import { cn } from "@/lib/utils";

export type ResultStatus = "404" | "403" | "500" | "success" | "warning" | "error" | "info";

export interface ResultProps {
  status?: ResultStatus;
  title?: string;
  subTitle?: string;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ResultProps>(), {
  status: "info",
});
</script>

<template>
  <div
    data-slot="result"
    :class="cn('flex flex-col items-center justify-center p-8 text-center', props.class)"
  >
    <div class="mb-4">
      <slot name="icon">
        <div
          v-if="status === '404'"
          class="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          <span class="font-mono text-xl font-bold">404</span>
        </div>
        <div
          v-else-if="status === '403'"
          class="flex size-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400"
        >
          <LockIcon class="size-8" />
        </div>
        <div
          v-else-if="status === '500'"
          class="flex size-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400"
        >
          <ServerCrashIcon class="size-8" />
        </div>
        <div
          v-else-if="status === 'success'"
          class="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        >
          <CheckCircle2Icon class="size-8" />
        </div>
        <div
          v-else-if="status === 'warning'"
          class="flex size-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400"
        >
          <AlertTriangleIcon class="size-8" />
        </div>
        <div
          v-else-if="status === 'error'"
          class="flex size-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400"
        >
          <XCircleIcon class="size-8" />
        </div>
        <div
          v-else
          class="flex size-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400"
        >
          <InfoIcon class="size-8" />
        </div>
      </slot>
    </div>

    <h3 v-if="title" class="text-xl font-semibold tracking-tight text-foreground">
      {{ title }}
    </h3>

    <p v-if="subTitle" class="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
      {{ subTitle }}
    </p>

    <div v-if="$slots.extra" class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <slot name="extra" />
    </div>

    <slot />
  </div>
</template>
