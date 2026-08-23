<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/default/ui/navigation-menu";
import { CircleAlertIcon } from "lucide-vue-next";

const components = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <!-- Basic -->
    <Example title="Basic">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="w-96 p-2">
                <li class="p-2 rounded-md hover:bg-muted transition-colors">
                  <a href="#" class="flex flex-col gap-1 text-sm">
                    <div class="leading-none font-medium">Introduction</div>
                    <div class="line-clamp-2 text-muted-foreground text-xs">
                      Re-usable components built with Tailwind CSS.
                    </div>
                  </a>
                </li>
                <li class="p-2 rounded-md hover:bg-muted transition-colors">
                  <a href="#" class="flex flex-col gap-1 text-sm">
                    <div class="leading-none font-medium">Installation</div>
                    <div class="line-clamp-2 text-muted-foreground text-xs">
                      How to install dependencies and structure your app.
                    </div>
                  </a>
                </li>
                <li class="p-2 rounded-md hover:bg-muted transition-colors">
                  <a href="#" class="flex flex-col gap-1 text-sm">
                    <div class="leading-none font-medium">Typography</div>
                    <div class="line-clamp-2 text-muted-foreground text-xs">
                      Styles for headings, paragraphs, lists...etc
                    </div>
                  </a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-2 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <li
                  v-for="comp in components"
                  :key="comp.title"
                  class="p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <a :href="comp.href" class="flex flex-col gap-1 text-sm">
                    <div class="leading-none font-medium">{{ comp.title }}</div>
                    <div class="line-clamp-2 text-muted-foreground text-xs">
                      {{ comp.description }}
                    </div>
                  </a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[200px] p-2 gap-1">
                <li>
                  <a href="#" class="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm transition-colors">
                    <CircleAlertIcon class="size-4" />
                    Backlog
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm transition-colors">
                    <CircleAlertIcon class="size-4" />
                    To Do
                  </a>
                </li>
                <li>
                  <a href="#" class="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm transition-colors">
                    <CircleAlertIcon class="size-4" />
                    Done
                  </a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="#" :class="navigationMenuTriggerStyle()">
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Example>
  </ExampleWrapper>
</template>
