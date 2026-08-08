import type { ReactNode } from "react";
import {
  isStableReactComponent,
  maturityForReactComponent,
  stableReactComponents,
  type ComponentMaturity,
} from "./componentMaturity";
import { createWebStories, webComponentNames, type WebComponentName } from "./WebCatalog";
import {
  spaceBlocks,
  spaceCategories,
  spaceCategoryColumns,
  type SpaceBlock,
  type SpaceExample,
} from "./spaceExamples";

export type ComponentStatus = ComponentMaturity;

/** Which top-nav catalog a doc belongs to: the base component set, or the
 * Extras tab (vendored-only categories and full-page blocks). */
export type CatalogSection = "components" | "extras";

export type ComponentExample = {
  label: string;
  description: string;
  code: string;
  render: () => ReactNode;
};

export type ComponentDoc = {
  name: string;
  slug: string;
  group: string;
  section: CatalogSection;
  description: string;
  status: ComponentStatus;
  source: string;
  code: string;
  examples: ComponentExample[];
  /** Vendored shadcnspace gallery examples, rendered in their own grid. */
  spaceExamples?: SpaceExample[];
  /** Gallery grid density (1-3 columns), mirrored from shadcnspace. */
  spaceColumns?: number;
  /** True when the doc represents a full-page block. */
  spaceBlock?: boolean;
};

const slugify = (name: string) => name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const groupMembers: Record<string, Set<WebComponentName>> = {
  Foundations: new Set(["Aspect Ratio", "Direction", "Icon", "Kbd", "Separator", "Typography"]),
  Actions: new Set(["Button", "Button Group", "Payment Button", "Toggle", "Toggle Group"]),
  Forms: new Set(["Calendar", "Checkbox", "Combobox", "Date Picker", "Date & Time", "Field", "Form", "Input", "Input Group", "Input OTP", "Label", "Native Select", "Radio Group", "Select", "Slider", "Stepper", "Switch", "Textarea"]),
  Navigation: new Set(["Breadcrumb", "Command", "Context Menu", "Dropdown Menu", "Menubar", "Navigation Bar", "Navigation Menu", "Page Indicator", "Pagination", "Sidebar", "Tabs"]),
  "Data Display": new Set(["Attachment", "Avatar", "Badge", "Card", "Carousel", "Chart", "Data Table", "Item", "Marker", "Progress", "Resizable", "Scroll Area", "Skeleton", "Table"]),
  Feedback: new Set(["Alert", "Empty", "Message", "Message Scroller", "Notification", "Sonner", "Spinner", "TipKit", "Toast"]),
  Overlays: new Set(["Alert Dialog", "Dialog", "Drawer", "File Dialog", "Hover Card", "Popover", "Sheet", "Tooltip"]),
  Disclosure: new Set(["Accordion", "Collapsible"]),
  Patterns: new Set(["Bubble"]),
};

const descriptions: Partial<Record<WebComponentName, string>> = {
  Accordion: "A vertically stacked set of interactive headings that reveal web content sections.",
  Alert: "Communicates important status or guidance without interrupting the current browser workflow.",
  "Alert Dialog": "Requests confirmation for a consequential action in an accessible modal surface.",
  "Aspect Ratio": "Keeps responsive media within a predictable width-to-height relationship.",
  Attachment: "Represents uploaded files with metadata, progress, and contextual actions.",
  Avatar: "Identifies a person or team with an image, initials, fallback, and responsive sizes.",
  Badge: "Shows compact status, category, or count information using semantic color.",
  Breadcrumb: "Shows page hierarchy and lets users move back through higher-level web routes.",
  Bubble: "Displays short conversational content in messaging and assistant interfaces.",
  Button: "Triggers an action with documented variants, sizes, colors, states, and keyboard behavior.",
  "Button Group": "Groups related actions while preserving a clear selected or active state.",
  Calendar: "Supports browser-based date selection in a month grid.",
  Card: "Groups related content and actions inside a flexible responsive surface.",
  Carousel: "Presents a horizontal sequence of content with explicit navigation controls.",
  Chart: "Visualizes compact metrics for dashboards and analytical web interfaces.",
  Checkbox: "Lets users select one or more independent options in a form.",
  Collapsible: "Shows and hides a single region of supporting page content.",
  Combobox: "Combines text input with a filterable list of suggested web form values.",
  Command: "Provides a keyboard-friendly browser command palette for fast actions and navigation.",
  "Context Menu": "Presents contextual actions for a selected item or region.",
  "Data Table": "A sortable, searchable, selectable, and paginated table for structured web datasets.",
  "Date Picker": "Captures a calendar date using accessible browser form controls.",
  Dialog: "Focuses attention on a contained web task without navigating away from the current page.",
  Direction: "Demonstrates layouts that adapt correctly to left-to-right and right-to-left content.",
  Drawer: "Slides supporting content or a focused task in from the edge of the browser viewport.",
  "Dropdown Menu": "Opens a compact list of related commands from a trigger button.",
  Empty: "Explains an empty result or first-use state and offers a useful next action.",
  Field: "Combines a label, control, description, validation state, and error message.",
  "Hover Card": "Reveals concise supporting information on pointer hover or keyboard focus.",
  Input: "Captures a single line of text with labels, validation, and disabled states.",
  "Input Group": "Combines an input with prefixes, suffixes, actions, or keyboard hints.",
  "Input OTP": "Captures a short one-time passcode across clearly separated inputs.",
  Item: "Represents a reusable row of content, metadata, and optional actions.",
  Kbd: "Displays keyboard keys and shortcuts using semantic keyboard markup.",
  Label: "Provides an accessible text label for an associated web form control.",
  Marker: "Marks milestones and changes along a chronological activity timeline.",
  Menubar: "Organizes top-level application commands for complex browser-based tools.",
  Message: "Shows a message with author, content, metadata, and delivery context.",
  "Message Scroller": "Contains a scrollable message history with predictable keyboard behavior.",
  "Native Select": "Uses the browser-native select control for simple option lists.",
  "Navigation Menu": "Organizes primary website destinations and responsive actions.",
  Pagination: "Moves between pages of data while exposing the current position.",
  Popover: "Displays lightweight interactive content anchored to a web trigger.",
  Progress: "Communicates completion for tasks such as uploads, exports, and onboarding.",
  "Radio Group": "Lets users select exactly one option from a related set.",
  Resizable: "Lets users adjust the proportion of adjacent application panels.",
  "Scroll Area": "Provides a constrained content region with browser scrolling behavior.",
  Select: "Lets users choose a value from a structured list of options.",
  Separator: "Creates a subtle visual or semantic boundary between content groups.",
  Sheet: "Displays supporting content in a compact anchored surface.",
  Sidebar: "Provides persistent application navigation alongside a responsive content canvas.",
  Skeleton: "Indicates that page structure is loading without causing major layout shifts.",
  Slider: "Lets users select a value within a continuous browser form range.",
  Sonner: "Displays a managed stack of temporary web notifications.",
  Spinner: "Indicates an indeterminate loading state at multiple interface sizes.",
  Switch: "Toggles a persistent setting on or off with immediate feedback.",
  Table: "Presents structured data using semantic table elements and readable density.",
  Tabs: "Switches between related panels without a full page navigation.",
  Textarea: "Captures longer, multiline content with resize and validation behavior.",
  Toast: "Confirms a result or reports an error in a temporary non-blocking surface.",
  Toggle: "Represents an on-or-off action that can include supporting context.",
  "Toggle Group": "Groups related toggle choices into a compact single or multi-select control.",
  Tooltip: "Adds concise context to controls on hover and keyboard focus.",
  Typography: "Defines the responsive, readable hierarchy used throughout the web design system.",
  TipKit: "Provides contextual, dismissible guidance for new or important web interface behavior.",
  "Payment Button": "Starts a secure browser checkout flow with clear provider and action labeling.",
  Icon: "Provides a consistent visual language for common web interface actions.",
  Form: "Composes labeled fields, validation, help text, and submission actions.",
  "File Dialog": "Collects options and confirmation before importing or exporting a browser file.",
  Notification: "Displays persistent web application information with semantic status styling.",
  "Navigation Bar": "Combines brand, page navigation, and primary actions across responsive widths.",
  "Page Indicator": "Shows position within a short carousel or onboarding sequence.",
  "Date & Time": "Captures date and time values with browser-native, locale-aware controls.",
  Stepper: "Adjusts a numeric value with increment and decrement actions.",
};

const findGroup = (name: WebComponentName) => Object.entries(groupMembers).find(([, members]) => members.has(name))?.[0] ?? "Utilities";
const sourceFor = (name: WebComponentName) =>
  isStableReactComponent(name) ? stableReactComponents[name] : "WebCatalog.tsx";

const codeFor = (name: WebComponentName) => {
  if (name === "Button") return `import { Button } from "@ramekhchhoeng/designkit";\n\n<Button variant="primary" size="medium" color="blue">\n  Continue\n</Button>`;
  if (name === "Data Table") return `import { DataTable } from "@ramekhchhoeng/designkit";\n\n<DataTable columns={columns} data={rows} selectable />`;
  if (name === "Drawer") return `import { Drawer } from "@ramekhchhoeng/designkit";\n\n<Drawer open={open} onOpenChange={setOpen} title="Edit profile">\n  {/* Drawer content */}\n</Drawer>`;
  if (name === "Input") return `import { Input } from "@ramekhchhoeng/designkit";\n\n<Input label="Email address" type="email" placeholder="name@example.com" />`;
  if (name === "Badge") return `import { Badge } from "@ramekhchhoeng/designkit";\n\n<Badge tone="green">Active</Badge>`;
  if (name === "Card") return `import { Card, CardHeader, CardTitle } from "@ramekhchhoeng/designkit";\n\n<Card variant="elevated">\n  <CardHeader><CardTitle>Analytics</CardTitle></CardHeader>\n</Card>`;
  const tag = name.replace(/\s+/g, "");
  return `// Documentation preview — package extraction is planned.\n<${tag} />`;
};

// --- shadcnspace examples (vendored, MIT) -------------------------------------

const spaceCategoryFor: Partial<Record<WebComponentName, string>> = {
  Accordion: "accordion",
  Alert: "alert",
  Avatar: "avatar",
  Badge: "badge",
  Breadcrumb: "breadcrumb",
  Button: "button",
  "Button Group": "button-group",
  Calendar: "calendar",
  Card: "card",
  Carousel: "carousel",
  Checkbox: "checkbox",
  Collapsible: "collapsible",
  Combobox: "combobox",
  Command: "command",
  "Context Menu": "context-menu",
  "Date Picker": "date-picker",
  Dialog: "dialog",
  "Dropdown Menu": "dropdown-menu",
  Input: "input",
  "Input OTP": "input-otp",
  Kbd: "kbd",
  Label: "label",
  Pagination: "pagination",
  Popover: "popover",
  Progress: "progress",
  "Radio Group": "radio-group",
  "Scroll Area": "scroll-area",
  Select: "select",
  Separator: "separator",
  Sheet: "sheet",
  Skeleton: "skeleton",
  Slider: "slider",
  Sonner: "sonner",
  Spinner: "spinner",
  Switch: "switch",
  Tabs: "tabs",
  Textarea: "textarea",
  Tooltip: "tooltip",
};

const spaceGroupFor: Record<string, string> = {
  autocomplete: "Forms",
  "input-mask": "Forms",
  "file-upload": "Forms",
  "multi-select": "Forms",
  "native-select": "Forms",
  "code-block": "Data Display",
  "number-ticker": "Data Display",
  "animated-list": "Animation",
  "animated-text": "Animation",
  "apple-dock": "Animation",
  marquee: "Animation",
  "orbiting-circles": "Animation",
  "shine-border": "Animation",
  "spinning-text": "Animation",
  animations: "Animation",
};

const mappedSlugs = new Set(Object.values(spaceCategoryFor));

const galleryFor = (slug: string | undefined) => {
  if (!slug) return {};
  const examples = spaceCategories[slug]?.examples ?? [];
  if (!examples.length) return {};
  return { spaceExamples: examples, spaceColumns: spaceCategoryColumns[slug] ?? 1 };
};

const spaceOnlyDocs: ComponentDoc[] = Object.values(spaceCategories)
  .filter((category) => !mappedSlugs.has(category.slug) && category.slug !== "blocks" && category.examples.length > 0)
  .map((category) => ({
    name: category.title,
    slug: slugify(category.title),
    group: spaceGroupFor[category.slug] ?? "Data Display",
    section: "extras" as const,
    description: category.description || `${category.title} examples from the shadcnspace collection.`,
    status: "preview" as const,
    source: `space/components/shadcn-space/${category.slug}/`,
    code: `import Example from "${category.examples[0].importPath}";`,
    examples: [],
    ...galleryFor(category.slug),
  }));

const toBlockDoc = (block: SpaceBlock): ComponentDoc => {
  const shortName = block.title.split(" - ")[0].trim() || block.title;
  return {
    name: shortName,
    slug: slugify(`block-${block.id}`),
    group: "Blocks",
    section: "extras" as const,
    description: block.description,
    status: "preview" as const,
    source: `space/components/shadcn-space/blocks/${block.id}/`,
    code: `import Page from "@/components/shadcn-space/blocks/${block.id}/page";`,
    examples: [],
    spaceExamples: [{
      id: block.id,
      label: block.title.split(" - ").slice(1).join(" - ").trim() || shortName,
      description: block.description,
      importPath: `@/components/shadcn-space/blocks/${block.id}/page`,
      load: block.load,
      loadSource: block.loadSource ?? (() => Promise.resolve("")),
    }],
    spaceColumns: 1,
    spaceBlock: true,
  };
};

const blockDocs: ComponentDoc[] = spaceBlocks.map(toBlockDoc);

// Base component groups come first in a deliberate order; Blocks (full page
// sections) are a separate catalog that always sorts last.
const groupOrder = [
  "Foundations", "Actions", "Forms", "Navigation", "Data Display",
  "Feedback", "Overlays", "Disclosure", "Patterns", "Animation", "Utilities", "Blocks",
];
const groupRank = (group: string) => {
  const rank = groupOrder.indexOf(group);
  return rank === -1 ? groupOrder.indexOf("Utilities") : rank;
};

export const componentDocs: ComponentDoc[] = [
  ...webComponentNames.map((name) => ({
    name: name as string,
    slug: slugify(name),
    group: findGroup(name),
    section: "components" as const,
    description: descriptions[name] ?? `${name} is a responsive, accessible part of the web component catalog.`,
    status: maturityForReactComponent(name),
    source: sourceFor(name),
    code: codeFor(name),
    examples: createWebStories(name),
    ...galleryFor(spaceCategoryFor[name]),
  })),
  ...spaceOnlyDocs,
  ...blockDocs,
].sort((first, second) => groupRank(first.group) - groupRank(second.group) || first.name.localeCompare(second.name));

export const sectionGroups = (section: CatalogSection) =>
  Array.from(new Set(componentDocs.filter((component) => component.section === section).map((component) => component.group)));
export const stableComponentCount = componentDocs.filter((component) => component.status === "stable" && component.section === "components").length;
export const previewExtrasCount = componentDocs.filter((component) => component.status === "preview" && component.section === "extras" && component.group !== "Blocks").length;
export const previewBlockCount = componentDocs.filter((component) => component.status === "preview" && component.group === "Blocks").length;
