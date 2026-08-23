<script setup lang="ts">
import { SplitterPanel, type SplitterPanelProps, useForwardProps } from "reka-ui";

const props = defineProps<SplitterPanelProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <SplitterPanel data-slot="resizable-panel" v-bind="forwarded">
    <slot />
  </SplitterPanel>
</template>
