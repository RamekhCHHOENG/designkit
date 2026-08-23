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
import { FolderIcon, Share2Icon, StarIcon, Trash2Icon } from "lucide-vue-next";

const items = [
  { title: "All Files", icon: FolderIcon },
  { title: "Shared with me", icon: Share2Icon },
  { title: "Starred", icon: StarIcon },
  { title: "Trash", icon: Trash2Icon },
];
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="Floating Sidebar Variant">
      <div class="relative h-[300px] w-full overflow-hidden rounded-lg border bg-muted/20">
        <SidebarProvider :default-open="true">
          <Sidebar variant="floating" collapsible="none">
            <SidebarHeader>
              <div class="px-2 py-1 text-sm font-semibold">Cloud Drive</div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
          <SidebarInset class="p-6">
            <div class="rounded-lg border border-dashed p-8 text-center text-xs text-muted-foreground">
              Files and documents view
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Example>
  </ExampleWrapper>
</template>
