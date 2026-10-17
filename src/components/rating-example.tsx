import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Rating } from "@/components/ui/rating"

export default function RatingExample() {
  const [score, setScore] = React.useState(4)
  const [halfScore, setHalfScore] = React.useState(3.5)

  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <Example title="Standard Star Rating">
        <div className="w-full max-w-sm space-y-2">
          <label className="text-xs font-medium text-foreground">Product satisfaction</label>
          <Rating value={score} onValueChange={setScore} />
          <p className="text-xs text-muted-foreground">Rating: {score} out of 5 stars</p>
        </div>
      </Example>

      <Example title="Half-Star Precision Rating">
        <div className="w-full max-w-sm space-y-2">
          <label className="text-xs font-medium text-foreground">Movie score (0.5 steps)</label>
          <Rating precision={0.5} value={halfScore} onValueChange={setHalfScore} />
          <p className="text-xs text-muted-foreground">Rating: {halfScore} / 5.0</p>
        </div>
      </Example>

      <Example title="Read-Only Rating Display">
        <div className="w-full max-w-sm space-y-2">
          <label className="text-xs font-medium text-foreground">Verified reviews (4.8)</label>
          <div className="flex items-center gap-2">
            <Rating readOnly value={5} size="sm" />
            <span className="text-xs font-medium text-muted-foreground">4.8 (1,420 reviews)</span>
          </div>
        </div>
      </Example>
    </ExampleWrapper>
  )
}
