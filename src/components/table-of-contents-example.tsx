import * as React from "react";
import { TableOfContents } from "@/components/ui/table-of-contents";

const TOC_ITEMS = [
  { id: "intro", title: "Introduction & Core Philosophy", level: 2 },
  { id: "installation", title: "Installation & Dependencies", level: 2 },
  { id: "tailwind", title: "Tailwind CSS v4 Configuration", level: 3 },
  { id: "base-ui", title: "Base UI Primitives Integration", level: 3 },
  { id: "theming", title: "OKLCH Theming & Design Tokens", level: 2 },
  { id: "troubleshooting", title: "Troubleshooting & FAQ", level: 2 },
];

export default function TableOfContentsExample() {
  return (
    <div className="w-full max-w-sm p-4">
      <TableOfContents
        items={TOC_ITEMS}
        activeId="tailwind"
        title="Documentation Index"
      />
    </div>
  );
}
