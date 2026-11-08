import * as React from "react";
import { ToolCallCard } from "@/components/ui/tool-call-card";

export function ToolCallCardExample() {
  const [status, setStatus] = React.useState<"pending" | "running" | "success">("pending");

  return (
    <div className="w-full max-w-md space-y-4">
      <ToolCallCard
        toolName="read_codebase_schema"
        status="success"
        durationMs={185}
        args={{ path: "src/lib/index.ts", lineRange: [1, 50] }}
        result={{ exportsFound: 135, framework: "React 19 + Vue 3" }}
      />

      <ToolCallCard
        toolName="deploy_edge_worker"
        status={status}
        durationMs={status === "success" ? 420 : undefined}
        requiresConfirmation={status === "pending"}
        onConfirm={() => {
          setStatus("running");
          setTimeout(() => setStatus("success"), 1200);
        }}
        args={{ target: "production", region: "iad1", version: "v2.5.0" }}
        result={status === "success" ? { url: "https://edge.designkit.io" } : undefined}
      />
    </div>
  );
}
