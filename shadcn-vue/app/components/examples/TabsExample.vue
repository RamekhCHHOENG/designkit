<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu";
import { Input } from "@/registry/default/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/ui/tabs";
import {
  AppWindowIcon,
  CodeIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  MoreHorizontalIcon,
} from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Tabs default-value="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>

    <!-- Line -->
    <Example title="Line">
      <Tabs default-value="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>

    <!-- Variants Alignment -->
    <Example title="Variants Alignment">
      <div class="flex gap-4">
        <Tabs default-value="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
        <Tabs default-value="overview">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <Tabs default-value="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Disabled
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>

    <!-- With Icons -->
    <Example title="With Icons">
      <Tabs default-value="preview">
        <TabsList>
          <TabsTrigger value="preview">
            <AppWindowIcon class="mr-1.5 size-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <CodeIcon class="mr-1.5 size-4" />
            Code
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>

    <!-- Icon Only -->
    <Example title="Icon Only">
      <Tabs default-value="home">
        <TabsList>
          <TabsTrigger value="home">
            <HomeIcon class="size-4" />
          </TabsTrigger>
          <TabsTrigger value="search">
            <SearchIcon class="size-4" />
          </TabsTrigger>
          <TabsTrigger value="settings">
            <SettingsIcon class="size-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>

    <!-- Multiple -->
    <Example title="Multiple">
      <Tabs default-value="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>

    <!-- With Content -->
    <Example title="With Content">
      <Tabs default-value="account" class="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div class="border rounded-lg p-4 mt-2">
          <TabsContent value="account">
            Manage your account preferences and profile information.
          </TabsContent>
          <TabsContent value="password">
            Update your password to keep your account secure.
          </TabsContent>
          <TabsContent value="notifications">
            Configure how you receive notifications and alerts.
          </TabsContent>
        </div>
      </Tabs>
    </Example>

    <!-- Line With Content -->
    <Example title="Line With Content">
      <Tabs default-value="account" class="w-full">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div class="border rounded-lg p-4 mt-2">
          <TabsContent value="account">
            Manage your account preferences and profile information.
          </TabsContent>
          <TabsContent value="password">
            Update your password to keep your account secure.
          </TabsContent>
          <TabsContent value="notifications">
            Configure how you receive notifications and alerts.
          </TabsContent>
        </div>
      </Tabs>
    </Example>

    <!-- Line Disabled -->
    <Example title="Line Disabled">
      <Tabs default-value="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Example>

    <!-- With Dropdown -->
    <Example title="With Dropdown">
      <Tabs default-value="overview" class="w-full">
        <div class="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon" class="size-8">
                <MoreHorizontalIcon class="size-4" />
                <span class="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div class="border rounded-lg p-4 mt-2">
          <TabsContent value="overview">
            View your dashboard metrics and key performance indicators.
          </TabsContent>
          <TabsContent value="analytics">
            Detailed analytics and insights about your data.
          </TabsContent>
          <TabsContent value="reports">
            Generate and view custom reports.
          </TabsContent>
        </div>
      </Tabs>
    </Example>

    <!-- Vertical -->
    <Example title="Vertical">
      <Tabs default-value="account" orientation="vertical" class="flex gap-4">
        <TabsList class="flex-col h-fit">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <div class="border rounded-lg p-4 flex-1">
          <TabsContent value="account">
            Manage your account preferences and profile information.
          </TabsContent>
          <TabsContent value="password">
            Update your password to keep your account secure.
          </TabsContent>
          <TabsContent value="notifications">
            Configure how you receive notifications and alerts.
          </TabsContent>
        </div>
      </Tabs>
    </Example>

    <!-- With Input and Button -->
    <Example title="With Input and Button" class="col-span-full">
      <Tabs default-value="overview" class="mx-auto w-full max-w-lg">
        <div class="flex items-center gap-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <div class="ml-auto flex items-center gap-2">
            <Input placeholder="Search..." class="w-44" />
            <Button>Action</Button>
          </div>
        </div>
        <div class="border rounded-lg p-4 mt-2">
          <TabsContent value="overview">
            View your dashboard metrics and key performance indicators.
          </TabsContent>
          <TabsContent value="analytics">
            Detailed analytics and insights about your data.
          </TabsContent>
          <TabsContent value="reports">
            Generate and view custom reports.
          </TabsContent>
        </div>
      </Tabs>
    </Example>
  </ExampleWrapper>
</template>
