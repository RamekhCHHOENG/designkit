import React from "react";
import { ScrollShadow } from "@/components/ui/scroll-shadow";
import { Badge } from "@/components/ui/badge";

const items = [
  { id: 1, title: "DesignKit v1.3.0 Architecture", category: "Core", time: "10m ago" },
  { id: 2, title: "Dual-Framework Parity Testing", category: "Quality", time: "25m ago" },
  { id: 3, title: "Zero Layout Shift Viewport Primitives", category: "Performance", time: "1h ago" },
  { id: 4, title: "OKLCH Theme System Calibration", category: "Design", time: "2h ago" },
  { id: 5, title: "Dynamic Scroll Shadow Masking", category: "Animation", time: "3h ago" },
  { id: 6, title: "Vercel Static Edge SPA Deployment", category: "DevOps", time: "4h ago" },
  { id: 7, title: "Accessible Focus-Visible Rings", category: "A11y", time: "5h ago" },
  { id: 8, title: "Universal Icon Motion Primitives", category: "Motion", time: "6h ago" },
];

export function ScrollShadowExample() {
  const [hideScrollbar, setHideScrollbar] = React.useState(false);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Auto-Fading Scroll Container</span>
        <button
          type="button"
          onClick={() => setHideScrollbar(!hideScrollbar)}
          className="text-xs text-primary hover:underline"
        >
          {hideScrollbar ? "Show Scrollbar" : "Hide Scrollbar"}
        </button>
      </div>

      <ScrollShadow
        size={48}
        hideScrollBar={hideScrollbar}
        className="h-56 rounded-xl border bg-card p-2 shadow-xs"
      >
        <div className="space-y-2 p-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border bg-background p-2.5 text-xs transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="text-[10px] text-muted-foreground">{item.time}</span>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                {item.category}
              </Badge>
            </div>
          ))}
        </div>
      </ScrollShadow>
      <p className="text-[11px] text-muted-foreground text-center">
        Scroll up and down — top and bottom shadows smoothly fade in and out.
      </p>
    </div>
  );
}
