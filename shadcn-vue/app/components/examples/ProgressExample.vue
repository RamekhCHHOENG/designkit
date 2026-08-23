<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/registry/default/ui/progress";
import { Slider } from "@/registry/default/ui/slider";
import { FileIcon } from "lucide-vue-next";

const controlledValue = ref([50]);

const files = [
  {
    id: "1",
    name: "document.pdf",
    progress: 45,
    timeRemaining: "2m 30s",
  },
  {
    id: "2",
    name: "presentation.pptx",
    progress: 78,
    timeRemaining: "45s",
  },
  {
    id: "3",
    name: "spreadsheet.xlsx",
    progress: 12,
    timeRemaining: "5m 12s",
  },
  {
    id: "4",
    name: "image.jpg",
    progress: 100,
    timeRemaining: "Complete",
  },
];
</script>

<template>
  <ExampleWrapper>
    <!-- Progress Bar -->
    <Example title="Progress Bar">
      <div class="flex w-full flex-col gap-4">
        <Progress :model-value="0" />
        <Progress :model-value="25" class="w-full" />
        <Progress :model-value="50" />
        <Progress :model-value="75" />
        <Progress :model-value="100" />
      </div>
    </Example>

    <!-- With Label -->
    <Example title="With Label">
      <div class="w-full">
        <div class="flex justify-between text-sm mb-1.5">
          <span class="font-medium">Upload progress</span>
          <span class="text-muted-foreground">56%</span>
        </div>
        <Progress :model-value="56" />
      </div>
    </Example>

    <!-- Controlled -->
    <Example title="Controlled">
      <div class="flex w-full flex-col gap-4">
        <Progress :model-value="controlledValue[0]" class="w-full" />
        <Slider
          v-model="controlledValue"
          :min="0"
          :max="100"
          :step="1"
        />
      </div>
    </Example>

    <!-- File Upload List -->
    <Example title="File Upload List">
      <ItemGroup class="w-full">
        <Item v-for="file in files" :key="file.id" size="xs" class="px-0">
          <ItemMedia variant="icon">
            <FileIcon class="size-5" />
          </ItemMedia>
          <ItemContent class="inline-block truncate">
            <ItemTitle class="inline">{{ file.name }}</ItemTitle>
          </ItemContent>
          <ItemContent>
            <Progress :model-value="file.progress" class="w-32" />
          </ItemContent>
          <ItemActions class="w-16 justify-end">
            <span class="text-sm text-muted-foreground">
              {{ file.timeRemaining }}
            </span>
          </ItemActions>
        </Item>
      </ItemGroup>
    </Example>
  </ExampleWrapper>
</template>
