<script setup lang="ts">
import { ref } from "vue";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { ChartLineIcon, ChartBarIcon, ChartPieIcon } from "lucide-vue-next";

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];

const timezones = [
  {
    group: "North America",
    items: [
      { label: "Eastern Standard Time (EST)", value: "est" },
      { label: "Central Standard Time (CST)", value: "cst" },
      { label: "Mountain Standard Time (MST)", value: "mst" },
      { label: "Pacific Standard Time (PST)", value: "pst" },
    ],
  },
  {
    group: "Europe",
    items: [
      { label: "Greenwich Mean Time (GMT)", value: "gmt" },
      { label: "Central European Time (CET)", value: "cet" },
      { label: "Eastern European Time (EET)", value: "eet" },
    ],
  },
];

const sides = ["top", "right", "bottom", "left"] as const;
const selectedFruit = ref<string>("");
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Select v-model="selectedFruit">
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="item in fruits"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>

    <!-- Sides -->
    <Example title="Sides" class="col-span-full">
      <div class="flex flex-wrap justify-center gap-2">
        <Select v-for="side in sides" :key="side">
          <SelectTrigger :side="side" class="w-32 capitalize">
            <SelectValue :placeholder="side" />
          </SelectTrigger>
          <SelectContent :side="side">
            <SelectGroup>
              <SelectItem
                v-for="item in fruits"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Example>

    <!-- With Icons -->
    <Example title="With Icons">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select chart type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="line">
              <div class="flex items-center gap-2">
                <ChartLineIcon class="size-4" />
                <span>Line Chart</span>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div class="flex items-center gap-2">
                <ChartBarIcon class="size-4" />
                <span>Bar Chart</span>
              </div>
            </SelectItem>
            <SelectItem value="pie">
              <div class="flex items-center gap-2">
                <ChartPieIcon class="size-4" />
                <span>Pie Chart</span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>

    <!-- With Groups -->
    <Example title="With Groups">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <template v-for="(tzGroup, index) in timezones" :key="tzGroup.group">
            <SelectGroup>
              <SelectLabel>{{ tzGroup.group }}</SelectLabel>
              <SelectItem
                v-for="tz in tzGroup.items"
                :key="tz.value"
                :value="tz.value"
              >
                {{ tz.label }}
              </SelectItem>
            </SelectGroup>
            <SelectSeparator v-if="index < timezones.length - 1" />
          </template>
        </SelectContent>
      </Select>
    </Example>

    <!-- Sizes -->
    <Example title="Sizes">
      <div class="flex flex-col gap-4">
        <Select size="sm">
          <SelectTrigger class="h-8 text-xs">
            <SelectValue placeholder="Small select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="f in fruits" :key="f.value" :value="f.value">
              {{ f.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Default select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="f in fruits" :key="f.value" :value="f.value">
              {{ f.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Example>

    <!-- With Field -->
    <Example title="With Field">
      <Field>
        <FieldLabel for="fruit-field">Favorite Fruit</FieldLabel>
        <Select>
          <SelectTrigger id="fruit-field">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="f in fruits" :key="f.value" :value="f.value">
              {{ f.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>Choose your preferred fruit.</FieldDescription>
      </Field>
    </Example>

    <!-- Invalid -->
    <Example title="Invalid">
      <Field data-invalid="true">
        <FieldLabel for="invalid-sel">Fruit</FieldLabel>
        <Select aria-invalid="true">
          <SelectTrigger id="invalid-sel" class="border-destructive">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="f in fruits" :key="f.value" :value="f.value">
              {{ f.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FieldError>Please select a valid option.</FieldError>
      </Field>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    </Example>

    <!-- In Dialog -->
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Example</DialogTitle>
            <DialogDescription>
              Select an option inside a dialog.
            </DialogDescription>
          </DialogHeader>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="f in fruits" :key="f.value" :value="f.value">
                {{ f.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
