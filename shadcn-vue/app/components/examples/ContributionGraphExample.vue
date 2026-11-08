<script setup lang="ts">
import {
  ContributionGraph,
  ContributionGraphGroup,
  ContributionGraphBlock,
} from "@/registry/default/ui/contribution-graph";

// Generate 20 weeks of dummy contribution data
const weeks = Array.from({ length: 20 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const rand = Math.random();
    if (rand < 0.4) return 0;
    if (rand < 0.65) return 1;
    if (rand < 0.8) return 2;
    if (rand < 0.92) return 3;
    return 4;
  })
);
</script>

<template>
  <div class="flex flex-col gap-2 overflow-x-auto p-6">
    <div class="text-xs font-medium text-muted-foreground">GitHub-Style Contribution Heatmap</div>
    <ContributionGraph>
      <ContributionGraphGroup v-for="(week, wIdx) in weeks" :key="wIdx">
        <ContributionGraphBlock
          v-for="(level, dIdx) in week"
          :key="dIdx"
          :level="level"
        />
      </ContributionGraphGroup>
    </ContributionGraph>
  </div>
</template>
