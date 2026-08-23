<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/default/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";
import { InfoIcon } from "lucide-vue-next";

const themes = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const accents = [
  { label: "Default", value: "default" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Purple", value: "purple" },
  { label: "Pink", value: "pink" },
];

const spokenLanguages = [
  { label: "Auto", value: "auto" },
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Arabic", value: "ar" },
  { label: "Hindi", value: "hi" },
];

const voices = [
  { label: "Samantha", value: "samantha" },
  { label: "Alex", value: "alex" },
  { label: "Fred", value: "fred" },
  { label: "Victoria", value: "victoria" },
  { label: "Tom", value: "tom" },
  { label: "Karen", value: "karen" },
];

const activeTab = ref("general");
const theme = ref("system");
const accentColor = ref("default");
const spokenLanguage = ref("en");
const voice = ref("samantha");
</script>

<template>
  <ExampleWrapper>
    <!-- With Form -->
    <Example title="With Form" class="items-center justify-center">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent>
          <form @submit.prevent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're
                done. Your profile will be updated immediately.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup class="py-4">
              <Field>
                <FieldLabel for="name-1">Name</FieldLabel>
                <Input id="name-1" name="name" default-value="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel for="username-1">Username</FieldLabel>
                <Input
                  id="username-1"
                  name="username"
                  default-value="@peduarte"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose as-child>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- Scrollable Content -->
    <Example title="Scrollable Content" class="items-center justify-center">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Scrollable Content</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div class="max-h-[70vh] overflow-y-auto pr-2">
            <p
              v-for="index in 10"
              :key="index"
              class="mb-4 leading-normal text-sm"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- With Sticky Footer -->
    <Example title="With Sticky Footer" class="items-center justify-center">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Sticky Footer</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div class="max-h-[70vh] overflow-y-auto pr-2">
            <p
              v-for="index in 10"
              :key="index"
              class="mb-4 leading-normal text-sm"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- No Close Button -->
    <Example title="No Close Button" class="items-center justify-center">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">No Close Button</Button>
        </DialogTrigger>
        <DialogContent :show-close-button="false">
          <DialogHeader>
            <DialogTitle>No Close Button</DialogTitle>
            <DialogDescription>
              This dialog doesn't have a close button in the top-right
              corner.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- Chat Settings -->
    <Example title="Chat Settings" class="items-center justify-center">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">Chat Settings</Button>
        </DialogTrigger>
        <DialogContent class="min-w-md max-w-lg">
          <DialogHeader>
            <DialogTitle>Chat Settings</DialogTitle>
            <DialogDescription>
              Customize your chat settings: theme, accent color, spoken
              language, voice, personality, and custom instructions.
            </DialogDescription>
          </DialogHeader>
          <div class="flex flex-col gap-4">
            <Tabs v-model="activeTab" class="w-full">
              <TabsList class="w-full">
                <TabsTrigger value="general" class="flex-1">General</TabsTrigger>
                <TabsTrigger value="notifications" class="flex-1">Notifications</TabsTrigger>
                <TabsTrigger value="personalization" class="flex-1">Personalization</TabsTrigger>
              </TabsList>
              <div class="border rounded-lg p-4 mt-3">
                <TabsContent value="general">
                  <FieldSet>
                    <FieldGroup>
                      <Field orientation="horizontal">
                        <FieldLabel for="theme-sel">Theme</FieldLabel>
                        <Select v-model="theme">
                          <SelectTrigger id="theme-sel" class="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent align="end">
                            <SelectGroup>
                              <SelectItem
                                v-for="t in themes"
                                :key="t.value"
                                :value="t.value"
                              >
                                {{ t.label }}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <FieldSeparator />
                      <Field orientation="horizontal">
                        <FieldLabel for="accent-sel">Accent Color</FieldLabel>
                        <Select v-model="accentColor">
                          <SelectTrigger id="accent-sel" class="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent align="end">
                            <SelectGroup>
                              <SelectItem
                                v-for="a in accents"
                                :key="a.value"
                                :value="a.value"
                              >
                                {{ a.label }}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <FieldSeparator />
                      <Field orientation="responsive">
                        <FieldContent>
                          <FieldLabel for="spoken-sel">Spoken Language</FieldLabel>
                          <FieldDescription>
                            For best results, select the language you mainly speak.
                          </FieldDescription>
                        </FieldContent>
                        <Select v-model="spokenLanguage">
                          <SelectTrigger id="spoken-sel" class="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent align="end">
                            <SelectGroup>
                              <SelectItem
                                v-for="lang in spokenLanguages"
                                :key="lang.value"
                                :value="lang.value"
                              >
                                {{ lang.label }}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                      <FieldSeparator />
                      <Field orientation="horizontal">
                        <FieldLabel for="voice-sel">Voice</FieldLabel>
                        <Select v-model="voice">
                          <SelectTrigger id="voice-sel" class="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent align="end">
                            <SelectGroup>
                              <SelectItem
                                v-for="v in voices"
                                :key="v.value"
                                :value="v.value"
                              >
                                {{ v.label }}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </TabsContent>
                <TabsContent value="notifications">
                  <FieldGroup>
                    <FieldSet>
                      <FieldLabel>Responses</FieldLabel>
                      <FieldDescription>
                        Get notified when ChatGPT responds to requests that take time.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        <Field orientation="horizontal">
                          <Checkbox id="push-diag" :model-value="true" disabled />
                          <FieldLabel for="push-diag" class="font-normal">
                            Push notifications
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                    <FieldSeparator />
                    <FieldSet>
                      <FieldLabel>Tasks</FieldLabel>
                      <FieldDescription>
                        Get notified when tasks you've created have updates.
                      </FieldDescription>
                      <FieldGroup data-slot="checkbox-group">
                        <Field orientation="horizontal">
                          <Checkbox id="push-tasks-diag" />
                          <FieldLabel for="push-tasks-diag" class="font-normal">
                            Push notifications
                          </FieldLabel>
                        </Field>
                        <Field orientation="horizontal">
                          <Checkbox id="email-tasks-diag" />
                          <FieldLabel for="email-tasks-diag" class="font-normal">
                            Email notifications
                          </FieldLabel>
                        </Field>
                      </FieldGroup>
                    </FieldSet>
                  </FieldGroup>
                </TabsContent>
                <TabsContent value="personalization">
                  <FieldGroup>
                    <Field orientation="responsive">
                      <FieldLabel for="nickname-diag">Nickname</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id="nickname-diag"
                          placeholder="Broski"
                          class="max-w-[200px]"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton size="icon-xs">
                            <InfoIcon class="size-3.5" />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </Field>
                  </FieldGroup>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
