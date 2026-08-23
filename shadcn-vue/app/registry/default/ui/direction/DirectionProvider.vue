<script setup lang="ts">
import { ConfigProvider, type ConfigProviderProps } from "reka-ui";

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  dir: "ltr",
});
</script>

<template>
  <ConfigProvider v-bind="props">
    <slot />
  </ConfigProvider>
</template>
