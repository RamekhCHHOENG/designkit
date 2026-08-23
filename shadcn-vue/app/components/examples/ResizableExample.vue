<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";
</script>

<template>
  <ExampleWrapper>
    <!-- Horizontal -->
    <Example title="Horizontal">
      <ResizablePanelGroup
        direction="horizontal"
        class="min-h-[200px] rounded-lg border w-full"
      >
        <ResizablePanel :default-size="25">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :default-size="75">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>

    <!-- Vertical -->
    <Example title="Vertical">
      <ResizablePanelGroup
        direction="vertical"
        class="min-h-[200px] rounded-lg border w-full"
      >
        <ResizablePanel :default-size="25">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :default-size="75">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>

    <!-- With Handle -->
    <Example title="With Handle">
      <ResizablePanelGroup
        direction="horizontal"
        class="min-h-[200px] rounded-lg border w-full"
      >
        <ResizablePanel :default-size="25">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle with-handle />
        <ResizablePanel :default-size="75">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>

    <!-- Nested -->
    <Example title="Nested">
      <ResizablePanelGroup
        direction="horizontal"
        class="rounded-lg border w-full"
      >
        <ResizablePanel :default-size="50">
          <div class="flex h-[200px] items-center justify-center p-6">
            <span class="font-semibold">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :default-size="50">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel :default-size="25">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Two</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel :default-size="75">
              <div class="flex h-full items-center justify-center p-6">
                <span class="font-semibold">Three</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>

    <!-- Controlled -->
    <Example title="Controlled">
      <ResizablePanelGroup
        direction="horizontal"
        class="min-h-[200px] rounded-lg border w-full"
      >
        <ResizablePanel :default-size="30" :min-size="20">
          <div class="flex h-full flex-col items-center justify-center gap-2 p-6">
            <span class="font-semibold">30%</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel :default-size="70" :min-size="30">
          <div class="flex h-full flex-col items-center justify-center gap-2 p-6">
            <span class="font-semibold">70%</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Example>
  </ExampleWrapper>
</template>
