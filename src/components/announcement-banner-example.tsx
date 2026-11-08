import * as React from "react";
import { AnnouncementBanner } from "@/components/ui/announcement-banner";

export default function AnnouncementBannerExample() {
  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full">
      {/* Pill Variant */}
      <AnnouncementBanner
        badge="Update"
        message="DesignKit v2.4 introduces 14 brand-new enterprise primitives"
        linkText="Read Changelog"
        href="#changelog"
      />

      {/* Bar Variant */}
      <div className="w-full max-w-lg rounded-xl overflow-hidden border">
        <AnnouncementBanner
          variant="bar"
          badge="Live"
          message="Dual framework parity verified across React 19 & Nuxt 4"
          linkText="Explore Docs"
          href="#docs"
        />
      </div>
    </div>
  );
}
