<script setup lang="ts">
import { ref, type HTMLAttributes } from "vue";
import { Sparkles, ArrowRight, X } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface AnnouncementBannerProps {
  badge?: string;
  message: string;
  href?: string;
  linkText?: string;
  dismissible?: boolean;
  variant?: "pill" | "bar";
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<AnnouncementBannerProps>(), {
  badge: "New",
  dismissible: true,
  variant: "pill",
});

const emit = defineEmits<{
  (e: "dismiss"): void;
}>();

const isVisible = ref(true);

function handleDismiss(e: MouseEvent) {
  e.stopPropagation();
  isVisible.value = false;
  emit("dismiss");
}
</script>

<template>
  <div v-if="isVisible">
    <!-- Bar Variant -->
    <div
      v-if="variant === 'bar'"
      data-slot="announcement-banner"
      :class="
        cn(
          'w-full border-b bg-gradient-to-r from-primary/10 via-background to-primary/10 px-4 py-2 text-xs flex items-center justify-between gap-3 shadow-2xs',
          props.class
        )
      "
    >
      <div class="mx-auto flex items-center gap-2.5 overflow-hidden">
        <a v-if="href" :href="href" class="flex items-center gap-2.5 overflow-hidden">
          <span v-if="badge" class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20 shrink-0">
            <Sparkles class="size-2.5" />
            <span>{{ badge }}</span>
          </span>
          <span class="truncate text-xs font-medium text-foreground">{{ message }}</span>
          <span v-if="linkText" class="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline text-xs shrink-0 group">
            <span>{{ linkText }}</span>
            <ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
        <div v-else class="flex items-center gap-2.5 overflow-hidden">
          <span v-if="badge" class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20 shrink-0">
            <Sparkles class="size-2.5" />
            <span>{{ badge }}</span>
          </span>
          <span class="truncate text-xs font-medium text-foreground">{{ message }}</span>
          <span v-if="linkText" class="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline text-xs shrink-0 group">
            <span>{{ linkText }}</span>
            <ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <button
        v-if="dismissible"
        type="button"
        aria-label="Dismiss banner"
        class="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
        @click="handleDismiss"
      >
        <X class="size-3.5" />
      </button>
    </div>

    <!-- Pill Variant -->
    <div
      v-else
      data-slot="announcement-banner"
      :class="
        cn(
          'inline-flex items-center gap-2.5 rounded-full border bg-background/80 backdrop-blur-md pl-1.5 pr-2 py-1 shadow-sm transition-all hover:bg-muted/40 text-xs',
          props.class
        )
      "
    >
      <a v-if="href" :href="href" class="flex items-center gap-2 overflow-hidden">
        <span v-if="badge" class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20 shrink-0">
          <Sparkles class="size-2.5" />
          <span>{{ badge }}</span>
        </span>
        <span class="truncate text-xs font-medium text-foreground">{{ message }}</span>
        <span v-if="linkText" class="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline text-xs shrink-0 group">
          <span>{{ linkText }}</span>
          <ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
      <div v-else class="flex items-center gap-2 overflow-hidden">
        <span v-if="badge" class="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20 shrink-0">
          <Sparkles class="size-2.5" />
          <span>{{ badge }}</span>
        </span>
        <span class="truncate text-xs font-medium text-foreground">{{ message }}</span>
        <span v-if="linkText" class="inline-flex items-center gap-0.5 font-semibold text-primary hover:underline text-xs shrink-0 group">
          <span>{{ linkText }}</span>
          <ArrowRight class="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>

      <button
        v-if="dismissible"
        type="button"
        aria-label="Dismiss"
        class="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ml-1"
        @click="handleDismiss"
      >
        <X class="size-3" />
      </button>
    </div>
  </div>
</template>
