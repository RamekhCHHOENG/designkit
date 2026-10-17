// Block metadata: plain data with no bundler-specific imports, so both the docs
// site and the registry build script (plain Node) can read it.

export type BlockCategory = "dashboard" | "sidebar" | "login" | "signup" | "otp" | "calendar" | "products"

export interface BlockEntry {
  name: string
  description: string
  categories: BlockCategory[]
  featured?: boolean
  /** Minimum preview height in px; the preview grows to fit its content. */
  height?: number
}

export const blockCategories: { slug: "featured" | BlockCategory; label: string }[] = [
  { slug: "featured", label: "Featured" },
  { slug: "sidebar", label: "Sidebar" },
  { slug: "login", label: "Login" },
  { slug: "signup", label: "Signup" },
  { slug: "otp", label: "OTP" },
  { slug: "calendar", label: "Calendar" },
  { slug: "dashboard", label: "Dashboard" },
  { slug: "products", label: "Products" },
]

const sidebarDescriptions: Record<number, string> = {
  1: "A simple sidebar with navigation grouped by section.",
  2: "A sidebar with collapsible sections.",
  3: "A sidebar with submenus.",
  4: "A floating sidebar with submenus.",
  5: "A sidebar with collapsible submenus.",
  6: "A sidebar with submenus as dropdowns.",
  7: "A sidebar that collapses to icons.",
  8: "An inset sidebar with secondary navigation.",
  9: "Collapsible nested sidebars.",
  10: "A sidebar in a popover.",
  11: "A sidebar with a collapsible file tree.",
  12: "A sidebar with a calendar.",
  13: "A sidebar in a dialog.",
  14: "A sidebar on the right.",
  15: "A left and right sidebar.",
  16: "A sidebar with a sticky site header.",
}

const pad = (n: number) => String(n).padStart(2, "0")

const calendarDescriptions = [
  "A simple calendar.",
  "Multiple months with single selection.",
  "Multiple months with multiple selection.",
  "Single month with range selection.",
  "Multiple months with range selection.",
  "Range selection with minimum days.",
  "Range selection with a maximum number of days.",
  "Calendar with disabled days.",
  "Calendar with disabled weekends.",
  "Today button.",
  "Start and end of month.",
  "Localized calendar.",
  "With month and year dropdown.",
  "With booked / unavailable days.",
  "With week numbers.",
  "With time picker.",
  "With inline time picker.",
  "Variable size.",
  "With presets.",
  "With time presets.",
  "Custom days and formatters.",
  "Date picker.",
  "Date range picker.",
  "Date and time picker.",
  "Date and time range picker.",
  "Date range picker with time.",
  "Chart filter.",
  "Input with date picker.",
  "Natural language date picker.",
  "Compact range formatting.",
  "With event slots.",
  "Date picker in a drawer.",
]


export const blocks: BlockEntry[] = [
  {
    name: "dashboard-01",
    description: "A dashboard with sidebar, charts and data table.",
    categories: ["dashboard"],
    featured: true,
    height: 900,
  },
  { name: "sidebar-07", description: sidebarDescriptions[7]!, categories: ["sidebar"], featured: true, height: 800 },
  { name: "sidebar-03", description: sidebarDescriptions[3]!, categories: ["sidebar"], featured: true, height: 800 },
  { name: "login-03", description: "A login page with a muted background color.", categories: ["login"], featured: true },
  { name: "login-04", description: "A login page with form and image.", categories: ["login"], featured: true },
  ...Object.entries(sidebarDescriptions)
    .filter(([n]) => n !== "3" && n !== "7")
    .map(([n, description]) => ({
      name: `sidebar-${pad(Number(n))}`,
      description,
      categories: ["sidebar"] as BlockCategory[],
      height: n === "13" ? 700 : 800,
    })),
  { name: "login-01", description: "A simple login form.", categories: ["login"] },
  { name: "login-02", description: "A two column login page with a cover image.", categories: ["login"] },
  { name: "login-05", description: "A simple email-only login page.", categories: ["login"] },
  { name: "signup-01", description: "A simple signup form.", categories: ["signup"] },
  { name: "signup-02", description: "A two column signup page with a cover image.", categories: ["signup"] },
  { name: "signup-03", description: "A signup page with a muted background color.", categories: ["signup"] },
  { name: "signup-04", description: "A signup page with form and image.", categories: ["signup"] },
  { name: "signup-05", description: "A simple signup form with social providers.", categories: ["signup"] },
  { name: "otp-01", description: "A simple OTP verification form.", categories: ["otp"] },
  { name: "otp-02", description: "An OTP form with large, spaced slots.", categories: ["otp"] },
  { name: "otp-03", description: "An OTP page with a muted background color.", categories: ["otp"] },
  { name: "otp-04", description: "An OTP page with form and image.", categories: ["otp"] },
  { name: "otp-05", description: "A minimal OTP form with separated slots.", categories: ["otp"] },
  ...calendarDescriptions.map((description, i) => ({
    name: `calendar-${pad(i + 1)}`,
    description,
    categories: ["calendar"] as BlockCategory[],
    height: i + 1 === 20 || i + 1 === 31 ? 700 : 600,
  })),
  {
    name: "products-01",
    description: "A table of products with tabs, filters and pagination.",
    categories: ["products"],
    height: 600,
  },
]
