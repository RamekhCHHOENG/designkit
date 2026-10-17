import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Tour, type TourStep } from "@/components/ui/tour"
import { Button } from "@/components/ui/button"

export default function TourExample() {
  const [open, setOpen] = React.useState(false)

  const steps: TourStep[] = [
    {
      title: "Navigation Sidebar",
      description: "Quickly browse your workspace primitives, components, and documentation pages.",
      target: () => document.getElementById("tour-target-sidebar"),
    },
    {
      title: "Action Controls",
      description: "Deploy and publish updates directly with automated semantic versioning.",
      target: () => document.getElementById("tour-target-action"),
    },
  ]

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Product Onboarding Guided Tour">
        <div className="w-full max-w-md space-y-4">
          <Button onClick={() => setOpen(true)}>Start Guided Tour</Button>

          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
            <div id="tour-target-sidebar" className="rounded-md bg-muted px-3 py-2 text-xs font-medium">
              Navigation Sidebar
            </div>
            <div id="tour-target-action">
              <Button size="sm" variant="outline">
                Deploy Workspace
              </Button>
            </div>
          </div>
        </div>

        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </Example>
    </ExampleWrapper>
  )
}
