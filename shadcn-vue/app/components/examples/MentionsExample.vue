<script setup lang="ts">
import { ref } from "vue";
import { Mentions, type MentionOption } from "@/registry/default/ui/mentions";

const USERS: MentionOption[] = [
  { value: "sarah", label: "Sarah Connor", description: "Product Designer" },
  { value: "alex", label: "Alex Rivera", description: "Frontend Architect" },
  { value: "elena", label: "Elena Rostova", description: "ML Research Lead" },
  { value: "marcus", label: "Marcus Vance", description: "DevOps Engineer" },
  { value: "john", label: "John Doe", description: "Security Auditor" },
];

const text = ref("Hey @alex, please review the PR when you have time!");
</script>

<template>
  <div class="w-full max-w-md p-4 flex flex-col gap-2">
    <label class="text-xs font-semibold text-foreground">Project Discussion</label>
    <Mentions
      v-model="text"
      :options="USERS"
      placeholder="Leave a comment... (Type @ to mention team members)"
    />
  </div>
</template>
