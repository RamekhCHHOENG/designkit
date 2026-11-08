<script setup lang="ts">
import { ref } from "vue";
import { MultiSelect, type Option } from "@/registry/default/ui/multi-select";

const options: Option[] = [
  { label: "Vue", value: "vue" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Tailwind CSS", value: "tailwind" },
  { label: "TypeScript", value: "ts" },
  { label: "Vite", value: "vite" },
];

const selected = ref<Option[]>([options[0]!, options[1]!]);
</script>

<template>
  <div class="w-full max-w-sm p-6">
    <MultiSelect
      v-model="selected"
      :options="options"
      placeholder="Select technologies..."
    />
  </div>
</template>
