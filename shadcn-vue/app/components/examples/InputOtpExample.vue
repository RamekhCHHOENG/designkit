<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/registry/default/ui/input-otp";
import { RefreshCwIcon } from "lucide-vue-next";

const otp1 = ref<string[]>([]);
const otp2 = ref<string[]>([]);
const otp3 = ref<string[]>(["1", "2", "3", "4", "5", "6"]);
const otp4 = ref<string[]>([]);
const otp5 = ref<string[]>(["1", "2", "3", "4", "5", "6"]);
const otp6 = ref<string[]>([]);
const otp7 = ref<string[]>(["0", "0", "0", "0", "0", "0"]);
const otpForm = ref<string[]>([]);
</script>

<template>
  <ExampleWrapper>
    <!-- Form -->
    <Example title="Form">
      <Card class="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span class="font-medium">m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent>
            <Field>
              <div class="flex items-center justify-between">
                <FieldLabel for="otp-verification">
                  Verification code
                </FieldLabel>
                <Button variant="outline" size="xs">
                  <RefreshCwIcon class="mr-1.5 size-3.5" />
                  Resend Code
                </Button>
              </div>
              <InputOTP id="otp-verification" v-model="otpForm" :maxlength="6" required>
                <InputOTPGroup>
                  <InputOTPSlot :index="0" />
                  <InputOTPSlot :index="1" />
                  <InputOTPSlot :index="2" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot :index="3" />
                  <InputOTPSlot :index="4" />
                  <InputOTPSlot :index="5" />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                <a href="#" class="underline underline-offset-4">I no longer have access to this email address.</a>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
        <CardFooter class="flex-col gap-2">
          <Button type="submit" class="w-full">
            Verify
          </Button>
          <div class="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="#"
              class="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div>
        </CardFooter>
      </Card>
    </Example>

    <!-- Simple -->
    <Example title="Simple">
      <Field>
        <FieldLabel for="simple">Simple</FieldLabel>
        <InputOTP id="simple" v-model="otp1" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <!-- Digits Only -->
    <Example title="Digits Only">
      <Field>
        <FieldLabel for="digits-only">Digits Only</FieldLabel>
        <InputOTP id="digits-only" v-model="otp2" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <!-- With Separator -->
    <Example title="With Separator">
      <Field>
        <FieldLabel for="with-separator">With Separator</FieldLabel>
        <InputOTP id="with-separator" v-model="otp3" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <!-- Alphanumeric -->
    <Example title="Alphanumeric">
      <Field>
        <FieldLabel for="alphanumeric">Alphanumeric</FieldLabel>
        <FieldDescription>Accepts both letters and numbers.</FieldDescription>
        <InputOTP id="alphanumeric" v-model="otp4" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <Field>
        <FieldLabel for="disabled">Disabled</FieldLabel>
        <InputOTP id="disabled" v-model="otp5" :maxlength="6" disabled>
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <!-- 4 Digits -->
    <Example title="4 Digits">
      <Field>
        <FieldLabel for="four-digits">4 Digits</FieldLabel>
        <FieldDescription>Common pattern for PIN codes.</FieldDescription>
        <InputOTP id="four-digits" v-model="otp6" :maxlength="4">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>

    <!-- Invalid State -->
    <Example title="Invalid State">
      <Field data-invalid="true">
        <FieldLabel for="invalid">Invalid State</FieldLabel>
        <FieldDescription>
          Example showing the invalid error state.
        </FieldDescription>
        <InputOTP id="invalid" v-model="otp7" :maxlength="6">
          <InputOTPGroup>
            <InputOTPSlot :index="0" aria-invalid="true" />
            <InputOTPSlot :index="1" aria-invalid="true" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="2" aria-invalid="true" />
            <InputOTPSlot :index="3" aria-invalid="true" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot :index="4" aria-invalid="true" />
            <InputOTPSlot :index="5" aria-invalid="true" />
          </InputOTPGroup>
        </InputOTP>
        <FieldError>Invalid code. Please try again.</FieldError>
      </Field>
    </Example>
  </ExampleWrapper>
</template>
