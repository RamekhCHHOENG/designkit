<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/default/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <RadioGroup default-value="comfortable">
        <Field orientation="horizontal">
          <RadioGroupItem id="r1" value="default" />
          <FieldLabel for="r1" class="font-normal">
            Default
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="r2" value="comfortable" />
          <FieldLabel for="r2" class="font-normal">
            Comfortable
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="r3" value="compact" />
          <FieldLabel for="r3" class="font-normal">
            Compact
          </FieldLabel>
        </Field>
      </RadioGroup>
    </Example>

    <!-- With Descriptions -->
    <Example title="With Descriptions">
      <RadioGroup default-value="plus">
        <FieldLabel for="plus-plan">
          <Field orientation="horizontal">
            <FieldContent>
              <div class="font-medium">Plus</div>
              <FieldDescription>
                For individuals and small teams
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem id="plus-plan" value="plus" />
          </Field>
        </FieldLabel>
        <FieldLabel for="pro-plan">
          <Field orientation="horizontal">
            <FieldContent>
              <div class="font-medium">Pro</div>
              <FieldDescription>For growing businesses</FieldDescription>
            </FieldContent>
            <RadioGroupItem id="pro-plan" value="pro" />
          </Field>
        </FieldLabel>
        <FieldLabel for="enterprise-plan">
          <Field orientation="horizontal">
            <FieldContent>
              <div class="font-medium">Enterprise</div>
              <FieldDescription>
                For large teams and enterprises
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem id="enterprise-plan" value="enterprise" />
          </Field>
        </FieldLabel>
      </RadioGroup>
    </Example>

    <!-- With FieldSet -->
    <Example title="With FieldSet">
      <FieldSet>
        <FieldLegend>Battery Level</FieldLegend>
        <FieldDescription>
          Choose your preferred battery level.
        </FieldDescription>
        <RadioGroup default-value="medium">
          <Field orientation="horizontal">
            <RadioGroupItem id="battery-high" value="high" />
            <FieldLabel for="battery-high" class="font-normal">
              High
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem id="battery-medium" value="medium" />
            <FieldLabel for="battery-medium" class="font-normal">
              Medium
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem id="battery-low" value="low" />
            <FieldLabel for="battery-low" class="font-normal">
              Low
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </Example>

    <!-- Grid Layout -->
    <Example title="Grid Layout">
      <RadioGroup default-value="medium" class="grid grid-cols-2 gap-2">
        <FieldLabel for="size-small">
          <Field orientation="horizontal">
            <RadioGroupItem id="size-small" value="small" />
            <div class="font-medium">Small</div>
          </Field>
        </FieldLabel>
        <FieldLabel for="size-medium">
          <Field orientation="horizontal">
            <RadioGroupItem id="size-medium" value="medium" />
            <div class="font-medium">Medium</div>
          </Field>
        </FieldLabel>
        <FieldLabel for="size-large">
          <Field orientation="horizontal">
            <RadioGroupItem id="size-large" value="large" />
            <div class="font-medium">Large</div>
          </Field>
        </FieldLabel>
        <FieldLabel for="size-xlarge">
          <Field orientation="horizontal">
            <RadioGroupItem id="size-xlarge" value="xlarge" />
            <div class="font-medium">X-Large</div>
          </Field>
        </FieldLabel>
      </RadioGroup>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <RadioGroup default-value="option2" disabled>
        <Field orientation="horizontal">
          <RadioGroupItem id="disabled-1" value="option1" />
          <FieldLabel for="disabled-1" class="font-normal">
            Option 1
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="disabled-2" value="option2" />
          <FieldLabel for="disabled-2" class="font-normal">
            Option 2
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem id="disabled-3" value="option3" />
          <FieldLabel for="disabled-3" class="font-normal">
            Option 3
          </FieldLabel>
        </Field>
      </RadioGroup>
    </Example>

    <!-- Invalid -->
    <Example title="Invalid">
      <FieldSet>
        <FieldLegend>Notification Preferences</FieldLegend>
        <FieldDescription>
          Choose how you want to receive notifications.
        </FieldDescription>
        <RadioGroup default-value="email">
          <Field orientation="horizontal" data-invalid="true">
            <RadioGroupItem id="invalid-email" value="email" aria-invalid="true" />
            <FieldLabel for="invalid-email" class="font-normal">
              Email only
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" data-invalid="true">
            <RadioGroupItem id="invalid-sms" value="sms" aria-invalid="true" />
            <FieldLabel for="invalid-sms" class="font-normal">
              SMS only
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" data-invalid="true">
            <RadioGroupItem id="invalid-both" value="both" aria-invalid="true" />
            <FieldLabel for="invalid-both" class="font-normal">
              Both Email & SMS
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </Example>
  </ExampleWrapper>
</template>
