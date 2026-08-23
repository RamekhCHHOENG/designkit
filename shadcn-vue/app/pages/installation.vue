<script setup lang="ts">
import { ref } from "vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/default/ui/tabs";
import { Button } from "@/registry/default/ui/button";
import { CheckIcon, CopyIcon } from "lucide-vue-next";

const packageManagers = [
  { id: "pnpm", label: "pnpm", command: "pnpm add reka-ui lucide-vue-next clsx tailwind-merge class-variance-authority" },
  { id: "npm", label: "npm", command: "npm install reka-ui lucide-vue-next clsx tailwind-merge class-variance-authority" },
  { id: "yarn", label: "yarn", command: "yarn add reka-ui lucide-vue-next clsx tailwind-merge class-variance-authority" },
  { id: "bun", label: "bun", command: "bun add reka-ui lucide-vue-next clsx tailwind-merge class-variance-authority" },
];

const quickStartCode = [
  '<script setup lang="ts">',
  'import {',
  '  Card,',
  '  CardHeader,',
  '  CardTitle,',
  '  CardDescription,',
  '  CardContent,',
  '  CardFooter',
  '} from "@/registry/default/ui/card";',
  'import { Badge } from "@/registry/default/ui/badge";',
  'import { Button } from "@/registry/default/ui/button";',
  'import { Input } from "@/registry/default/ui/input";',
  'import { Label } from "@/registry/default/ui/label";',
  '</' + 'script>',
  '',
  '<' + 'template>',
  '  <Card class="max-w-md">',
  '    <CardHeader>',
  '      <Badge>New</Badge>',
  '      <CardTitle>Analytics workspace</CardTitle>',
  '      <CardDescription>',
  '        Keep metrics, reports, and team decisions in one place.',
  '      </CardDescription>',
  '    </CardHeader>',
  '',
  '    <CardContent class="flex flex-col gap-1.5">',
  '      <Label for="invite-email">Invite a teammate</Label>',
  '      <Input id="invite-email" type="email" placeholder="name@example.com" />',
  '    </CardContent>',
  '',
  '    <CardFooter class="justify-end gap-2">',
  '      <Button variant="outline">Cancel</Button>',
  '      <Button>Send invite</Button>',
  '    </CardFooter>',
  '  </Card>',
  '</' + 'template>',
].join("\n");

const copied = ref(false);

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (err) {}
}

useSeoMeta({
  title: "Installation — DesignKit Vue",
  description: "How to set up and configure DesignKit for Vue 3 and Nuxt.",
});
</script>

<template>
  <article class="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-10">
    <header class="flex flex-col gap-2">
      <h1 class="text-3xl font-semibold tracking-tight">Installation</h1>
      <p class="text-sm text-muted-foreground">
        DesignKit for Vue is built with Vue 3, Nuxt 4, Reka UI, and Tailwind CSS v4 using shared OKLCH design tokens.
      </p>
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="text-lg font-medium">1. Install dependencies</h2>
      <Tabs default-value="pnpm">
        <TabsList>
          <TabsTrigger v-for="pm in packageManagers" :key="pm.id" :value="pm.id">
            {{ pm.label }}
          </TabsTrigger>
        </TabsList>
        <TabsContent v-for="pm in packageManagers" :key="pm.id" :value="pm.id">
          <div class="relative">
            <pre class="max-h-[32rem] overflow-auto rounded-lg border bg-muted p-4 text-xs font-mono"><code>{{ pm.command }}</code></pre>
            <Button
              variant="outline"
              size="icon"
              class="absolute top-2 right-2 size-7"
              @click="copyText(pm.command)"
            >
              <CheckIcon v-if="copied" class="size-3.5 text-green-500" />
              <CopyIcon v-else class="size-3.5" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-lg font-medium">2. Configure CSS & Design Tokens</h2>
      <p class="text-sm text-muted-foreground">Import the theme tokens in your application entry:</p>
      <pre class="overflow-auto rounded-lg border bg-muted p-4 text-xs font-mono"><code>@import "tailwindcss";
@import "@fontsource-variable/geist";

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --border: oklch(1 0 0 / 10%);
}</code></pre>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-lg font-medium">3. Quick start</h2>
      <pre class="overflow-auto rounded-lg border bg-muted p-4 text-xs font-mono"><code>{{ quickStartCode }}</code></pre>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-lg font-medium">Framework compatibility</h2>
      <p class="text-sm text-muted-foreground">
        Components are fully compatible with Vue 3 (Composition API, Script Setup), Nuxt 4, Vite, and SSR.
      </p>
    </section>
  </article>
</template>
