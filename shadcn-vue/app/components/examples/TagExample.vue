<script setup lang="ts">
import { ref } from "vue";
import { Tag } from "@/registry/default/ui/tag";

const selectedTags = ref<string[]>(["vue"]);

function toggleTag(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <div class="flex flex-wrap items-center gap-2">
      <span class="w-full text-xs text-muted-foreground">Variants & Sizes</span>
      <Tag variant="default">Default</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="outline">Outline</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="destructive">Destructive</Tag>
      <Tag variant="success" closable>Closable</Tag>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <span class="w-full text-xs text-muted-foreground">Checkable Tags (Filter pills)</span>
      <Tag
        checkable
        :checked="selectedTags.includes('vue')"
        @update:checked="toggleTag('vue')"
      >
        Vue.js
      </Tag>
      <Tag
        checkable
        :checked="selectedTags.includes('nuxt')"
        @update:checked="toggleTag('nuxt')"
      >
        Nuxt
      </Tag>
      <Tag
        checkable
        :checked="selectedTags.includes('tailwind')"
        @update:checked="toggleTag('tailwind')"
      >
        Tailwind CSS
      </Tag>
      <Tag
        checkable
        :checked="selectedTags.includes('typescript')"
        @update:checked="toggleTag('typescript')"
      >
        TypeScript
      </Tag>
    </div>
  </div>
</template>
