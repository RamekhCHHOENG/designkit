<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";
import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireProgress,
} from "@/registry/default/ui/questionnaire";
import { toast } from "vue-sonner";

const standaloneStep = ref(1);
const standaloneChoice = ref("delegation");

const cardStep = ref(1);
const cardChoice = ref("delegation");

const dialogOpen = ref(false);
const dialogStep = ref(1);
const dialogChoice = ref("delegation");

const taskChoice = ref("inspect");

function submitQuestionnaire() {
  toast.success("Questionnaire submitted successfully!");
}
</script>

<template>
  <ExampleWrapper>
    <!-- Standalone -->
    <Example title="Standalone" container-class-name="md:col-span-2">
      <Questionnaire class="mx-auto max-w-lg">
        <QuestionnaireProgress>Question {{ standaloneStep }} of 3</QuestionnaireProgress>
        
        <QuestionnaireItem v-if="standaloneStep === 1">
          <QuestionnaireTitle>How should the agent collaborate with you?</QuestionnaireTitle>
          <QuestionnaireDescription>Choose the primary interaction style for the workspace.</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice
              :selected="standaloneChoice === 'delegation'"
              @select="standaloneChoice = 'delegation'"
            >
              Delegate autonomous tasks
            </QuestionnaireChoice>
            <QuestionnaireChoice
              :selected="standaloneChoice === 'questions'"
              @select="standaloneChoice = 'questions'"
            >
              Answer questions inline
            </QuestionnaireChoice>
            <QuestionnaireChoice
              :selected="standaloneChoice === 'both'"
              @select="standaloneChoice = 'both'"
            >
              Combine autonomous runs with review
            </QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>

        <QuestionnaireItem v-else-if="standaloneStep === 2">
          <QuestionnaireTitle>Which signals are most valuable during execution?</QuestionnaireTitle>
          <QuestionnaireDescription>Select the level of progress detail you want to see.</QuestionnaireDescription>
          <QuestionnaireChoices>
            <QuestionnaireChoice
              :selected="standaloneChoice === 'progress'"
              @select="standaloneChoice = 'progress'"
            >
              Real-time tool logs
            </QuestionnaireChoice>
            <QuestionnaireChoice
              :selected="standaloneChoice === 'decisions'"
              @select="standaloneChoice = 'decisions'"
            >
              Milestone summaries only
            </QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>

        <div class="mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            :disabled="standaloneStep === 1"
            @click="standaloneStep--"
          >
            Previous
          </Button>
          <Button
            v-if="standaloneStep < 2"
            size="sm"
            @click="standaloneStep++"
          >
            Next
          </Button>
          <Button
            v-else
            size="sm"
            @click="submitQuestionnaire"
          >
            Submit
          </Button>
        </div>
      </Questionnaire>
    </Example>

    <!-- Card -->
    <Example title="Card" container-class-name="md:col-span-2">
      <Card class="mx-auto w-full max-w-lg">
        <CardHeader>
          <CardTitle>Plan an agent interface</CardTitle>
          <CardDescription>Answer questions to shape the prototype.</CardDescription>
        </CardHeader>
        <CardContent>
          <Questionnaire>
            <QuestionnaireProgress>Question {{ cardStep }} of 3</QuestionnaireProgress>
            <QuestionnaireItem class="mt-3">
              <QuestionnaireTitle>How should the agent collaborate?</QuestionnaireTitle>
              <QuestionnaireChoices class="mt-2">
                <QuestionnaireChoice
                  :selected="cardChoice === 'delegation'"
                  @select="cardChoice = 'delegation'"
                >
                  Delegate autonomous tasks
                </QuestionnaireChoice>
                <QuestionnaireChoice
                  :selected="cardChoice === 'questions'"
                  @select="cardChoice = 'questions'"
                >
                  Answer questions inline
                </QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>
          </Questionnaire>
        </CardContent>
        <CardFooter class="justify-between">
          <Button variant="outline" size="sm" :disabled="cardStep === 1" @click="cardStep--">
            Previous
          </Button>
          <Button size="sm" @click="submitQuestionnaire">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Example>

    <!-- Dialog -->
    <Example title="Dialog" class="items-center justify-center" container-class-name="md:col-span-2">
      <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
          <Button variant="outline">Open questionnaire</Button>
        </DialogTrigger>
        <DialogContent class="max-w-lg">
          <DialogHeader>
            <DialogTitle>Plan an agent interface</DialogTitle>
            <DialogDescription>Answer three questions to shape the next prototype.</DialogDescription>
          </DialogHeader>
          <Questionnaire class="py-2">
            <QuestionnaireProgress>Question {{ dialogStep }} of 3</QuestionnaireProgress>
            <QuestionnaireItem class="mt-3">
              <QuestionnaireTitle>Which interaction model fits best?</QuestionnaireTitle>
              <QuestionnaireChoices class="mt-2">
                <QuestionnaireChoice
                  :selected="dialogChoice === 'delegation'"
                  @select="dialogChoice = 'delegation'"
                >
                  Autonomous executor
                </QuestionnaireChoice>
                <QuestionnaireChoice
                  :selected="dialogChoice === 'questions'"
                  @select="dialogChoice = 'questions'"
                >
                  Interactive copilot
                </QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>
          </Questionnaire>
          <DialogFooter class="justify-between sm:justify-between">
            <Button variant="outline" size="sm" :disabled="dialogStep === 1" @click="dialogStep--">
              Previous
            </Button>
            <Button size="sm" @click="() => { dialogOpen = false; submitQuestionnaire(); }">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- No description -->
    <Example title="No description" container-class-name="md:col-span-2">
      <Questionnaire class="mx-auto max-w-lg">
        <QuestionnaireProgress>Question 1 of 1</QuestionnaireProgress>
        <QuestionnaireItem>
          <QuestionnaireTitle>What should the agent do next?</QuestionnaireTitle>
          <QuestionnaireChoices class="mt-3">
            <QuestionnaireChoice
              :selected="taskChoice === 'inspect'"
              @select="taskChoice = 'inspect'"
            >
              Inspect the codebase
            </QuestionnaireChoice>
            <QuestionnaireChoice
              :selected="taskChoice === 'implement'"
              @select="taskChoice = 'implement'"
            >
              Implement the change
            </QuestionnaireChoice>
            <QuestionnaireChoice
              :selected="taskChoice === 'review'"
              @select="taskChoice = 'review'"
            >
              Review the result
            </QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>
        <div class="mt-4 flex justify-end">
          <Button size="sm" @click="submitQuestionnaire">Submit</Button>
        </div>
      </Questionnaire>
    </Example>
  </ExampleWrapper>
</template>
