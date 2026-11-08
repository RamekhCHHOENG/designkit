<script setup lang="ts">
import { Terminal } from "@/registry/default/ui/terminal";

const commands = [
  {
    command: "npx @ramekhchhoeng/designkit add auto-complete chat-container",
    output: "✔ Added 2 primitives to components/ui",
  },
  {
    command: "npm test",
    output: "✓ All 100 tests passed (100% parity across React & Vue)",
  },
];
</script>

<template>
  <div class="w-full max-w-md p-2">
    <Terminal
      title="zsh — designkit-cli"
      :commands="commands"
    />
  </div>
</template>
