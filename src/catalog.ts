import type { ComponentType } from "react";

const humanize = (slug: string) =>
  slug
    .split("-")
    .map((word) => (word.length <= 3 && word !== "otp" ? word.toUpperCase() : word[0]!.toUpperCase() + word.slice(1)))
    .join(" ")
    .replace(/\bOtp\b/, "OTP");

const GROUPS: Record<string, string> = {
  "aspect-ratio": "Layout",
  resizable: "Layout",
  "scroll-area": "Layout",
  separator: "Layout",
  sidebar: "Layout",

  button: "Forms",
  "button-group": "Forms",
  checkbox: "Forms",
  combobox: "Forms",
  field: "Forms",
  input: "Forms",
  "input-group": "Forms",
  "input-otp": "Forms",
  label: "Forms",
  "native-select": "Forms",
  "radio-group": "Forms",
  select: "Forms",
  slider: "Forms",
  switch: "Forms",
  textarea: "Forms",
  toggle: "Forms",
  "toggle-group": "Forms",

  breadcrumb: "Navigation",
  command: "Navigation",
  "context-menu": "Navigation",
  "dropdown-menu": "Navigation",
  menubar: "Navigation",
  "navigation-menu": "Navigation",
  pagination: "Navigation",
  tabs: "Navigation",

  "alert-dialog": "Overlays",
  dialog: "Overlays",
  drawer: "Overlays",
  "hover-card": "Overlays",
  popover: "Overlays",
  sheet: "Overlays",
  tooltip: "Overlays",

  accordion: "Data display",
  avatar: "Data display",
  badge: "Data display",
  calendar: "Data display",
  card: "Data display",
  carousel: "Data display",
  chart: "Data display",
  collapsible: "Data display",
  empty: "Data display",
  item: "Data display",
  kbd: "Data display",
  marker: "Data display",
  table: "Data display",

  alert: "Feedback",
  message: "Feedback",
  "message-scroller": "Feedback",
  progress: "Feedback",
  skeleton: "Feedback",
  sonner: "Feedback",
  spinner: "Feedback",
  toast: "Feedback",

  attachment: "Content",
  bubble: "Content",
  questionnaire: "Content",
  direction: "Content",
};

export type CatalogExample = {
  slug: string;
  title: string;
  Component: ComponentType;
  source: string;
};

export type CatalogEntry = {
  slug: string;
  title: string;
  group: string;
  examples: CatalogExample[];
};

// UI primitive slugs come from the filenames alone (their content isn't
// needed here -- only the example demos are actually rendered). `?url` keeps
// this a lightweight eager glob instead of a dynamic-import chunk boundary
// that Rolldown would otherwise flag as redundant (every ui/*.tsx file is
// already pulled in statically by its *-example.tsx demo).
const uiModules = import.meta.glob("./components/ui/*.tsx", { eager: true, query: "?url" });
const uiSlugs = Object.keys(uiModules)
  .map((path) => path.match(/\/ui\/([a-z0-9-]+)\.tsx$/)?.[1])
  .filter((slug): slug is string => Boolean(slug))
  .sort();

const exampleComponents = import.meta.glob("./components/*-example.tsx", { eager: true }) as Record<
  string,
  { default: ComponentType }
>;
const exampleSources = import.meta.glob("./components/*-example.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const uiSlugSet = new Set(uiSlugs);

/** "sidebar-floating-example" -> "sidebar" (longest known ui slug that's a
 * prefix of the example's own slug, on a "-" boundary). Falls back to the
 * example's own slug (minus "-example") when nothing matches -- those
 * examples just won't have a ui primitive page to attach to. */
function ownerSlug(exampleSlug: string): string {
  if (uiSlugSet.has(exampleSlug)) return exampleSlug;
  const parts = exampleSlug.split("-");
  for (let end = parts.length - 1; end > 0; end--) {
    const candidate = parts.slice(0, end).join("-");
    if (uiSlugSet.has(candidate)) return candidate;
  }
  return exampleSlug;
}

const examplesByOwner = new Map<string, CatalogExample[]>();
for (const path in exampleComponents) {
  const rawSlug = path.match(/\/([a-z0-9-]+)-example\.tsx$/)?.[1];
  if (!rawSlug) continue; // e.g. demo.tsx, component-example.tsx -- not tied to one primitive
  const owner = ownerSlug(rawSlug);
  const list = examplesByOwner.get(owner) ?? [];
  list.push({
    slug: rawSlug,
    title: humanize(rawSlug.replace(new RegExp(`^${owner}-?`), "")) || humanize(rawSlug),
    Component: exampleComponents[path]!.default,
    source: exampleSources[path] ?? "",
  });
  examplesByOwner.set(owner, list);
}

export const catalog: CatalogEntry[] = uiSlugs.map((slug) => ({
  slug,
  title: humanize(slug),
  group: GROUPS[slug] ?? "Components",
  examples: examplesByOwner.get(slug) ?? [],
}));

export const catalogGroups: { name: string; entries: CatalogEntry[] }[] = Object.values(
  catalog.reduce<Record<string, { name: string; entries: CatalogEntry[] }>>((acc, entry) => {
    (acc[entry.group] ??= { name: entry.group, entries: [] }).entries.push(entry);
    return acc;
  }, {}),
);
