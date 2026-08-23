<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<PinInputRootProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<PinInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PinInputRoot
    data-slot="input-otp"
    :class="cn('flex items-center gap-2 has-disabled:opacity-50', props.class)"
    v-bind="forwarded"
  >
    <slot />
  </PinInputRoot>
</template>
