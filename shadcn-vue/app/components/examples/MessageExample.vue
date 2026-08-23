<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Message, MessageGroup, MessageAvatar, MessageContent, MessageHeader, MessageFooter } from "@/registry/default/ui/message";
import { Bubble, BubbleContent } from "@/registry/default/ui/bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="Chat Message Thread">
      <MessageGroup class="w-full max-w-md">
        <Message align="start">
          <MessageAvatar>
            <Avatar class="size-7">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <MessageHeader>Shadcn</MessageHeader>
            <Bubble variant="muted">
              <BubbleContent>Hey! Have you checked out the new Vue primitives?</BubbleContent>
            </Bubble>
            <MessageFooter>10:14 AM</MessageFooter>
          </MessageContent>
        </Message>

        <Message align="end">
          <MessageContent>
            <MessageHeader>You</MessageHeader>
            <Bubble variant="default">
              <BubbleContent>Yes, they are completely unified with the DesignKit system!</BubbleContent>
            </Bubble>
            <MessageFooter>10:15 AM</MessageFooter>
          </MessageContent>
        </Message>
      </MessageGroup>
    </Example>
  </ExampleWrapper>
</template>
