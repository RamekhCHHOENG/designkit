<script setup lang="ts">
import { LucideLoader, ChevronLeftIcon } from "lucide-vue-next";
import { useRoute } from "vue-router";
import { extendedCategories } from "~/config/extendedComponents";

const route = useRoute();
const categorySlug = route.params.category as string;

const category = extendedCategories.find(
  (category) => category.slug === `extended/${categorySlug}`,
);

if (!category) {
  throw createError({
    statusCode: 404,
    message: `Category '${categorySlug}' not found`,
  });
}

const components = getComponentsByNames(category.components.map((item) => item.name));

useSeoMeta({
  title: `${category.name} components built with Vue and Tailwind CSS - Origin UI`,
  description: `A collection of beautiful and accessible ${category.name.toLowerCase()} components built with Vue and Tailwind CSS.`,
  ogTitle: `${category.name} components built with Vue and Tailwind CSS - Origin UI`,
  ogDescription: `A collection of beautiful and accessible ${category.name.toLowerCase()} components built with Vue and Tailwind CSS.`,
  ogImage: "https://www.originui-vue.com/opengraph-image.webp",
  ogUrl: "https://www.originui-vue.com",
  twitterTitle: `${category.name} components built with Vue and Tailwind CSS - Origin UI`,
  twitterDescription:
    "An open-source collection of copy-and-paste components for quickly building application UIs.",
  twitterImage: "https://www.originui-vue.com/opengraph-image.webp",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="px-6 pt-6 max-w-6xl mx-auto">
    <NuxtLink
      :to="'/#' + categorySlug"
      class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group mb-3"
    >
      <ChevronLeftIcon class="size-3.5 transition-transform group-hover:-translate-x-0.5" />
      <span>Back to Component</span>
    </NuxtLink>
    <PageHeader :title="category.name">
      A growing collection of {{ components.length }} {{ category.name.toLowerCase() }} components
      built with Vue and Tailwind CSS.
    </PageHeader>

    <PageGrid>
      <ComponentCard v-for="component in components" :key="component.name" :component="component">
        <Suspense>
          <template #default>
            <ComponentLoader :component="component" />
          </template>
          <template #fallback>
            <div class="flex items-center justify-center p-4">
              <LucideLoader class="mx-auto size-4 animate-spin" />
            </div>
          </template>
        </Suspense>

        <ComponentDetails :component="component" />
      </ComponentCard>
    </PageGrid>

    <Cta />
  </div>
</template>
