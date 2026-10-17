"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/ui/copy-button"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
}

export function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  showCopyButton = true,
  className,
  ...props
}: CodeBlockProps) {
  const lines = code.trim().split("\n")

  return (
    <div
      data-slot="code-block"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/70 bg-zinc-950 text-zinc-100 shadow-sm dark:bg-zinc-900/90",
        className
      )}
      {...props}
    >
      {(filename || language || showCopyButton) && (
        <div className="flex h-9 items-center justify-between border-b border-white/10 bg-white/5 px-3.5 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            {filename && <span className="font-mono text-zinc-200 font-medium">{filename}</span>}
            {language && !filename && (
              <span className="font-mono uppercase text-[11px] tracking-wider text-zinc-400">
                {language}
              </span>
            )}
          </div>
          {showCopyButton && (
            <CopyButton
              value={code}
              className="size-6 border-white/10 bg-transparent text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
            />
          )}
        </div>
      )}

      <div className="overflow-x-auto p-3.5 font-mono text-xs leading-relaxed">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 text-right text-zinc-600 dark:text-zinc-500">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="flex-1 text-zinc-200 whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  )
}
