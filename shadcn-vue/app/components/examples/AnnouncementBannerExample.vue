<script setup lang="ts">
import { AnnouncementBanner } from "@/registry/default/ui/announcement-banner";
</script>

<template>
  <div class="flex flex-col items-center gap-6 p-4 w-full">
    <!-- Pill Variant -->
    <AnnouncementBanner
      badge="Update"
      message="DesignKit v2.4 introduces 14 brand-new enterprise primitives"
      link-text="Read Changelog"
      href="#changelog"
    />

    <!-- Bar Variant -->
    <div class="w-full max-w-lg rounded-xl overflow-hidden border">
      <AnnouncementBanner
        variant="bar"
        badge="Live"
        message="Dual framework parity verified across React 19 & Nuxt 4"
        link-text="Explore Docs"
        href="#docs"
      />
    </div>
  </div>
</template>
