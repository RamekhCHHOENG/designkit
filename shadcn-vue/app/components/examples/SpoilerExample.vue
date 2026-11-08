<script setup lang="ts">
import { Spoiler } from "@/registry/default/ui/spoiler";
</script>

<template>
  <div class="max-w-md p-6">
    <Spoiler :max-height="90" show-label="Expand story" hide-label="Collapse story">
      <p class="text-sm text-muted-foreground leading-relaxed">
        DesignKit is a next-generation UI component library crafted for modern web applications.
        It brings together the power of Tailwind CSS, Reka UI, Base UI, and OKLCH color tokenization
        to deliver accessible, beautiful, and highly responsive components out of the box.
        Whether you are building with Next.js or Nuxt, DesignKit ensures seamless cross-framework
        parity with unified styling, TypeScript strictness, and zero unnecessary runtime dependencies.
      </p>
    </Spoiler>
  </div>
</template>
