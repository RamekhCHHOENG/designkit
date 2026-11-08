<script setup lang="ts">
import { ref } from "vue";
import { TerminalIcon, CopyIcon, CheckIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface TerminalCommand {
  command: string;
  output?: string;
  isError?: boolean;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    commands?: TerminalCommand[];
    copyable?: boolean;
    class?: string;
  }>(),
  {
    title: "bash",
    commands: () => [
      { command: "npx @ramekhchhoeng/designkit init", output: "✔ Created designkit.config.json\n✔ Installed 135 primitives successfully!" },
      { command: "npm run dev", output: "➜ Local:   http://localhost:3312/" },
    ],
    copyable: true,
  }
);

const copied = ref(false);

async function copyAll() {
  const text = props.commands.map((c) => `$ ${c.command}\n${c.output || ""}`).join("\n\n");
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {}
}
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-zinc-800 bg-[#09090b] text-zinc-100 font-mono text-xs shadow-2xl overflow-hidden select-text',
        props.class
      )
    "
  >
    <div class="flex items-center justify-between px-3.5 py-2.5 bg-zinc-900/90 border-b border-zinc-800 select-none">
      <div class="flex items-center gap-1.5">
        <span class="size-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/40" />
        <span class="size-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/40" />
        <span class="size-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/40" />
      </div>

      <div class="flex items-center gap-1.5 text-zinc-400 text-[11px] font-sans">
        <TerminalIcon class="size-3" />
        <span>{{ title }}</span>
      </div>

      <div class="flex items-center gap-1">
        <button
          v-if="copyable"
          type="button"
          @click="copyAll"
          class="flex size-5 items-center justify-center rounded text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <CheckIcon v-if="copied" class="size-3 text-emerald-400" />
          <CopyIcon v-else class="size-3" />
        </button>
      </div>
    </div>

    <div class="p-4 space-y-3 max-h-80 overflow-y-auto leading-relaxed">
      <div v-for="(cmd, i) in commands" :key="i" class="space-y-1">
        <div class="flex items-center gap-2 text-zinc-200">
          <span class="text-emerald-400 font-bold select-none">$</span>
          <span>{{ cmd.command }}</span>
        </div>
        <pre
          v-if="cmd.output"
          :class="
            cn(
              'text-[11px] whitespace-pre-wrap pl-4 leading-normal',
              cmd.isError ? 'text-rose-400' : 'text-zinc-400'
            )
          "
        >{{ cmd.output }}</pre>
      </div>

      <div class="flex items-center gap-2 text-zinc-500 pt-1">
        <span class="text-emerald-400 font-bold select-none">$</span>
        <span class="size-2 bg-emerald-400 inline-block animate-pulse" />
      </div>
    </div>
  </div>
</template>
