<script setup lang="ts">
import { Terminal } from "@/registry/default/ui/terminal";

const commands = [
  {
    command: "git status --short",
    output: "M src/lib/index.ts\nM registry.json\n?? src/components/ui/terminal.tsx",
  },
  {
    command: "npm test -- --run",
    output: "✓ tests/new-primitives.test.tsx (46 tests) 1.2s\nTest Files  5 passed (5)\nTests       100 passed (100)",
  },
  {
    command: "npx designkit add chat-container auto-complete",
    output: "✔ Added chat-container to components/ui\n✔ Added auto-complete to components/ui",
  },
];
</script>

<template>
  <div class="w-full max-w-lg">
    <Terminal
      title="zsh — agent-runtime"
      :commands="commands"
    />
  </div>
</template>
