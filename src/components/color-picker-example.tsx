import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { ColorPicker } from "@/components/ui/color-picker"

export default function ColorPickerExample() {
  const [themeColor, setThemeColor] = React.useState("#3b82f6")
  const [accentColor, setAccentColor] = React.useState("#10b981")

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Color Picker Popover with Presets & EyeDropper">
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Brand primary color</label>
            <ColorPicker value={themeColor} onValueChange={setThemeColor} />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Accent highlight</label>
            <ColorPicker value={accentColor} onValueChange={setAccentColor} />
          </div>

          <div
            className="flex h-12 w-full items-center justify-center rounded-lg text-xs font-semibold text-white shadow-xs"
            style={{ backgroundColor: themeColor }}
          >
            Live Preview
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
