<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/registry/default/ui/field";
import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Field orientation="horizontal">
        <Switch id="switch-basic" />
        <FieldLabel for="switch-basic">Airplane Mode</FieldLabel>
      </Field>
    </Example>

    <!-- With Description -->
    <Example title="With Description">
      <FieldLabel for="switch-focus-mode">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-focus-mode" />
        </Field>
      </FieldLabel>
    </Example>

    <!-- With Label -->
    <Example title="With Label">
      <div class="flex items-center gap-2">
        <Switch id="switch-bluetooth" :default-checked="true" />
        <Label for="switch-bluetooth">Bluetooth</Label>
      </div>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-2">
          <Switch id="switch-disabled-unchecked" disabled />
          <Label for="switch-disabled-unchecked">
            Disabled (Unchecked)
          </Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="switch-disabled-checked" :default-checked="true" disabled />
          <Label for="switch-disabled-checked">Disabled (Checked)</Label>
        </div>
      </div>
    </Example>

    <!-- Sizes -->
    <Example title="Sizes">
      <div class="flex flex-col gap-6">
        <div class="flex items-center gap-2">
          <Switch id="switch-size-sm" size="sm" />
          <Label for="switch-size-sm">Small</Label>
        </div>
        <div class="flex items-center gap-2">
          <Switch id="switch-size-default" size="default" />
          <Label for="switch-size-default">Default</Label>
        </div>
      </div>
    </Example>
  </ExampleWrapper>
</template>
