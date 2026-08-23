<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { DialogOverlay, type DialogOverlayProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>();
</script>

<template>
  <DialogOverlay
    data-slot="sheet-overlay"
    :class="
      cn(
        'fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 supports-backdrop-filter:backdrop-blur-xs',
        props.class
      )
    "
  />
</template>
