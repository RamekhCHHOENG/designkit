export type RegistryKind = "lib" | "ui" | "component" | "block";

export type RegistryFileRef = {
  /** Path relative to the tipkit-react repo root. */
  path: string;
  /** Path a consumer project would write the file to, shadcn-style. */
  target?: string;
  type?: string;
};

export type RegistryFileContent = RegistryFileRef & {
  content: string;
};

export type RegistryItem = {
  name: string;
  kind: RegistryKind;
  type: string;
  title: string;
  description: string;
  category?: string;
  categories?: string[];
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFileRef[];
};

export type RegistryItemSummary = Pick<
  RegistryItem,
  "name" | "kind" | "type" | "title" | "description" | "category" | "categories"
> & { fileCount: number };
