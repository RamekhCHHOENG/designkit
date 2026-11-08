<script setup lang="ts">
import {
  DateRangePicker,
  DateRangePickerField,
  DateRangePickerInput,
  DateRangePickerTrigger,
  DateRangePickerCalendar,
} from "@/registry/default/ui/date-range-picker";
import { Label } from "@/registry/default/ui/label";
</script>

<template>
  <div class="max-w-sm space-y-2 p-6">
    <Label>Booking Period</Label>
    <DateRangePicker>
      <DateRangePickerField>
        <DateRangePickerInput type="start" />
        <span class="text-muted-foreground px-1">-</span>
        <DateRangePickerInput type="end" />
        <DateRangePickerTrigger />
      </DateRangePickerField>
      <DateRangePickerCalendar />
    </DateRangePicker>
  </div>
</template>
