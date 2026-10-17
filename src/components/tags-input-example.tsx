import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { TagsInput } from "@/components/ui/tags-input"

export default function TagsInputExample() {
  const [skills, setSkills] = React.useState<string[]>([
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Design Systems",
  ])

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Removable Tag Chips Input">
        <div className="w-full max-w-sm space-y-2">
          <label className="text-xs font-medium text-foreground">Skills & technologies</label>
          <TagsInput
            value={skills}
            onValueChange={setSkills}
            placeholder="Type and press Enter or comma..."
            maxTags={8}
          />
          <p className="text-xs text-muted-foreground">
            Tags count: {skills.length} / 8. Press Backspace to delete the last item.
          </p>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
