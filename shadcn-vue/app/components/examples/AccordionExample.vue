<script setup lang="ts">
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { ArrowUpRightIcon } from "lucide-vue-next";

const basicItems = [
  {
    value: "item-1",
    trigger: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    trigger: "Is it styled?",
    content: "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    value: "item-3",
    trigger: "Is it animated?",
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

const multipleItems = [
  {
    value: "item-1",
    trigger: "What are the key considerations when implementing a comprehensive enterprise-level authentication system?",
    content: "Implementing a robust enterprise authentication system requires careful consideration of multiple factors. This includes secure password hashing and storage, multi-factor authentication (MFA) implementation, session management, OAuth2 and SSO integration, regular security audits, rate limiting to prevent brute force attacks, and maintaining detailed audit logs. Additionally, you'll need to consider scalability, performance impact, and compliance with relevant data protection regulations such as GDPR or HIPAA.",
  },
  {
    value: "item-2",
    trigger: "How does modern distributed system architecture handle eventual consistency and data synchronization across multiple regions?",
    content: "Modern distributed systems employ various strategies to maintain data consistency across regions. This often involves using techniques like CRDT (Conflict-Free Replicated Data Types), vector clocks, and gossip protocols. Systems might implement event sourcing patterns, utilize message queues for asynchronous updates, and employ sophisticated conflict resolution strategies. Popular solutions like Amazon's DynamoDB and Google's Spanner demonstrate different approaches to solving these challenges, balancing between consistency, availability, and partition tolerance as described in the CAP theorem.",
  },
];

const borderItems = [
  {
    value: "billing",
    trigger: "How does billing work?",
    content: "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members. There are no hidden fees or setup costs.",
  },
  {
    value: "security",
    trigger: "Is my data secure?",
    content: "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols. We also offer optional two-factor authentication and single sign-on for enterprise customers.",
  },
  {
    value: "integration",
    trigger: "What integrations do you support?",
    content: "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks. Our API documentation includes code examples in 10+ programming languages.",
  },
];

const cardItems = [
  {
    value: "plans",
    trigger: "What subscription plans do you offer?",
    content: "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features. Annual billing is available with a 20% discount.",
    hasButton: true,
  },
  {
    value: "billing",
    trigger: "How does billing work?",
    content: "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers. You'll receive an invoice via email after each payment.",
    hasButton: false,
  },
  {
    value: "upgrade",
    trigger: "Can I upgrade or downgrade my plan?",
    content: "Yes, you can change your plan at any time. When upgrading, you'll be charged a prorated amount for the remainder of your billing cycle and immediately gain access to new features.",
    hasButton: false,
  },
  {
    value: "cancel",
    trigger: "How do I cancel my subscription?",
    content: "You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.",
    hasButton: false,
  },
  {
    value: "refund",
    trigger: "What is your refund policy?",
    content: "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund.",
    hasButton: false,
  },
];

const disabledItems = [
  {
    value: "item-1",
    trigger: "Can I access my account history?",
    content: "Yes, you can view your complete account history including all transactions, plan changes, and support tickets in the Account History section of your dashboard.",
    disabled: false,
  },
  {
    value: "item-2",
    trigger: "Premium feature information",
    content: "This section contains information about premium features. Upgrade your plan to access this content.",
    disabled: true,
  },
  {
    value: "item-3",
    trigger: "How do I update my email address?",
    content: "You can update your email address in your account settings. You'll receive a verification email at your new address to confirm the change.",
    disabled: false,
  },
];
</script>

<template>
  <ExampleWrapper class="w-full max-w-4xl lg:grid-cols-1 2xl:max-w-4xl 2xl:grid-cols-1">
    <!-- Basic -->
    <Example title="Basic">
      <Accordion type="single" collapsible class="mx-auto w-full max-w-lg">
        <AccordionItem v-for="item in basicItems" :key="item.value" :value="item.value">
          <AccordionTrigger>{{ item.trigger }}</AccordionTrigger>
          <AccordionContent>{{ item.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>

    <!-- Multiple -->
    <Example title="Multiple">
      <Accordion type="multiple" class="mx-auto w-full max-w-lg">
        <AccordionItem v-for="item in multipleItems" :key="item.value" :value="item.value">
          <AccordionTrigger>{{ item.trigger }}</AccordionTrigger>
          <AccordionContent>{{ item.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>

    <!-- With Borders -->
    <Example title="With Borders">
      <Accordion type="single" collapsible class="mx-auto w-full max-w-lg flex flex-col gap-2">
        <AccordionItem
          v-for="item in borderItems"
          :key="item.value"
          :value="item.value"
          class="rounded-lg border px-2"
        >
          <AccordionTrigger class="font-medium text-sm">
            {{ item.trigger }}
          </AccordionTrigger>
          <AccordionContent class="text-muted-foreground text-sm">
            {{ item.content }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>

    <!-- In Card -->
    <Example title="In Card">
      <Card class="mx-auto w-full max-w-lg gap-4">
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
          <CardDescription>
            Common questions about your account, plans, and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" default-value="['plans']">
            <AccordionItem v-for="item in cardItems" :key="item.value" :value="item.value">
              <AccordionTrigger>{{ item.trigger }}</AccordionTrigger>
              <AccordionContent class="flex flex-col gap-3">
                <p>{{ item.content }}</p>
                <div v-if="item.hasButton">
                  <Button size="sm">
                    View plans
                    <ArrowUpRightIcon class="ml-1 size-3.5" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </Example>

    <!-- With Disabled -->
    <Example title="With Disabled">
      <Accordion type="single" collapsible class="mx-auto w-full max-w-lg overflow-hidden border rounded-lg">
        <AccordionItem
          v-for="item in disabledItems"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
          class="p-1 data-open:bg-muted/50"
        >
          <AccordionTrigger class="px-3">
            {{ item.trigger }}
          </AccordionTrigger>
          <AccordionContent class="px-3">
            {{ item.content }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Example>
  </ExampleWrapper>
</template>
