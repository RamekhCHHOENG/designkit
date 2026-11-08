<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/registry/default/ui/copy-button";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  showLineNumbers: false,
  showCopyButton: true,
});

const lines = computed(() => props.code.trim().split("\n"));
</script>

<template>
  <div
    data-slot="code-block"
    :class="
      cn(
        'relative overflow-hidden rounded-xl border border-border/70 bg-zinc-950 text-zinc-100 shadow-sm dark:bg-zinc-900/90',
        props.class
      )
    "
  >
    <div
      v-if="filename || language || showCopyButton"
      class="flex h-9 items-center justify-between border-b border-white/10 bg-white/5 px-3.5 text-xs"
    >
      <div class="flex items-center gap-2 text-zinc-400">
        <span v-if="filename" class="font-mono text-zinc-200 font-medium">{{ filename }}</span>
        <span
          v-if="language && !filename"
          class="font-mono uppercase text-[11px] tracking-wider text-zinc-400"
        >
          {{ language }}
        </span>
      </div>

      <CopyButton
        v-if="showCopyButton"
        :value="code"
        class="size-6 border-white/10 bg-transparent text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
      />
    </div>

    <div class="overflow-x-auto p-3.5 font-mono text-xs leading-relaxed">
      <pre class="flex">
        <div
          v-if="showLineNumbers"
          class="select-none pr-4 text-right text-zinc-600 dark:text-zinc-500"
        >
          <div v-for="(_, i) in lines" :key="i">{{ i + 1 }}</div>
        </div>
        <code class="flex-1 text-zinc-200 whitespace-pre">{{ code }}</code>
      </pre>
    </div>
  </div>
</template>
