<script setup lang="ts">
import { ref, computed } from "vue";
import ExampleWrapper from "@/components/ExampleWrapper.vue";
import Example from "@/components/Example.vue";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/registry/default/ui/field";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const tableData = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@example.com",
    role: "User",
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "User",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Editor",
  },
];

const selectedRows = ref<Set<string>>(new Set(["1"]));
const selectAll = computed(() => selectedRows.value.size === tableData.length);

function handleSelectAll(checked: boolean | "indeterminate") {
  if (checked === true) {
    selectedRows.value = new Set(tableData.map((row) => row.id));
  } else {
    selectedRows.value = new Set();
  }
}

function handleSelectRow(id: string, checked: boolean | "indeterminate") {
  const newSelected = new Set(selectedRows.value);
  if (checked === true) {
    newSelected.add(id);
  } else {
    newSelected.delete(id);
  }
  selectedRows.value = newSelected;
}
</script>

<template>
  <ExampleWrapper>
    <!-- Basic -->
    <Example title="Basic">
      <Field orientation="horizontal">
        <Checkbox id="terms" />
        <FieldLabel for="terms">Accept terms and conditions</FieldLabel>
      </Field>
    </Example>

    <!-- With Description -->
    <Example title="With Description">
      <Field orientation="horizontal">
        <Checkbox id="terms-2" :model-value="true" />
        <FieldContent>
          <FieldLabel for="terms-2">Accept terms and conditions</FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </Example>

    <!-- Invalid -->
    <Example title="Invalid">
      <Field orientation="horizontal" data-invalid="true">
        <Checkbox id="terms-3" aria-invalid="true" />
        <FieldLabel for="terms-3">Accept terms and conditions</FieldLabel>
      </Field>
    </Example>

    <!-- Disabled -->
    <Example title="Disabled">
      <Field orientation="horizontal">
        <Checkbox id="toggle" disabled />
        <FieldLabel for="toggle">Enable notifications</FieldLabel>
      </Field>
    </Example>

    <!-- With Title -->
    <Example title="With Title">
      <FieldGroup>
        <FieldLabel for="toggle-2">
          <Field orientation="horizontal">
            <Checkbox id="toggle-2" :model-value="true" />
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>
                You can enable or disable notifications at any time.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldLabel for="toggle-4">
          <Field orientation="horizontal" data-disabled="true">
            <Checkbox id="toggle-4" disabled />
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>
                You can enable or disable notifications at any time.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </FieldGroup>
    </Example>

    <!-- In Table -->
    <Example title="In Table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-8">
              <Checkbox
                id="select-all"
                :model-value="selectAll"
                @update:model-value="handleSelectAll"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in tableData"
            :key="row.id"
            :data-state="selectedRows.has(row.id) ? 'selected' : undefined"
          >
            <TableCell>
              <Checkbox
                :id="`row-${row.id}`"
                :model-value="selectedRows.has(row.id)"
                @update:model-value="(c) => handleSelectRow(row.id, c)"
              />
            </TableCell>
            <TableCell class="font-medium">{{ row.name }}</TableCell>
            <TableCell>{{ row.email }}</TableCell>
            <TableCell>{{ row.role }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>

    <!-- Group -->
    <Example title="Group">
      <Field>
        <FieldLabel>Show these items on the desktop:</FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
          <FieldLabel
            for="finder-pref-9k2-hard-disks-ljj"
            class="font-normal"
          >
            Hard disks
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-external-disks-1yg" />
          <FieldLabel
            for="finder-pref-9k2-external-disks-1yg"
            class="font-normal"
          >
            External disks
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
          <FieldLabel
            for="finder-pref-9k2-cds-dvds-fzt"
            class="font-normal"
          >
            CDs, DVDs, and iPods
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
          <FieldLabel
            for="finder-pref-9k2-connected-servers-6l2"
            class="font-normal"
          >
            Connected servers
          </FieldLabel>
        </Field>
      </Field>
    </Example>
  </ExampleWrapper>
</template>
