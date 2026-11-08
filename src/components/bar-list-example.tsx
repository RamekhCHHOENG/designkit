import * as React from "react";
import { BarList } from "@/components/ui/bar-list";
import { Globe, Smartphone, Monitor, Tablet } from "lucide-react";

export default function BarListExample() {
  const data = [
    { name: "/home", value: 45620, icon: Globe },
    { name: "/pricing", value: 35120, icon: Monitor },
    { name: "/docs/getting-started", value: 27100, icon: Smartphone },
    { name: "/components/dock", value: 19800, icon: Tablet },
    { name: "/login", value: 12450, icon: Globe },
  ];

  return (
    <div className="flex w-full max-w-md flex-col gap-3 p-4">
      <div className="flex items-center justify-between border-b pb-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Top Pages
        </span>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Visitors
        </span>
      </div>
      <BarList
        data={data}
        valueFormatter={(val) => `${val.toLocaleString()} views`}
      />
    </div>
  );
}
