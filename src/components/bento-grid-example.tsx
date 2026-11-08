import * as React from "react";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Example, ExampleWrapper } from "@/components/example";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

export default function BentoGridExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Apple Keynote Bento Grid Layout">
        <BentoGrid className="w-full">
          <BentoCard
            name="Global Edge Network"
            description="Ultra-low latency edge compute deployed across 300+ metro regions worldwide with automated DNS failover."
            icon={GlobeIcon}
            colSpan={2}
            href="#global-edge"
            cta="Explore coverage"
            background={
              <div className="absolute right-0 top-0 size-72 rounded-full bg-primary/10 blur-3xl" />
            }
          />
          <BentoCard
            name="Security Guard"
            description="Hardware-isolated enclaves and automatic token rotation."
            icon={ShieldCheckIcon}
            colSpan={1}
            href="#security"
            cta="View report"
          />
          <BentoCard
            name="Smart Scheduling"
            description="Synchronize team milestones and automated recurring cron triggers without timezone drift."
            icon={CalendarIcon}
            colSpan={1}
            href="#calendar"
            cta="Schedule event"
          />
          <BentoCard
            name="Real-time Notification Engine"
            description="Instant push alerts, webhook payloads, and SMS fallback with 99.99% delivery SLA."
            icon={BellIcon}
            colSpan={1}
            href="#notifications"
            cta="Configure webhooks"
          />
          <BentoCard
            name="Documentation & Schema"
            description="Type-safe OpenAPI generators and live interactive playground."
            icon={FileTextIcon}
            colSpan={1}
            href="#docs"
            cta="Read API docs"
          />
        </BentoGrid>
      </Example>
    </ExampleWrapper>
  );
}
