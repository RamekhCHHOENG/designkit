import * as React from "react";
import { SparklesIcon } from "lucide-react";
import { Example, ExampleWrapper } from "@/components/example";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";

export default function SpotlightExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-2">
      <Example title="Cursor-Following Spotlight (Background)">
        <Spotlight
          variant="background"
          size={300}
          fillOpacity={0.2}
          className="w-full space-y-4"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <SparklesIcon className="size-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold">VisionOS Ambient Glow</h4>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Move your pointer across this card to see an organic radial light beam follow your cursor with smooth decay.
            </p>
          </div>
          <Button variant="outline" size="sm">
            Interactive Surface
          </Button>
        </Spotlight>
      </Example>

      <Example title="Cursor-Following Spotlight (Border Highlight)">
        <Spotlight
          variant="border"
          size={250}
          className="w-full space-y-4 border-2"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
            <SparklesIcon className="size-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold">Border Specular Ray</h4>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Only the card perimeter illuminates where the cursor hovers, creating an illuminated rim effect.
            </p>
          </div>
          <Button size="sm">Explore Effect</Button>
        </Spotlight>
      </Example>
    </ExampleWrapper>
  );
}
