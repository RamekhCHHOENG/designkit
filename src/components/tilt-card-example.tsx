import * as React from "react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function TiltCardExample() {
  return (
    <div className="flex justify-center p-8 w-full">
      <TiltCard maxRotation={15} perspective={1000} className="w-80">
        <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-card to-muted/30">
          <div className="flex items-center justify-between">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
            <span className="rounded-full border bg-background/50 px-2 py-0.5 text-[10px] font-mono text-muted-foreground backdrop-blur-md">
              VisionOS
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-base text-foreground tracking-tight">
              Spatial Parallax Canvas
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Move your cursor over this card to witness realistic 3D perspective rotation and dynamic specular light glare.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t text-xs font-semibold text-primary">
            <span>Explore 3D Primitives</span>
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
