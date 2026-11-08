<script setup lang="ts">
import { ref } from "vue";
import { TimePicker } from "@/registry/default/ui/time-picker";

const time12 = ref("09:30");
</script>

<template>
  <div class="w-full max-w-xs space-y-2 p-2">
    <label class="text-xs font-semibold text-muted-foreground">Select Schedule Time</label>
    <TimePicker v-model="time12" format="12" />
  </div>
</template>
