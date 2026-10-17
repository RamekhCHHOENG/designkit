import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Watermark } from "@/components/ui/watermark"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WatermarkExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Security Watermark Overlay">
        <div className="w-full max-w-lg">
          <Watermark content={["DesignKit Internal", "admin@company.com"]}>
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Financial Q3 Earnings Report</CardTitle>
                <CardDescription>
                  Highly confidential executive briefing document.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Total Q3 gross margins expanded by 4.2% quarter-over-quarter.
                  Enterprise SaaS renewals reached 98.4% across Fortune 500 accounts.
                </p>
                <p>
                  Projected revenue targets for upcoming fiscal quarters remain
                  restricted to authorized audit committee personnel.
                </p>
              </CardContent>
            </Card>
          </Watermark>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
