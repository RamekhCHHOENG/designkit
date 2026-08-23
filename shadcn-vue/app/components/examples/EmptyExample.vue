<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import { Kbd } from "@/registry/default/ui/kbd";
import {
  ArrowUpRightIcon,
  CircleDashedIcon,
  FolderIcon,
  PlusIcon,
} from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven't created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div class="flex gap-2">
            <Button as-child>
              <a href="#">Create project</a>
            </Button>
            <Button variant="outline">Import project</Button>
          </div>
          <Button variant="link" as-child class="text-muted-foreground">
            <a href="#" class="inline-flex items-center gap-1">
              Learn more
              <ArrowUpRightIcon class="size-3.5" />
            </a>
          </Button>
        </EmptyContent>
      </Empty>
    </Example>

    <!-- With Muted Background -->
    <Example title="With Muted Background">
      <Empty class="bg-muted">
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No results found for your search. Try adjusting your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Try again</Button>
          <Button variant="link" as-child class="text-muted-foreground">
            <a href="#" class="inline-flex items-center gap-1">
              Learn more
              <ArrowUpRightIcon class="size-3.5" />
            </a>
          </Button>
        </EmptyContent>
      </Empty>
    </Example>

    <!-- With Border -->
    <Example title="With Border">
      <Empty class="border">
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you're looking for doesn't exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup class="w-3/4">
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <CircleDashedIcon class="size-4" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#" class="underline underline-offset-4">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </Example>

    <!-- With Icon -->
    <Example title="With Icon">
      <Empty class="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon class="size-6 text-primary" />
          </EmptyMedia>
          <EmptyTitle>Nothing to see here</EmptyTitle>
          <EmptyDescription>
            No posts have been created yet. Get started by
            <a href="#" class="underline underline-offset-4">creating your first post</a>.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">
            <PlusIcon class="mr-1.5 size-4" />
            New Post
          </Button>
        </EmptyContent>
      </Empty>
    </Example>

    <!-- With Muted Background Alt -->
    <Example title="With Muted Background Alt">
      <Empty class="bg-muted/50">
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you're looking for doesn't exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup class="w-3/4">
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <CircleDashedIcon class="size-4" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#" class="underline underline-offset-4">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </Example>

    <!-- In Card -->
    <Example title="In Card">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon class="size-6 text-primary" />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven't created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div class="flex gap-2">
            <Button as-child>
              <a href="#">Create project</a>
            </Button>
            <Button variant="outline">Import project</Button>
          </div>
          <Button variant="link" as-child class="text-muted-foreground">
            <a href="#" class="inline-flex items-center gap-1">
              Learn more
              <ArrowUpRightIcon class="size-3.5" />
            </a>
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  </ExampleWrapper>
</template>
