import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Spoiler } from "@/components/ui/spoiler"

export default function SpoilerExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Expandable Content with Gradient Fade">
        <div className="w-full max-w-md">
          <Spoiler maxHeight={90}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              DesignKit is an Apple-inspired, accessible React component library crafted
              with the highest attention to detail. Built on React 19, Tailwind CSS v4,
              Base UI, and Radix primitives, it combines refined OKLCH aesthetics with
              modern full-stack ergonomics. Every primitive delivers keyboard accessibility,
              high-contrast states, and zero-bundle-penalty tree-shakeability.
            </p>
          </Spoiler>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
