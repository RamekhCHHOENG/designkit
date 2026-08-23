<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { TrendingUpIcon } from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper>
    <!-- Area Chart -->
    <Example title="Area Chart">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[200px] w-full flex items-end justify-between gap-2 pt-4">
            <svg class="h-full w-full overflow-visible" viewBox="0 0 300 120">
              <defs>
                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--color-primary, #3b82f6)" stop-opacity="0.4" />
                  <stop offset="100%" stop-color="var(--color-primary, #3b82f6)" stop-opacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="100" x2="300" y2="100" stroke="currentColor" opacity="0.1" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" opacity="0.1" />
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" opacity="0.1" />
              <path
                d="M 10 75 Q 60 20, 110 50 T 210 100 T 290 35 L 290 110 L 10 110 Z"
                fill="url(#area-grad)"
              />
              <path
                d="M 10 75 Q 60 20, 110 50 T 210 100 T 290 35"
                fill="none"
                stroke="var(--color-primary, #3b82f6)"
                stroke-width="2"
              />
            </svg>
          </div>
          <div class="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </CardContent>
        <CardFooter>
          <div class="flex w-full items-start gap-2">
            <div class="grid gap-2">
              <div class="flex items-center gap-2 leading-none font-medium text-sm">
                Trending up by 5.2% this month
                <TrendingUpIcon class="size-4" />
              </div>
              <div class="flex items-center gap-2 leading-none text-muted-foreground text-xs">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Example>

    <!-- Bar Chart -->
    <Example title="Bar Chart">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[200px] w-full flex items-end justify-between gap-4 pt-4 px-2">
            <div class="flex flex-1 flex-col items-center gap-2 h-full justify-end">
              <div class="flex items-end gap-1 h-full w-full justify-center">
                <div class="w-3 rounded-t bg-primary" style="height: 60%" />
                <div class="w-3 rounded-t bg-primary/40" style="height: 35%" />
              </div>
              <span class="text-xs text-muted-foreground">Jan</span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-2 h-full justify-end">
              <div class="flex items-end gap-1 h-full w-full justify-center">
                <div class="w-3 rounded-t bg-primary" style="height: 90%" />
                <div class="w-3 rounded-t bg-primary/40" style="height: 65%" />
              </div>
              <span class="text-xs text-muted-foreground">Feb</span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-2 h-full justify-end">
              <div class="flex items-end gap-1 h-full w-full justify-center">
                <div class="w-3 rounded-t bg-primary" style="height: 75%" />
                <div class="w-3 rounded-t bg-primary/40" style="height: 45%" />
              </div>
              <span class="text-xs text-muted-foreground">Mar</span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-2 h-full justify-end">
              <div class="flex items-end gap-1 h-full w-full justify-center">
                <div class="w-3 rounded-t bg-primary" style="height: 30%" />
                <div class="w-3 rounded-t bg-primary/40" style="height: 70%" />
              </div>
              <span class="text-xs text-muted-foreground">Apr</span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-2 h-full justify-end">
              <div class="flex items-end gap-1 h-full w-full justify-center">
                <div class="w-3 rounded-t bg-primary" style="height: 70%" />
                <div class="w-3 rounded-t bg-primary/40" style="height: 50%" />
              </div>
              <span class="text-xs text-muted-foreground">May</span>
            </div>
            <div class="flex flex-1 flex-col items-center gap-2 h-full justify-end">
              <div class="flex items-end gap-1 h-full w-full justify-center">
                <div class="w-3 rounded-t bg-primary" style="height: 72%" />
                <div class="w-3 rounded-t bg-primary/40" style="height: 55%" />
              </div>
              <span class="text-xs text-muted-foreground">Jun</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex-col items-start gap-2">
          <div class="flex gap-2 leading-none font-medium text-sm">
            Trending up by 5.2% this month
            <TrendingUpIcon class="size-4" />
          </div>
          <div class="leading-none text-muted-foreground text-xs">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Example>

    <!-- Line Chart -->
    <Example title="Line Chart">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Line Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="h-[200px] w-full flex items-end justify-between gap-2 pt-4">
            <svg class="h-full w-full overflow-visible" viewBox="0 0 300 120">
              <line x1="0" y1="100" x2="300" y2="100" stroke="currentColor" opacity="0.1" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" opacity="0.1" />
              <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" opacity="0.1" />
              <!-- Desktop Line -->
              <path
                d="M 15 70 L 65 20 L 115 45 L 165 100 L 215 50 L 285 45"
                fill="none"
                stroke="var(--color-primary, #3b82f6)"
                stroke-width="2.5"
              />
              <!-- Mobile Line -->
              <path
                d="M 15 95 L 65 50 L 115 80 L 165 55 L 215 75 L 285 70"
                fill="none"
                stroke="var(--color-primary, #3b82f6)"
                stroke-opacity="0.4"
                stroke-width="2.5"
              />
            </svg>
          </div>
          <div class="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </CardContent>
        <CardFooter>
          <div class="flex w-full items-start gap-2">
            <div class="grid gap-2">
              <div class="flex items-center gap-2 leading-none font-medium text-sm">
                Trending up by 5.2% this month
                <TrendingUpIcon class="size-4" />
              </div>
              <div class="flex items-center gap-2 leading-none text-muted-foreground text-xs">
                Showing total visitors for the last 6 months
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Example>

    <!-- Pie Chart -->
    <Example title="Pie Chart">
      <Card class="w-full">
        <CardHeader class="items-center pb-0">
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent class="flex-1 pb-0 flex items-center justify-center">
          <div class="relative flex size-48 items-center justify-center">
            <svg class="size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="currentColor"
                stroke-width="12"
                class="text-muted/30"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="var(--color-primary, #3b82f6)"
                stroke-width="12"
                stroke-dasharray="238"
                stroke-dashoffset="60"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute flex flex-col items-center">
              <span class="text-2xl font-bold">1,125</span>
              <span class="text-xs text-muted-foreground">Visitors</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex-col gap-2 mt-4">
          <div class="flex items-center gap-2 leading-none font-medium text-sm">
            Trending up by 5.2% this month
            <TrendingUpIcon class="size-4" />
          </div>
          <div class="leading-none text-muted-foreground text-xs">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Example>

    <!-- Radar Chart -->
    <Example title="Radar Chart">
      <Card class="w-full">
        <CardHeader class="items-center pb-4">
          <CardTitle>Radar Chart - Multiple</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent class="pb-0 flex items-center justify-center">
          <div class="relative size-48">
            <svg class="size-full" viewBox="0 0 100 100">
              <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="currentColor" opacity="0.15" />
              <polygon points="50,25 72,38 72,62 50,75 28,62 28,38" fill="none" stroke="currentColor" opacity="0.15" />
              <polygon
                points="50,18 78,35 68,60 50,82 22,65 30,35"
                fill="var(--color-primary, #3b82f6)"
                fill-opacity="0.4"
                stroke="var(--color-primary, #3b82f6)"
                stroke-width="1.5"
              />
            </svg>
          </div>
        </CardContent>
        <CardFooter class="flex-col gap-2 mt-4">
          <div class="flex items-center gap-2 leading-none font-medium text-sm">
            Trending up by 5.2% this month
            <TrendingUpIcon class="size-4" />
          </div>
          <div class="leading-none text-muted-foreground text-xs">
            January - June 2024
          </div>
        </CardFooter>
      </Card>
    </Example>

    <!-- Radial Chart -->
    <Example title="Radial Chart">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Radial Chart - Shape</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent class="flex-1 pb-0 flex items-center justify-center">
          <div class="relative flex size-44 items-center justify-center">
            <svg class="size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="currentColor"
                stroke-width="10"
                class="text-muted/30"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="var(--color-primary, #3b82f6)"
                stroke-width="10"
                stroke-dasharray="226"
                stroke-dashoffset="75"
                stroke-linecap="round"
              />
            </svg>
            <div class="absolute flex flex-col items-center">
              <span class="text-3xl font-bold">1,260</span>
              <span class="text-xs text-muted-foreground">Visitors</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex-col gap-2 mt-4">
          <div class="flex items-center gap-2 leading-none font-medium text-sm">
            Trending up by 5.2% this month
            <TrendingUpIcon class="size-4" />
          </div>
          <div class="leading-none text-muted-foreground text-xs">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Example>
  </ExampleWrapper>
</template>
