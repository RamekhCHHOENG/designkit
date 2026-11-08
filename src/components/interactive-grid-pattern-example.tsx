import * as React from "react";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Sparkles } from "lucide-react";

export default function InteractiveGridPatternExample() {
  return (
    <div className="relative flex flex-col items-center justify-center p-8 w-full max-w-xl rounded-2xl border bg-card overflow-hidden shadow-sm">
      <InteractiveGridPattern
        width={32}
        height={32}
        squares={[16, 8]}
        className="absolute inset-0 opacity-40"
      />
      <div className="relative z-10 flex flex-col items-center gap-2 text-center pointer-events-none p-4">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs">
          <Sparkles className="size-4" />
        </span>
        <h4 className="font-bold text-base text-foreground tracking-tight">
          Hover to Illuminate
        </h4>
        <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
          The background grid dynamically tracks cursor coordinates and leaves a smooth illuminated trail.
        </p>
      </div>
    </div>
  );
}
