import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { PasswordInput } from "@/components/ui/password-input"

export default function PasswordInputExample() {
  const [password, setPassword] = React.useState("")

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Password Input with Reveal & Strength Meter">
        <div className="w-full max-w-sm space-y-2">
          <label className="text-xs font-medium text-foreground">Create password</label>
          <PasswordInput
            showStrength
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a secure password..."
          />
          <p className="text-xs text-muted-foreground">
            Includes visibility toggle, caps lock detection, and security rating.
          </p>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
