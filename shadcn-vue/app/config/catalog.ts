import type { Component } from "vue";
import AccordionExample from "@/components/examples/AccordionExample.vue";
import AlertDialogExample from "@/components/examples/AlertDialogExample.vue";
import AlertExample from "@/components/examples/AlertExample.vue";
import AspectRatioExample from "@/components/examples/AspectRatioExample.vue";
import AttachmentExample from "@/components/examples/AttachmentExample.vue";
import AvatarExample from "@/components/examples/AvatarExample.vue";
import BadgeExample from "@/components/examples/BadgeExample.vue";
import BreadcrumbExample from "@/components/examples/BreadcrumbExample.vue";
import BubbleExample from "@/components/examples/BubbleExample.vue";
import ButtonExample from "@/components/examples/ButtonExample.vue";
import ButtonGroupExample from "@/components/examples/ButtonGroupExample.vue";
import CalendarExample from "@/components/examples/CalendarExample.vue";
import CardExample from "@/components/examples/CardExample.vue";
import CarouselExample from "@/components/examples/CarouselExample.vue";
import ChartExample from "@/components/examples/ChartExample.vue";
import CheckboxExample from "@/components/examples/CheckboxExample.vue";
import CollapsibleExample from "@/components/examples/CollapsibleExample.vue";
import ComboboxExample from "@/components/examples/ComboboxExample.vue";
import CommandExample from "@/components/examples/CommandExample.vue";
import ContextMenuExample from "@/components/examples/ContextMenuExample.vue";
import DialogExample from "@/components/examples/DialogExample.vue";
import DirectionExample from "@/components/examples/DirectionExample.vue";
import DrawerExample from "@/components/examples/DrawerExample.vue";
import DropdownMenuExample from "@/components/examples/DropdownMenuExample.vue";
import EmptyExample from "@/components/examples/EmptyExample.vue";
import FieldExample from "@/components/examples/FieldExample.vue";
import HoverCardExample from "@/components/examples/HoverCardExample.vue";
import InputExample from "@/components/examples/InputExample.vue";
import InputGroupExample from "@/components/examples/InputGroupExample.vue";
import InputOtpExample from "@/components/examples/InputOtpExample.vue";
import ItemExample from "@/components/examples/ItemExample.vue";
import KbdExample from "@/components/examples/KbdExample.vue";
import LabelExample from "@/components/examples/LabelExample.vue";
import MarkerExample from "@/components/examples/MarkerExample.vue";
import MenubarExample from "@/components/examples/MenubarExample.vue";
import MessageExample from "@/components/examples/MessageExample.vue";
import MessageScrollerExample from "@/components/examples/MessageScrollerExample.vue";
import NativeSelectExample from "@/components/examples/NativeSelectExample.vue";
import NavigationMenuExample from "@/components/examples/NavigationMenuExample.vue";
import PaginationExample from "@/components/examples/PaginationExample.vue";
import PopoverExample from "@/components/examples/PopoverExample.vue";
import ProgressExample from "@/components/examples/ProgressExample.vue";
import QuestionnaireExample from "@/components/examples/QuestionnaireExample.vue";
import RadioGroupExample from "@/components/examples/RadioGroupExample.vue";
import ResizableExample from "@/components/examples/ResizableExample.vue";
import ScrollAreaExample from "@/components/examples/ScrollAreaExample.vue";
import SelectExample from "@/components/examples/SelectExample.vue";
import SeparatorExample from "@/components/examples/SeparatorExample.vue";
import SheetExample from "@/components/examples/SheetExample.vue";
import SidebarExample from "@/components/examples/SidebarExample.vue";
import SidebarFloatingExample from "@/components/examples/SidebarFloatingExample.vue";
import SidebarIconExample from "@/components/examples/SidebarIconExample.vue";
import SidebarInsetExample from "@/components/examples/SidebarInsetExample.vue";
import SkeletonExample from "@/components/examples/SkeletonExample.vue";
import SliderExample from "@/components/examples/SliderExample.vue";
import SonnerExample from "@/components/examples/SonnerExample.vue";
import SpinnerExample from "@/components/examples/SpinnerExample.vue";
import SwitchExample from "@/components/examples/SwitchExample.vue";
import TableExample from "@/components/examples/TableExample.vue";
import TabsExample from "@/components/examples/TabsExample.vue";
import TextareaExample from "@/components/examples/TextareaExample.vue";
import ToastExample from "@/components/examples/ToastExample.vue";
import ToggleExample from "@/components/examples/ToggleExample.vue";
import ToggleGroupExample from "@/components/examples/ToggleGroupExample.vue";
import TooltipExample from "@/components/examples/TooltipExample.vue";

export interface CatalogExample {
  slug: string;
  title: string;
  component: Component;
  sourceKey: string;
}

export interface CatalogEntry {
  slug: string;
  title: string;
  group: string;
  examples: CatalogExample[];
  categorySlug?: string;
}

export const GROUPS: Record<string, string> = {
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

export const GROUP_ORDER = [
  "Layout",
  "Forms",
  "Navigation",
  "Overlays",
  "Data display",
  "Feedback",
  "Content",
] as const;

export const catalog: CatalogEntry[] = [
  // Layout
  {
    slug: "aspect-ratio",
    title: "Aspect Ratio",
    group: "Layout",
    examples: [{ slug: "aspect-ratio", title: "Aspect Ratio", component: AspectRatioExample, sourceKey: "AspectRatioExample" }],
  },
  {
    slug: "resizable",
    title: "Resizable",
    group: "Layout",
    examples: [{ slug: "resizable", title: "Resizable", component: ResizableExample, sourceKey: "ResizableExample" }],
  },
  {
    slug: "scroll-area",
    title: "Scroll Area",
    group: "Layout",
    examples: [{ slug: "scroll-area", title: "Scroll Area", component: ScrollAreaExample, sourceKey: "ScrollAreaExample" }],
  },
  {
    slug: "separator",
    title: "Separator",
    group: "Layout",
    examples: [{ slug: "separator", title: "Separator", component: SeparatorExample, sourceKey: "SeparatorExample" }],
  },
  {
    slug: "sidebar",
    title: "Sidebar",
    group: "Layout",
    examples: [
      { slug: "sidebar", title: "Standard Sidebar", component: SidebarExample, sourceKey: "SidebarExample" },
      { slug: "sidebar-floating", title: "Floating Sidebar", component: SidebarFloatingExample, sourceKey: "SidebarFloatingExample" },
      { slug: "sidebar-icon", title: "Icon Sidebar", component: SidebarIconExample, sourceKey: "SidebarIconExample" },
      { slug: "sidebar-inset", title: "Inset Sidebar", component: SidebarInsetExample, sourceKey: "SidebarInsetExample" },
    ],
  },

  // Forms
  {
    slug: "button",
    title: "Button",
    group: "Forms",
    categorySlug: "button",
    examples: [{ slug: "button", title: "Button", component: ButtonExample, sourceKey: "ButtonExample" }],
  },
  {
    slug: "button-group",
    title: "Button Group",
    group: "Forms",
    categorySlug: "button",
    examples: [{ slug: "button-group", title: "Button Group", component: ButtonGroupExample, sourceKey: "ButtonGroupExample" }],
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    group: "Forms",
    categorySlug: "checkbox",
    examples: [{ slug: "checkbox", title: "Checkbox", component: CheckboxExample, sourceKey: "CheckboxExample" }],
  },
  {
    slug: "combobox",
    title: "Combobox",
    group: "Forms",
    categorySlug: "select",
    examples: [{ slug: "combobox", title: "Combobox", component: ComboboxExample, sourceKey: "ComboboxExample" }],
  },
  {
    slug: "field",
    title: "Field",
    group: "Forms",
    examples: [{ slug: "field", title: "Field", component: FieldExample, sourceKey: "FieldExample" }],
  },
  {
    slug: "input",
    title: "Input",
    group: "Forms",
    categorySlug: "input",
    examples: [{ slug: "input", title: "Input", component: InputExample, sourceKey: "InputExample" }],
  },
  {
    slug: "input-group",
    title: "Input Group",
    group: "Forms",
    categorySlug: "input",
    examples: [{ slug: "input-group", title: "Input Group", component: InputGroupExample, sourceKey: "InputGroupExample" }],
  },
  {
    slug: "input-otp",
    title: "Input OTP",
    group: "Forms",
    categorySlug: "input",
    examples: [{ slug: "input-otp", title: "Input OTP", component: InputOtpExample, sourceKey: "InputOtpExample" }],
  },
  {
    slug: "label",
    title: "Label",
    group: "Forms",
    examples: [{ slug: "label", title: "Label", component: LabelExample, sourceKey: "LabelExample" }],
  },
  {
    slug: "native-select",
    title: "Native Select",
    group: "Forms",
    categorySlug: "select",
    examples: [{ slug: "native-select", title: "Native Select", component: NativeSelectExample, sourceKey: "NativeSelectExample" }],
  },
  {
    slug: "radio-group",
    title: "Radio Group",
    group: "Forms",
    categorySlug: "radio",
    examples: [{ slug: "radio-group", title: "Radio Group", component: RadioGroupExample, sourceKey: "RadioGroupExample" }],
  },
  {
    slug: "select",
    title: "Select",
    group: "Forms",
    categorySlug: "select",
    examples: [{ slug: "select", title: "Select", component: SelectExample, sourceKey: "SelectExample" }],
  },
  {
    slug: "slider",
    title: "Slider",
    group: "Forms",
    categorySlug: "slider",
    examples: [{ slug: "slider", title: "Slider", component: SliderExample, sourceKey: "SliderExample" }],
  },
  {
    slug: "switch",
    title: "Switch",
    group: "Forms",
    categorySlug: "switch",
    examples: [{ slug: "switch", title: "Switch", component: SwitchExample, sourceKey: "SwitchExample" }],
  },
  {
    slug: "textarea",
    title: "Textarea",
    group: "Forms",
    categorySlug: "textarea",
    examples: [{ slug: "textarea", title: "Textarea", component: TextareaExample, sourceKey: "TextareaExample" }],
  },
  {
    slug: "toggle",
    title: "Toggle",
    group: "Forms",
    examples: [{ slug: "toggle", title: "Toggle", component: ToggleExample, sourceKey: "ToggleExample" }],
  },
  {
    slug: "toggle-group",
    title: "Toggle Group",
    group: "Forms",
    examples: [{ slug: "toggle-group", title: "Toggle Group", component: ToggleGroupExample, sourceKey: "ToggleGroupExample" }],
  },

  // Navigation
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    group: "Navigation",
    categorySlug: "breadcrumb",
    examples: [{ slug: "breadcrumb", title: "Breadcrumb", component: BreadcrumbExample, sourceKey: "BreadcrumbExample" }],
  },
  {
    slug: "command",
    title: "Command",
    group: "Navigation",
    examples: [{ slug: "command", title: "Command", component: CommandExample, sourceKey: "CommandExample" }],
  },
  {
    slug: "context-menu",
    title: "Context Menu",
    group: "Navigation",
    examples: [{ slug: "context-menu", title: "Context Menu", component: ContextMenuExample, sourceKey: "ContextMenuExample" }],
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    group: "Navigation",
    categorySlug: "dropdown",
    examples: [{ slug: "dropdown-menu", title: "Dropdown Menu", component: DropdownMenuExample, sourceKey: "DropdownMenuExample" }],
  },
  {
    slug: "menubar",
    title: "Menubar",
    group: "Navigation",
    examples: [{ slug: "menubar", title: "Menubar", component: MenubarExample, sourceKey: "MenubarExample" }],
  },
  {
    slug: "navigation-menu",
    title: "Navigation Menu",
    group: "Navigation",
    categorySlug: "navbar",
    examples: [{ slug: "navigation-menu", title: "Navigation Menu", component: NavigationMenuExample, sourceKey: "NavigationMenuExample" }],
  },
  {
    slug: "pagination",
    title: "Pagination",
    group: "Navigation",
    categorySlug: "pagination",
    examples: [{ slug: "pagination", title: "Pagination", component: PaginationExample, sourceKey: "PaginationExample" }],
  },
  {
    slug: "tabs",
    title: "Tabs",
    group: "Navigation",
    categorySlug: "tabs",
    examples: [{ slug: "tabs", title: "Tabs", component: TabsExample, sourceKey: "TabsExample" }],
  },

  // Overlays
  {
    slug: "alert-dialog",
    title: "Alert Dialog",
    group: "Overlays",
    categorySlug: "dialog",
    examples: [{ slug: "alert-dialog", title: "Alert Dialog", component: AlertDialogExample, sourceKey: "AlertDialogExample" }],
  },
  {
    slug: "dialog",
    title: "Dialog",
    group: "Overlays",
    categorySlug: "dialog",
    examples: [{ slug: "dialog", title: "Dialog", component: DialogExample, sourceKey: "DialogExample" }],
  },
  {
    slug: "drawer",
    title: "Drawer",
    group: "Overlays",
    categorySlug: "dialog",
    examples: [{ slug: "drawer", title: "Drawer", component: DrawerExample, sourceKey: "DrawerExample" }],
  },
  {
    slug: "hover-card",
    title: "Hover Card",
    group: "Overlays",
    examples: [{ slug: "hover-card", title: "Hover Card", component: HoverCardExample, sourceKey: "HoverCardExample" }],
  },
  {
    slug: "popover",
    title: "Popover",
    group: "Overlays",
    categorySlug: "popover",
    examples: [{ slug: "popover", title: "Popover", component: PopoverExample, sourceKey: "PopoverExample" }],
  },
  {
    slug: "sheet",
    title: "Sheet",
    group: "Overlays",
    examples: [{ slug: "sheet", title: "Sheet", component: SheetExample, sourceKey: "SheetExample" }],
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    group: "Overlays",
    categorySlug: "tooltip",
    examples: [{ slug: "tooltip", title: "Tooltip", component: TooltipExample, sourceKey: "TooltipExample" }],
  },

  // Data display
  {
    slug: "accordion",
    title: "Accordion",
    group: "Data display",
    categorySlug: "accordion",
    examples: [{ slug: "accordion", title: "Accordion", component: AccordionExample, sourceKey: "AccordionExample" }],
  },
  {
    slug: "avatar",
    title: "Avatar",
    group: "Data display",
    categorySlug: "avatar",
    examples: [{ slug: "avatar", title: "Avatar", component: AvatarExample, sourceKey: "AvatarExample" }],
  },
  {
    slug: "badge",
    title: "Badge",
    group: "Data display",
    categorySlug: "badge",
    examples: [{ slug: "badge", title: "Badge", component: BadgeExample, sourceKey: "BadgeExample" }],
  },
  {
    slug: "calendar",
    title: "Calendar",
    group: "Data display",
    categorySlug: "calendar-date-picker",
    examples: [{ slug: "calendar", title: "Calendar", component: CalendarExample, sourceKey: "CalendarExample" }],
  },
  {
    slug: "card",
    title: "Card",
    group: "Data display",
    examples: [{ slug: "card", title: "Card", component: CardExample, sourceKey: "CardExample" }],
  },
  {
    slug: "carousel",
    title: "Carousel",
    group: "Data display",
    examples: [{ slug: "carousel", title: "Carousel", component: CarouselExample, sourceKey: "CarouselExample" }],
  },
  {
    slug: "chart",
    title: "Chart",
    group: "Data display",
    examples: [{ slug: "chart", title: "Chart", component: ChartExample, sourceKey: "ChartExample" }],
  },
  {
    slug: "collapsible",
    title: "Collapsible",
    group: "Data display",
    examples: [{ slug: "collapsible", title: "Collapsible", component: CollapsibleExample, sourceKey: "CollapsibleExample" }],
  },
  {
    slug: "empty",
    title: "Empty",
    group: "Data display",
    examples: [{ slug: "empty", title: "Empty", component: EmptyExample, sourceKey: "EmptyExample" }],
  },
  {
    slug: "item",
    title: "Item",
    group: "Data display",
    examples: [{ slug: "item", title: "Item", component: ItemExample, sourceKey: "ItemExample" }],
  },
  {
    slug: "kbd",
    title: "Kbd",
    group: "Data display",
    examples: [{ slug: "kbd", title: "Kbd", component: KbdExample, sourceKey: "KbdExample" }],
  },
  {
    slug: "marker",
    title: "Marker",
    group: "Data display",
    examples: [{ slug: "marker", title: "Marker", component: MarkerExample, sourceKey: "MarkerExample" }],
  },
  {
    slug: "table",
    title: "Table",
    group: "Data display",
    categorySlug: "table",
    examples: [{ slug: "table", title: "Table", component: TableExample, sourceKey: "TableExample" }],
  },

  // Feedback
  {
    slug: "alert",
    title: "Alert",
    group: "Feedback",
    categorySlug: "alert",
    examples: [{ slug: "alert", title: "Alert", component: AlertExample, sourceKey: "AlertExample" }],
  },
  {
    slug: "message",
    title: "Message",
    group: "Feedback",
    examples: [{ slug: "message", title: "Message", component: MessageExample, sourceKey: "MessageExample" }],
  },
  {
    slug: "message-scroller",
    title: "Message Scroller",
    group: "Feedback",
    examples: [{ slug: "message-scroller", title: "Message Scroller", component: MessageScrollerExample, sourceKey: "MessageScrollerExample" }],
  },
  {
    slug: "progress",
    title: "Progress",
    group: "Feedback",
    examples: [{ slug: "progress", title: "Progress", component: ProgressExample, sourceKey: "ProgressExample" }],
  },
  {
    slug: "skeleton",
    title: "Skeleton",
    group: "Feedback",
    examples: [{ slug: "skeleton", title: "Skeleton", component: SkeletonExample, sourceKey: "SkeletonExample" }],
  },
  {
    slug: "sonner",
    title: "Sonner",
    group: "Feedback",
    categorySlug: "notification",
    examples: [{ slug: "sonner", title: "Sonner", component: SonnerExample, sourceKey: "SonnerExample" }],
  },
  {
    slug: "spinner",
    title: "Spinner",
    group: "Feedback",
    examples: [{ slug: "spinner", title: "Spinner", component: SpinnerExample, sourceKey: "SpinnerExample" }],
  },
  {
    slug: "toast",
    title: "Toast",
    group: "Feedback",
    categorySlug: "notification",
    examples: [{ slug: "toast", title: "Toast", component: ToastExample, sourceKey: "ToastExample" }],
  },

  // Content
  {
    slug: "attachment",
    title: "Attachment",
    group: "Content",
    examples: [{ slug: "attachment", title: "Attachment", component: AttachmentExample, sourceKey: "AttachmentExample" }],
  },
  {
    slug: "bubble",
    title: "Bubble",
    group: "Content",
    examples: [{ slug: "bubble", title: "Bubble", component: BubbleExample, sourceKey: "BubbleExample" }],
  },
  {
    slug: "questionnaire",
    title: "Questionnaire",
    group: "Content",
    examples: [{ slug: "questionnaire", title: "Questionnaire", component: QuestionnaireExample, sourceKey: "QuestionnaireExample" }],
  },
  {
    slug: "direction",
    title: "Direction",
    group: "Content",
    examples: [{ slug: "direction", title: "Direction", component: DirectionExample, sourceKey: "DirectionExample" }],
  },
];

export const catalogGroups = GROUP_ORDER.map((groupName) => ({
  name: groupName,
  entries: catalog.filter((entry) => entry.group === groupName),
})).filter((group) => group.entries.length > 0);
