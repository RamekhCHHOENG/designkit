<script setup lang="ts">
import { ref } from "vue";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/registry/default/ui/tags-input";

const tags = ref(["DesignKit", "Vue3", "Tailwind"]);
</script>

<template>
  <div class="max-w-md p-6">
    <TagsInput v-model="tags">
      <TagsInputItem v-for="tag in tags" :key="tag" :value="tag">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
      <TagsInputInput placeholder="Add framework tag..." />
    </TagsInput>
  </div>
</template>
