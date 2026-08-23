<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import {
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  LogOutIcon,
  LayoutIcon,
  ActivityIcon,
  PanelLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  MailIcon,
  MessageSquareIcon,
  BellIcon,
  WalletIcon,
  Building2Icon,
  PencilIcon,
  ShareIcon,
  ArchiveIcon,
  TrashIcon,
  BadgeCheckIcon,
  ChevronsUpDownIcon,
  CopyIcon,
  ScissorsIcon,
  ClipboardPasteIcon,
  UsersIcon,
  PlusCircleIcon,
  HelpCircleIcon,
} from "lucide-vue-next";

const sides = ["top", "right", "bottom", "left"] as const;

const showStatusBar = ref(true);
const showActivityBar = ref(false);
const showPanel = ref(false);

const notifications = ref({
  email: true,
  sms: false,
  push: true,
});

const position = ref("bottom");
const paymentMethod = ref("card");

const showBookmarks = ref(true);
const showUrls = ref(false);
const insetTheme = ref("system");

const showSidebar = ref(true);
const showStatusBarComplex = ref(false);
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- Complex -->
    <Example title="Complex">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Complex Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <UserIcon class="mr-2 size-4" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon class="mr-2 size-4" />
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon class="mr-2 size-4" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem v-model:checked="showSidebar">
              <PanelLeftIcon class="mr-2 size-4" />
              Sidebar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem v-model:checked="showStatusBarComplex">
              <LayoutIcon class="mr-2 size-4" />
              Status Bar
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UsersIcon class="mr-2 size-4" />
                Invite Users
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <MailIcon class="mr-2 size-4" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquareIcon class="mr-2 size-4" />
                    Message
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <PlusCircleIcon class="mr-2 size-4" />
                    More...
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HelpCircleIcon class="mr-2 size-4" />
              Support
            </DropdownMenuItem>
            <DropdownMenuItem class="text-destructive">
              <LogOutIcon class="mr-2 size-4" />
              Sign Out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- Sides -->
    <Example title="Sides" container-class-name="col-span-2">
      <div class="flex flex-wrap justify-center gap-2">
        <DropdownMenu v-for="side in sides" :key="side">
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="w-fit capitalize">
              {{ side }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent :side="side">
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Example>

    <!-- With Icons -->
    <Example title="With Icons">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <UserIcon class="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon class="mr-2 size-4" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon class="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="text-destructive">
            <LogOutIcon class="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- With Shortcuts -->
    <Example title="With Shortcuts">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- With Submenu -->
    <Example title="With Submenu">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <MailIcon class="mr-2 size-4" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquareIcon class="mr-2 size-4" />
                  Message
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- With Checkboxes -->
    <Example title="With Checkboxes">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Checkboxes</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem v-model:checked="showStatusBar">
              <LayoutIcon class="mr-2 size-4" />
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem v-model:checked="showActivityBar" disabled>
              <ActivityIcon class="mr-2 size-4" />
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem v-model:checked="showPanel">
              <PanelLeftIcon class="mr-2 size-4" />
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- Checkboxes with Icons -->
    <Example title="Checkboxes with Icons">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Notifications</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
            <DropdownMenuCheckboxItem v-model:checked="notifications.email">
              <MailIcon class="mr-2 size-4" />
              Email notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem v-model:checked="notifications.sms">
              <MessageSquareIcon class="mr-2 size-4" />
              SMS notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem v-model:checked="notifications.push">
              <BellIcon class="mr-2 size-4" />
              Push notifications
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- With Radio Group -->
    <Example title="With Radio Group">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Radio Group</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuRadioGroup v-model="position">
              <DropdownMenuRadioItem value="top">
                <ArrowUpIcon class="mr-2 size-4" />
                Top
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                <ArrowDownIcon class="mr-2 size-4" />
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right" disabled>
                <ArrowRightIcon class="mr-2 size-4" />
                Right
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- Radio with Icons -->
    <Example title="Radio with Icons">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Payment Method</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
            <DropdownMenuRadioGroup v-model="paymentMethod">
              <DropdownMenuRadioItem value="card">
                <CreditCardIcon class="mr-2 size-4" />
                Credit Card
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="paypal">
                <WalletIcon class="mr-2 size-4" />
                PayPal
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bank">
                <Building2Icon class="mr-2 size-4" />
                Bank Transfer
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- With Destructive Items -->
    <Example title="With Destructive Items">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <PencilIcon class="mr-2 size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon class="mr-2 size-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ArchiveIcon class="mr-2 size-4" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem class="text-destructive">
            <TrashIcon class="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- With Avatar -->
    <Example title="With Avatar">
      <div class="flex items-center justify-between gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              class="h-12 justify-start px-2 md:max-w-[200px]"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
                <AvatarFallback class="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight ml-2">
                <span class="truncate font-semibold">shadcn</span>
                <span class="truncate text-xs text-muted-foreground">
                  shadcn@example.com
                </span>
              </div>
              <ChevronsUpDownIcon class="ml-auto size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="min-w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheckIcon class="mr-2 size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon class="mr-2 size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon class="mr-2 size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-destructive">
              <LogOutIcon class="mr-2 size-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheckIcon class="mr-2 size-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon class="mr-2 size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon class="mr-2 size-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-destructive">
              <LogOutIcon class="mr-2 size-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <DialogTitle>Dropdown Menu Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the dropdown menu.
            </DialogDescription>
          </DialogHeader>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="w-fit">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <CopyIcon class="mr-2 size-4" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ScissorsIcon class="mr-2 size-4" />
                Cut
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ClipboardPasteIcon class="mr-2 size-4" />
                Paste
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Save Page...</DropdownMenuItem>
                  <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
                  <DropdownMenuItem>Name Window...</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Developer Tools</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="text-destructive">
                <TrashIcon class="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- With Inset -->
    <Example title="With Inset">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="w-fit">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <CopyIcon class="mr-2 size-4" />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ScissorsIcon class="mr-2 size-4" />
              Cut
            </DropdownMenuItem>
            <DropdownMenuItem inset>Paste</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              v-model:checked="showBookmarks"
              inset
            >
              Bookmarks
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              v-model:checked="showUrls"
              inset
            >
              Full URLs
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Theme</DropdownMenuLabel>
            <DropdownMenuRadioGroup v-model="insetTheme">
              <DropdownMenuRadioItem inset value="light">
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem inset value="dark">
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem inset value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>More Options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuItem>Save Page...</DropdownMenuItem>
                <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  </ExampleWrapper>
</template>
