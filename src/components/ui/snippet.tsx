"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type PackageManager = "pnpm" | "npm" | "bun" | "yarn";

export interface SnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string;
  action?: "install" | "add" | "exec" | "create";
  packageManagers?: PackageManager[];
  customCommands?: Partial<Record<PackageManager, string>>;
  showCopy?: boolean;
}

const actionPrefixes: Record<
  "install" | "add" | "exec" | "create",
  Record<PackageManager, string>
> = {
  install: {
    pnpm: "pnpm add",
    npm: "npm install",
    bun: "bun add",
    yarn: "yarn add",
  },
  add: {
    pnpm: "pnpm dlx shadcn@latest add",
    npm: "npx shadcn@latest add",
    bun: "bunx --bun shadcn@latest add",
    yarn: "npx shadcn@latest add",
  },
  exec: {
    pnpm: "pnpm dlx",
    npm: "npx",
    bun: "bunx",
    yarn: "yarn dlx",
  },
  create: {
    pnpm: "pnpm create",
    npm: "npm create",
    bun: "bun create",
    yarn: "yarn create",
  },
};

export function Snippet({
  command = "@ramekhchhoeng/designkit",
  action = "install",
  packageManagers = ["pnpm", "npm", "bun", "yarn"],
  customCommands,
  showCopy = true,
  className,
  ...props
}: SnippetProps) {
  const [selectedPm, setSelectedPm] = React.useState<PackageManager>(
    packageManagers[0] ?? "pnpm"
  );
  const [copied, setCopied] = React.useState(false);

  const fullCommand = React.useMemo(() => {
    if (customCommands && customCommands[selectedPm]) {
      return customCommands[selectedPm]!;
    }
    const prefix = actionPrefixes[action][selectedPm];
    return `${prefix} ${command}`.trim();
  }, [action, selectedPm, command, customCommands]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-muted/50 text-foreground shadow-xs dark:bg-card/60",
        className
      )}
      {...props}
    >
      {/* Header bar with PM Switcher & Copy */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/80 px-3 py-1.5 text-xs">
        <div className="flex items-center gap-1">
          <TerminalIcon className="size-3.5 text-muted-foreground mr-1" />
          {packageManagers.map((pm) => (
            <button
              key={pm}
              type="button"
              onClick={() => setSelectedPm(pm)}
              className={cn(
                "rounded-md px-2 py-0.5 font-medium transition-colors hover:text-foreground",
                selectedPm === pm
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {pm}
            </button>
          ))}
        </div>

        {showCopy && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy command"}
            className="size-7 text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <CheckIcon className="size-3.5 text-emerald-500" />
            ) : (
              <CopyIcon className="size-3.5" />
            )}
          </Button>
        )}
      </div>

      {/* Code body */}
      <div className="flex items-center overflow-x-auto px-4 py-3 font-mono text-xs">
        <span className="select-none text-muted-foreground mr-2 font-bold">$</span>
        <code className="text-foreground">{fullCommand}</code>
      </div>
    </div>
  );
}
