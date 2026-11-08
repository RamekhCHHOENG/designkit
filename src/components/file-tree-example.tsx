import * as React from "react";
import { FileTree, type FileTreeNode } from "@/components/ui/file-tree";

const MOCK_FILES: FileTreeNode[] = [
  {
    id: "src",
    name: "src",
    isFolder: true,
    children: [
      {
        id: "components",
        name: "components",
        isFolder: true,
        children: [
          { id: "button.tsx", name: "button.tsx", size: "2.4 KB" },
          { id: "dialog.tsx", name: "dialog.tsx", size: "4.1 KB" },
          { id: "diff-viewer.tsx", name: "diff-viewer.tsx", badge: "New", size: "5.8 KB" },
        ],
      },
      {
        id: "styles",
        name: "styles",
        isFolder: true,
        children: [{ id: "globals.css", name: "globals.css", size: "1.2 KB" }],
      },
      { id: "main.tsx", name: "main.tsx", size: "840 B" },
      { id: "schema.json", name: "schema.json", size: "3.2 KB" },
    ],
  },
  { id: "package.json", name: "package.json", size: "1.8 KB" },
  { id: "README.md", name: "README.md", size: "6.4 KB" },
];

export default function FileTreeExample() {
  const [selected, setSelected] = React.useState("diff-viewer.tsx");

  return (
    <div className="w-full max-w-sm p-4">
      <FileTree
        data={MOCK_FILES}
        selectedId={selected}
        defaultExpandedIds={["src", "components"]}
        onSelect={(n) => setSelected(n.id)}
      />
    </div>
  );
}
