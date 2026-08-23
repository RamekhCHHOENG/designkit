<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/registry/default/ui/attachment";
import { FileIcon, ImageIcon, XIcon, DownloadIcon } from "lucide-vue-next";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1 2xl:grid-cols-1">
    <Example title="File Attachments">
      <div class="flex flex-wrap gap-4">
        <Attachment state="done">
          <AttachmentMedia>
            <FileIcon class="size-5 text-primary" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>design_specs_v2.pdf</AttachmentTitle>
            <AttachmentDescription>2.4 MB • PDF Document</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label="Download">
              <DownloadIcon />
            </AttachmentAction>
            <AttachmentAction aria-label="Remove">
              <XIcon />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>

        <Attachment state="uploading">
          <AttachmentMedia variant="icon">
            <ImageIcon class="size-5 text-muted-foreground" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>hero_banner.png</AttachmentTitle>
            <AttachmentDescription>Uploading (64%)...</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      </div>
    </Example>
  </ExampleWrapper>
</template>
