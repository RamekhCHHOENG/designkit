<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  TrendingUpIcon,
} from "lucide-vue-next";

const fontWeight = ref("normal");
const selectItems = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <ToggleGroup type="multiple" :default-value="['bold']">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon class="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Outline -->
    <Example title="Outline">
      <ToggleGroup variant="outline" type="single" :default-value="'all'">
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="missed" aria-label="Toggle missed">
          Missed
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Outline With Icons -->
    <Example title="Outline With Icons">
      <ToggleGroup variant="outline" type="multiple" size="sm" :default-value="['bold']">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon class="size-3.5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon class="size-3.5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon class="size-3.5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Sizes -->
    <Example title="Sizes">
      <div class="flex flex-col gap-4">
        <ToggleGroup size="sm" :default-value="'top'" variant="outline" type="single">
          <ToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup :default-value="'top'" variant="outline" type="single">
          <ToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>

    <!-- With Spacing -->
    <Example title="With Spacing">
      <ToggleGroup size="sm" :default-value="'top'" type="single" class="gap-2">
        <ToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- With Icons -->
    <Example title="With Icons">
      <ToggleGroup type="multiple" variant="outline" size="sm" class="gap-2">
        <ToggleGroupItem
          value="star"
          aria-label="Toggle star"
        >
          <StarIcon class="mr-1.5 size-3.5" />
          Star
        </ToggleGroupItem>
        <ToggleGroupItem
          value="heart"
          aria-label="Toggle heart"
        >
          <HeartIcon class="mr-1.5 size-3.5" />
          Heart
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bookmark"
          aria-label="Toggle bookmark"
        >
          <BookmarkIcon class="mr-1.5 size-3.5" />
          Bookmark
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Filter -->
    <Example title="Filter">
      <ToggleGroup :default-value="'all'" variant="outline" size="sm" type="single">
        <ToggleGroupItem value="all" aria-label="All">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="active" aria-label="Active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" aria-label="Completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem value="archived" aria-label="Archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Date Range -->
    <Example title="Date Range">
      <ToggleGroup
        :default-value="'today'"
        variant="outline"
        size="sm"
        type="single"
        class="gap-2"
      >
        <ToggleGroupItem value="today" aria-label="Today">
          Today
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="This Week">
          This Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="This Month">
          This Month
        </ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="This Year">
          This Year
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Sort -->
    <Example title="Sort">
      <ToggleGroup :default-value="'newest'" variant="outline" size="sm" type="single">
        <ToggleGroupItem value="newest" aria-label="Newest">
          <ArrowDownIcon class="mr-1.5 size-3.5" />
          Newest
        </ToggleGroupItem>
        <ToggleGroupItem value="oldest" aria-label="Oldest">
          <ArrowUpIcon class="mr-1.5 size-3.5" />
          Oldest
        </ToggleGroupItem>
        <ToggleGroupItem value="popular" aria-label="Popular">
          <TrendingUpIcon class="mr-1.5 size-3.5" />
          Popular
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- With Input and Select -->
    <Example title="With Input and Select">
      <div class="flex items-center gap-2 w-full">
        <Input type="search" placeholder="Search..." class="flex-1" />
        <Select default-value="all">
          <SelectTrigger class="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem v-for="item in selectItems" :key="item.value" :value="item.value">
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ToggleGroup :default-value="'grid'" variant="outline" type="single">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            List
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>

    <!-- Vertical -->
    <Example title="Vertical">
      <ToggleGroup type="multiple" orientation="vertical" :default-value="['bold']">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon class="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon class="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Vertical Outline -->
    <Example title="Vertical Outline">
      <ToggleGroup
        variant="outline"
        :default-value="'all'"
        orientation="vertical"
        size="sm"
        type="single"
      >
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="active" aria-label="Toggle active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" aria-label="Toggle completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem value="archived" aria-label="Toggle archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Vertical Outline With Icons -->
    <Example title="Vertical Outline With Icons">
      <ToggleGroup variant="outline" type="multiple" orientation="vertical" size="sm" :default-value="['bold']">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon class="size-3.5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon class="size-3.5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon class="size-3.5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>

    <!-- Font Weight Selector -->
    <Example title="Font Weight Selector">
      <Field>
        <FieldLabel>Font Weight</FieldLabel>
        <ToggleGroup
          v-model="fontWeight"
          variant="outline"
          size="lg"
          type="single"
          class="gap-2"
        >
          <ToggleGroupItem
            value="light"
            aria-label="Light"
            class="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span class="text-2xl leading-none font-light">Aa</span>
            <span class="text-xs text-muted-foreground">Light</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="normal"
            aria-label="Normal"
            class="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span class="text-2xl leading-none font-normal">Aa</span>
            <span class="text-xs text-muted-foreground">Normal</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="medium"
            aria-label="Medium"
            class="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span class="text-2xl leading-none font-medium">Aa</span>
            <span class="text-xs text-muted-foreground">Medium</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="bold"
            aria-label="Bold"
            class="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span class="text-2xl leading-none font-bold">Aa</span>
            <span class="text-xs text-muted-foreground">Bold</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <FieldDescription>
          Use <code class="rounded-md bg-muted px-1 py-0.5 font-mono">font-{{ fontWeight }}</code> to set the font weight.
        </FieldDescription>
      </Field>
    </Example>

    <!-- Vertical With Spacing -->
    <Example title="Vertical With Spacing">
      <ToggleGroup
        size="sm"
        :default-value="'top'"
        orientation="vertical"
        type="single"
        class="gap-1"
      >
        <ToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  </ExampleWrapper>
</template>
