"use client"

import * as React from "react"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FileDropzoneProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrop"> {
  files?: File[]
  onFilesChange?: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
  accept?: string
  disabled?: boolean
}

export function FileDropzone({
  files: controlledFiles,
  onFilesChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept,
  disabled = false,
  className,
  ...props
}: FileDropzoneProps) {
  const [uncontrolledFiles, setUncontrolledFiles] = React.useState<File[]>([])
  const [isDragOver, setIsDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const currentFiles = controlledFiles !== undefined ? controlledFiles : uncontrolledFiles

  const updateFiles = (nextFiles: File[]) => {
    if (disabled) return
    if (controlledFiles === undefined) {
      setUncontrolledFiles(nextFiles)
    }
    onFilesChange?.(nextFiles)
  }

  const handleAddFiles = (incoming: FileList | null) => {
    if (!incoming) return
    const valid: File[] = []
    for (let i = 0; i < incoming.length; i++) {
      const file = incoming[i]
      if (file && file.size <= maxSize) {
        valid.push(file)
      }
    }
    const combined = [...currentFiles, ...valid].slice(0, maxFiles)
    updateFiles(combined)
  }

  const handleRemove = (index: number) => {
    updateFiles(currentFiles.filter((_, i) => i !== index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (!disabled && e.dataTransfer.files) {
      handleAddFiles(e.dataTransfer.files)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className={cn("w-full space-y-3", className)} data-slot="file-dropzone" {...props}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/20 p-6 text-center transition-all cursor-pointer",
          "hover:border-primary/50 hover:bg-muted/40",
          isDragOver && "border-primary bg-primary/5 scale-[0.99]",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          disabled={disabled}
          onChange={(e) => handleAddFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex size-10 items-center justify-center rounded-full bg-muted shadow-xs mb-3 text-muted-foreground">
          <UploadCloudIcon className="size-5" />
        </div>

        <p className="text-sm font-medium text-foreground">
          Click to upload <span className="font-normal text-muted-foreground">or drag and drop</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {accept ? accept.toUpperCase() : "Any files"} up to {formatSize(maxSize)} (max {maxFiles} files)
        </p>
      </div>

      {currentFiles.length > 0 && (
        <div className="space-y-1.5">
          {currentFiles.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-2 text-xs shadow-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate font-medium text-foreground">{file.name}</span>
                <span className="shrink-0 text-muted-foreground">({formatSize(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="text-muted-foreground hover:text-destructive p-1 outline-none transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <XIcon className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
