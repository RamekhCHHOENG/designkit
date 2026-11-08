<script setup lang="ts">
import { CodeBlock } from "@/registry/default/ui/code-block";

const sampleCode = `import { ref } from "vue";
import { Button } from "@/registry/default/ui/button";

const count = ref(0);
function increment() {
  count.value++;
}`;
</script>

<template>
  <div class="max-w-lg p-6">
    <CodeBlock
      :code="sampleCode"
      language="typescript"
      filename="Counter.vue"
      show-line-numbers
    />
  </div>
</template>
