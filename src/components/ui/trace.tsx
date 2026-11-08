import * as React from "react";
import { CheckCircle2, AlertCircle, Loader2, Circle, ChevronDown, Wrench, Brain, Bot, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TraceStep {
  id: string | number;
  name: string;
  type?: "tool" | "reasoning" | "subagent" | "message" | "custom";
  status: "running" | "success" | "error" | "pending";
  durationMs?: number;
  summary?: string;
  details?: React.ReactNode;
}

export interface TraceProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TraceStep[];
  activeStepId?: string | number;
  onStepClick?: (step: TraceStep) => void;
}

export function Trace({ steps, activeStepId, onStepClick, className, ...props }: TraceProps) {
  const [expandedSteps, setExpandedSteps] = React.useState<Record<string | number, boolean>>({});

  const toggleExpand = (id: string | number) => {
    setExpandedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStepIcon = (step: TraceStep) => {
    if (step.status === "running") {
      return <Loader2 className="size-4 animate-spin text-primary" />;
    }
    if (step.status === "success") {
      return <CheckCircle2 className="size-4 text-emerald-500" />;
    }
    if (step.status === "error") {
      return <AlertCircle className="size-4 text-rose-500" />;
    }
    return <Circle className="size-4 text-muted-foreground/50" />;
  };

  const getTypeIcon = (type?: TraceStep["type"]) => {
    switch (type) {
      case "tool":
        return <Wrench className="size-3 text-amber-500" />;
      case "reasoning":
        return <Brain className="size-3 text-purple-500" />;
      case "subagent":
        return <Bot className="size-3 text-blue-500" />;
      case "message":
        return <MessageSquare className="size-3 text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      data-slot="trace"
      className={cn("flex flex-col w-full relative", className)}
      role="feed"
      aria-label="Execution Trace"
      {...props}
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;
        const isExpanded = !!expandedSteps[step.id];
        const isActive = activeStepId === step.id;

        return (
          <div key={step.id} className="relative flex gap-3.5 group">
            {/* Timeline Vertical Connector */}
            {!isLast && (
              <div
                className="absolute left-[15px] top-7 bottom-0 w-[2px] bg-border/70"
                aria-hidden="true"
              />
            )}

            {/* Status Node Icon */}
            <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-background border shadow-2xs">
              {getStepIcon(step)}
            </div>

            {/* Step Content */}
            <div className="flex-1 pb-6 pt-1">
              <div
                onClick={() => {
                  toggleExpand(step.id);
                  onStepClick?.(step);
                }}
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-lg border bg-card/60 hover:bg-muted/40 cursor-pointer transition-all",
                  isActive && "ring-1 ring-primary border-primary/50",
                  step.status === "error" && "border-rose-500/30 bg-rose-500/5"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  {getTypeIcon(step.type)}
                  <span className="text-sm font-medium text-foreground truncate">
                    {step.name}
                  </span>
                  {step.type && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase">
                      {step.type}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 ml-2">
                  {step.durationMs !== undefined && (
                    <span className="font-mono text-[11px]">
                      {step.durationMs < 1000
                        ? `${step.durationMs}ms`
                        : `${(step.durationMs / 1000).toFixed(2)}s`}
                    </span>
                  )}
                  {step.details && (
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  )}
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && step.details && (
                <div className="mt-2 p-3 rounded-lg border bg-muted/40 text-xs font-mono text-muted-foreground overflow-auto">
                  {step.details}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
