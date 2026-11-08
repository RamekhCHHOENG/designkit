import * as React from "react";
import { Mentions, type MentionOption } from "@/components/ui/mentions";

const USERS: MentionOption[] = [
  { value: "sarah", label: "Sarah Connor", description: "Product Designer" },
  { value: "alex", label: "Alex Rivera", description: "Frontend Architect" },
  { value: "elena", label: "Elena Rostova", description: "ML Research Lead" },
  { value: "marcus", label: "Marcus Vance", description: "DevOps Engineer" },
  { value: "john", label: "John Doe", description: "Security Auditor" },
];

export default function MentionsExample() {
  const [text, setText] = React.useState("Hey @alex, please review the PR when you have time!");

  return (
    <div className="w-full max-w-md p-4 flex flex-col gap-2">
      <label className="text-xs font-semibold text-foreground">Project Discussion</label>
      <Mentions
        options={USERS}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a comment... (Type @ to mention team members)"
      />
    </div>
  );
}
