import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const timelineEvents = [
  {
    step: 1,
    date: "10:30 AM",
    title: "Deployment initiated",
    description: "Production build triggered by GitHub Actions workflow #4182.",
  },
  {
    step: 2,
    date: "10:32 AM",
    title: "Container image built",
    description: "Docker image passed vulnerability scan and published to registry.",
  },
  {
    step: 3,
    date: "10:35 AM",
    title: "Database migrations applied",
    description: "Schema updated with migration 20261017_add_audit_logs.",
  },
  {
    step: 4,
    date: "10:38 AM",
    title: "Health checks verified",
    description: "All microservices responding 200 OK. Traffic route switched to green.",
  },
]

export default function TimelineExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <ActivityTimeline />
    </ExampleWrapper>
  )
}

function ActivityTimeline() {
  return (
    <Example title="Activity Audit Feed">
      <div className="w-full max-w-md p-2">
        <Timeline defaultValue={3}>
          {timelineEvents.map((event) => (
            <TimelineItem key={event.step} step={event.step}>
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineIndicator />
                <TimelineDate>{event.date}</TimelineDate>
                <TimelineTitle>{event.title}</TimelineTitle>
              </TimelineHeader>
              <TimelineContent className="mt-1">
                {event.description}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Example>
  )
}
