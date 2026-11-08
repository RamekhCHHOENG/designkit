<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { catalogGroups, catalog } from "~/config/catalog";
import { SearchIcon, GithubIcon } from "lucide-vue-next";
import ExamplesSection from "~/components/ExamplesSection.vue";
import DesignKitLogo from "~/components/DesignKitLogo.vue";

const route = useRoute();
const clientHash = ref("");
const isMounted = ref(false);
const mode = useState<"components" | "examples">("app-mode", () => "components");

function readHash() {
  if (typeof window !== "undefined") {
    clientHash.value = window.location.hash.replace(/^#/, "");
    if (clientHash.value) {
      mode.value = "components";
    }
  }
}

onMounted(() => {
  isMounted.value = true;
  readHash();
  window.addEventListener("hashchange", readHash);
  window.addEventListener("popstate", readHash);
});

onUnmounted(() => {
  window.removeEventListener("hashchange", readHash);
  window.removeEventListener("popstate", readHash);
});

watch(
  () => route.hash,
  (newHash) => {
    const val = newHash ? newHash.replace(/^#/, "") : "";
    clientHash.value = val;
    if (val) {
      mode.value = "components";
    }
  },
  { immediate: true }
);

const currentHash = computed(() => {
  if (!isMounted.value) return "";
  const fromRoute = route.hash ? route.hash.replace(/^#/, "") : "";
  return fromRoute || clientHash.value;
});

const searchQuery = ref("");

const filteredGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return catalogGroups;
  return catalogGroups
    .map((group) => ({
      ...group,
      entries: group.entries.filter((entry) =>
        entry.title.toLowerCase().includes(q)
      ),
    }))
    .filter((group) => group.entries.length > 0);
});

const activeSlug = computed(() => {
  if (currentHash.value) return currentHash.value;
  if (route.path === "/installation") return "installation";
  return (route.params.component as string) ?? (route.path.replace("/components/", "") || "");
});
</script>

<template>
  <div class="flex min-h-svh flex-col">
    <!-- Header -->
    <header class="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur">
      <NuxtLink to="/" class="text-sm font-semibold flex items-center gap-2 group" @click="mode = 'components'; clientHash = ''">
        <DesignKitLogo :size="24" class="transition-transform group-hover:scale-105" />
        <span class="font-bold tracking-tight">DesignKit</span>
      </NuxtLink>

      <!-- Framework Switcher -->
      <FrameworkSwitch />

      <!-- Mode Switcher: Components | Examples -->
      <div class="flex items-center gap-0.5 rounded-full border bg-muted/50 p-0.5">
        <button
          type="button"
          class="rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
          :class="mode === 'components' ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
          @click="mode = 'components'"
        >
          Components
        </button>
        <button
          type="button"
          class="rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
          :class="mode === 'examples' ? 'bg-background text-foreground shadow-xs font-semibold' : 'text-muted-foreground hover:text-foreground'"
          @click="mode = 'examples'"
        >
          Examples
        </button>
      </div>

      <div class="flex-1" />

      <a
        href="https://github.com/RamekhCHHOENG/designkit"
        target="_blank"
        rel="noreferrer"
        aria-label="DesignKit on GitHub"
        class="text-muted-foreground hover:text-foreground transition-colors p-2"
      >
        <GithubIcon class="size-4" />
      </a>

      <!-- Dark Mode Toggle -->
      <ThemeToggle />
    </header>

    <!-- Body: Examples Mode vs Components Mode -->
    <ExamplesSection v-if="mode === 'examples'" />

    <div v-else class="mx-auto flex w-full flex-1">
      <!-- Left Sidebar -->
      <aside class="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r px-4 py-6 md:block">
        <!-- Components Mode Sidebar -->
        <nav class="flex flex-col gap-4">
          <!-- Search input -->
          <label class="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm text-muted-foreground">
            <SearchIcon class="size-4 shrink-0" />
            <input
              v-model="searchQuery"
              placeholder="Filter components..."
              class="w-full bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            />
          </label>

          <!-- Installation Link -->
          <NuxtLink
            to="/#installation"
            class="block rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
            :class="activeSlug === 'installation' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'"
          >
            Installation
          </NuxtLink>

          <!-- Grouped Component List -->
          <div class="flex flex-col gap-5">
            <div
              v-for="group in filteredGroups"
              :key="group.name"
              class="flex flex-col gap-1"
            >
              <span class="px-2 text-xs font-medium text-muted-foreground">{{ group.name }}</span>
              <NuxtLink
                v-for="entry in group.entries"
                :key="entry.slug"
                :to="`/#${entry.slug}`"
                class="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                :class="activeSlug === entry.slug ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'"
              >
                <span>{{ entry.title }}</span>
                <span
                  v-if="entry.isNew"
                  class="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary dark:bg-primary/20"
                >
                  New
                </span>
              </NuxtLink>
            </div>
            <div v-if="filteredGroups.length === 0" class="px-2 text-sm text-muted-foreground">
              No matches.
            </div>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="min-w-0 flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
