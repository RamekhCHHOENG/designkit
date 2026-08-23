<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const sides = ["top", "right", "bottom", "left"] as const;
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" class="w-fit">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </Example>

    <!-- Sides -->
    <Example title="Sides">
      <div class="flex flex-wrap gap-2">
        <Popover v-for="side in sides" :key="side">
          <PopoverTrigger as-child>
            <Button variant="outline" class="w-fit capitalize">{{ side }}</Button>
          </PopoverTrigger>
          <PopoverContent :side="side" class="w-40">
            <p class="text-sm">Popover on {{ side }}</p>
          </PopoverContent>
        </Popover>
      </div>
    </Example>

    <!-- With Form -->
    <Example title="With Form">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent class="w-64" align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <FieldGroup class="gap-4 mt-2">
            <Field orientation="horizontal">
              <FieldLabel for="width" class="w-1/2">Width</FieldLabel>
              <Input id="width" default-value="100%" />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel for="height" class="w-1/2">Height</FieldLabel>
              <Input id="height" default-value="25px" />
            </Field>
          </FieldGroup>
        </PopoverContent>
      </Popover>
    </Example>

    <!-- Alignments -->
    <Example title="Alignments">
      <div class="flex gap-6">
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm">Start</Button>
          </PopoverTrigger>
          <PopoverContent align="start" class="w-40 text-sm">
            Aligned to start
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm">Center</Button>
          </PopoverTrigger>
          <PopoverContent align="center" class="w-40 text-sm">
            Aligned to center
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline" size="sm">End</Button>
          </PopoverTrigger>
          <PopoverContent align="end" class="w-40 text-sm">
            Aligned to end
          </PopoverContent>
        </Popover>
      </div>
    </Example>

    <!-- In Dialog -->
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Popover Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the popover.
            </DialogDescription>
          </DialogHeader>
          <Popover>
            <PopoverTrigger as-child>
              <Button variant="outline" class="w-fit">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>Popover in Dialog</PopoverTitle>
                <PopoverDescription>
                  This popover appears inside a dialog. Click the button to open
                  it.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
