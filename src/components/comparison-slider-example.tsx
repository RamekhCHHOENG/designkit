import * as React from "react";
import { Example, ExampleWrapper } from "@/components/example";
import { ComparisonSlider } from "@/components/ui/comparison-slider";

export default function ComparisonSliderExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Interactive Split-View Comparison Slider">
        <div className="w-full max-w-2xl space-y-2">
          <p className="text-xs text-muted-foreground">
            Drag the center divider handle or use keyboard arrow keys to compare layers.
          </p>

          <ComparisonSlider
            aspectRatio="16/9"
            beforeLabel="Light Theme"
            afterLabel="Dark Theme"
            initialPosition={50}
            before={
              <div className="flex size-full flex-col items-center justify-center bg-white p-8 text-neutral-900">
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
                  <h4 className="font-semibold text-neutral-900">Light Mode Interface</h4>
                  <p className="mt-1 text-xs text-neutral-500">
                    High contrast daylight readability with pure crisp tokens.
                  </p>
                </div>
              </div>
            }
            after={
              <div className="flex size-full flex-col items-center justify-center bg-neutral-950 p-8 text-neutral-50">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm">
                  <h4 className="font-semibold text-neutral-50">Dark Mode Interface</h4>
                  <p className="mt-1 text-xs text-neutral-400">
                    OLED-optimized obsidian theme with relaxed night luminance.
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </Example>
    </ExampleWrapper>
  );
}
