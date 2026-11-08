<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium transition-all select-none border",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/60 text-foreground hover:bg-muted",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border-border bg-transparent text-foreground hover:bg-muted/50",
        success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20",
        warning: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20",
        destructive: "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px] gap-1",
        default: "h-6 px-2 text-xs gap-1.5",
        lg: "h-7 px-2.5 text-xs gap-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type TagVariants = VariantProps<typeof tagVariants>;

export interface TagProps {
  variant?: TagVariants["variant"];
  size?: TagVariants["size"];
  closable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TagProps>(), {
  variant: "default",
  size: "default",
  closable: false,
  checkable: false,
  checked: false,
});

const emit = defineEmits<{
  (e: "close", event: MouseEvent): void;
  (e: "update:checked", value: boolean): void;
}>();

function handleClick() {
  if (props.checkable) {
    emit("update:checked", !props.checked);
  }
}

function handleClose(e: MouseEvent) {
  e.stopPropagation();
  emit("close", e);
}
</script>

<template>
  <span
    data-slot="tag"
    :class="
      cn(
        tagVariants({ variant, size }),
        checkable && 'cursor-pointer transition-colors',
        checkable && checked && 'bg-primary text-primary-foreground border-primary hover:bg-primary/90',
        props.class
      )
    "
    @click="handleClick"
  >
    <slot name="icon" />
    <span><slot /></span>
    <button
      v-if="closable"
      type="button"
      tabindex="-1"
      aria-label="Remove tag"
      class="rounded-xs p-0.5 text-muted-foreground/70 hover:bg-black/10 hover:text-foreground dark:hover:bg-white/10 outline-none transition-colors"
      @click="handleClose"
    >
      <XIcon class="size-3" />
    </button>
  </span>
</template>
