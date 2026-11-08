import * as React from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Radio Card Context ---
interface RadioCardContextType {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioCardContext = React.createContext<RadioCardContextType | null>(null);

// --- Radio Card Group ---
export interface RadioCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function RadioCardGroup({
  name,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  children,
  ...props
}: RadioCardGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleSelect = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <RadioCardContext.Provider
      value={{
        name,
        value: currentValue,
        onValueChange: handleSelect,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}
        {...props}
      >
        {children}
      </div>
    </RadioCardContext.Provider>
  );
}

// --- Radio Card Item ---
export interface RadioCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "title"> {
  value: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  price?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  indicator?: "check" | "radio" | "none";
  disabled?: boolean;
}

export function RadioCard({
  value,
  title,
  description,
  price,
  badge,
  icon,
  indicator = "radio",
  disabled: itemDisabled = false,
  className,
  children,
  ...props
}: RadioCardProps) {
  const context = React.useContext(RadioCardContext);
  const isSelected = context?.value === value;
  const isDisabled = context?.disabled || itemDisabled;

  const handleClick = () => {
    if (isDisabled) return;
    context?.onValueChange?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border p-4 text-start transition-all cursor-pointer select-none",
        "bg-card hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isSelected
          ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
          : "border-border hover:border-foreground/30",
        isDisabled && "pointer-events-none opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors",
                isSelected ? "border-primary text-primary" : "text-muted-foreground"
              )}
            >
              {icon}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm leading-tight text-foreground">{title}</span>
              {badge && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Indicator */}
        {indicator !== "none" && (
          <div
            className={cn(
              "flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5",
              isSelected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-muted-foreground/40 bg-background"
            )}
          >
            {indicator === "radio" && isSelected && (
              <span className="size-1.5 rounded-full bg-primary-foreground" />
            )}
            {indicator === "check" && isSelected && <Check className="size-3 stroke-[3]" />}
          </div>
        )}
      </div>

      {/* Description Body */}
      {description && (
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{description}</p>
      )}

      {children}

      {/* Price / Bottom Tag */}
      {price && (
        <div className="mt-3 pt-3 border-t border-border/50 flex items-baseline gap-1 text-sm font-semibold text-foreground">
          {price}
        </div>
      )}
    </div>
  );
}

// --- Checkbox Card (Multi-Select) ---
export interface CheckboxCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "title"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  price?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function CheckboxCard({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  title,
  description,
  price,
  badge,
  icon,
  disabled = false,
  className,
  children,
  ...props
}: CheckboxCardProps) {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border p-4 text-start transition-all cursor-pointer select-none",
        "bg-card hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isChecked
          ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
          : "border-border hover:border-foreground/30",
        disabled && "pointer-events-none opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors",
                isChecked ? "border-primary text-primary" : "text-muted-foreground"
              )}
            >
              {icon}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm leading-tight text-foreground">{title}</span>
              {badge && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-md border transition-colors mt-0.5",
            isChecked
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground/40 bg-background"
          )}
        >
          {isChecked && <Check className="size-3 stroke-[3]" />}
        </div>
      </div>

      {description && (
        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{description}</p>
      )}

      {children}

      {price && (
        <div className="mt-3 pt-3 border-t border-border/50 flex items-baseline gap-1 text-sm font-semibold text-foreground">
          {price}
        </div>
      )}
    </div>
  );
}
