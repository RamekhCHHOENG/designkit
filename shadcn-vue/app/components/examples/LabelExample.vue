<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";
</script>

<template>
  <ExampleWrapper>
    <!-- With Checkbox -->
    <Example title="With Checkbox">
      <Field orientation="horizontal">
        <Checkbox id="label-demo-terms" />
        <Label for="label-demo-terms">Accept terms and conditions</Label>
      </Field>
    </Example>

    <!-- With Input -->
    <Example title="With Input">
      <Field>
        <Label for="label-demo-username">Username</Label>
        <Input id="label-demo-username" placeholder="Username" />
      </Field>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <Field data-disabled="true">
        <Label for="label-demo-disabled">Disabled</Label>
        <Input id="label-demo-disabled" placeholder="Disabled" disabled />
      </Field>
    </Example>

    <!-- With Textarea -->
    <Example title="With Textarea">
      <Field>
        <Label for="label-demo-message">Message</Label>
        <Textarea id="label-demo-message" placeholder="Message" />
      </Field>
    </Example>
  </ExampleWrapper>
</template>
