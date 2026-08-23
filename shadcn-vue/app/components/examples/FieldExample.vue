<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Badge } from "@/registry/default/ui/badge";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/default/ui/input-otp";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/default/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Slider } from "@/registry/default/ui/slider";
import { Switch } from "@/registry/default/ui/switch";
import { Textarea } from "@/registry/default/ui/textarea";

const sliderValue = ref([50]);
const otpValue = ref("");
</script>

<template>
  <ExampleWrapper>
    <!-- Input Fields -->
    <Example title="Input Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="input-basic">Basic Input</FieldLabel>
          <Input id="input-basic" placeholder="Enter text" />
        </Field>
        <Field>
          <FieldLabel for="input-with-desc">Input with Description</FieldLabel>
          <Input id="input-with-desc" placeholder="Enter your username" />
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel for="input-desc-first">Email Address</FieldLabel>
          <FieldDescription>We'll never share your email with anyone.</FieldDescription>
          <Input id="input-desc-first" type="email" placeholder="email@example.com" />
        </Field>
        <Field>
          <FieldLabel for="input-required">
            Required Field <span class="text-destructive">*</span>
          </FieldLabel>
          <Input id="input-required" placeholder="This field is required" required />
          <FieldDescription>This field must be filled out.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>

    <!-- Textarea Fields -->
    <Example title="Textarea Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="textarea-basic">Basic Textarea</FieldLabel>
          <Textarea id="textarea-basic" placeholder="Type your message here." />
        </Field>
        <Field>
          <FieldLabel for="textarea-desc">Bio</FieldLabel>
          <Textarea id="textarea-desc" placeholder="Tell us a little bit about yourself" />
          <FieldDescription>Brief description for your profile.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>

    <!-- Select Fields -->
    <Example title="Select Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="select-basic">Select an Option</FieldLabel>
          <Select>
            <SelectTrigger id="select-basic">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    </Example>

    <!-- Checkbox Fields -->
    <Example title="Checkbox Fields">
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox id="terms-field" />
          <FieldContent>
            <FieldLabel for="terms-field">Accept terms</FieldLabel>
            <FieldDescription>Agree to the terms and privacy policy.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </Example>

    <!-- Radio Fields -->
    <Example title="Radio Fields">
      <FieldSet>
        <FieldLegend>Subscription Plan</FieldLegend>
        <RadioGroup default-value="starter">
          <Field orientation="horizontal">
            <RadioGroupItem id="r-starter" value="starter" />
            <FieldLabel for="r-starter">Starter</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem id="r-pro" value="pro" />
            <FieldLabel for="r-pro">Pro</FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </Example>

    <!-- Switch Fields -->
    <Example title="Switch Fields">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel for="switch-field">Airplane Mode</FieldLabel>
            <FieldDescription>Disable all wireless connections.</FieldDescription>
          </FieldContent>
          <Switch id="switch-field" />
        </Field>
      </FieldGroup>
    </Example>

    <!-- Slider Fields -->
    <Example title="Slider Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="slider-field">Volume</FieldLabel>
          <Slider id="slider-field" v-model="sliderValue" :max="100" :step="1" />
          <FieldDescription>Adjust the audio output level.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>

    <!-- Native Select Fields -->
    <Example title="Native Select Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="native-select-field">Country</FieldLabel>
          <NativeSelect id="native-select-field">
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
            <NativeSelectOption value="ca">Canada</NativeSelectOption>
          </NativeSelect>
        </Field>
      </FieldGroup>
    </Example>

    <!-- Input OTP Fields -->
    <Example title="Input OTP Fields">
      <FieldGroup>
        <Field>
          <FieldLabel for="otp-field">One-Time Password</FieldLabel>
          <InputOTP id="otp-field" v-model="otpValue" :maxlength="6">
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
          <FieldDescription>Please enter the OTP sent to your phone.</FieldDescription>
        </Field>
      </FieldGroup>
    </Example>

    <!-- Horizontal Fields -->
    <Example title="Horizontal Fields">
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldLabel for="hz-name" class="w-32">Username</FieldLabel>
          <Input id="hz-name" placeholder="Enter username" class="flex-1" />
        </Field>
      </FieldGroup>
    </Example>
  </ExampleWrapper>
</template>
