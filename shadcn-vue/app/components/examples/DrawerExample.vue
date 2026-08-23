<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerSwipeHandle,
} from "@/registry/default/ui/drawer";

const PARAGRAPHS = [
  "Your changes are saved automatically as you type.",
  "Delivery usually takes three to five business days, depending on your location and the shipping method you selected at checkout.",
  "We use your email address for account notifications and order updates. You can change this anytime from your profile settings.",
  "Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to enter a code from your authenticator app in addition to your password.",
  "By continuing, you agree to our Terms of Service and Privacy Policy. We collect usage data to improve the product, personalize your experience, and troubleshoot issues.",
  "Refunds are processed within five to ten business days after we receive your return. Items must be unused and in their original packaging to qualify.",
  "Last updated March 12, 2026.",
  "Upgrade to Pro for unlimited projects, priority support, and advanced analytics. Cancel anytime from billing settings.",
];

const drawerSides = ["top", "right", "bottom", "left"] as const;
</script>

<template>
  <ExampleWrapper>
    <!-- Demo -->
    <Example title="Demo">
      <div class="flex flex-wrap gap-2">
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerSwipeHandle />
            <div class="p-4">
              <div class="h-80 w-full rounded-md bg-muted" />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline">Header</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerSwipeHandle />
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you're
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div class="p-4">
              <div class="h-80 w-full rounded-md bg-muted" />
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline">Footer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerSwipeHandle />
            <div class="p-4">
              <div class="h-80 w-full rounded-md bg-muted" />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline">Header and Footer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerSwipeHandle />
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you're
                done.
              </DrawerDescription>
            </DrawerHeader>
            <div class="p-4">
              <div class="h-80 w-full rounded-md bg-muted" />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>

    <!-- Swipe Handle -->
    <Example title="Swipe Handle">
      <div class="flex flex-wrap gap-2">
        <Drawer v-for="side in drawerSides" :key="side" :direction="side">
          <DrawerTrigger as-child>
            <Button variant="outline" class="capitalize">{{ side }}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerSwipeHandle />
            <DrawerHeader>
              <DrawerTitle class="capitalize">{{ side }} Drawer</DrawerTitle>
              <DrawerDescription>
                Drawer with a swipe handle.
              </DrawerDescription>
            </DrawerHeader>
            <div class="flex-1 p-4">
              <div class="h-64 w-full rounded-md bg-muted" />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>

    <!-- Position -->
    <Example title="Position">
      <div class="flex flex-wrap gap-2">
        <Drawer v-for="side in drawerSides" :key="side" :direction="side">
          <DrawerTrigger as-child>
            <Button variant="outline" class="capitalize">{{ side }}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerSwipeHandle />
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div class="flex-1 p-4">
              <div class="h-64 w-full rounded-md bg-muted" />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>

    <!-- Custom Width and Height -->
    <Example title="Custom Width and Height">
      <div class="flex flex-wrap gap-2">
        <Drawer direction="bottom">
          <DrawerTrigger as-child>
            <Button variant="outline">Down</Button>
          </DrawerTrigger>
          <DrawerContent class="h-64">
            <DrawerHeader>
              <DrawerTitle>Down drawer</DrawerTitle>
              <DrawerDescription>
                Drawer with a custom height.
              </DrawerDescription>
            </DrawerHeader>
            <div class="flex-1 overflow-y-auto p-4 text-sm">
              <p v-for="(p, i) in PARAGRAPHS" :key="i" class="mb-4">
                {{ p }}
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Drawer direction="right">
          <DrawerTrigger as-child>
            <Button variant="outline">Right</Button>
          </DrawerTrigger>
          <DrawerContent class="w-xs">
            <DrawerHeader>
              <DrawerTitle>Right drawer</DrawerTitle>
              <DrawerDescription>Drawer with a custom width.</DrawerDescription>
            </DrawerHeader>
            <div class="flex-1 overflow-y-auto p-4 text-sm">
              <p v-for="(p, i) in PARAGRAPHS" :key="i" class="mb-4">
                {{ p }}
              </p>
            </div>
            <DrawerFooter>
              <DrawerClose as-child>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>

    <!-- Scrollable Content -->
    <Example title="Scrollable Content">
      <div class="flex flex-wrap gap-2">
        <Drawer>
          <DrawerTrigger as-child>
            <Button variant="outline">Open Scrollable</Button>
          </DrawerTrigger>
          <DrawerContent class="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Terms of Service</DrawerTitle>
              <DrawerDescription>
                Please review our terms of service below.
              </DrawerDescription>
            </DrawerHeader>
            <div class="flex-1 overflow-y-auto p-4 text-sm">
              <p v-for="index in 12" :key="index" class="mb-4">
                {{ PARAGRAPHS[index % PARAGRAPHS.length] }}
              </p>
            </div>
            <DrawerFooter>
              <Button>Agree</Button>
              <DrawerClose as-child>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Example>

    <!-- Snap Points -->
    <Example title="Snap Points">
      <Drawer :snap-points="['31rem', 1]">
        <DrawerTrigger as-child>
          <Button variant="outline">Open Snap Drawer</Button>
        </DrawerTrigger>
        <DrawerContent class="max-h-[calc(100dvh-1rem)]">
          <DrawerHeader>
            <DrawerTitle>Snap points</DrawerTitle>
            <DrawerDescription>
              Drag the drawer to snap between a compact peek and a near
              full-height view.
            </DrawerDescription>
          </DrawerHeader>
          <div class="grid flex-1 gap-3 overflow-y-auto p-4">
            <div v-for="i in 12" :key="i" class="h-12 rounded bg-muted" />
          </div>
        </DrawerContent>
      </Drawer>
    </Example>

    <!-- Nested -->
    <Example title="Nested">
      <Drawer>
        <DrawerTrigger as-child>
          <Button variant="outline">Open Parent Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Parent Drawer</DrawerTitle>
            <DrawerDescription>
              Open another drawer on top of this one.
            </DrawerDescription>
          </DrawerHeader>
          <div class="p-4">
            <div class="h-40 w-full rounded bg-muted" />
          </div>
          <DrawerFooter>
            <Drawer>
              <DrawerTrigger as-child>
                <Button>Open Nested Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Nested Drawer</DrawerTitle>
                  <DrawerDescription>
                    The parent drawer stays mounted behind this one.
                  </DrawerDescription>
                </DrawerHeader>
                <div class="p-4">
                  <div class="h-40 w-full rounded bg-muted" />
                </div>
                <DrawerFooter>
                  <DrawerClose as-child>
                    <Button variant="outline">Close Nested</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <DrawerClose as-child>
              <Button variant="outline">Close Parent</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>

    <!-- Non Modal -->
    <Example title="Non Modal">
      <Drawer :modal="false" direction="right">
        <DrawerTrigger as-child>
          <Button variant="outline">Non Modal</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Non Modal Drawer</DrawerTitle>
          </DrawerHeader>
          <div class="flex-1 p-4">
            <div class="h-64 w-full rounded bg-muted" />
          </div>
          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>
  </ExampleWrapper>
</template>
