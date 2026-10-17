import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { PhoneInput, type PhoneValue } from "@/components/ui/phone-input"

export default function PhoneInputExample() {
  const [phone, setPhone] = React.useState<PhoneValue>("+14155552671")

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="International Phone Input with Country Flags">
        <div className="w-full max-w-sm space-y-2">
          <label className="text-xs font-medium text-foreground">Phone number</label>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            defaultCountry="US"
            placeholder="Enter phone number"
          />
          <p className="text-xs text-muted-foreground">E.164 formatted value: {phone || "None"}</p>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
