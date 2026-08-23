<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/default/ui/input-group";
import { Kbd } from "@/registry/default/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";
import {
  SearchIcon,
  EyeOffIcon,
  MicIcon,
  RadioIcon,
  InfoIcon,
  StarIcon,
  CopyIcon,
  TrashIcon,
  ChevronDownIcon,
  SparklesIcon,
  CheckIcon,
  MailIcon,
  ExternalLinkIcon,
  ArrowUpIcon,
} from "lucide-vue-next";

const country = ref("+1");
</script>

<template>
  <TooltipProvider>
    <ExampleWrapper class="min-w-0">
      <!-- Basic -->
      <Example title="Basic">
        <FieldGroup>
          <Field>
            <FieldLabel for="input-default-01">
              Default (No Input Group)
            </FieldLabel>
            <Input id="input-default-01" placeholder="Placeholder" />
          </Field>
          <Field>
            <FieldLabel for="input-group-02">Input Group</FieldLabel>
            <InputGroup>
              <InputGroupInput id="input-group-02" placeholder="Placeholder" />
            </InputGroup>
          </Field>
          <Field data-disabled="true">
            <FieldLabel for="input-disabled-03">Disabled</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="input-disabled-03"
                placeholder="This field is disabled"
                disabled
              />
            </InputGroup>
          </Field>
          <Field data-invalid="true">
            <FieldLabel for="input-invalid-04">Invalid</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="input-invalid-04"
                placeholder="This field is invalid"
                aria-invalid="true"
              />
            </InputGroup>
          </Field>
        </FieldGroup>
      </Example>

      <!-- With Addons -->
      <Example title="With Addons">
        <FieldGroup>
          <Field>
            <FieldLabel for="input-addon-01">Search</FieldLabel>
            <InputGroup>
              <InputGroupInput id="input-addon-01" placeholder="Search..." />
              <InputGroupAddon align="inline-start">
                <SearchIcon class="size-4 text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="input-addon-02">Username</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">@</InputGroupAddon>
              <InputGroupInput id="input-addon-02" placeholder="username" />
              <InputGroupAddon align="inline-end">.designkit.com</InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="input-addon-03">Email</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <MailIcon class="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput id="input-addon-03" type="email" placeholder="you@company.com" />
            </InputGroup>
          </Field>
        </FieldGroup>
      </Example>

      <!-- With Buttons -->
      <Example title="With Buttons">
        <FieldGroup>
          <Field>
            <FieldLabel for="input-btn-01">Copy Link</FieldLabel>
            <InputGroup>
              <InputGroupInput id="input-btn-01" default-value="https://designkit.com/share/123" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Copy link">
                  <CopyIcon class="size-4" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="input-btn-02">Ask AI</FieldLabel>
            <InputGroup>
              <InputGroupInput id="input-btn-02" placeholder="Ask AI anything..." />
              <InputGroupAddon align="inline-end">
                <InputGroupButton aria-label="Generate with AI">
                  <SparklesIcon class="size-4" />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </Example>

      <!-- With Tooltip -->
      <Example title="With Tooltip">
        <Field>
          <FieldLabel for="input-tt-01">Voice Search</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-tt-01" placeholder="Search with your voice..." />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger as-child>
                  <InputGroupButton aria-label="Voice search">
                    <MicIcon class="size-4" />
                  </InputGroupButton>
                </TooltipTrigger>
                <TooltipContent>Start voice input</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </Example>

      <!-- With Keyboard Shortcut -->
      <Example title="With Keyboard Shortcut">
        <Field>
          <FieldLabel for="input-kbd-01">Quick Search</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-kbd-01" placeholder="Quick find..." />
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </Example>

      <!-- In Card -->
      <Example title="In Card">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>Invite Members</CardTitle>
            <CardDescription>
              Invite collaborators to your project workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel for="card-email">Email Address</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">
                  <MailIcon class="size-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput id="card-email" placeholder="colleague@acme.com" />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Send invite">
                    Invite
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </CardContent>
        </Card>
      </Example>

      <!-- Textarea Examples -->
      <Example title="With Textarea">
        <Field>
          <FieldLabel for="textarea-group">Prompt Message</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="textarea-group"
              placeholder="Send a prompt..."
              :rows="3"
            />
            <InputGroupAddon align="inline-end" class="items-end pb-2">
              <InputGroupButton aria-label="Send message">
                <ArrowUpIcon class="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </Example>
    </ExampleWrapper>
  </TooltipProvider>
</template>
