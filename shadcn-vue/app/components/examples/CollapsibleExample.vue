<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";
import {
  ChevronRightIcon,
  FolderIcon,
  FileIcon,
  MinimizeIcon,
  MaximizeIcon,
} from "lucide-vue-next";

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

const fileTree: FileTreeItem[] = [
  {
    name: "components",
    items: [
      {
        name: "ui",
        items: [
          { name: "button.vue" },
          { name: "card.vue" },
          { name: "dialog.vue" },
          { name: "input.vue" },
          { name: "select.vue" },
          { name: "table.vue" },
        ],
      },
      { name: "LoginForm.vue" },
      { name: "RegisterForm.vue" },
    ],
  },
  {
    name: "lib",
    items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
  },
  {
    name: "composables",
    items: [
      { name: "useMediaQuery.ts" },
      { name: "useDebounce.ts" },
      { name: "useLocalStorage.ts" },
    ],
  },
  {
    name: "types",
    items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
  },
  {
    name: "public",
    items: [
      { name: "favicon.ico" },
      { name: "logo.svg" },
      { name: "images" },
    ],
  },
  { name: "app.vue" },
  { name: "nuxt.config.ts" },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "README.md" },
  { name: ".gitignore" },
];

const isSettingsOpen = ref(false);
</script>

<template>
  <ExampleWrapper>
    <!-- File Tree -->
    <Example title="File Tree" class="items-center">
      <Card class="mx-auto w-full max-w-[16rem] gap-2" size="sm">
        <CardHeader>
          <Tabs default-value="explorer">
            <TabsList class="w-full">
              <TabsTrigger value="explorer" class="flex-1">Explorer</TabsTrigger>
              <TabsTrigger value="settings" class="flex-1">Outline</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col gap-1">
            <template v-for="item in fileTree" :key="item.name">
              <Collapsible v-if="'items' in item" class="w-full">
                <CollapsibleTrigger as-child>
                  <Button
                    variant="ghost"
                    size="sm"
                    class="group w-full justify-start gap-1.5 transition-none hover:bg-accent hover:text-accent-foreground"
                  >
                    <ChevronRightIcon class="size-3.5 transition-transform group-data-[state=open]:rotate-90" />
                    <FolderIcon class="size-3.5 text-primary" />
                    <span>{{ item.name }}</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent class="mt-1 ml-5">
                  <div class="flex flex-col gap-1">
                    <template v-for="child in item.items" :key="child.name">
                      <Collapsible v-if="'items' in child" class="w-full">
                        <CollapsibleTrigger as-child>
                          <Button
                            variant="ghost"
                            size="sm"
                            class="group w-full justify-start gap-1.5 transition-none hover:bg-accent hover:text-accent-foreground"
                          >
                            <ChevronRightIcon class="size-3.5 transition-transform group-data-[state=open]:rotate-90" />
                            <FolderIcon class="size-3.5 text-primary" />
                            <span>{{ child.name }}</span>
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent class="mt-1 ml-5">
                          <div class="flex flex-col gap-1">
                            <Button
                              v-for="subChild in child.items"
                              :key="subChild.name"
                              variant="link"
                              size="sm"
                              class="w-full justify-start gap-2 text-foreground"
                            >
                              <FileIcon class="size-3.5 text-muted-foreground" />
                              <span>{{ subChild.name }}</span>
                            </Button>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      <Button
                        v-else
                        variant="link"
                        size="sm"
                        class="w-full justify-start gap-2 text-foreground"
                      >
                        <FileIcon class="size-3.5 text-muted-foreground" />
                        <span>{{ child.name }}</span>
                      </Button>
                    </template>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Button
                v-else
                variant="link"
                size="sm"
                class="w-full justify-start gap-2 text-foreground"
              >
                <FileIcon class="size-3.5 text-muted-foreground" />
                <span>{{ item.name }}</span>
              </Button>
            </template>
          </div>
        </CardContent>
      </Card>
    </Example>

    <!-- Settings -->
    <Example title="Settings" class="items-center">
      <Card class="mx-auto w-full max-w-xs" size="sm">
        <CardHeader>
          <CardTitle>Radius</CardTitle>
          <CardDescription>
            Set the corner radius of the element.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible
            v-model:open="isSettingsOpen"
            class="flex items-start gap-2"
          >
            <FieldGroup class="grid w-full grid-cols-2 gap-2">
              <Field>
                <FieldLabel for="radius-x" class="sr-only">Radius X</FieldLabel>
                <Input id="radius-x" placeholder="0" default-value="0" />
              </Field>
              <Field>
                <FieldLabel for="radius-y" class="sr-only">Radius Y</FieldLabel>
                <Input id="radius-y" placeholder="0" default-value="0" />
              </Field>
              <CollapsibleContent class="col-span-full grid grid-cols-2 gap-2">
                <Field>
                  <FieldLabel for="radius-x2" class="sr-only">Radius X</FieldLabel>
                  <Input id="radius-x2" placeholder="0" default-value="0" />
                </Field>
                <Field>
                  <FieldLabel for="radius-y2" class="sr-only">Radius Y</FieldLabel>
                  <Input id="radius-y2" placeholder="0" default-value="0" />
                </Field>
              </CollapsibleContent>
            </FieldGroup>
            <CollapsibleTrigger as-child>
              <Button variant="outline" size="icon">
                <MinimizeIcon v-if="isSettingsOpen" class="size-4" />
                <MaximizeIcon v-else class="size-4" />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </CardContent>
      </Card>
    </Example>
  </ExampleWrapper>
</template>
