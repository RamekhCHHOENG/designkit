import * as React from "react";
import { FilterChips, type ActiveFilter, type FilterFieldDefinition } from "@/components/ui/filter-chips";

const FILTER_FIELDS: FilterFieldDefinition[] = [
  {
    key: "status",
    label: "Status",
    operators: ["is", "is not"],
    options: ["Active", "Pending", "Archived", "Suspended"],
  },
  {
    key: "role",
    label: "Role",
    operators: ["is", "is not"],
    options: ["Admin", "Editor", "Viewer", "Billing"],
  },
  {
    key: "email",
    label: "Email",
    operators: ["contains", "starts with", "ends with"],
  },
];

export default function FilterChipsExample() {
  const [filters, setFilters] = React.useState<ActiveFilter[]>([
    { id: "1", field: "Status", operator: "is", value: "Active" },
    { id: "2", field: "Role", operator: "is", value: "Admin" },
  ]);

  return (
    <div className="w-full max-w-xl p-4 flex flex-col gap-3">
      <FilterChips
        fields={FILTER_FIELDS}
        filters={filters}
        onChange={(next) => setFilters(next)}
      />
    </div>
  );
}
