<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Dock, DockIcon, DockSeparator } from "@/registry/default/ui/dock";
import {
  MailIcon,
  MessageSquareIcon,
  CompassIcon,
  MusicIcon,
  FolderIcon,
  TerminalIcon,
  SettingsIcon,
} from "lucide-vue-next";

const activeApp = ref("Mail");
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <Example title="macOS Physics-Based Dock">
      <div class="flex w-full flex-col items-center justify-center gap-8 py-8">
        <p class="text-xs text-muted-foreground">
          Hover over icons to experience smooth proximity magnification and tooltips.
        </p>

        <Dock :magnification="68" :distance="130" :base-size="44">
          <DockIcon
            label="Mail"
            :active="activeApp === 'Mail'"
            @click="activeApp = 'Mail'"
          >
            <MailIcon class="size-full text-sky-500" />
          </DockIcon>
          <DockIcon
            label="Messages"
            :active="activeApp === 'Messages'"
            @click="activeApp = 'Messages'"
          >
            <MessageSquareIcon class="size-full text-emerald-500" />
          </DockIcon>
          <DockIcon
            label="Safari"
            :active="activeApp === 'Safari'"
            @click="activeApp = 'Safari'"
          >
            <CompassIcon class="size-full text-blue-500" />
          </DockIcon>
          <DockIcon
            label="Music"
            :active="activeApp === 'Music'"
            @click="activeApp = 'Music'"
          >
            <MusicIcon class="size-full text-rose-500" />
          </DockIcon>

          <DockSeparator />

          <DockIcon
            label="Files"
            :active="activeApp === 'Files'"
            @click="activeApp = 'Files'"
          >
            <FolderIcon class="size-full text-amber-500" />
          </DockIcon>
          <DockIcon
            label="Terminal"
            :active="activeApp === 'Terminal'"
            @click="activeApp = 'Terminal'"
          >
            <TerminalIcon class="size-full text-purple-500" />
          </DockIcon>
          <DockIcon
            label="Settings"
            :active="activeApp === 'Settings'"
            @click="activeApp = 'Settings'"
          >
            <SettingsIcon class="size-full text-slate-500" />
          </DockIcon>
        </Dock>
      </div>
    </Example>
  </ExampleWrapper>
</template>
