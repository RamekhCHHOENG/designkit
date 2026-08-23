<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button, buttonVariants } from "@/registry/default/ui/button";
import { ArrowRightIcon, ArrowLeftCircleIcon } from "lucide-vue-next";

const sizes = ["xs", "sm", "default", "lg"] as const;
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;
const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <!-- Variants & Sizes -->
    <Example title="Variants & Sizes">
      <div v-for="s in sizes" :key="s" class="flex flex-wrap items-center gap-2">
        <Button v-for="v in variants" :key="v" :size="s" :variant="v">
          {{ v.charAt(0).toUpperCase() + v.slice(1) }}
        </Button>
      </div>
    </Example>

    <!-- Icon Right -->
    <Example title="Icon Right">
      <div v-for="s in sizes" :key="s" class="flex flex-wrap items-center gap-2">
        <Button v-for="v in variants" :key="v" :size="s" :variant="v">
          {{ v.charAt(0).toUpperCase() + v.slice(1) }}
          <ArrowRightIcon class="size-3.5" />
        </Button>
      </div>
    </Example>

    <!-- Icon Left -->
    <Example title="Icon Left">
      <div v-for="s in sizes" :key="s" class="flex flex-wrap items-center gap-2">
        <Button v-for="v in variants" :key="v" :size="s" :variant="v">
          <ArrowLeftCircleIcon class="size-3.5" />
          {{ v.charAt(0).toUpperCase() + v.slice(1) }}
        </Button>
      </div>
    </Example>

    <!-- Icon Only -->
    <Example title="Icon Only">
      <div v-for="s in iconSizes" :key="s" class="flex flex-wrap items-center gap-2">
        <Button v-for="v in variants" :key="v" :size="s" :variant="v" :aria-label="v">
          <ArrowRightIcon class="size-3.5" />
        </Button>
      </div>
    </Example>

    <!-- Invalid States -->
    <Example title="Invalid States">
      <div v-for="s in sizes" :key="s" class="flex flex-wrap items-center gap-2">
        <Button v-for="v in variants" :key="v" :size="s" :variant="v" aria-invalid="true">
          {{ v.charAt(0).toUpperCase() + v.slice(1) }}
        </Button>
      </div>
    </Example>

    <!-- Examples -->
    <Example title="Examples">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            Submit
            <ArrowRightIcon class="size-3.5" />
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="destructive">Delete</Button>
          <Button size="icon" aria-label="Next">
            <ArrowRightIcon class="size-3.5" />
          </Button>
        </div>
        <a href="#" :class="buttonVariants()">
          Link
        </a>
      </div>
    </Example>
  </ExampleWrapper>
</template>
