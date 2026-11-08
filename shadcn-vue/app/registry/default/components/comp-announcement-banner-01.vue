<script setup lang="ts">
import { AnnouncementBanner } from "@/registry/default/ui/announcement-banner";
</script>

<template>
  <div class="w-full max-w-xl">
    <AnnouncementBanner
      title="DesignKit 2.4 is live!"
      description="Explore 14 new developer primitives with full React & Vue parity."
      badge="Release"
      action-label="See Changelog"
      action-href="#diff-viewer"
      variant="default"
    />
  </div>
</template>
