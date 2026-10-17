import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { CodeBlock } from "@/components/ui/code-block"

const SAMPLE_CODE = `import { Button } from "@ramekhchhoeng/designkit";

export function App() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Save changes</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}`

export default function CodeBlockExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Syntax Code Viewer with Copy Action">
        <div className="w-full max-w-lg">
          <CodeBlock
            code={SAMPLE_CODE}
            filename="App.tsx"
            language="tsx"
            showLineNumbers
          />
        </div>
      </Example>
    </ExampleWrapper>
  )
}
