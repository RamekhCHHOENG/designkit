<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { BentoGrid, BentoCard } from "@/registry/default/ui/bento-grid";
import {
  GlobeIcon,
  ShieldCheckIcon,
  CalendarIcon,
  BellIcon,
  FileTextIcon,
} from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <Example title="Apple Keynote Bento Grid Layout">
      <BentoGrid class="w-full">
        <BentoCard
          name="Global Edge Network"
          description="Ultra-low latency edge compute deployed across 300+ metro regions worldwide with automated DNS failover."
          :icon="GlobeIcon"
          :col-span="2"
          href="#global-edge"
          cta="Explore coverage"
        >
          <template #background>
            <div class="absolute right-0 top-0 size-72 rounded-full bg-primary/10 blur-3xl" />
          </template>
        </BentoCard>

        <BentoCard
          name="Security Guard"
          description="Hardware-isolated enclaves and automatic token rotation."
          :icon="ShieldCheckIcon"
          :col-span="1"
          href="#security"
          cta="View report"
        />

        <BentoCard
          name="Smart Scheduling"
          description="Synchronize team milestones and automated recurring cron triggers without timezone drift."
          :icon="CalendarIcon"
          :col-span="1"
          href="#calendar"
          cta="Schedule event"
        />

        <BentoCard
          name="Real-time Notification Engine"
          description="Instant push alerts, webhook payloads, and SMS fallback with 99.99% delivery SLA."
          :icon="BellIcon"
          :col-span="1"
          href="#notifications"
          cta="Configure webhooks"
        />

        <BentoCard
          name="Documentation & Schema"
          description="Type-safe OpenAPI generators and live interactive playground."
          :icon="FileTextIcon"
          :col-span="1"
          href="#docs"
          cta="Read API docs"
        />
      </BentoGrid>
    </Example>
  </ExampleWrapper>
</template>
