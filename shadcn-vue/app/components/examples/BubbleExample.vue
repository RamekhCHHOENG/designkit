<script setup lang="ts">
import { ref } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/registry/default/ui/bubble";
import { Button } from "@/registry/default/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Marker, MarkerContent } from "@/registry/default/ui/marker";
import { ChevronDownIcon, ThumbsUpIcon, ThumbsDownIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";

const fullText = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

const previewLength = 180;
const isLong = fullText.length > previewLength;
const preview = `${fullText.slice(0, previewLength)}...`;
const isCollapsibleOpen = ref(false);

const quickReplies = [
  {
    label: "I need help with my account.",
    message: "I need help with my account.",
  },
  {
    label: "I forgot my password.",
    message: "I forgot my password.",
  },
  {
    label: "I have another question. I'd like to talk to a human. Can you help me?",
    message: "I have another question.",
  },
];
</script>

<template>
  <ExampleWrapper>
    <!-- Sizes -->
    <Example title="Sizes">
      <div class="flex w-full max-w-md flex-col gap-8">
        <Bubble>
          <BubbleContent>This is a one line bubble.</BubbleContent>
        </Bubble>
        <Bubble>
          <BubbleContent>
            This bubble has multiple lines. It should wrap to the next line and
            you should see a different radius on the corners.
          </BubbleContent>
        </Bubble>
        <Bubble>
          <BubbleContent class="flex flex-col gap-1">
            <p>This bubble has multiple lines.</p>
            <p>
              It should wrap to the next line and you should see a different
              radius on the corners.
            </p>
            <p>Here is some more text to see how it wraps.</p>
          </BubbleContent>
        </Bubble>
      </div>
    </Example>

    <!-- Variants -->
    <Example title="Variants">
      <div class="flex w-full max-w-md flex-col gap-8">
        <Bubble>
          <BubbleContent>
            Default bubbles use the primary color for the active user side of a
            chat.
          </BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            Secondary bubbles are the standard neutral surface for assistant and
            conversation content.
          </BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            Muted bubbles lower the emphasis for quiet system notes or for
            displaying supporting content.
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>
            Tinted bubbles use a softer primary tint when primary fill is too
            strong.
          </BubbleContent>
        </Bubble>
        <Bubble variant="outline">
          <BubbleContent>
            Outline bubbles can be used to frame message content and give it a
            border.
          </BubbleContent>
        </Bubble>
        <Bubble variant="destructive">
          <BubbleContent>
            Destructive bubbles flag errors or failed actions in a conversation.
          </BubbleContent>
        </Bubble>
        <Bubble variant="ghost">
          <BubbleContent>
            <span class="whitespace-pre-wrap">Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Ghost bubbles are full width and can take the full width of the container.</span>
          </BubbleContent>
        </Bubble>
      </div>
    </Example>

    <!-- Alignment -->
    <Example title="Alignment">
      <div class="flex w-full max-w-md flex-col gap-8">
        <Bubble variant="muted">
          <BubbleContent>This bubble is aligned to the start.</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>This bubble is aligned to the end.</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            This multiline bubble is aligned to the start. The corners should
            adjust when the text wraps to show the grouped side of the
            conversation.
          </BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>
            This multiline bubble is aligned to the end. It should sit on the
            opposite side with the matching corner radius for wrapped text.
          </BubbleContent>
        </Bubble>
      </div>
    </Example>

    <!-- Grouped -->
    <Example title="Grouped">
      <div class="flex w-full max-w-md flex-col gap-8">
        <BubbleGroup>
          <Bubble variant="secondary">
            <BubbleContent>I finished the audit pass.</BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>
              The registry output looks clean, but I found one stale route.
            </BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>Want me to remove it now?</BubbleContent>
          </Bubble>
        </BubbleGroup>
        <BubbleGroup>
          <Bubble variant="tinted" align="end">
            <BubbleContent>Yes, clean that up.</BubbleContent>
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent>Then rerun the registry build.</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </div>
    </Example>

    <!-- Collapsible -->
    <Example title="Collapsible">
      <div class="flex w-full max-w-md flex-col gap-8">
        <Collapsible v-model:open="isCollapsibleOpen">
          <Bubble variant="muted" align="end">
            <BubbleContent class="whitespace-pre-line flex flex-col gap-2">
              <div>{{ isCollapsibleOpen || !isLong ? fullText : preview }}</div>
              <CollapsibleTrigger v-if="isLong" as-child>
                <Button variant="link" class="gap-1 p-0 text-muted-foreground self-start">
                  {{ isCollapsibleOpen ? "Show less" : "Show more" }}
                  <ChevronDownIcon :class="['size-3.5 transition-transform', isCollapsibleOpen ? 'rotate-180' : '']" />
                </Button>
              </CollapsibleTrigger>
            </BubbleContent>
          </Bubble>
        </Collapsible>
        <Bubble variant="ghost">
          <BubbleContent>
            <span class="whitespace-pre-wrap">Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Use this for content that needs the whole row.</span>
          </BubbleContent>
        </Bubble>
      </div>
    </Example>

    <!-- Button & Links -->
    <Example title="Button & Links">
      <div class="flex w-full max-w-md flex-col gap-8">
        <Bubble>
          <BubbleContent as="a" href="#">
            This bubble is a link.
          </BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent as="button" type="button">
            This one is a button you can click.
          </BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent as="button" type="button">
            You can also do tinted buttons. Even ones that are multilines.
          </BubbleContent>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>Chat Suggestions</MarkerContent>
        </Marker>
        <Bubble>
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
        <BubbleGroup>
          <Bubble
            v-for="reply in quickReplies"
            :key="reply.label"
            variant="outline"
            align="end"
          >
            <BubbleContent
              as="button"
              type="button"
              class="border-dashed border-primary cursor-pointer text-left"
              @click="toast(reply.message)"
            >
              {{ reply.label }}
            </BubbleContent>
          </Bubble>
        </BubbleGroup>
      </div>
    </Example>

    <!-- Reaction Placement -->
    <Example title="Reaction Placement">
      <div class="flex w-full max-w-md flex-col gap-12">
        <Marker variant="separator">
          <MarkerContent>side=bottom align=end</MarkerContent>
        </Marker>
        <Bubble>
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions side="bottom" align="end" role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="secondary" align="end">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions side="bottom" align="start" role="img" aria-label="Reactions: thumbs up, surprised">
            <span>👍</span>
            <span>😮</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="tinted">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions side="bottom" align="end" role="img" aria-label="Reactions: thumbs up, surprised, fire, eyes, and 8 more">
            <span>👍</span>
            <span>😮</span>
            <span>🔥</span>
            <span>👀</span>
            <span>+8</span>
          </BubbleReactions>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>side=bottom align=start</MarkerContent>
        </Marker>
        <Bubble variant="secondary">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions side="bottom" align="start" role="img" aria-label="Reaction: fire">
            <span>🔥</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions side="bottom" align="start" role="img" aria-label="Reactions: thumbs up, surprised, fire, eyes">
            <span>👍</span>
            <span>😮</span>
            <span>🔥</span>
            <span>👀</span>
          </BubbleReactions>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>side=top align=start</MarkerContent>
        </Marker>
        <Bubble variant="secondary">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions side="top" align="start" role="img" aria-label="Reaction: fire">
            <span>🔥</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions side="top" align="start" role="img" aria-label="Reactions: thumbs up, surprised, fire, eyes">
            <span>👍</span>
            <span>😮</span>
            <span>🔥</span>
            <span>👀</span>
          </BubbleReactions>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>side=bottom align=end</MarkerContent>
        </Marker>
        <Bubble variant="muted">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions side="top" align="end" role="img" aria-label="Reaction: thumbs up">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset.
          </BubbleContent>
          <BubbleReactions side="top" align="end" role="img" aria-label="Reactions: thumbs up, surprised, fire, eyes" class="px-1.5 py-0.5">
            <span>👍</span>
            <span>😮</span>
            <span>🔥</span>
            <span>👀</span>
          </BubbleReactions>
        </Bubble>
      </div>
    </Example>

    <!-- Reactions Buttons -->
    <Example title="Reactions Buttons">
      <div class="flex w-full max-w-md flex-col gap-8">
        <Bubble>
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions>
            <Button
              variant="outline"
              size="xs"
              @click="toast('You clicked the button in the bubble reaction')"
            >
              Button
            </Button>
          </BubbleReactions>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions align="start">
            <Button
              variant="ghost"
              size="icon-xs"
              @click="toast('Confetti!')"
            >
              🎉
            </Button>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="tinted">
          <BubbleContent>
            We are going to the movies first then dinner. Are you in?
          </BubbleContent>
          <BubbleReactions class="gap-1 bg-background">
            <Button
              variant="secondary"
              size="icon-xs"
              aria-label="Thumbs up"
              @click="toast('You agree!')"
            >
              <ThumbsUpIcon class="size-3.5" />
            </Button>
            <Button
              variant="secondary"
              size="icon-xs"
              aria-label="Thumbs down"
              @click="toast('You disagree!')"
            >
              <ThumbsDownIcon class="size-3.5" />
            </Button>
          </BubbleReactions>
        </Bubble>
      </div>
    </Example>
  </ExampleWrapper>
</template>
