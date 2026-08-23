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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/default/ui/hover-card";

const sides = ["top", "right", "bottom", "left"] as const;
</script>

<template>
  <ExampleWrapper>
    <!-- Sides -->
    <Example title="Sides" class="col-span-full">
      <div class="flex flex-wrap items-center justify-center gap-2">
        <HoverCard v-for="side in sides" :key="side">
          <HoverCardTrigger as-child>
            <Button variant="outline" class="capitalize">
              {{ side }}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent :side="side">
            <div class="flex flex-col gap-1.5 text-sm">
              <h4 class="font-medium">Hover Card</h4>
              <p class="text-muted-foreground">
                This hover card appears on the {{ side }} side of the trigger.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
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
            <DialogTitle>Hover Card Example</DialogTitle>
            <DialogDescription>
              Hover over the button below to see the hover card.
            </DialogDescription>
          </DialogHeader>
          <HoverCard>
            <HoverCardTrigger as-child>
              <Button variant="outline" class="w-fit">Hover me</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div class="flex flex-col gap-1.5 text-sm">
                <h4 class="font-medium">Hover Card</h4>
                <p class="text-muted-foreground">
                  This hover card appears inside a dialog. Hover over the button to see it.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
