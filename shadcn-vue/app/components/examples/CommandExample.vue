<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/default/ui/command";
import {
  CalendarIcon,
  SmileIcon,
  CalculatorIcon,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  HomeIcon,
  InboxIcon,
  FileTextIcon,
  FolderIcon,
  PlusIcon,
  FolderPlusIcon,
  CopyIcon,
  ScissorsIcon,
  ClipboardPasteIcon,
  TrashIcon,
  LayoutGridIcon,
  ListIcon,
  ZoomInIcon,
  ZoomOutIcon,
  BellIcon,
  HelpCircleIcon,
  ImageIcon,
  CodeIcon,
} from "lucide-vue-next";

const openBasic = ref(false);
const openShortcuts = ref(false);
const openGroups = ref(false);
const openMany = ref(false);
</script>

<template>
  <ExampleWrapper>
    <!-- Inline -->
    <Example title="Inline">
      <Card class="w-full p-0">
        <CardContent class="p-0">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem value="calendar">
                  <CalendarIcon class="mr-2 size-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem value="emoji">
                  <SmileIcon class="mr-2 size-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem value="calculator">
                  <CalculatorIcon class="mr-2 size-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem value="profile">
                  <UserIcon class="mr-2 size-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem value="billing">
                  <CreditCardIcon class="mr-2 size-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem value="settings">
                  <SettingsIcon class="mr-2 size-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    </Example>

    <!-- Basic Dialog -->
    <Example title="Basic">
      <div class="flex flex-col gap-4">
        <Button variant="outline" class="w-fit" @click="openBasic = true">
          Open Menu
        </Button>
        <CommandDialog v-model:open="openBasic">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem value="calendar">Calendar</CommandItem>
                <CommandItem value="emoji">Search Emoji</CommandItem>
                <CommandItem value="calculator">Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>

    <!-- With Shortcuts -->
    <Example title="With Shortcuts">
      <div class="flex flex-col gap-4">
        <Button variant="outline" class="w-fit" @click="openShortcuts = true">
          Open Menu
        </Button>
        <CommandDialog v-model:open="openShortcuts">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Settings">
                <CommandItem value="profile">
                  <UserIcon class="mr-2 size-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem value="billing">
                  <CreditCardIcon class="mr-2 size-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem value="settings">
                  <SettingsIcon class="mr-2 size-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>

    <!-- With Groups -->
    <Example title="With Groups">
      <div class="flex flex-col gap-4">
        <Button variant="outline" class="w-fit" @click="openGroups = true">
          Open Menu
        </Button>
        <CommandDialog v-model:open="openGroups">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem value="calendar">
                  <CalendarIcon class="mr-2 size-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem value="emoji">
                  <SmileIcon class="mr-2 size-4" />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem value="calculator">
                  <CalculatorIcon class="mr-2 size-4" />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem value="profile">
                  <UserIcon class="mr-2 size-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem value="billing">
                  <CreditCardIcon class="mr-2 size-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem value="settings">
                  <SettingsIcon class="mr-2 size-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>

    <!-- Many Groups & Items -->
    <Example title="Many Groups & Items">
      <div class="flex flex-col gap-4">
        <Button variant="outline" class="w-fit" @click="openMany = true">
          Open Menu
        </Button>
        <CommandDialog v-model:open="openMany">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem value="home">
                  <HomeIcon class="mr-2 size-4" />
                  <span>Home</span>
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem value="inbox">
                  <InboxIcon class="mr-2 size-4" />
                  <span>Inbox</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem value="documents">
                  <FileTextIcon class="mr-2 size-4" />
                  <span>Documents</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
                <CommandItem value="folders">
                  <FolderIcon class="mr-2 size-4" />
                  <span>Folders</span>
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem value="new-file">
                  <PlusIcon class="mr-2 size-4" />
                  <span>New File</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem value="new-folder">
                  <FolderPlusIcon class="mr-2 size-4" />
                  <span>New Folder</span>
                  <CommandShortcut>⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem value="copy">
                  <CopyIcon class="mr-2 size-4" />
                  <span>Copy</span>
                  <CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
                <CommandItem value="cut">
                  <ScissorsIcon class="mr-2 size-4" />
                  <span>Cut</span>
                  <CommandShortcut>⌘X</CommandShortcut>
                </CommandItem>
                <CommandItem value="paste">
                  <ClipboardPasteIcon class="mr-2 size-4" />
                  <span>Paste</span>
                  <CommandShortcut>⌘V</CommandShortcut>
                </CommandItem>
                <CommandItem value="delete">
                  <TrashIcon class="mr-2 size-4" />
                  <span>Delete</span>
                  <CommandShortcut>⌫</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="View">
                <CommandItem value="grid-view">
                  <LayoutGridIcon class="mr-2 size-4" />
                  <span>Grid View</span>
                </CommandItem>
                <CommandItem value="list-view">
                  <ListIcon class="mr-2 size-4" />
                  <span>List View</span>
                </CommandItem>
                <CommandItem value="zoom-in">
                  <ZoomInIcon class="mr-2 size-4" />
                  <span>Zoom In</span>
                  <CommandShortcut>⌘+</CommandShortcut>
                </CommandItem>
                <CommandItem value="zoom-out">
                  <ZoomOutIcon class="mr-2 size-4" />
                  <span>Zoom Out</span>
                  <CommandShortcut>⌘-</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
                <CommandItem value="profile-2">
                  <UserIcon class="mr-2 size-4" />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem value="billing-2">
                  <CreditCardIcon class="mr-2 size-4" />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem value="settings-2">
                  <SettingsIcon class="mr-2 size-4" />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
                <CommandItem value="notifications">
                  <BellIcon class="mr-2 size-4" />
                  <span>Notifications</span>
                </CommandItem>
                <CommandItem value="help">
                  <HelpCircleIcon class="mr-2 size-4" />
                  <span>Help & Support</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <CommandItem value="calc">
                  <CalculatorIcon class="mr-2 size-4" />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem value="calendar-2">
                  <CalendarIcon class="mr-2 size-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem value="image-editor">
                  <ImageIcon class="mr-2 size-4" />
                  <span>Image Editor</span>
                </CommandItem>
                <CommandItem value="code-editor">
                  <CodeIcon class="mr-2 size-4" />
                  <span>Code Editor</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>
  </ExampleWrapper>
</template>
