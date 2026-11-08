<script setup lang="ts">
import { ref } from "vue";
import { Tour } from "@/registry/default/ui/tour";
import { Button } from "@/registry/default/ui/button";

const open = ref(false);
const btn1 = ref<HTMLElement | null>(null);
const btn2 = ref<HTMLElement | null>(null);
const btn3 = ref<HTMLElement | null>(null);

const steps = [
  {
    title: "1. Create New Project",
    description: "Click here to initialize a new repository or workspace from template.",
    target: () => btn1.value,
  },
  {
    title: "2. Deploy to Production",
    description: "Instantly trigger static deployment and edge CDN synchronization.",
    target: () => btn2.value,
  },
  {
    title: "3. Workspace Settings",
    description: "Manage environment keys, token configurations, and team permissions.",
    target: () => btn3.value,
  },
];
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-8">
    <Button @click="open = true">Start Interactive Tour</Button>

    <div class="flex items-center gap-4 pt-4">
      <Button ref="btn1" variant="outline">New Project</Button>
      <Button ref="btn2" variant="secondary">Deploy</Button>
      <Button ref="btn3" variant="ghost">Settings</Button>
    </div>

    <Tour v-model:open="open" :steps="steps" />
  </div>
</template>
