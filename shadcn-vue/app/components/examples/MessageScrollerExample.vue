<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { MessageScroller } from "@/registry/default/ui/message-scroller";
import { Message, MessageAvatar, MessageContent } from "@/registry/default/ui/message";
import { Bubble, BubbleContent } from "@/registry/default/ui/bubble";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="Auto-Scroll Message Feed">
      <div class="h-64 w-full max-w-md rounded-xl border bg-card">
        <MessageScroller :auto-scroll="true">
          <Message align="start">
            <MessageAvatar>
              <Avatar class="size-6">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>Welcome! How can I help you design today?</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          <Message align="end">
            <MessageContent>
              <Bubble variant="default">
                <BubbleContent>Let's build an accessible dashboard interface.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>

          <Message align="start">
            <MessageAvatar>
              <Avatar class="size-6">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            </MessageAvatar>
            <MessageContent>
              <Bubble variant="muted">
                <BubbleContent>Awesome! All components are ready in your kit.</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageScroller>
      </div>
    </Example>
  </ExampleWrapper>
</template>
