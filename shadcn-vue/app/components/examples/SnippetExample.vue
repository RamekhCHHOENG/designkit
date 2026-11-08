<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Snippet,
  SnippetHeader,
  SnippetTabsList,
  SnippetTabsTrigger,
  SnippetTabsContent,
  SnippetCopyButton,
} from "@/registry/default/ui/snippet";
</script>

<template>
  <ExampleWrapper class="lg:grid-cols-1">
    <Example title="Package Manager Snippet Box">
      <div class="w-full max-w-xl space-y-4">
        <div>
          <h4 class="text-sm font-semibold">Install Library Package</h4>
          <p class="text-xs text-muted-foreground">
            Switch between pnpm, npm, bun, and yarn with one-click copy.
          </p>
        </div>

        <Snippet default-value="pnpm">
          <SnippetHeader>
            <SnippetTabsList>
              <SnippetTabsTrigger value="pnpm">pnpm</SnippetTabsTrigger>
              <SnippetTabsTrigger value="npm">npm</SnippetTabsTrigger>
              <SnippetTabsTrigger value="bun">bun</SnippetTabsTrigger>
              <SnippetTabsTrigger value="yarn">yarn</SnippetTabsTrigger>
            </SnippetTabsList>
            <SnippetCopyButton />
          </SnippetHeader>

          <SnippetTabsContent value="pnpm">
            <pre class="p-3 text-xs font-mono"><code>pnpm add @ramekhchhoeng/designkit</code></pre>
          </SnippetTabsContent>
          <SnippetTabsContent value="npm">
            <pre class="p-3 text-xs font-mono"><code>npm install @ramekhchhoeng/designkit</code></pre>
          </SnippetTabsContent>
          <SnippetTabsContent value="bun">
            <pre class="p-3 text-xs font-mono"><code>bun add @ramekhchhoeng/designkit</code></pre>
          </SnippetTabsContent>
          <SnippetTabsContent value="yarn">
            <pre class="p-3 text-xs font-mono"><code>yarn add @ramekhchhoeng/designkit</code></pre>
          </SnippetTabsContent>
        </Snippet>
      </div>
    </Example>
  </ExampleWrapper>
</template>
