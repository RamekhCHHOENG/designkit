<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { AspectRatio } from "@/registry/default/ui/aspect-ratio";
</script>

<template>
  <ExampleWrapper class="max-w-4xl 2xl:max-w-4xl">
    <Example title="16:9" class="items-center justify-center">
      <AspectRatio :ratio="16 / 9" class="rounded-lg bg-muted w-full overflow-hidden">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </Example>

    <Example title="21:9" class="items-center justify-center">
      <AspectRatio :ratio="21 / 9" class="rounded-lg bg-muted w-full overflow-hidden">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </Example>

    <Example title="1:1" class="items-start">
      <AspectRatio :ratio="1 / 1" class="rounded-lg bg-muted w-full overflow-hidden">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </Example>

    <Example title="9:16" class="items-center justify-center">
      <AspectRatio :ratio="9 / 16" class="rounded-lg bg-muted w-full overflow-hidden">
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"
          class="h-full w-full rounded-lg object-cover grayscale dark:brightness-20"
        />
      </AspectRatio>
    </Example>
  </ExampleWrapper>
</template>
