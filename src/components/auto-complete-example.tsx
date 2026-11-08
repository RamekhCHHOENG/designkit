import * as React from "react";
import { AutoComplete } from "@/components/ui/auto-complete";

const frameworks = [
  { value: "react", label: "React 19", description: "The library for web and native user interfaces" },
  { value: "vue", label: "Vue 3", description: "The progressive JavaScript framework" },
  { value: "nuxt", label: "Nuxt 4", description: "The intuitive Vue framework for full-stack web" },
  { value: "next", label: "Next.js 15", description: "The React framework for the web" },
  { value: "svelte", label: "Svelte 5", description: "Cybernetically enhanced web apps" },
  { value: "tailwind", label: "Tailwind CSS v4", description: "Utility-first CSS framework" },
];

export function AutoCompleteExample() {
  const [selected, setSelected] = React.useState("React 19");

  return (
    <div className="w-full max-w-sm space-y-3">
      <AutoComplete
        options={frameworks}
        value={selected}
        onValueChange={setSelected}
        placeholder="Search modern frameworks..."
        highlightMatches
      />
      <p className="text-xs text-muted-foreground">
        Active selection: <span className="font-mono text-foreground font-medium">{selected || "none"}</span>
      </p>
    </div>
  );
}
