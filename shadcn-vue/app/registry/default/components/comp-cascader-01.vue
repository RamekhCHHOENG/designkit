<script setup lang="ts">
import { ref } from "vue";
import { Cascader } from "@/registry/default/ui/cascader";

const options = [
  {
    value: "na",
    label: "North America",
    children: [
      {
        value: "us",
        label: "United States",
        children: [
          { value: "ca", label: "California" },
          { value: "ny", label: "New York" },
          { value: "tx", label: "Texas" },
        ],
      },
      {
        value: "ca-country",
        label: "Canada",
        children: [
          { value: "on", label: "Ontario" },
          { value: "bc", label: "British Columbia" },
        ],
      },
    ],
  },
  {
    value: "eu",
    label: "Europe",
    children: [
      {
        value: "de",
        label: "Germany",
        children: [
          { value: "berlin", label: "Berlin" },
          { value: "munich", label: "Munich" },
        ],
      },
      {
        value: "fr",
        label: "France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "lyon", label: "Lyon" },
        ],
      },
    ],
  },
];

const selected = ref<string[]>([]);
</script>

<template>
  <div class="w-full max-w-sm">
    <Cascader
      v-model="selected"
      :options="options"
      placeholder="Select location..."
    />
  </div>
</template>
