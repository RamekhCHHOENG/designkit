"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export type PhoneValue = RPNInput.Value

export interface PhoneInputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "defaultValue"> {
  value?: PhoneValue
  defaultValue?: PhoneValue
  onChange?: (value: PhoneValue) => void
  defaultCountry?: RPNInput.Country
  disabled?: boolean
}

const PhoneInputCustom = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn(
        "-ms-px rounded-s-none shadow-none focus-visible:z-10",
        className
      )}
      {...props}
    />
  )
}

PhoneInputCustom.displayName = "PhoneInputCustom"

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: { label: string; value: RPNInput.Country | undefined }[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as RPNInput.Country)
  }

  return (
    <div className="border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground relative inline-flex items-center self-stretch rounded-s-lg border py-1 ps-2.5 pe-2 transition-colors outline-none focus-within:z-10 focus-within:ring-3 has-disabled:pointer-events-none has-disabled:opacity-50">
      <div className="inline-flex items-center gap-1.5" aria-hidden="true">
        <FlagComponent country={value} countryName={value} aria-hidden="true" />
        <span className="text-muted-foreground/80">
          <ChevronDownIcon className="size-3.5" aria-hidden="true" />
        </span>
      </div>
      <select
        disabled={disabled}
        value={value}
        onChange={handleSelect}
        className="absolute inset-0 text-sm opacity-0 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Select country"
      >
        <option key="default" value="">
          Select a country
        </option>
        {options
          .filter((x) => x.value)
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
            </option>
          ))}
      </select>
    </div>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-xs bg-foreground/15 [&_svg]:size-full">
      {Flag ? <Flag title={countryName} /> : null}
    </span>
  )
}

const PhoneInput = ({
  className,
  value,
  defaultValue,
  onChange,
  defaultCountry = "US",
  disabled,
  ...props
}: PhoneInputProps) => {
  const RPN = (RPNInput as any).default || RPNInput

  return (
    <div className={cn("flex rounded-lg shadow-xs", className)} dir="ltr">
      <RPN
        international
        defaultCountry={defaultCountry}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={PhoneInputCustom}
        value={value}
        defaultValue={defaultValue}
        onChange={(val: any) => onChange?.(val ?? "")}
        disabled={disabled}
        className="flex w-full"
        {...props}
      />
    </div>
  )
}

PhoneInput.displayName = "PhoneInput"

export { PhoneInput }
