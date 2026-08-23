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
  SidebarInset,
} from "@/registry/default/ui/sidebar";
import { LayoutDashboardIcon, BarChart2Icon, UsersIcon, ShieldCheckIcon } from "lucide-vue-next";

const items = [
  { title: "Dashboard", icon: LayoutDashboardIcon },
  { title: "Analytics", icon: BarChart2Icon },
  { title: "Team Members", icon: UsersIcon },
  { title: "Security & Roles", icon: ShieldCheckIcon },
];
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="Inset Sidebar Variant">
      <div class="relative h-[300px] w-full overflow-hidden rounded-lg border bg-sidebar p-2">
        <SidebarProvider :default-open="true">
          <Sidebar variant="inset" collapsible="none">
            <SidebarHeader>
              <div class="px-2 py-1 text-sm font-semibold">Enterprise Hub</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem v-for="item in items" :key="item.title">
                      <SidebarMenuButton>
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset class="rounded-xl border bg-background p-6 shadow-xs">
            <h2 class="text-sm font-semibold">Workspace Inset Canvas</h2>
            <p class="text-xs text-muted-foreground mt-1">Inset variant provides rounded containment for elevated dashboards.</p>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Example>
  </ExampleWrapper>
</template>
