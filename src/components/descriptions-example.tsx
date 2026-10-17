import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Descriptions } from "@/components/ui/descriptions"
import { Badge } from "@/components/ui/badge"

export default function DescriptionsExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="macOS Inspector Style Metadata Grid">
        <div className="w-full max-w-lg">
          <Descriptions
            title="Deployment Specification"
            column={2}
            items={[
              { label: "Environment", children: <Badge variant="secondary">Production</Badge> },
              { label: "Region", children: "us-east-1 (N. Virginia)" },
              { label: "Cluster ID", children: "prod-eks-0419" },
              { label: "Replicas", children: "8 pods active" },
              { label: "Memory Limit", children: "16 GB" },
              { label: "SSL Certificate", children: "Let's Encrypt (Auto-renew)" },
            ]}
          />
        </div>
      </Example>
    </ExampleWrapper>
  )
}
