import React from "react"
import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core"
import { useTree } from "@headless-tree/react"
import { Example, ExampleWrapper } from "@/components/example"
import { Tree, TreeItem, TreeItemLabel } from "@/components/ui/tree"

interface Item {
  name: string
  children?: string[]
}

const items: Record<string, Item> = {
  company: {
    name: "Company",
    children: ["engineering", "marketing", "operations"],
  },
  engineering: {
    name: "Engineering",
    children: ["frontend", "backend", "platform-team"],
  },
  frontend: { name: "Frontend", children: ["design-system", "web-platform"] },
  "design-system": {
    name: "Design System",
    children: ["components", "tokens", "guidelines"],
  },
  components: { name: "Components" },
  tokens: { name: "Tokens" },
  guidelines: { name: "Guidelines" },
  "web-platform": { name: "Web Platform" },
  backend: { name: "Backend", children: ["apis", "infrastructure"] },
  apis: { name: "APIs" },
  infrastructure: { name: "Infrastructure" },
  "platform-team": { name: "Platform Team" },
  marketing: { name: "Marketing", children: ["content", "seo"] },
  content: { name: "Content" },
  seo: { name: "SEO" },
  operations: { name: "Operations", children: ["hr", "finance"] },
  hr: { name: "HR" },
  finance: { name: "Finance" },
}

export default function TreeExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <TreeDemo />
    </ExampleWrapper>
  )
}

function TreeDemo() {
  const tree = useTree<Item>({
    initialState: {
      expandedItems: ["engineering", "frontend", "design-system"],
    },
    indent: 20,
    rootItemId: "company",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId]?.children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  })

  return (
    <Example title="File & Directory Tree View">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-3 shadow-xs">
        <Tree tree={tree}>
          {tree.getItems().map((item) => (
            <TreeItem key={item.getId()} item={item}>
              <TreeItemLabel />
            </TreeItem>
          ))}
        </Tree>
      </div>
    </Example>
  )
}
