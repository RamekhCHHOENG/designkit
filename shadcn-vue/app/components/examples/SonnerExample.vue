<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import { toast } from "vue-sonner";
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic" class="items-center justify-center">
      <Button
        variant="outline"
        class="w-fit"
        @click="toast('Event has been created')"
      >
        Show Toast
      </Button>
    </Example>

    <!-- With Description -->
    <Example title="With Description" class="items-center justify-center">
      <Button
        variant="outline"
        class="w-fit"
        @click="
          toast('Event has been created', {
            description: 'Monday, January 3rd at 6:00pm',
          })
        "
      >
        Show Toast
      </Button>
    </Example>
  </ExampleWrapper>
</template>
