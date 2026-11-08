import * as React from "react";
import { Transfer, type TransferItem } from "@/components/ui/transfer";

const MOCK_ITEMS: TransferItem[] = [
  { key: "1", title: "Read Analytics", description: "View visitor metrics" },
  { key: "2", title: "Write Content", description: "Create and publish posts" },
  { key: "3", title: "Manage Users", description: "Add/remove organization members" },
  { key: "4", title: "Billing Admin", description: "Manage subscription plans" },
  { key: "5", title: "API Tokens", description: "Generate secret credentials" },
  { key: "6", title: "Audit Logs", description: "Inspect system security events" },
];

export default function TransferExample() {
  const [targetKeys, setTargetKeys] = React.useState<string[]>(["1", "2"]);

  return (
    <div className="w-full max-w-xl p-4 flex flex-col gap-3">
      <Transfer
        dataSource={MOCK_ITEMS}
        targetKeys={targetKeys}
        titles={["Available Permissions", "Assigned Roles"]}
        onChange={(next) => setTargetKeys(next)}
      />
    </div>
  );
}
