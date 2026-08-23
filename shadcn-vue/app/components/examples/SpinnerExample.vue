<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Spinner } from "@/registry/default/ui/spinner";
import { ArrowRightIcon } from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <div class="flex items-center gap-6">
        <Spinner />
        <Spinner class="size-6" />
      </div>
    </Example>

    <!-- In Buttons -->
    <Example title="In Buttons">
      <div class="flex flex-wrap items-center gap-4">
        <Button>
          <Spinner class="mr-1.5 size-4" /> Submit
        </Button>
        <Button disabled>
          <Spinner class="mr-1.5 size-4" /> Disabled
        </Button>
        <Button variant="outline" disabled>
          <Spinner class="mr-1.5 size-4" /> Outline
        </Button>
        <Button variant="outline" size="icon" disabled>
          <Spinner class="size-4" />
          <span class="sr-only">Loading...</span>
        </Button>
      </div>
    </Example>

    <!-- In Badges -->
    <Example title="In Badges" class="items-center justify-center">
      <div class="flex flex-wrap items-center justify-center gap-4">
        <Badge>
          <Spinner class="mr-1.5 size-3" />
          Badge
        </Badge>
        <Badge variant="secondary">
          <Spinner class="mr-1.5 size-3" />
          Badge
        </Badge>
        <Badge variant="destructive">
          <Spinner class="mr-1.5 size-3" />
          Badge
        </Badge>
        <Badge variant="outline">
          <Spinner class="mr-1.5 size-3" />
          Badge
        </Badge>
      </div>
    </Example>

    <!-- In Input Group -->
    <Example title="In Input Group">
      <Field>
        <FieldLabel for="input-group-spinner">Input Group</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-group-spinner" />
          <InputGroupAddon>
            <Spinner class="size-4" />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </Example>

    <!-- In Empty State -->
    <Example title="In Empty State" container-class-name="lg:col-span-full">
      <Empty class="min-h-[300px]">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner class="size-6" />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven't created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div class="flex gap-2">
            <Button as="a" href="#">
              Create project
            </Button>
            <Button variant="outline">Import project</Button>
          </div>
          <Button
            variant="link"
            as="a"
            href="#"
            class="text-muted-foreground"
          >
            Learn more
            <ArrowRightIcon class="ml-1.5 size-4" />
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  </ExampleWrapper>
</template>
