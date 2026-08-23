<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "@/registry/default/ui/marker";
import { Spinner } from "@/registry/default/ui/spinner";
import {
  FileTextIcon,
  GitBranchIcon,
  ClockIcon,
  ChevronRightIcon,
  CircleUserIcon,
  SearchIcon,
  CheckIcon,
} from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper>
    <!-- Markers -->
    <Example title="Markers" class="gap-8">
      <Marker>
        <MarkerContent>A default marker</MarkerContent>
      </Marker>
      <Marker>
        <MarkerIcon>
          <FileTextIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Marker with icon</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Marker with a spinner</MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent class="shimmer">
          Marker with shimmer effect
        </MarkerContent>
      </Marker>
      <Marker role="status">
        <MarkerContent class="shimmer">Thinking...</MarkerContent>
      </Marker>
      <Marker as="a" href="#">
        <MarkerIcon>
          <GitBranchIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Marker as a link</MarkerContent>
      </Marker>
      <Marker as="button" class="transition-colors hover:text-foreground">
        <MarkerIcon>
          <ClockIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent class="flex-1">
          <div>Marker as a button</div>
        </MarkerContent>
        <MarkerIcon>
          <ChevronRightIcon class="size-4" />
        </MarkerIcon>
      </Marker>
      <Marker>
        <MarkerIcon>
          <CircleUserIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Rhea joined the chat</MarkerContent>
      </Marker>
      <Marker class="justify-center">
        <MarkerContent>
          <strong class="font-medium">Olivia Rose</strong> left the chat
        </MarkerContent>
      </Marker>
      <Marker class="flex-col">
        <MarkerIcon>
          <FileTextIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Marker with icon at the top</MarkerContent>
      </Marker>
    </Example>

    <!-- Border -->
    <Example title="Border" class="gap-3">
      <Marker variant="border">
        <MarkerIcon>
          <GitBranchIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <SearchIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker variant="border">
        <MarkerIcon>
          <FileTextIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </Example>

    <!-- Separator -->
    <Example title="Separator" class="gap-8">
      <Marker variant="separator">
        <MarkerContent>Worked for 42s</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerIcon>
          <Spinner />
        </MarkerIcon>
        <MarkerContent>Compacting conversation</MarkerContent>
      </Marker>
      <Marker variant="separator" role="status">
        <MarkerContent class="shimmer">Reading 4 files</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerIcon>
          <CheckIcon class="size-4" />
        </MarkerIcon>
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          With a <a href="#" class="underline">link to learn more</a>
        </MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>
          <Button variant="outline" size="sm">
            <GitBranchIcon class="mr-1.5 size-4" />
            Button
          </Button>
        </MarkerContent>
      </Marker>
    </Example>

    <!-- Accordion -->
    <Example title="Accordion" container-class-name="min-h-72">
      <Accordion type="single" collapsible class="w-full">
        <AccordionItem value="1">
          <AccordionTrigger>
            <Marker>
              <MarkerIcon>
                <ClockIcon class="size-4" />
              </MarkerIcon>
              <MarkerContent>Worked for 42s</MarkerContent>
            </Marker>
          </AccordionTrigger>
          <AccordionContent>
            <p class="text-sm text-muted-foreground">
              The user asked for a list of all the files in the current
              directory. The assistant responded with a list of all the files in
              the current directory.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>

    <!-- Drawer -->
    <Example title="Drawer">
      <Drawer>
        <Marker variant="separator">
          <DrawerTrigger as-child>
            <Button variant="outline">
              <SearchIcon class="mr-1.5 size-4" />
              Explored 4 files
            </Button>
          </DrawerTrigger>
        </Marker>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>File Activity</DrawerTitle>
            <DrawerDescription>
              Files read while preparing the response.
            </DrawerDescription>
          </DrawerHeader>
          <div class="grid gap-3 px-4 text-sm">
            <div class="flex items-center justify-between gap-4 rounded-md border px-3 py-2">
              <span class="truncate font-mono text-xs">app/chat/page.vue</span>
              <span class="text-muted-foreground">read</span>
            </div>
            <div class="flex items-center justify-between gap-4 rounded-md border px-3 py-2">
              <span class="truncate font-mono text-xs">components/message.vue</span>
              <span class="text-muted-foreground">read</span>
            </div>
            <div class="flex items-center justify-between gap-4 rounded-md border px-3 py-2">
              <span class="truncate font-mono text-xs">lib/ai.ts</span>
              <span class="text-muted-foreground">read</span>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>
  </ExampleWrapper>
</template>
