<script setup lang="ts">
import { ref } from "vue";
import { TimePicker } from "@/registry/default/ui/time-picker";

const time12 = ref("09:30");
const time24 = ref("16:45");
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-6 w-full max-w-lg items-start">
    <div class="space-y-1.5 w-full">
      <label class="text-xs font-semibold text-muted-foreground">12-Hour Clock (AM/PM)</label>
      <TimePicker v-model="time12" format="12" />
    </div>

    <div class="space-y-1.5 w-full">
      <label class="text-xs font-semibold text-muted-foreground">24-Hour International</label>
      <TimePicker v-model="time24" format="24" />
    </div>
  </div>
</template>
