import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Result } from "@/components/ui/result"
import { Button } from "@/components/ui/button"

export default function ResultExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Success Result Page">
        <div className="w-full max-w-md rounded-xl border border-border bg-card">
          <Result
            status="success"
            title="Subscription Activated"
            subTitle="Order number #94821. Your workspace has been upgraded to Enterprise plan."
            extra={[
              <Button key="console" size="sm">Go to Console</Button>,
              <Button key="invoice" variant="outline" size="sm">Download Invoice</Button>,
            ]}
          />
        </div>
      </Example>

      <Example title="404 Not Found State">
        <div className="w-full max-w-md rounded-xl border border-border bg-card">
          <Result
            status="404"
            title="Page Not Found"
            subTitle="Sorry, the resource or page you requested does not exist."
            extra={<Button size="sm">Back Home</Button>}
          />
        </div>
      </Example>
    </ExampleWrapper>
  )
}
