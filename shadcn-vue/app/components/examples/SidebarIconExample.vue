<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
} from "@/registry/default/ui/sidebar";
import { MessageSquareIcon, PhoneIcon, VideoIcon, BellIcon, UserIcon } from "lucide-vue-next";

const items = [
  { title: "Chats", icon: MessageSquareIcon },
  { title: "Calls", icon: PhoneIcon },
  { title: "Meetings", icon: VideoIcon },
  { title: "Notifications", icon: BellIcon },
  { title: "Profile", icon: UserIcon },
];
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="Icon Only Collapsed Sidebar">
      <div class="relative h-[280px] w-full overflow-hidden rounded-lg border">
        <SidebarProvider :default-open="true">
          <Sidebar collapsible="none" class="w-14">
            <SidebarHeader class="items-center py-3">
              <div class="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                DK
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup class="p-1">
                <SidebarGroupContent>
                  <SidebarMenu class="items-center">
                    <SidebarMenuItem v-for="item in items" :key="item.title">
                      <SidebarMenuButton :tooltip="item.title" class="size-9 justify-center p-0">
                        <component :is="item.icon" class="size-4" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset class="p-6">
            <div class="text-sm font-semibold">Active Conversation</div>
            <p class="text-xs text-muted-foreground mt-1">Slim dock sidebar for messaging and communications.</p>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Example>
  </ExampleWrapper>
</template>
