<script setup lang="ts">
import { ref } from "vue";
import { Mentions } from "@/registry/default/ui/mentions";

const content = ref("Hey @alice please review the new release notes!");

const users = [
  { value: "alice", label: "Alice Cooper", description: "Design Systems Lead" },
  { value: "bob", label: "Bob Martin", description: "Backend Engineer" },
  { value: "carol", label: "Carol Danvers", description: "Product Specialist" },
  { value: "dave", label: "Dave Miller", description: "DevOps Engineer" },
];
</script>

<template>
  <div class="w-full max-w-md">
    <Mentions
      v-model="content"
      :options="users"
      placeholder="Type @ to mention team members..."
      :rows="4"
    />
  </div>
</template>
