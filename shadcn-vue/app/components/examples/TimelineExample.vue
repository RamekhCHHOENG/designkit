<script setup lang="ts">
import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineIndicator,
  TimelineSeparator,
  TimelineTitle,
  TimelineDate,
  TimelineContent,
} from "@/registry/default/ui/timeline";
import { CheckIcon } from "lucide-vue-next";
</script>

<template>
  <div class="max-w-md p-6">
    <Timeline :default-value="2">
      <TimelineItem :step="1">
        <TimelineHeader>
          <TimelineSeparator />
          <TimelineIndicator>
            <CheckIcon class="size-3" />
          </TimelineIndicator>
          <TimelineDate>Nov 4</TimelineDate>
          <TimelineTitle>Order placed</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Customer initiated checkout with Stripe payment.</TimelineContent>
      </TimelineItem>

      <TimelineItem :step="2">
        <TimelineHeader>
          <TimelineSeparator />
          <TimelineIndicator>
            <CheckIcon class="size-3" />
          </TimelineIndicator>
          <TimelineDate>Nov 5</TimelineDate>
          <TimelineTitle>Packed & Dispatched</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Package prepared and handed over to courier facility.</TimelineContent>
      </TimelineItem>

      <TimelineItem :step="3">
        <TimelineHeader>
          <TimelineIndicator />
          <TimelineDate>Nov 8</TimelineDate>
          <TimelineTitle>Out for delivery</TimelineTitle>
        </TimelineHeader>
        <TimelineContent>Driver is in transit to destination address.</TimelineContent>
      </TimelineItem>
    </Timeline>
  </div>
</template>
