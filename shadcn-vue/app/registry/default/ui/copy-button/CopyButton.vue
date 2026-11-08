<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { CheckIcon, CopyIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface CopyButtonProps {
  value: string;
  timeout?: number;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<CopyButtonProps>(), {
  timeout: 2000,
  disabled: false,
});

const emit = defineEmits<{
  (e: "copy-success"): void;
  (e: "copy-error", err: unknown): void;
}>();

const copied = ref(false);

async function handleCopy(e: MouseEvent) {
  e.stopPropagation();
  if (props.disabled || !props.value) return;

  try {
    await navigator.clipboard.writeText(props.value);
    copied.value = true;
    emit("copy-success");
    setTimeout(() => {
      copied.value = false;
    }, props.timeout);
  } catch (err) {
    emit("copy-error", err);
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    data-slot="copy-button"
    :data-copied="copied ? 'true' : undefined"
    :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
    :class="
      cn(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground',
        'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        copied && 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400',
        props.class
      )
    "
    @click="handleCopy"
  >
    <CheckIcon v-if="copied" class="size-3.5 transition-transform scale-100" />
    <slot v-else>
      <CopyIcon class="size-3.5 transition-transform" />
    </slot>
  </button>
</template>
