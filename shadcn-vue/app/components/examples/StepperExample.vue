<script setup lang="ts">
import { ref } from "vue";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from "@/registry/default/ui/stepper";
import { CheckIcon, CircleIcon, DotIcon } from "lucide-vue-next";

const stepIndex = ref(2);

const steps = [
  {
    step: 1,
    title: "Account",
    description: "Provide login credentials",
  },
  {
    step: 2,
    title: "Verification",
    description: "Enter your phone OTP",
  },
  {
    step: 3,
    title: "Completion",
    description: "Setup workspace details",
  },
];
</script>

<template>
  <div class="w-full max-w-xl p-6">
    <Stepper v-model="stepIndex" class="flex w-full items-start gap-2">
      <StepperItem
        v-for="item in steps"
        :key="item.step"
        :step="item.step"
        class="relative flex flex-1 flex-col items-center justify-center"
      >
        <StepperTrigger class="flex flex-col items-center gap-1.5 text-center">
          <StepperIndicator class="size-8 rounded-full">
            <CheckIcon v-if="stepIndex > item.step" class="size-4" />
            <CircleIcon v-else-if="stepIndex === item.step" class="size-4 fill-current" />
            <DotIcon v-else class="size-4" />
          </StepperIndicator>
          <div class="flex flex-col">
            <StepperTitle class="text-xs font-semibold">{{ item.title }}</StepperTitle>
            <StepperDescription class="text-[10px] text-muted-foreground">{{ item.description }}</StepperDescription>
          </div>
        </StepperTrigger>
        <StepperSeparator
          v-if="item.step < steps.length"
          class="absolute top-4 left-[calc(50%+20px)] right-[calc(-50%+20px)] block h-0.5 bg-muted"
        />
      </StepperItem>
    </Stepper>
  </div>
</template>
