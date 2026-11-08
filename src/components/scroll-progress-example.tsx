import React from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Button } from "@/components/ui/button";

export function ScrollProgressExample() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [gradient, setGradient] = React.useState(true);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Container Scroll Progress</span>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7"
          onClick={() => setGradient(!gradient)}
        >
          {gradient ? "Gradient Bar" : "Solid Bar"}
        </Button>
      </div>

      <div className="relative rounded-xl border bg-card overflow-hidden shadow-xs">
        {/* Progress bar attached to container */}
        <ScrollProgress
          target={containerRef}
          gradient={gradient}
          className="absolute top-0 left-0 right-0 h-1"
        />

        <div
          ref={containerRef}
          className="h-48 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed text-muted-foreground"
        >
          <p className="font-medium text-foreground">
            Scroll down inside this box to see the progress bar respond in real-time.
          </p>
          <p>
            DesignKit’s ScrollProgress can target either the global viewport window (for long page reading indicators) or any scrollable container element via an element reference.
          </p>
          <p>
            It uses passive scroll listeners throttled through <code>requestAnimationFrame</code> for butter-smooth 60fps/120fps physics without layout thrashing or stutter.
          </p>
          <p>
            Switch between solid theme primary color and the signature DesignKit OKLCH gradient with a single prop: <code>gradient</code>.
          </p>
          <p>
            Fully accessible with ARIA <code>progressbar</code> attributes (<code>valuenow</code>, <code>valuemin</code>, <code>valuemax</code>).
          </p>
        </div>
      </div>
    </div>
  );
}
