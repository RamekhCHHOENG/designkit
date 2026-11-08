<script setup lang="ts">
import { ref } from "vue";
import { SegmentedControl } from "@/registry/default/ui/segmented-control";
import { LayoutGridIcon, ListIcon, CalendarIcon } from "lucide-vue-next";

const view = ref("grid");
const size = ref("monthly");
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-6">
    <div class="flex flex-col items-center gap-2">
      <span class="text-xs text-muted-foreground">Icon + Text Segments</span>
      <SegmentedControl
        v-model="view"
        :options="[
          { value: 'grid', label: 'Grid', icon: LayoutGridIcon },
          { value: 'list', label: 'List', icon: ListIcon },
          { value: 'calendar', label: 'Calendar', icon: CalendarIcon },
        ]"
      />
    </div>

    <div class="flex flex-col items-center gap-2">
      <span class="text-xs text-muted-foreground">Text Only (Small)</span>
      <SegmentedControl
        v-model="size"
        size="sm"
        :options="['daily', 'weekly', 'monthly', 'yearly']"
      />
    </div>
  </div>
</template>
