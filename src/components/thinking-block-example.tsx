import * as React from "react";
import { ThinkingBlock } from "@/components/ui/thinking-block";

export default function ThinkingBlockExample() {
  const [isStreaming, setIsStreaming] = React.useState(false);

  return (
    <div className="flex w-full max-w-lg flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsStreaming(!isStreaming)}
          className="text-xs px-2.5 py-1 rounded-md border bg-muted/60 hover:bg-muted font-medium transition-colors"
        >
          {isStreaming ? "Stop Stream" : "Simulate Stream"}
        </button>
      </div>

      <ThinkingBlock
        title="Reasoning Chain"
        isStreaming={isStreaming}
        durationMs={1850}
        tokens={420}
        defaultOpen={true}
      >
        {`1. Analyze incoming user request for component parity.
2. Scan existing catalog entries across React 19 and Nuxt 4.
3. Validate WAI-ARIA keyboard interaction models.
4. Calculate proportional flex allocations for category segments.
5. Verification completed with zero hydration mismatch.`}
      </ThinkingBlock>
    </div>
  );
}
