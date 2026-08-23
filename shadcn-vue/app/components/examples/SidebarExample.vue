<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/registry/default/ui/sidebar";
import { HomeIcon, InboxIcon, CalendarIcon, SettingsIcon, SearchIcon } from "lucide-vue-next";

const items = [
  { title: "Home", icon: HomeIcon, url: "#" },
  { title: "Inbox", icon: InboxIcon, url: "#" },
  { title: "Calendar", icon: CalendarIcon, url: "#" },
  { title: "Search", icon: SearchIcon, url: "#" },
  { title: "Settings", icon: SettingsIcon, url: "#" },
];
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="Standard Application Sidebar">
      <div class="relative h-[320px] w-full overflow-hidden rounded-lg border">
        <SidebarProvider :default-open="true">
          <Sidebar collapsible="none">
            <SidebarHeader>
              <div class="px-2 py-1 text-sm font-semibold">Workspace</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in items" :key="item.title">
                      <SidebarMenuButton as-child>
                        <a :href="item.url">
                          <component :is="item.icon" />
                          <span>{{ item.title }}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset class="p-4">
            <header class="flex items-center gap-2 border-b pb-2">
              <SidebarTrigger />
              <h1 class="text-sm font-medium">Dashboard Overview</h1>
            </header>
            <div class="p-4 text-xs text-muted-foreground">
              Main content canvas embedded inside the sidebar layout.
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Example>
  </ExampleWrapper>
</template>
