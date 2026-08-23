<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <!-- Basic -->
    <Example title="Basic">
      <Carousel class="mx-auto max-w-xs sm:max-w-sm">
        <CarouselContent>
          <CarouselItem v-for="(_, index) in 5" :key="index">
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-4xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden sm:inline-flex" />
        <CarouselNext class="hidden sm:inline-flex" />
      </Carousel>
    </Example>

    <!-- Multiple -->
    <Example title="Multiple">
      <Carousel
        class="mx-auto max-w-xs sm:max-w-sm"
        :opts="{
          align: 'start',
        }"
      >
        <CarouselContent>
          <CarouselItem
            v-for="(_, index) in 5"
            :key="index"
            class="sm:basis-1/2 lg:basis-1/3"
          >
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-3xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden sm:inline-flex" />
        <CarouselNext class="hidden sm:inline-flex" />
      </Carousel>
    </Example>

    <!-- With Gap -->
    <Example title="With Gap">
      <Carousel class="mx-auto max-w-xs sm:max-w-sm">
        <CarouselContent class="-ml-1">
          <CarouselItem
            v-for="(_, index) in 5"
            :key="index"
            class="pl-1 md:basis-1/2"
          >
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <span class="text-2xl font-semibold">{{ index + 1 }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden sm:inline-flex" />
        <CarouselNext class="hidden sm:inline-flex" />
      </Carousel>
    </Example>
  </ExampleWrapper>
</template>
