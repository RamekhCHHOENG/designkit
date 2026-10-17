import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { NumberInput } from "@/components/ui/number-input"

export default function NumberInputExample() {
  const [quantity, setQuantity] = React.useState<number | undefined>(3)
  const [price, setPrice] = React.useState<number | undefined>(99.5)

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Standard Stepper Control">
        <div className="w-full max-w-xs space-y-2">
          <label className="text-xs font-medium text-foreground">Quantity</label>
          <NumberInput
            min={1}
            max={50}
            step={1}
            value={quantity}
            onValueChange={setQuantity}
          />
          <p className="text-xs text-muted-foreground">Current quantity: {quantity}</p>
        </div>
      </Example>

      <Example title="Currency with Buttons Control">
        <div className="w-full max-w-xs space-y-2">
          <label className="text-xs font-medium text-foreground">Price</label>
          <NumberInput
            controls="buttons"
            min={0}
            max={1000}
            step={5}
            precision={2}
            prefix="$"
            suffix="USD"
            value={price}
            onValueChange={setPrice}
          />
          <p className="text-xs text-muted-foreground">Total: ${price}</p>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
