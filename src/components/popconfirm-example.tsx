import * as React from "react";
import { Popconfirm } from "@/components/ui/popconfirm";
import { Button } from "@/components/ui/button";
import { Trash2, Archive, HelpCircle } from "lucide-react";

export function PopconfirmExample() {
  const [statusText, setStatusText] = React.useState("Ready");

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Popconfirm
        title="Delete this project?"
        description="This action cannot be undone and all associated artifacts will be removed."
        variant="destructive"
        okText="Delete"
        onConfirm={() => setStatusText("Project deleted")}
      >
        <Button variant="destructive" size="sm" className="gap-1.5">
          <Trash2 className="size-3.5" />
          <span>Delete Project</span>
        </Button>
      </Popconfirm>

      <Popconfirm
        title="Archive workspace?"
        description="Workspace will enter read-only mode for all collaborators."
        variant="warning"
        okText="Archive"
        onConfirm={() => setStatusText("Workspace archived")}
      >
        <Button variant="outline" size="sm" className="gap-1.5">
          <Archive className="size-3.5" />
          <span>Archive</span>
        </Button>
      </Popconfirm>

      <span className="text-xs text-muted-foreground font-mono">Status: {statusText}</span>
    </div>
  );
}
