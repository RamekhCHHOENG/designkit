<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";
import {
  CircleDashedIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SaveIcon,
} from "lucide-vue-next";
</script>

<template>
  <TooltipProvider>
    <ExampleWrapper>
      <!-- Basic -->
      <Example title="Basic">
        <div class="flex items-center gap-2">
          <Kbd>Ctrl</Kbd>
          <Kbd>⌘K</Kbd>
          <Kbd>Ctrl + B</Kbd>
        </div>
      </Example>

      <!-- Modifier Keys -->
      <Example title="Modifier Keys">
        <div class="flex items-center gap-2">
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </div>
      </Example>

      <!-- KbdGroup -->
      <Example title="KbdGroup">
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </Example>

      <!-- Arrow Keys -->
      <Example title="Arrow Keys">
        <div class="flex items-center gap-2">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
        </div>
      </Example>

      <!-- With Icons -->
      <Example title="With Icons">
        <KbdGroup>
          <Kbd>
            <CircleDashedIcon class="size-3.5" />
          </Kbd>
          <Kbd>
            <ArrowLeftIcon class="size-3.5" />
          </Kbd>
          <Kbd>
            <ArrowRightIcon class="size-3.5" />
          </Kbd>
        </KbdGroup>
      </Example>

      <!-- With Icons and Text -->
      <Example title="With Icons and Text">
        <KbdGroup>
          <Kbd>
            <ArrowLeftIcon class="size-3.5" />
            Left
          </Kbd>
          <Kbd>
            <CircleDashedIcon class="size-3.5" />
            Voice Enabled
          </Kbd>
        </KbdGroup>
      </Example>

      <!-- InputGroup -->
      <Example title="InputGroup">
        <InputGroup>
          <InputGroupInput />
          <InputGroupAddon>
            <Kbd>Space</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </Example>

      <!-- Tooltip -->
      <Example title="Tooltip">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button size="icon-sm" variant="outline">
              <SaveIcon class="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent class="pr-1.5">
            <div class="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </Example>

      <!-- With samp -->
      <Example title="With samp">
        <Kbd>
          <samp>File</samp>
        </Kbd>
      </Example>
    </ExampleWrapper>
  </TooltipProvider>
</template>
