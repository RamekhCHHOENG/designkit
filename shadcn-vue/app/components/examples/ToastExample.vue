<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { useToast } from "@/registry/default/ui/toast/use-toast";
import { toast as sonnerToast } from "vue-sonner";

const { toast } = useToast();

function showBasicToast() {
  toast({
    title: "Event created",
    description: "Sunday, December 3 at 9:00 AM",
  });
}

function showActionToast() {
  toast({
    title: "Event created",
    description: "You can undo this action.",
  });
}

function showPromiseToast() {
  sonnerToast.promise(
    new Promise<{ name: string }>((resolve) => {
      window.setTimeout(() => resolve({ name: "Event" }), 2000);
    }),
    {
      loading: "Creating event…",
      success: (data) => `${data.name} created.`,
      error: "Could not create event.",
    }
  );
}
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic" class="items-center justify-center">
      <Button variant="outline" class="w-fit" @click="showBasicToast">
        Show Toast
      </Button>
    </Example>

    <!-- With Action -->
    <Example title="With Action" class="items-center justify-center">
      <Button variant="outline" class="w-fit" @click="showActionToast">
        Show Toast
      </Button>
    </Example>

    <!-- Promise -->
    <Example title="Promise" class="items-center justify-center">
      <Button variant="outline" class="w-fit" @click="showPromiseToast">
        Create Event
      </Button>
    </Example>
  </ExampleWrapper>
</template>
