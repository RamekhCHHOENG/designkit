<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Badge } from "@/registry/default/ui/badge";
import { Spinner } from "@/registry/default/ui/spinner";
import { BadgeCheckIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <!-- Variants -->
    <Example title="Variants">
      <div class="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </Example>

    <!-- Icon Left -->
    <Example title="Icon Left" class="max-w-fit">
      <div class="flex flex-wrap gap-2">
        <Badge>
          <BadgeCheckIcon class="size-3" />
          Default
        </Badge>
        <Badge variant="secondary">
          <BadgeCheckIcon class="size-3" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <BadgeCheckIcon class="size-3" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <BadgeCheckIcon class="size-3" />
          Outline
        </Badge>
        <Badge variant="ghost">
          <BadgeCheckIcon class="size-3" />
          Ghost
        </Badge>
        <Badge variant="link">
          <BadgeCheckIcon class="size-3" />
          Link
        </Badge>
      </div>
    </Example>

    <!-- Icon Right -->
    <Example title="Icon Right" class="max-w-fit">
      <div class="flex flex-wrap gap-2">
        <Badge>
          Default
          <ArrowRightIcon class="size-3" />
        </Badge>
        <Badge variant="secondary">
          Secondary
          <ArrowRightIcon class="size-3" />
        </Badge>
        <Badge variant="destructive">
          Destructive
          <ArrowRightIcon class="size-3" />
        </Badge>
        <Badge variant="outline">
          Outline
          <ArrowRightIcon class="size-3" />
        </Badge>
        <Badge variant="ghost">
          Ghost
          <ArrowRightIcon class="size-3" />
        </Badge>
        <Badge variant="link">
          Link
          <ArrowRightIcon class="size-3" />
        </Badge>
      </div>
    </Example>

    <!-- With Spinner -->
    <Example title="With Spinner" class="max-w-fit">
      <div class="flex flex-wrap gap-2">
        <Badge>
          <Spinner class="size-3" />
          Default
        </Badge>
        <Badge variant="secondary">
          <Spinner class="size-3" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <Spinner class="size-3" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <Spinner class="size-3" />
          Outline
        </Badge>
        <Badge variant="ghost">
          <Spinner class="size-3" />
          Ghost
        </Badge>
        <Badge variant="link">
          <Spinner class="size-3" />
          Link
        </Badge>
      </div>
    </Example>

    <!-- asChild / Link -->
    <Example title="asChild">
      <div class="flex flex-wrap gap-2">
        <Badge as-child>
          <a href="#" class="inline-flex items-center gap-1">
            Link
            <ArrowUpRightIcon class="size-3" />
          </a>
        </Badge>
        <Badge variant="secondary" as-child>
          <a href="#" class="inline-flex items-center gap-1">
            Link
            <ArrowUpRightIcon class="size-3" />
          </a>
        </Badge>
        <Badge variant="destructive" as-child>
          <a href="#" class="inline-flex items-center gap-1">
            Link
            <ArrowUpRightIcon class="size-3" />
          </a>
        </Badge>
        <Badge variant="ghost" as-child>
          <a href="#" class="inline-flex items-center gap-1">
            Link
            <ArrowUpRightIcon class="size-3" />
          </a>
        </Badge>
      </div>
    </Example>

    <!-- Long Text -->
    <Example title="Long Text">
      <div class="flex flex-wrap gap-2">
        <Badge variant="secondary">
          A badge with a lot of text to see how it wraps
        </Badge>
      </div>
    </Example>

    <!-- Custom Colors -->
    <Example title="Custom Colors" class="max-w-fit">
      <div class="flex flex-wrap gap-2">
        <Badge class="bg-blue-600 text-blue-50 dark:bg-blue-600 dark:text-blue-50">
          Blue
        </Badge>
        <Badge class="bg-green-600 text-green-50 dark:bg-green-600 dark:text-green-50">
          Green
        </Badge>
        <Badge class="bg-sky-600 text-sky-50 dark:bg-sky-600 dark:text-sky-50">
          Sky
        </Badge>
        <Badge class="bg-purple-600 text-purple-50 dark:bg-purple-600 dark:text-purple-50">
          Purple
        </Badge>
        <Badge class="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Blue
        </Badge>
        <Badge class="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          Green
        </Badge>
        <Badge class="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          Sky
        </Badge>
        <Badge class="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          Purple
        </Badge>
        <Badge class="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
          Red
        </Badge>
      </div>
    </Example>
  </ExampleWrapper>
</template>
