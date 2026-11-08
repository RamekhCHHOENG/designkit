import * as React from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ShimmerButtonExample() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 w-full">
      <ShimmerButton
        shimmerColor="#38bdf8"
        background="rgba(15, 23, 42, 0.95)"
        className="text-white"
      >
        <Sparkles className="size-3.5 text-sky-400" />
        <span>Deploy to Production</span>
        <ArrowRight className="size-3.5 ml-1" />
      </ShimmerButton>
    </div>
  );
}
