"use client"

import * as React from "react"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  LockIcon,
  ServerCrashIcon,
  XCircleIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type ResultStatus = "404" | "403" | "500" | "success" | "warning" | "error" | "info"

export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  status?: ResultStatus
  icon?: React.ReactNode
  title?: React.ReactNode
  subTitle?: React.ReactNode
  extra?: React.ReactNode
}

const statusIcons: Record<ResultStatus, React.ReactNode> = {
  "404": (
    <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <span className="font-mono text-xl font-bold">404</span>
    </div>
  ),
  "403": (
    <div className="flex size-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
      <LockIcon className="size-8" />
    </div>
  ),
  "500": (
    <div className="flex size-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
      <ServerCrashIcon className="size-8" />
    </div>
  ),
  success: (
    <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
      <CheckCircle2Icon className="size-8" />
    </div>
  ),
  warning: (
    <div className="flex size-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
      <AlertTriangleIcon className="size-8" />
    </div>
  ),
  error: (
    <div className="flex size-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
      <XCircleIcon className="size-8" />
    </div>
  ),
  info: (
    <div className="flex size-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
      <InfoIcon className="size-8" />
    </div>
  ),
}

export function Result({
  status = "info",
  icon,
  title,
  subTitle,
  extra,
  className,
  children,
  ...props
}: ResultProps) {
  const displayIcon = icon ?? statusIcons[status]

  return (
    <div
      data-slot="result"
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-4">{displayIcon}</div>
      {title && (
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>
      )}
      {subTitle && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
          {subTitle}
        </p>
      )}
      {extra && <div className="mt-6 flex flex-wrap items-center justify-center gap-3">{extra}</div>}
      {children}
    </div>
  )
}
