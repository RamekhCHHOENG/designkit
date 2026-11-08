<script setup lang="ts">
import {
  MiniCalendar,
  MiniCalendarNavigation,
  MiniCalendarDays,
  MiniCalendarDay,
} from "@/registry/default/ui/mini-calendar";
</script>

<template>
  <div class="max-w-md p-6">
    <MiniCalendar>
      <MiniCalendarNavigation direction="prev" />
      <MiniCalendarDays v-slot="{ date }">
        <MiniCalendarDay :date="date" />
      </MiniCalendarDays>
      <MiniCalendarNavigation direction="next" />
    </MiniCalendar>
  </div>
</template>
