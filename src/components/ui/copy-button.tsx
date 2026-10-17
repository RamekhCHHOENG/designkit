"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  timeout?: number
  onCopySuccess?: () => void
  onCopyError?: (err: unknown) => void
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      timeout = 2000,
      onCopySuccess,
      onCopyError,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled || !value) return

      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        onCopySuccess?.()

        setTimeout(() => {
          setCopied(false)
        }, timeout)
      } catch (err) {
        onCopyError?.(err)
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        data-slot="copy-button"
        data-copied={copied ? "true" : undefined}
        className={cn(
          "inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          copied && "border-emerald-500/50 text-emerald-600 dark:text-emerald-400",
          className
        )}
        {...props}
      >
        {copied ? (
          <CheckIcon className="size-3.5 transition-transform scale-100" />
        ) : (
          (children ?? <CopyIcon className="size-3.5 transition-transform" />)
        )}
      </button>
    )
  }
)

CopyButton.displayName = "CopyButton"
