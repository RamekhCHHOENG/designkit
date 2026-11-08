<script setup lang="ts">
import { AnnouncementBanner } from "@/registry/default/ui/announcement-banner";
</script>

<template>
  <div class="w-full max-w-xl">
    <AnnouncementBanner
      title="Scheduled Maintenance"
      description="Database failover migration window begins at 02:00 UTC."
      badge="Alert"
      action-label="Status Page"
      action-href="https://status.example.com"
      variant="warning"
    />
  </div>
</template>
