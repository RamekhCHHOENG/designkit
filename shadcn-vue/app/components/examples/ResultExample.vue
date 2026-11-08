<script setup lang="ts">
import { Result } from "@/registry/default/ui/result";
import { Button } from "@/registry/default/ui/button";
</script>

<template>
  <div class="p-6">
    <Result
      status="success"
      title="Successfully Purchased Cloud Server"
      subTitle="Order number: 2017182818828182881. Cloud server configuration takes 1-5 minutes, please wait."
    >
      <template #extra>
        <Button variant="default">Go to Console</Button>
        <Button variant="outline">Buy Again</Button>
      </template>
    </Result>
  </div>
</template>
