<script setup lang="ts">
import { ref } from "vue";
import { PasswordInput } from "@/registry/default/ui/password-input";

const password = ref("SuperSecret123!");
</script>

<template>
  <div class="max-w-sm space-y-4 p-6">
    <div class="space-y-1.5">
      <label class="text-xs font-medium text-muted-foreground">Password with Strength Meter</label>
      <PasswordInput v-model="password" show-strength />
    </div>
  </div>
</template>
