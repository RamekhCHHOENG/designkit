import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { installCommand } from "@/registry-url"

/** A copyable `npx shadcn@latest add <url>` line for a registry item. */
export function InstallCommand({ name, className = "" }: { name: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const command = installCommand(name)

  return (
    <div className={`flex items-center gap-2 rounded-lg border bg-muted/40 py-1 pr-1 pl-3 font-mono text-xs ${className}`}>
      <span className="text-muted-foreground select-none">$</span>
      <code className="min-w-0 flex-1 truncate" title={command}>
        {command}
      </code>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={copied ? "Copied" : "Copy install command"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(command)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1400)
          } catch {
            // Clipboard unavailable -- best effort only.
          }
        }}
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </Button>
    </div>
  )
}
