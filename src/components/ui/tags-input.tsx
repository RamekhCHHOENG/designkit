"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface TagsInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  allowDuplicates?: boolean
  disabled?: boolean
  delimiter?: string | RegExp
}

export const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      placeholder = "Add a tag...",
      maxTags = Infinity,
      allowDuplicates = false,
      disabled = false,
      delimiter = ",",
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue)
    const [inputValue, setInputValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const tags = controlledValue !== undefined ? controlledValue : uncontrolledValue

    const updateTags = (nextTags: string[]) => {
      if (disabled) return
      if (controlledValue === undefined) {
        setUncontrolledValue(nextTags)
      }
      onValueChange?.(nextTags)
    }

    const addTag = (rawTag: string) => {
      const trimmed = rawTag.trim()
      if (!trimmed) return
      if (tags.length >= maxTags) return
      if (!allowDuplicates && tags.includes(trimmed)) return

      updateTags([...tags, trimmed])
      setInputValue("")
    }

    const removeTag = (indexToRemove: number) => {
      if (disabled) return
      updateTags(tags.filter((_, i) => i !== indexToRemove))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === "," && delimiter === ",") {
        e.preventDefault()
        addTag(inputValue)
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        e.preventDefault()
        removeTag(tags.length - 1)
      }
    }

    return (
      <div
        data-slot="tags-input"
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-transparent px-2 py-1 text-sm transition-colors cursor-text",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "opacity-50 pointer-events-none cursor-not-allowed bg-input/50",
          className
        )}
        {...props}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground transition-all"
          >
            <span>{tag}</span>
            {!disabled && (
              <button
                type="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(index)
                }}
                className="text-muted-foreground hover:text-foreground outline-none transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <XIcon className="size-3" />
              </button>
            )}
          </span>
        ))}

        {tags.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[80px] bg-transparent outline-none placeholder:text-muted-foreground text-sm"
          />
        )}
      </div>
    )
  }
)

TagsInput.displayName = "TagsInput"
