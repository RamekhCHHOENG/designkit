<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { Toggle } from "@/registry/default/ui/toggle";
import { BoldIcon, ItalicIcon, UnderlineIcon, BookmarkIcon } from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <div class="flex flex-wrap items-center gap-2">
        <Toggle aria-label="Toggle bold" :default-pressed="true">
          <BoldIcon class="size-4" />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <ItalicIcon class="size-4" />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <UnderlineIcon class="size-4" />
        </Toggle>
      </div>
    </Example>

    <!-- Outline -->
    <Example title="Outline">
      <div class="flex flex-wrap items-center gap-2">
        <Toggle variant="outline" aria-label="Toggle italic">
          <ItalicIcon class="mr-1.5 size-4" />
          Italic
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle bold">
          <BoldIcon class="mr-1.5 size-4" />
          Bold
        </Toggle>
      </div>
    </Example>

    <!-- Sizes -->
    <Example title="Sizes">
      <div class="flex flex-wrap items-center gap-2">
        <Toggle variant="outline" aria-label="Toggle small" size="sm">
          Small
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle default" size="default">
          Default
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle large" size="lg">
          Large
        </Toggle>
      </div>
    </Example>

    <!-- With Button Text -->
    <Example title="With Button Text">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Button size="sm" variant="outline">
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle sm" size="sm">
            Toggle
          </Toggle>
        </div>
        <div class="flex items-center gap-2">
          <Button size="default" variant="outline">
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle default" size="default">
            Toggle
          </Toggle>
        </div>
        <div class="flex items-center gap-2">
          <Button size="lg" variant="outline">
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle lg" size="lg">
            Toggle
          </Toggle>
        </div>
      </div>
    </Example>

    <!-- With Button Icon -->
    <Example title="With Button Icon">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon-sm">
            <BoldIcon class="size-3.5" />
          </Button>
          <Toggle variant="outline" aria-label="Toggle sm icon" size="sm">
            <BoldIcon class="size-3.5" />
          </Toggle>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ItalicIcon class="size-4" />
          </Button>
          <Toggle
            variant="outline"
            aria-label="Toggle default icon"
            size="default"
          >
            <ItalicIcon class="size-4" />
          </Toggle>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon-lg">
            <UnderlineIcon class="size-5" />
          </Button>
          <Toggle variant="outline" aria-label="Toggle lg icon" size="lg">
            <UnderlineIcon class="size-5" />
          </Toggle>
        </div>
      </div>
    </Example>

    <!-- With Button Icon + Text -->
    <Example title="With Button Icon + Text">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <BoldIcon class="mr-1.5 size-3.5" />
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle sm icon text" size="sm">
            <BoldIcon class="mr-1.5 size-3.5" />
            Toggle
          </Toggle>
        </div>
        <div class="flex items-center gap-2">
          <Button size="default" variant="outline">
            <ItalicIcon class="mr-1.5 size-4" />
            Button
          </Button>
          <Toggle
            variant="outline"
            aria-label="Toggle default icon text"
            size="default"
          >
            <ItalicIcon class="mr-1.5 size-4" />
            Toggle
          </Toggle>
        </div>
        <div class="flex items-center gap-2">
          <Button size="lg" variant="outline">
            <UnderlineIcon class="mr-1.5 size-5" />
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle lg icon text" size="lg">
            <UnderlineIcon class="mr-1.5 size-5" />
            Toggle
          </Toggle>
        </div>
      </div>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <div class="flex flex-wrap items-center gap-2">
        <Toggle aria-label="Toggle disabled" disabled>
          Disabled
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle disabled outline" disabled>
          Disabled
        </Toggle>
      </div>
    </Example>

    <!-- With Icon -->
    <Example title="With Icon">
      <div class="flex flex-wrap items-center gap-2">
        <Toggle aria-label="Toggle bookmark" :default-pressed="true">
          <BookmarkIcon class="size-4" />
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle bookmark outline">
          <BookmarkIcon class="mr-1.5 size-4" />
          Bookmark
        </Toggle>
      </div>
    </Example>
  </ExampleWrapper>
</template>
