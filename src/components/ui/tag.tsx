"use client"

import * as React from "react"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium transition-all select-none border",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/60 text-foreground hover:bg-muted",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-border bg-transparent text-foreground hover:bg-muted/50",
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20",
        warning: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px] gap-1",
        default: "h-6 px-2 text-xs gap-1.5",
        lg: "h-7 px-2.5 text-xs gap-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  closable?: boolean
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
  checkable?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  icon?: React.ReactNode
}

export function Tag({
  variant,
  size,
  closable = false,
  onClose,
  checkable = false,
  checked = false,
  onCheckedChange,
  icon,
  className,
  children,
  ...props
}: TagProps) {
  const handleClick = () => {
    if (checkable) {
      onCheckedChange?.(!checked)
    }
  }

  return (
    <span
      data-slot="tag"
      onClick={handleClick}
      className={cn(
        tagVariants({ variant, size }),
        checkable && "cursor-pointer transition-colors",
        checkable && checked && "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 [&_svg]:size-3">{icon}</span>}
      <span>{children}</span>
      {closable && (
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            onClose?.(e)
          }}
          className="rounded-xs p-0.5 text-muted-foreground/70 hover:bg-black/10 hover:text-foreground dark:hover:bg-white/10 outline-none transition-colors"
          aria-label="Remove tag"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </span>
  )
}
