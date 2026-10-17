import * as React from "react"
import { MessageSquareIcon, Share2Icon } from "lucide-react"
import { Example, ExampleWrapper } from "@/components/example"
import { FloatButton } from "@/components/ui/float-button"

export default function FloatButtonExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Floating Action Buttons">
        <div className="flex items-center gap-4">
          <FloatButton
            className="static shadow-md"
            icon={<MessageSquareIcon className="size-4" />}
            title="Chat Support"
          />
          <FloatButton
            className="static shadow-md text-primary"
            icon={<Share2Icon className="size-4" />}
            title="Share Workspace"
          />
        </div>
      </Example>
    </ExampleWrapper>
  )
}
