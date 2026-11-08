<script setup lang="ts">
import { ref, onMounted, onUnmounted, type HTMLAttributes } from "vue";
import { ListTree, ChevronRight } from "lucide-vue-next";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface TableOfContentsProps {
  items?: TocItem[];
  containerSelector?: string;
  activeId?: string;
  title?: string;
  showProgress?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TableOfContentsProps>(), {
  title: "On this page",
  showProgress: true,
});

const emit = defineEmits<{
  (e: "item-click", id: string): void;
}>();

const internalItems = ref<TocItem[]>(props.items || []);
const currentActiveId = ref<string>(props.activeId || "");
const readingProgress = ref(0);

let observer: IntersectionObserver | null = null;

function scrollToId(id: string, e: MouseEvent) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    currentActiveId.value = id;
    emit("item-click", id);
  }
}

onMounted(() => {
  if (typeof window === "undefined") return;

  // Auto-scan if no items
  if (!props.items || props.items.length === 0) {
    const root = props.containerSelector
      ? document.querySelector(props.containerSelector)
      : document.querySelector("main") || document.body;

    if (root) {
      const headings = root.querySelectorAll("h2, h3, h4");
      const scanned: TocItem[] = [];
      headings.forEach((el, index) => {
        const id = el.id || `heading-${index}`;
        if (!el.id) el.id = id;
        const level = parseInt(el.tagName[1], 10);
        scanned.push({
          id,
          title: el.textContent || `Section ${index + 1}`,
          level,
        });
      });
      internalItems.value = scanned;
    }
  }

  // Observer
  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            currentActiveId.value = entry.target.id;
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    internalItems.value.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer?.observe(el);
    });
  }

  const handleScroll = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0) {
      readingProgress.value = Math.min(
        100,
        Math.max(0, (window.scrollY / total) * 100)
      );
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<template>
  <nav
    v-if="internalItems.length > 0"
    aria-label="Table of contents"
    data-slot="table-of-contents"
    :class="
      cn(
        'flex flex-col gap-3 rounded-xl border bg-card/60 p-4 text-xs backdrop-blur-md shadow-2xs',
        props.class
      )
    "
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b pb-2">
      <div class="flex items-center gap-2 font-medium text-foreground">
        <ListTree class="size-3.5 text-primary" />
        <span>{{ title }}</span>
      </div>
      <span v-if="showProgress" class="font-mono text-[10px] text-muted-foreground">
        {{ Math.round(readingProgress) }}%
      </span>
    </div>

    <!-- Reading Progress Line -->
    <div v-if="showProgress" class="h-0.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        class="h-full bg-primary transition-all duration-150"
        :style="{ width: `${readingProgress}%` }"
      />
    </div>

    <!-- Headings List -->
    <ul class="flex flex-col gap-1">
      <li
        v-for="item in internalItems"
        :key="item.id"
        :class="cn('relative', item.level === 3 ? 'pl-3' : item.level >= 4 ? 'pl-6' : 'pl-0')"
      >
        <a
          :href="'#' + item.id"
          :class="
            cn(
              'flex items-center gap-1.5 rounded-md px-2 py-1 transition-all group',
              currentActiveId === item.id
                ? 'bg-primary/10 font-semibold text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )
          "
          @click="(e) => scrollToId(item.id, e)"
        >
          <ChevronRight
            :class="
              cn(
                'size-3 shrink-0 transition-transform',
                currentActiveId === item.id
                  ? 'text-primary rotate-90'
                  : 'text-muted-foreground/40 group-hover:translate-x-0.5'
              )
            "
          />
          <span class="truncate">{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
