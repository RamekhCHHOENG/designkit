<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/default/ui/command";
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
  FieldGroup,
  FieldLabel,
} from "@/registry/default/ui/field";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-vue-next";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
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

const open1 = ref(false);
const value1 = ref("nuxt");

const open2 = ref(false);
const value2 = ref("");

const open3 = ref(false);
const value3 = ref("");

const open4 = ref(false);
const value4 = ref("");

const openDialog = ref(false);
const dialogComboboxOpen = ref(false);
const dialogValue = ref("");
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Popover v-model:open="open1">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open1"
            class="w-[220px] justify-between font-normal"
          >
            {{ value1 ? frameworks.find((f) => f.value === value1)?.label : "Select framework..." }}
            <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[220px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                <CommandItem
                  v-for="framework in frameworks"
                  :key="framework.value"
                  :value="framework.value"
                  @select="() => {
                    value1 = framework.value;
                    open1 = false;
                  }"
                >
                  <CheckIcon
                    :class="[
                      'mr-2 size-4',
                      value1 === framework.value ? 'opacity-100' : 'opacity-0'
                    ]"
                  />
                  {{ framework.label }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <Button
        variant="outline"
        role="combobox"
        disabled
        class="w-[220px] justify-between font-normal"
      >
        Select framework...
        <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    </Example>

    <!-- Invalid -->
    <Example title="Invalid">
      <Field data-invalid="true" class="w-[220px]">
        <FieldLabel for="invalid-combobox">Framework</FieldLabel>
        <Popover v-model:open="open2">
          <PopoverTrigger as-child>
            <Button
              id="invalid-combobox"
              variant="outline"
              role="combobox"
              aria-invalid="true"
              class="w-full justify-between font-normal border-destructive"
            >
              {{ value2 ? frameworks.find((f) => f.value === value2)?.label : "Select framework..." }}
              <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[220px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="framework in frameworks"
                    :key="framework.value"
                    :value="framework.value"
                    @select="() => {
                      value2 = framework.value;
                      open2 = false;
                    }"
                  >
                    <CheckIcon
                      :class="[
                        'mr-2 size-4',
                        value2 === framework.value ? 'opacity-100' : 'opacity-0'
                      ]"
                    />
                    {{ framework.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FieldError>Please select a framework.</FieldError>
      </Field>
    </Example>

    <!-- With Groups & Separator -->
    <Example title="With Groups & Separator">
      <Popover v-model:open="open3">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open3"
            class="w-[260px] justify-between font-normal"
          >
            {{ value3 ? timezones.flatMap(t => t.items).find((t) => t.value === value3)?.label : "Select timezone..." }}
            <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[260px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search timezone..." />
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandList>
              <template v-for="(tzGroup, index) in timezones" :key="tzGroup.group">
                <CommandGroup :heading="tzGroup.group">
                  <CommandItem
                    v-for="tz in tzGroup.items"
                    :key="tz.value"
                    :value="tz.value"
                    @select="() => {
                      value3 = tz.value;
                      open3 = false;
                    }"
                  >
                    <CheckIcon
                      :class="[
                        'mr-2 size-4',
                        value3 === tz.value ? 'opacity-100' : 'opacity-0'
                      ]"
                    />
                    {{ tz.label }}
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator v-if="index < timezones.length - 1" />
              </template>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Example>

    <!-- In Dialog -->
    <Example title="In Dialog">
      <Dialog v-model:open="openDialog">
        <DialogTrigger as-child>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Combobox in Dialog</DialogTitle>
            <DialogDescription>
              Select a framework from the combobox below inside a dialog.
            </DialogDescription>
          </DialogHeader>
          <Popover v-model:open="dialogComboboxOpen">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                role="combobox"
                class="w-full justify-between font-normal"
              >
                {{ dialogValue ? frameworks.find((f) => f.value === dialogValue)?.label : "Select framework..." }}
                <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      v-for="framework in frameworks"
                      :key="framework.value"
                      :value="framework.value"
                      @select="() => {
                        dialogValue = framework.value;
                        dialogComboboxOpen = false;
                      }"
                    >
                      <CheckIcon
                        :class="[
                          'mr-2 size-4',
                          dialogValue === framework.value ? 'opacity-100' : 'opacity-0'
                        ]"
                      />
                      {{ framework.label }}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- With Form -->
    <Example title="With Form">
      <form class="w-full max-w-sm" @submit.prevent>
        <FieldGroup>
          <Field>
            <FieldLabel for="framework-field">Framework</FieldLabel>
            <Popover v-model:open="open4">
              <PopoverTrigger as-child>
                <Button
                  id="framework-field"
                  variant="outline"
                  role="combobox"
                  class="w-full justify-between font-normal"
                >
                  {{ value4 ? frameworks.find((f) => f.value === value4)?.label : "Select framework..." }}
                  <ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-[300px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="framework in frameworks"
                        :key="framework.value"
                        :value="framework.value"
                        @select="() => {
                          value4 = framework.value;
                          open4 = false;
                        }"
                      >
                        <CheckIcon
                          :class="[
                            'mr-2 size-4',
                            value4 === framework.value ? 'opacity-100' : 'opacity-0'
                          ]"
                        />
                        {{ framework.label }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FieldDescription>Choose your favorite frontend framework.</FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </Example>
  </ExampleWrapper>
</template>
