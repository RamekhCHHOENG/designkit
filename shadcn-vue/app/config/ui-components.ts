export interface UiComponent {
  name: string
  slug: string
  group: string
  featuredComp: string | null
  categorySlug: string | null
}

export const GROUPS = [
  "Forms", "Layout", "Navigation", "Overlays", "Data display", "Feedback", "Content"
] as const

export const uiComponents: UiComponent[] = [
  // Forms
  { name: "Input", slug: "input", group: "Forms", featuredComp: "comp-01", categorySlug: "input" },
  { name: "Textarea", slug: "textarea", group: "Forms", featuredComp: "comp-59", categorySlug: "textarea" },
  { name: "Button", slug: "button", group: "Forms", featuredComp: "comp-78", categorySlug: "button" },
  { name: "Button Group", slug: "button-group", group: "Forms", featuredComp: "comp-78", categorySlug: "button" },
  { name: "Checkbox", slug: "checkbox", group: "Forms", featuredComp: "comp-132", categorySlug: "checkbox" },
  { name: "Radio Group", slug: "radio-group", group: "Forms", featuredComp: "comp-152", categorySlug: "radio" },
  { name: "Switch", slug: "switch", group: "Forms", featuredComp: "comp-172", categorySlug: "switch" },
  { name: "Select", slug: "select", group: "Forms", featuredComp: "comp-189", categorySlug: "select" },
  { name: "Native Select", slug: "native-select", group: "Forms", featuredComp: "comp-189", categorySlug: "select" },
  { name: "Multi Select", slug: "multi-select", group: "Forms", featuredComp: "comp-189", categorySlug: "select" },
  { name: "Slider", slug: "slider", group: "Forms", featuredComp: "comp-240", categorySlug: "slider" },
  { name: "Number Field", slug: "number-field", group: "Forms", featuredComp: "comp-01", categorySlug: "input" },
  { name: "Pin Input", slug: "pin-input", group: "Forms", featuredComp: "comp-01", categorySlug: "input" },
  { name: "Input Group", slug: "input-group", group: "Forms", featuredComp: "comp-01", categorySlug: "input" },
  { name: "Tags Input", slug: "tags-input", group: "Forms", featuredComp: null, categorySlug: "input" },
  { name: "Combobox", slug: "combobox", group: "Forms", featuredComp: "comp-189", categorySlug: "select" },
  { name: "Date Picker", slug: "date-picker", group: "Forms", featuredComp: "comp-487", categorySlug: "calendar-date-picker" },
  { name: "Date Field", slug: "date-field", group: "Forms", featuredComp: "comp-487", categorySlug: "calendar-date-picker" },
  { name: "Date Range Picker", slug: "date-range-picker", group: "Forms", featuredComp: "comp-487", categorySlug: "calendar-date-picker" },
  { name: "Time Field", slug: "time-field", group: "Forms", featuredComp: null, categorySlug: null },
  // Layout
  { name: "Card", slug: "card", group: "Layout", featuredComp: null, categorySlug: null },
  { name: "Separator", slug: "separator", group: "Layout", featuredComp: null, categorySlug: null },
  { name: "Aspect Ratio", slug: "aspect-ratio", group: "Layout", featuredComp: null, categorySlug: null },
  { name: "Scroll Area", slug: "scroll-area", group: "Layout", featuredComp: null, categorySlug: null },
  { name: "Collapsible", slug: "collapsible", group: "Layout", featuredComp: null, categorySlug: null },
  { name: "Resizable", slug: "resizable", group: "Layout", featuredComp: null, categorySlug: null },
  // Navigation
  { name: "Tabs", slug: "tabs", group: "Navigation", featuredComp: "comp-426", categorySlug: "tabs" },
  { name: "Breadcrumb", slug: "breadcrumb", group: "Navigation", featuredComp: "comp-446", categorySlug: "breadcrumb" },
  { name: "Pagination", slug: "pagination", group: "Navigation", featuredComp: "comp-454", categorySlug: "pagination" },
  { name: "Navigation Menu", slug: "navigation-menu", group: "Navigation", featuredComp: "comp-577", categorySlug: "navbar" },
  { name: "Command", slug: "command", group: "Navigation", featuredComp: null, categorySlug: null },
  // Overlays
  { name: "Dialog", slug: "dialog", group: "Overlays", featuredComp: "comp-313", categorySlug: "dialog" },
  { name: "Alert Dialog", slug: "alert-dialog", group: "Overlays", featuredComp: "comp-313", categorySlug: "dialog" },
  { name: "Drawer", slug: "drawer", group: "Overlays", featuredComp: "comp-313", categorySlug: "dialog" },
  { name: "Popover", slug: "popover", group: "Overlays", featuredComp: "comp-381", categorySlug: "popover" },
  { name: "Hover Card", slug: "hover-card", group: "Overlays", featuredComp: null, categorySlug: "popover" },
  { name: "Context Menu", slug: "context-menu", group: "Overlays", featuredComp: null, categorySlug: "dropdown" },
  { name: "Dropdown Menu", slug: "dropdown-menu", group: "Overlays", featuredComp: "comp-366", categorySlug: "dropdown" },
  { name: "Tooltip", slug: "tooltip", group: "Overlays", featuredComp: "comp-354", categorySlug: "tooltip" },
  // Data display
  { name: "Table", slug: "table", group: "Data display", featuredComp: "comp-466", categorySlug: "table" },
  { name: "Avatar", slug: "avatar", group: "Data display", featuredComp: "comp-390", categorySlug: "avatar" },
  { name: "Badge", slug: "badge", group: "Data display", featuredComp: "comp-413", categorySlug: "badge" },
  { name: "Calendar", slug: "calendar", group: "Data display", featuredComp: "comp-487", categorySlug: "calendar-date-picker" },
  { name: "Mini Calendar", slug: "mini-calendar", group: "Data display", featuredComp: "comp-487", categorySlug: "calendar-date-picker" },
  { name: "Range Calendar", slug: "range-calendar", group: "Data display", featuredComp: "comp-487", categorySlug: "calendar-date-picker" },
  { name: "Accordion", slug: "accordion", group: "Data display", featuredComp: "comp-334", categorySlug: "accordion" },
  { name: "Tree", slug: "tree", group: "Data display", featuredComp: "comp-565", categorySlug: "tree" },
  { name: "Stepper", slug: "stepper", group: "Data display", featuredComp: "comp-513", categorySlug: "stepper" },
  { name: "Timeline", slug: "timeline", group: "Data display", featuredComp: "comp-530", categorySlug: "timeline" },
  { name: "Progress", slug: "progress", group: "Data display", featuredComp: null, categorySlug: null },
  { name: "Skeleton", slug: "skeleton", group: "Data display", featuredComp: null, categorySlug: null },
  { name: "Contribution Graph", slug: "contribution-graph", group: "Data display", featuredComp: null, categorySlug: null },
  { name: "Empty", slug: "empty", group: "Data display", featuredComp: null, categorySlug: null },
  // Feedback
  { name: "Alert", slug: "alert", group: "Feedback", featuredComp: "comp-267", categorySlug: "alert" },
  { name: "Sonner", slug: "sonner", group: "Feedback", featuredComp: "comp-279", categorySlug: "notification" },
  { name: "Toast", slug: "toast", group: "Feedback", featuredComp: "comp-279", categorySlug: "notification" },
  // Content
  { name: "Label", slug: "label", group: "Content", featuredComp: null, categorySlug: null },
  { name: "Kbd", slug: "kbd", group: "Content", featuredComp: null, categorySlug: null },
  { name: "Snippet", slug: "snippet", group: "Content", featuredComp: null, categorySlug: null },
  { name: "Toggle", slug: "toggle", group: "Content", featuredComp: null, categorySlug: null },
  { name: "Toggle Group", slug: "toggle-group", group: "Content", featuredComp: null, categorySlug: null },
]

export const groupedUiComponents = GROUPS.map(g => ({
  group: g,
  items: uiComponents.filter(c => c.group === g)
})).filter(g => g.items.length > 0)
