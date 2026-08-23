<script setup lang="ts">
import { toRef, type HTMLAttributes } from "vue";
import { useProvideSidebar, SIDEBAR_WIDTH, SIDEBAR_WIDTH_ICON } from "./useSidebar";
import { TooltipProvider } from "reka-ui";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
    class?: HTMLAttributes["class"];
  }>(),
  {
    defaultOpen: true,
    open: undefined,
  }
);

const emits = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const { state, open, setOpen, isMobile, openMobile } = useProvideSidebar({
  defaultOpen: props.defaultOpen,
  open: props.open !== undefined ? toRef(props, "open") : undefined,
});
</script>

<template>
  <TooltipProvider :delay-duration="0">
    <div
      data-slot="sidebar-wrapper"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH,
        '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
      }"
      :class="
        cn(
          'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
          props.class
        )
      "
    >
      <slot />
    </div>
  </TooltipProvider>
</template>
