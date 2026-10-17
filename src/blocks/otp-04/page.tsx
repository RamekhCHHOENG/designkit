import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-3xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={(e) => e.preventDefault()}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Enter verification code</h1>
                  <p className="text-balance text-muted-foreground">We sent a 6-digit code to your email</p>
                </div>
                <Field className="items-center">
                  <FieldLabel htmlFor="otp" className="sr-only">
                    Verification code
                  </FieldLabel>
                  <InputOTP maxLength={6} id="otp" required containerClassName="justify-center">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FieldDescription className="text-center">
                    Enter the 6-digit code sent to your email.
                  </FieldDescription>
                </Field>
                <Field>
                  <Button type="submit">Verify</Button>
                  <FieldDescription className="text-center">
                    Didn&apos;t receive the code? <a href="#">Resend</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
            <div className="relative hidden overflow-hidden bg-muted md:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-primary)_0%,transparent_55%),radial-gradient(circle_at_80%_80%,var(--color-muted-foreground)_0%,transparent_50%)] opacity-25" />
            </div>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  )
}
