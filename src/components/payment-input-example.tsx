import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { PaymentInput } from "@/components/ui/payment-input"

export default function PaymentInputExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Credit Card Payment Details">
        <div className="w-full max-w-sm space-y-2">
          <label className="text-xs font-medium text-foreground">Card information</label>
          <PaymentInput />
          <p className="text-xs text-muted-foreground">
            Automatically formats number, detects brand (Visa, Mastercard, Amex), and validates expiry/CVC.
          </p>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
