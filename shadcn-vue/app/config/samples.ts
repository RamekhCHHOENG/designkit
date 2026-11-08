import { categories } from "./components";
import { extendedCategories } from "./extendedComponents";

export interface SamplePageInfo {
  href: string;
  label: string;
  count?: number;
  categoryName?: string;
}

// Maps component slugs to their rich sample showcase categories
const SLUG_TO_SAMPLE_CATEGORY: Record<string, string> = {
  // Navigation
  breadcrumb: "breadcrumb",
  "navigation-menu": "navbar",
  pagination: "pagination",

  // Forms
  button: "button",
  "button-group": "button",
  checkbox: "checkbox",
  input: "input",
  "input-group": "input",
  "input-otp": "input",
  "password-input": "input",
  "number-field": "input",
  "file-dropzone": "file-upload",
  select: "select",
  combobox: "select",
  "multi-select": "select",
  "native-select": "select",
  "tags-input": "select",
  slider: "slider",
  switch: "switch",
  textarea: "textarea",
  "radio-group": "radio",
  "prompt-input": "prompt-input",
  "model-selector": "model-selector",
  "signature-pad": "signature-pad",
  "rich-text-editor": "rich-text-editor",

  // Overlays
  dialog: "dialog",
  "alert-dialog": "dialog",
  drawer: "dialog",
  popover: "popover",
  "hover-card": "popover",
  tooltip: "tooltip",
  "dropdown-menu": "dropdown",
  "context-menu": "dropdown",
  menubar: "dropdown",

  // Data Display
  accordion: "accordion",
  avatar: "avatar",
  badge: "badge",
  calendar: "calendar-date-picker",
  "date-picker": "calendar-date-picker",
  "date-range-picker": "calendar-date-picker",
  table: "table",
  tabs: "tabs",
  "segmented-control": "tabs",
  timeline: "timeline",
  stepper: "stepper",
  tree: "tree",
  "category-bar": "category-bar",
  "bar-list": "bar-list",
  "delta-badge": "delta-badge",
  "thinking-block": "thinking-block",
  trace: "trace",
  "video-player": "video-player",
  "icon-motion": "icon-motion",
  "media-gallery": "media-gallery",
  "diff-viewer": "diff-viewer",
  "table-of-contents": "table-of-contents",
  "file-tree": "file-tree",
  transfer: "transfer",
  cascader: "cascader",
  mentions: "mentions",
  "filter-chips": "filter-chips",
  "audio-player": "audio-player",
  "price-card": "price-card",
  "announcement-banner": "announcement-banner",
  "tilt-card": "tilt-card",
  "interactive-grid-pattern": "interactive-grid-pattern",
  "shimmer-button": "shimmer-button",

  // Feedback
  alert: "alert",
  sonner: "notification",
  toast: "notification",
  message: "notification",
  "message-scroller": "notification",

  // Extended
  card: "extended/card",
  empty: "extended/empty-state",
  snippet: "extended/snippet",
  "mini-calendar": "extended/mini-calendar",
  "contribution-graph": "extended/contribution-graph",
  statistic: "extended/statistic-card",
};

export function getSamplePage(slug: string, categorySlug?: string): SamplePageInfo {
  const targetCategorySlug = categorySlug || SLUG_TO_SAMPLE_CATEGORY[slug] || slug;

  // 1. Direct match in standard categories (renders via app/pages/[category].vue)
  const cat = categories.find((c) => c.slug === targetCategorySlug);
  if (cat) {
    return {
      href: `/${cat.slug}`,
      label: `More Samples (${cat.components.length})`,
      count: cat.components.length,
      categoryName: cat.name,
    };
  }

  // 2. Direct match in extended categories (renders via app/pages/extended/[category].vue)
  const ext = extendedCategories.find(
    (c) => c.slug === targetCategorySlug || c.slug === `extended/${targetCategorySlug}`
  );
  if (ext) {
    return {
      href: `/${ext.slug}`,
      label: `More Samples (${ext.components.length})`,
      count: ext.components.length,
      categoryName: ext.name,
    };
  }

  // 3. Fallback: explore all examples
  return {
    href: `/?mode=examples`,
    label: "Explore Samples",
  };
}
