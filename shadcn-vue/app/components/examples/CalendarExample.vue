<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import { RangeCalendar } from "@/registry/default/ui/range-calendar";
import { Card, CardContent, CardFooter } from "@/registry/default/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/registry/default/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";
import { CalendarIcon, Clock2Icon, ChevronDownIcon } from "lucide-vue-next";
import {
  today,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";

const singleDate = ref(today(getLocalTimeZone())) as Ref<DateValue>;
const multipleDates = ref([today(getLocalTimeZone())]);
const popoverDate = ref<DateValue | undefined>();
const rangeDate = ref({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()).add({ days: 20 }),
});

const presets = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "In 3 days", days: 3 },
  { label: "In a week", days: 7 },
  { label: "In 2 weeks", days: 14 },
];

function applyPreset(days: number) {
  singleDate.value = today(getLocalTimeZone()).add({ days });
}
</script>

<template>
  <ExampleWrapper>
    <!-- Single -->
    <Example title="Single">
      <Card class="mx-auto w-fit p-0">
        <CardContent class="p-0">
          <Calendar v-model="singleDate" />
        </CardContent>
      </Card>
    </Example>

    <!-- Multiple -->
    <Example title="Multiple">
      <Card class="mx-auto w-fit p-0">
        <CardContent class="p-0">
          <Calendar :default-value="today(getLocalTimeZone())" multiple />
        </CardContent>
      </Card>
    </Example>

    <!-- Range -->
    <Example
      title="Range"
      container-class-name="lg:col-span-full 2xl:col-span-full"
      class="p-12"
    >
      <Card class="mx-auto w-fit p-0">
        <CardContent class="p-0">
          <RangeCalendar v-model="rangeDate" :number-of-months="2" />
        </CardContent>
      </Card>
    </Example>

    <!-- With Time -->
    <Example title="With Time">
      <Card size="sm" class="mx-auto w-fit">
        <CardContent>
          <Calendar v-model="singleDate" class="p-0" />
        </CardContent>
        <CardFooter class="border-t bg-card">
          <FieldGroup>
            <Field>
              <FieldLabel for="time-from">Start Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="time-from"
                  type="time"
                  step="1"
                  default-value="10:30:00"
                />
                <InputGroupAddon>
                  <Clock2Icon class="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel for="time-to">End Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="time-to"
                  type="time"
                  step="1"
                  default-value="12:30:00"
                />
                <InputGroupAddon>
                  <Clock2Icon class="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    </Example>

    <!-- With Presets -->
    <Example title="With Presets">
      <Card class="mx-auto w-fit max-w-[300px]" size="sm">
        <CardContent>
          <Calendar v-model="singleDate" class="p-0" />
        </CardContent>
        <CardFooter class="flex flex-wrap gap-2 border-t">
          <Button
            v-for="preset in presets"
            :key="preset.days"
            variant="outline"
            size="sm"
            class="flex-1"
            @click="applyPreset(preset.days)"
          >
            {{ preset.label }}
          </Button>
        </CardFooter>
      </Card>
    </Example>

    <!-- Date Picker Simple -->
    <Example title="Date Picker Simple">
      <Field class="mx-auto w-72">
        <FieldLabel for="date-picker-simple">Date</FieldLabel>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              id="date-picker-simple"
              variant="outline"
              class="justify-start px-2.5 font-normal w-full"
            >
              <CalendarIcon class="mr-1.5 size-4" />
              <span>{{ popoverDate ? popoverDate.toString() : "Pick a date" }}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0" align="start">
            <Calendar v-model="popoverDate" />
          </PopoverContent>
        </Popover>
      </Field>
    </Example>

    <!-- In Card -->
    <Example title="In Card">
      <Card class="mx-auto w-fit p-0">
        <CardContent class="p-0">
          <Calendar v-model="singleDate" />
        </CardContent>
      </Card>
    </Example>

    <!-- In Popover -->
    <Example title="In Popover">
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline" class="px-2.5 font-normal">
            <CalendarIcon class="mr-1.5 size-4" />
            Open Calendar
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" align="start">
          <Calendar v-model="singleDate" />
        </PopoverContent>
      </Popover>
    </Example>
  </ExampleWrapper>
</template>
