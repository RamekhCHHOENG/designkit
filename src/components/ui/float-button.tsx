"use client"

import * as React from "react"
import { ArrowUpIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FloatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  description?: string
  badge?: React.ReactNode
}

export function FloatButton({
  icon,
  className,
  children,
  ...props
}: FloatButtonProps) {
  return (
    <button
      type="button"
      data-slot="float-button"
      className={cn(
        "relative flex size-10 items-center justify-center rounded-full border border-border/80 bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-muted active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {icon ?? children ?? <PlusIcon className="size-4" />}
    </button>
  )
}

export interface FloatButtonBackTopProps extends FloatButtonProps {
  visibilityHeight?: number
  target?: () => HTMLElement | Window
}

export function FloatButtonBackTop({
  visibilityHeight = 400,
  target,
  className,
  ...props
}: FloatButtonBackTopProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const scrollTarget = target ? target() : window

    const handleScroll = () => {
      const scrollTop =
        "scrollY" in scrollTarget
          ? scrollTarget.scrollY
          : (scrollTarget as HTMLElement).scrollTop
      setVisible(scrollTop >= visibilityHeight)
    }

    scrollTarget.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll)
    }
  }, [visibilityHeight, target])

  const scrollToTop = () => {
    const scrollTarget = target ? target() : window
    scrollTarget.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <FloatButton
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn("text-primary hover:text-primary", className)}
      icon={<ArrowUpIcon className="size-4" />}
      {...props}
    />
  )
}

export interface FloatButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: "click" | "hover"
  icon?: React.ReactNode
}

export function FloatButtonGroup({
  trigger = "click",
  icon,
  children,
  className,
  ...props
}: FloatButtonGroupProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div
      data-slot="float-button-group"
      className={cn("fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 select-none", className)}
      onMouseEnter={() => trigger === "hover" && setOpen(true)}
      onMouseLeave={() => trigger === "hover" && setOpen(false)}
      {...props}
    >
      {open && (
        <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {children}
        </div>
      )}

      <FloatButton
        onClick={() => trigger === "click" && setOpen(!open)}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        icon={icon ?? <PlusIcon className={cn("size-4 transition-transform duration-300", open && "rotate-45")} />}
      />
    </div>
  )
}
