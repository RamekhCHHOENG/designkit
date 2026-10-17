"use client"

import * as React from "react"
import { CreditCardIcon } from "lucide-react"
import { usePaymentInputs } from "react-payment-inputs"
import images, { type CardImages } from "react-payment-inputs/images"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export interface PaymentInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onCardChange?: (data: {
    cardNumber: string
    expiryDate: string
    cvc: string
    cardType?: any
    isValid: boolean
  }) => void
  disabled?: boolean
}

export function PaymentInput({
  className,
  onCardChange,
  disabled,
  ...props
}: PaymentInputProps) {
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs()

  const cardImages = images as CardImages

  return (
    <div
      data-slot="payment-input"
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-input bg-card p-3 shadow-xs",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="relative">
        <Input
          {...getCardNumberProps()}
          disabled={disabled}
          placeholder="0000 0000 0000 0000"
          className="pe-10 [direction:inherit]"
        />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3">
          {meta.cardType ? (
            <svg
              className="size-6 overflow-hidden rounded-xs"
              {...getCardImageProps({
                images: cardImages,
              })}
            />
          ) : (
            <CreditCardIcon className="size-4 text-muted-foreground/80" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          {...getExpiryDateProps()}
          disabled={disabled}
          placeholder="MM / YY"
          className="[direction:inherit]"
        />
        <Input
          {...getCVCProps()}
          disabled={disabled}
          placeholder="CVC"
          className="[direction:inherit]"
        />
      </div>

      {meta.error && (
        <span className="text-[11px] font-medium text-destructive">
          {meta.error}
        </span>
      )}
    </div>
  )
}
