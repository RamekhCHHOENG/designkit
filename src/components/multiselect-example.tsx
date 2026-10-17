import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { MultiSelect, type Option } from "@/components/ui/multiselect"

const FRAMEWORKS: Option[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "astro", label: "Astro" },
  { value: "solid", label: "Solid" },
  { value: "angular", label: "Angular" },
]

export default function MultiSelectExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <MultiSelectDemo />
    </ExampleWrapper>
  )
}

function MultiSelectDemo() {
  const [selected, setSelected] = React.useState<Option[]>([
    { value: "react", label: "React" },
    { value: "next", label: "Next.js" },
  ])

  return (
    <Example title="MultiSelect with Token Badges & Search">
      <div className="w-full max-w-md space-y-4">
        <MultiSelect
          options={FRAMEWORKS}
          value={selected}
          onChange={setSelected}
          placeholder="Select frameworks..."
          emptyIndicator="No framework found"
        />
        <div className="text-xs text-muted-foreground">
          Selected: {selected.map((s) => s.label).join(", ") || "None"}
        </div>
      </div>
    </Example>
  )
}
