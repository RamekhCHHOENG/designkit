import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { CopyButton } from "@/components/ui/copy-button"

export default function CopyButtonExample() {
  const installCmd = "npm install @ramekhchhoeng/designkit"

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Tactile One-Click Copy Button">
        <div className="flex w-full max-w-sm items-center justify-between rounded-lg border border-border bg-card p-3 shadow-xs">
          <code className="font-mono text-xs text-foreground truncate pr-2">
            {installCmd}
          </code>
          <CopyButton value={installCmd} />
        </div>
      </Example>
    </ExampleWrapper>
  )
}
