import * as React from "react"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@/components/ui/button"
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

const stepItems = [
  { step: 1, title: "Account details", description: "Set your email & password" },
  { step: 2, title: "Profile setup", description: "Add your personal info" },
  { step: 3, title: "Billing", description: "Select your subscription" },
  { step: 4, title: "Complete", description: "Review and activate" },
]

export default function StepperExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <InteractiveStepper />
      <VerticalStepper />
    </ExampleWrapper>
  )
}

function InteractiveStepper() {
  const [activeStep, setActiveStep] = React.useState(2)

  return (
    <Example title="Interactive Horizontal Stepper">
      <div className="w-full space-y-6">
        <Stepper value={activeStep} onValueChange={setActiveStep}>
          {stepItems.map(({ step, title, description }) => (
            <StepperItem key={step} step={step} className="not-last:flex-1">
              <StepperTrigger className="text-left">
                <StepperIndicator />
                <div className="hidden sm:block">
                  <StepperTitle>{title}</StepperTitle>
                  <StepperDescription>{description}</StepperDescription>
                </div>
              </StepperTrigger>
              {step < stepItems.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
            disabled={activeStep <= 1}
          >
            Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            Step {activeStep} of {stepItems.length}
          </span>
          <Button
            size="sm"
            onClick={() => setActiveStep((s) => Math.min(stepItems.length, s + 1))}
            disabled={activeStep >= stepItems.length}
          >
            {activeStep === stepItems.length ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </Example>
  )
}

function VerticalStepper() {
  return (
    <Example title="Vertical Stepper">
      <div className="w-full max-w-sm">
        <Stepper orientation="vertical" defaultValue={2}>
          {stepItems.map(({ step, title, description }) => (
            <StepperItem key={step} step={step} className="items-start">
              <StepperTrigger className="text-left">
                <StepperIndicator />
                <div>
                  <StepperTitle>{title}</StepperTitle>
                  <StepperDescription>{description}</StepperDescription>
                </div>
              </StepperTrigger>
              {step < stepItems.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>
      </div>
    </Example>
  )
}
