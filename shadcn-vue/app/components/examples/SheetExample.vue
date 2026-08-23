<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const sheetSides = ["top", "right", "bottom", "left"] as const;
</script>

<template>
  <ExampleWrapper>
    <!-- With Form -->
    <Example title="With Form">
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline">Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div class="px-4">
            <FieldGroup>
              <Field>
                <FieldLabel for="sheet-demo-name">Name</FieldLabel>
                <Input id="sheet-demo-name" default-value="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel for="sheet-demo-username">Username</FieldLabel>
                <Input id="sheet-demo-username" default-value="@peduarte" />
              </Field>
            </FieldGroup>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose as-child>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Example>

    <!-- No Close Button -->
    <Example title="No Close Button">
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline">No Close Button</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>No Close Button</SheetTitle>
            <SheetDescription>
              This sheet doesn't have a close button in the top-right
              corner. You can only close it using the button below.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Example>

    <!-- Sides -->
    <Example title="Sides">
      <div class="flex flex-wrap gap-2">
        <Sheet v-for="side in sheetSides" :key="side">
          <SheetTrigger as-child>
            <Button variant="outline" class="capitalize">
              {{ side }}
            </Button>
          </SheetTrigger>
          <SheetContent :side="side">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div class="no-scrollbar overflow-y-auto px-4 max-h-[60vh]">
              <p v-for="index in 5" :key="index" class="mb-4 leading-normal text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose as-child>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Example>
  </ExampleWrapper>
</template>
