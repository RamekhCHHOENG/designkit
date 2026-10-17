import * as React from "react"
import { CheckCircle2Icon } from "lucide-react"
import { Example, ExampleWrapper } from "@/components/example"
import { Tag } from "@/components/ui/tag"

export default function TagExample() {
  const [tags, setTags] = React.useState(["React 19", "Next.js", "Tailwind CSS", "TypeScript"])
  const [checked, setChecked] = React.useState(true)

  const handleRemove = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove))
  }

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Semantic Status Tags">
        <div className="flex flex-wrap gap-2">
          <Tag variant="default">Default</Tag>
          <Tag variant="secondary">Secondary</Tag>
          <Tag variant="success" icon={<CheckCircle2Icon />}>Active</Tag>
          <Tag variant="warning">Pending</Tag>
          <Tag variant="destructive">Deprecated</Tag>
          <Tag variant="outline">Outline</Tag>
        </div>
      </Example>

      <Example title="Closable & Checkable Tags">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} closable onClose={() => handleRemove(tag)}>
                {tag}
              </Tag>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Tag
              checkable
              checked={checked}
              onCheckedChange={setChecked}
            >
              Filter: Featured Projects {checked ? "✓" : ""}
            </Tag>
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
