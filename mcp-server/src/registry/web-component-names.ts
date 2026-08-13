// Mirrors the canonical display names in ../../../src/WebCatalog.tsx.
// Duplicated (rather than imported) because that module has CSS/React
// side-effect imports that don't belong in a headless server process.
// Keep in sync manually if the docs catalog adds/renames entries.
export const webComponentNames = [
  "Accordion", "Alert", "Alert Dialog", "Aspect Ratio", "Attachment", "Avatar", "Badge", "Breadcrumb",
  "Bubble", "Button", "Button Group", "Calendar", "Card", "Carousel", "Chart", "Checkbox", "Collapsible",
  "Combobox", "Command", "Context Menu", "Data Table", "Date Picker", "Dialog", "Direction", "Drawer",
  "Dropdown Menu", "Empty", "Field", "Hover Card", "Input", "Input Group", "Input OTP", "Item", "Kbd",
  "Label", "Marker", "Menubar", "Message", "Message Scroller", "Native Select", "Navigation Menu", "Pagination",
  "Popover", "Progress", "Radio Group", "Resizable", "Scroll Area", "Select", "Separator", "Sheet", "Sidebar",
  "Skeleton", "Slider", "Sonner", "Spinner", "Switch", "Table", "Tabs", "Textarea", "Toast", "Toggle",
  "Toggle Group", "Tooltip", "Typography", "TipKit", "Payment Button", "Icon", "Form", "File Dialog",
  "Notification", "Navigation Bar", "Page Indicator", "Date & Time", "Stepper",
] as const;
