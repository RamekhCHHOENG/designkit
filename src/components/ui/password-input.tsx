"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrength?: boolean
  strengthMeterProps?: {
    calculateStrength?: (password: string) => { score: number; label: string }
  }
}

function defaultStrengthCalculation(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: "Empty" }
  let score = 0
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  const normalized = Math.min(4, Math.max(1, score - 1))
  const labels = ["Weak", "Fair", "Good", "Strong"]
  return { score: normalized, label: labels[normalized - 1] ?? "Weak" }
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      showStrength = false,
      strengthMeterProps,
      disabled,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false)
    const [capsLockActive, setCapsLockActive] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<string>(
      (value ?? defaultValue ?? "") as string
    )

    const currentText = typeof value === "string" ? value : internalValue

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState("CapsLock")) {
        setCapsLockActive(true)
      } else {
        setCapsLockActive(false)
      }
      props.onKeyDown?.(e)
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.getModifierState("CapsLock")) {
        setCapsLockActive(true)
      } else {
        setCapsLockActive(false)
      }
      props.onKeyUp?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value)
      onChange?.(e)
    }

    const calculate = strengthMeterProps?.calculateStrength ?? defaultStrengthCalculation
    const strength = showStrength && currentText ? calculate(currentText) : null

    const strengthColor = [
      "bg-red-500",
      "bg-amber-500",
      "bg-blue-500",
      "bg-emerald-500",
    ][(strength?.score ?? 1) - 1]

    return (
      <div className="w-full space-y-1.5" data-slot="password-input-root">
        <div
          className={cn(
            "relative flex items-center h-8 w-full rounded-lg border border-input bg-transparent transition-colors",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
            disabled && "opacity-50 pointer-events-none bg-input/50",
            className
          )}
        >
          <input
            ref={ref}
            type={visible ? "text" : "password"}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            disabled={disabled}
            className="h-full w-full bg-transparent px-2.5 py-1 text-sm outline-none placeholder:text-muted-foreground pr-8"
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((v) => !v)}
            disabled={disabled}
            className="absolute right-2 flex size-5 items-center justify-center text-muted-foreground hover:text-foreground outline-none transition-colors"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOffIcon className="size-3.5" /> : <EyeIcon className="size-3.5" />}
          </button>
        </div>

        {capsLockActive && (
          <p className="text-[11px] text-amber-500 font-medium">Caps Lock is on</p>
        )}

        {showStrength && strength && (
          <div className="space-y-1 pt-0.5">
            <div className="flex h-1 w-full gap-1 overflow-hidden rounded-full bg-muted">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "h-full flex-1 transition-all duration-300",
                    level <= strength.score ? strengthColor : "bg-transparent"
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>Password strength</span>
              <span className="font-medium text-foreground">{strength.label}</span>
            </div>
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"
