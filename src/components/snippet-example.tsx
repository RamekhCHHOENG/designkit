import * as React from "react";
import { Example, ExampleWrapper } from "@/components/example";
import { Snippet } from "@/components/ui/snippet";

export default function SnippetExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Package Manager Snippet Box">
        <div className="w-full max-w-xl space-y-4">
          <div>
            <h4 className="text-sm font-semibold">Install Library Package</h4>
            <p className="text-xs text-muted-foreground">
              Toggle between pnpm, npm, bun, and yarn, then click to copy the full command.
            </p>
          </div>

          <Snippet command="@ramekhchhoeng/designkit" action="install" />

          <div className="pt-2">
            <h4 className="text-sm font-semibold">Add Component via CLI</h4>
            <p className="text-xs text-muted-foreground">
              Shadcn-compatible registry installer for individual primitives.
            </p>
          </div>

          <Snippet command="dock" action="add" />
        </div>
      </Example>
    </ExampleWrapper>
  );
}
