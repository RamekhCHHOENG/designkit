<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { Kbd } from "@/registry/default/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";
import { InfoIcon, SaveIcon } from "lucide-vue-next";

const sides = ["top", "right", "bottom", "left"] as const;
</script>

<template>
  <TooltipProvider>
    <ExampleWrapper>
      <!-- Basic -->
      <Example title="Basic">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" class="w-fit">Show Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </Example>

      <!-- Sides -->
      <Example title="Sides">
        <div class="flex flex-wrap gap-2">
          <Tooltip v-for="side in sides" :key="side">
            <TooltipTrigger as-child>
              <Button variant="outline" class="w-fit capitalize">{{ side }}</Button>
            </TooltipTrigger>
            <TooltipContent :side="side">
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </Example>

      <!-- With Icon -->
      <Example title="With Icon">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="ghost" size="icon">
              <InfoIcon class="size-4" />
              <span class="sr-only">Info</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Additional information</p>
          </TooltipContent>
        </Tooltip>
      </Example>

      <!-- Long Content -->
      <Example title="Long Content">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" class="w-fit">Show Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent class="max-w-xs">
            To learn more about how this works, check out the docs. If you have
            any questions, please reach out to us.
          </TooltipContent>
        </Tooltip>
      </Example>

      <!-- Disabled -->
      <Example title="Disabled">
        <Tooltip>
          <TooltipTrigger as-child>
            <span class="inline-block w-fit">
              <Button variant="outline" disabled>Disabled</Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>This feature is currently unavailable</p>
          </TooltipContent>
        </Tooltip>
      </Example>

      <!-- With Keyboard Shortcut -->
      <Example title="With Keyboard Shortcut">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" size="icon-sm">
              <SaveIcon class="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent class="flex items-center gap-1.5">
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
      </Example>

      <!-- On Link -->
      <Example title="On Link">
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="w-fit text-sm text-primary underline-offset-4 hover:underline"
              @click.prevent
            >
              Learn more
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to read the documentation</p>
          </TooltipContent>
        </Tooltip>
      </Example>

      <!-- Formatted Content -->
      <Example title="Formatted Content">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button variant="outline" class="w-fit">Status</Button>
          </TooltipTrigger>
          <TooltipContent>
            <div class="flex flex-col gap-1">
              <p class="font-semibold">Active</p>
              <p class="text-xs opacity-80">Last updated 2 hours ago</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </Example>
    </ExampleWrapper>
  </TooltipProvider>
</template>
