<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/registry/default/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { Field, FieldGroup } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Label } from "@/registry/default/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";
import {
  ChevronDownIcon,
  VolumeX,
  CheckIcon,
  AlertTriangleIcon,
  UserRoundXIcon,
  ShareIcon,
  CopyIcon,
  TrashIcon,
  ArrowRightIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateCwIcon,
  SearchIcon,
  MinusIcon,
  PlusIcon,
  HeartIcon,
  AudioLinesIcon,
  ArrowLeftIcon,
} from "lucide-vue-next";

const currencyItems = [
  { label: "$", value: "$" },
  { label: "€", value: "€" },
  { label: "£", value: "£" },
];

const durationItems = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
];
</script>

<template>
  <TooltipProvider>
    <ExampleWrapper>
      <!-- Basic -->
      <Example title="Basic">
        <div class="flex flex-col gap-4">
          <ButtonGroup>
            <Button variant="outline">Button</Button>
            <Button variant="outline">Another Button</Button>
          </ButtonGroup>
        </div>
      </Example>

      <!-- With Input -->
      <Example title="With Input">
        <div class="flex flex-col gap-4">
          <ButtonGroup>
            <Button variant="outline">Button</Button>
            <Input placeholder="Type something here..." />
          </ButtonGroup>
          <ButtonGroup>
            <Input placeholder="Type something here..." />
            <Button variant="outline">Button</Button>
          </ButtonGroup>
        </div>
      </Example>

      <!-- With Text -->
      <Example title="With Text">
        <div class="flex flex-col gap-4">
          <ButtonGroup>
            <ButtonGroupText>Text</ButtonGroupText>
            <Button variant="outline">Another Button</Button>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText>
              <Label for="input-text">GPU Size</Label>
            </ButtonGroupText>
            <Input id="input-text" placeholder="Type something here..." />
          </ButtonGroup>
        </div>
      </Example>

      <!-- With Dropdown -->
      <Example title="With Dropdown">
        <div class="flex flex-col gap-4">
          <ButtonGroup>
            <Button variant="outline">Update</Button>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="icon">
                  <ChevronDownIcon class="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Disable</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Uninstall
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>

          <ButtonGroup>
            <Button variant="outline">Follow</Button>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline" size="icon">
                  <ChevronDownIcon class="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-50">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <VolumeX class="size-4" />
                    Mute Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckIcon class="size-4" />
                    Mark as Read
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertTriangleIcon class="size-4" />
                    Report Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserRoundXIcon class="size-4" />
                    Block User
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShareIcon class="size-4" />
                    Share Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CopyIcon class="size-4" />
                    Copy Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <TrashIcon class="size-4" />
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </Example>

      <!-- With Select -->
      <Example title="With Select">
        <Field>
          <Label for="amount">Amount</Label>
          <ButtonGroup>
            <Select default-value="$">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="item in currencyItems"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input placeholder="Enter amount to send" />
            <Button variant="outline">
              <ArrowRightIcon class="size-4" />
            </Button>
          </ButtonGroup>
        </Field>
      </Example>

      <!-- With Icons -->
      <Example title="With Icons">
        <div class="flex flex-col gap-4">
          <ButtonGroup>
            <Button variant="outline">
              <FlipHorizontalIcon class="size-4" />
            </Button>
            <Button variant="outline">
              <FlipVerticalIcon class="size-4" />
            </Button>
            <Button variant="outline">
              <RotateCwIcon class="size-4" />
            </Button>
          </ButtonGroup>
        </div>
      </Example>

      <!-- With Input Group -->
      <Example title="With Input Group">
        <div class="flex flex-col gap-4">
          <InputGroup>
            <InputGroupInput placeholder="Type to search..." />
            <InputGroupAddon align="inline-start" class="text-muted-foreground">
              <SearchIcon class="size-4" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Example>

      <!-- With Fields -->
      <Example title="With Fields">
        <FieldGroup class="grid grid-cols-3 gap-4">
          <Field class="col-span-2">
            <Label for="width">Width</Label>
            <ButtonGroup>
              <InputGroup>
                <InputGroupInput id="width" />
                <InputGroupAddon class="text-muted-foreground">
                  W
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" class="text-muted-foreground">
                  px
                </InputGroupAddon>
              </InputGroup>
              <Button variant="outline" size="icon">
                <MinusIcon class="size-4" />
              </Button>
              <Button variant="outline" size="icon">
                <PlusIcon class="size-4" />
              </Button>
            </ButtonGroup>
          </Field>
        </FieldGroup>
      </Example>

      <!-- With Like -->
      <Example title="With Like">
        <ButtonGroup>
          <Button variant="outline">
            <HeartIcon class="mr-1.5 size-4" />
            Like
          </Button>
          <Button variant="outline" size="icon" class="w-12 pointer-events-none">
            1.2K
          </Button>
        </ButtonGroup>
      </Example>

      <!-- With Select and Input -->
      <Example title="With Select and Input">
        <ButtonGroup>
          <Select default-value="hours">
            <SelectTrigger id="duration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem
                  v-for="item in durationItems"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input />
        </ButtonGroup>
      </Example>

      <!-- Nested -->
      <Example title="Nested">
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon">
              <PlusIcon class="size-4" />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <InputGroup>
              <InputGroupInput placeholder="Send a message..." />
              <Tooltip>
                <TooltipTrigger as-child>
                  <InputGroupAddon align="inline-end">
                    <AudioLinesIcon class="size-4" />
                  </InputGroupAddon>
                </TooltipTrigger>
                <TooltipContent>Voice Mode</TooltipContent>
              </Tooltip>
            </InputGroup>
          </ButtonGroup>
        </ButtonGroup>
      </Example>

      <!-- Pagination -->
      <Example title="Pagination">
        <ButtonGroup>
          <Button variant="outline" size="sm">
            <ArrowLeftIcon class="mr-1.5 size-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">4</Button>
          <Button variant="outline" size="sm">5</Button>
          <Button variant="outline" size="sm">
            Next
            <ArrowRightIcon class="ml-1.5 size-4" />
          </Button>
        </ButtonGroup>
      </Example>

      <!-- Pagination Split -->
      <Example title="Pagination Split">
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">4</Button>
            <Button variant="outline" size="sm">5</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon-xs">
              <ArrowLeftIcon class="size-3.5" />
            </Button>
            <Button variant="outline" size="icon-xs">
              <ArrowRightIcon class="size-3.5" />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Example>

      <!-- Navigation -->
      <Example title="Navigation">
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">
              <ArrowLeftIcon class="size-4" />
            </Button>
            <Button variant="outline">
              <ArrowRightIcon class="size-4" />
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Single navigation button">
            <Button variant="outline" size="icon">
              <ArrowLeftIcon class="size-4" />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Example>

      <!-- Text Alignment -->
      <Example title="Text Alignment">
        <Field>
          <Label id="alignment-label">Text Alignment</Label>
          <ButtonGroup aria-labelledby="alignment-label">
            <Button variant="outline" size="sm">Left</Button>
            <Button variant="outline" size="sm">Center</Button>
            <Button variant="outline" size="sm">Right</Button>
            <Button variant="outline" size="sm">Justify</Button>
          </ButtonGroup>
        </Field>
      </Example>

      <!-- Vertical -->
      <Example title="Vertical">
        <div class="flex gap-6">
          <ButtonGroup
            orientation="vertical"
            aria-label="Media controls"
            class="h-fit"
          >
            <Button variant="outline" size="icon">
              <PlusIcon class="size-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MinusIcon class="size-4" />
            </Button>
          </ButtonGroup>
        </div>
      </Example>

      <!-- Vertical Nested -->
      <Example title="Vertical Nested">
        <ButtonGroup orientation="vertical" aria-label="Design tools palette">
          <ButtonGroup orientation="vertical">
            <Button variant="outline" size="icon">
              <SearchIcon class="size-4" />
            </Button>
            <Button variant="outline" size="icon">
              <CopyIcon class="size-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ShareIcon class="size-4" />
            </Button>
          </ButtonGroup>
          <ButtonGroup orientation="vertical">
            <Button variant="outline" size="icon">
              <FlipHorizontalIcon class="size-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FlipVerticalIcon class="size-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RotateCwIcon class="size-4" />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon">
              <TrashIcon class="size-4" />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Example>
    </ExampleWrapper>
  </TooltipProvider>
</template>
