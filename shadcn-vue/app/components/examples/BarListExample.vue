<script setup lang="ts">
import { Globe, Monitor, Smartphone, Tablet } from "lucide-vue-next";
import { BarList } from "@/registry/default/ui/bar-list";

const data = [
  { name: "/home", value: 45620, icon: Globe },
  { name: "/pricing", value: 35120, icon: Monitor },
  { name: "/docs/getting-started", value: 27100, icon: Smartphone },
  { name: "/components/dock", value: 19800, icon: Tablet },
  { name: "/login", value: 12450, icon: Globe },
];
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3 p-4">
    <div class="flex items-center justify-between border-b pb-2">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Top Pages
      </span>
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Visitors
      </span>
    </div>
    <BarList
      :data="data"
      :value-formatter="(val) => `${val.toLocaleString()} views`"
    />
  </div>
</template>
