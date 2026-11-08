import * as React from "react";
import { Example, ExampleWrapper } from "@/components/example";
import { Marquee } from "@/components/ui/marquee";
import { Badge } from "@/components/ui/badge";

const techItems = [
  { name: "React 19", category: "UI Library" },
  { name: "TypeScript 5", category: "Language" },
  { name: "Tailwind CSS v4", category: "Styling" },
  { name: "Base UI", category: "Headless" },
  { name: "Nuxt 4", category: "Vue Framework" },
  { name: "Vite 6", category: "Bundler" },
  { name: "OKLCH Colors", category: "Color Space" },
  { name: "Radix Primitives", category: "Accessibility" },
];

export default function MarqueeExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Infinite Horizontal Marquee (with edge blur)">
        <div className="w-full space-y-4">
          <Marquee pauseOnHover speed={25} gap="1.5rem">
            {techItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 shadow-2xs backdrop-blur-md"
              >
                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  {item.category}
                </Badge>
              </div>
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover speed={30} gap="1.5rem">
            {techItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/50 px-4 py-2.5 shadow-2xs"
              >
                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {item.category}
                </Badge>
              </div>
            ))}
          </Marquee>
        </div>
      </Example>
    </ExampleWrapper>
  );
}
