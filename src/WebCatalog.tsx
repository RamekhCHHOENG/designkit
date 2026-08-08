import { useId, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import {
  Badge as DesignKitBadge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DataTable,
  Drawer,
  Input,
  type BadgeTone,
  type ButtonProps,
  type CardVariant,
  type DataTableColumn,
} from "./lib";
import "./lib/styles/designkit.css";
import "./WebCatalog.css";

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

export type WebComponentName = typeof webComponentNames[number];
export type WebStoryKind = "default" | "variants" | "sizes" | "colors" | "states";

export function WebButton({ type = "button", ...props }: ButtonProps) {
  return <Button type={type} {...props} />;
}

function StoryRow({ children }: { children: ReactNode }) {
  return <div className="web-story-row">{children}</div>;
}

function StoryStack({ children }: { children: ReactNode }) {
  return <div className="web-story-stack">{children}</div>;
}

function StoryLabel({ children }: { children: ReactNode }) {
  return <span className="web-story-label">{children}</span>;
}

function StoryFeedback({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return <span className="web-story-feedback" role="status">{children}</span>;
}

function Badge({ tone = "neutral", children }: { tone?: BadgeTone; children: ReactNode }) {
  return <DesignKitBadge tone={tone}>{children}</DesignKitBadge>;
}

type CatalogRow = { id: number; name: string; type: string; status: "Ready" | "Review"; updated: string };
const catalogColumns: DataTableColumn<CatalogRow>[] = [
  { key: "name", header: "Component", sortable: true },
  { key: "type", header: "Category", sortable: true },
  { key: "status", header: "Status", sortable: true, render: (row) => <Badge tone={row.status === "Ready" ? "green" : "amber"}>{row.status}</Badge> },
  { key: "updated", header: "Updated", sortable: true, align: "right" },
];
const catalogRows: CatalogRow[] = [
  { id: 1, name: "Button", type: "Action", status: "Ready", updated: "Today" },
  { id: 2, name: "Combobox", type: "Form", status: "Review", updated: "Today" },
  { id: 3, name: "Data Table", type: "Data", status: "Ready", updated: "Yesterday" },
  { id: 4, name: "Drawer", type: "Overlay", status: "Ready", updated: "Yesterday" },
  { id: 5, name: "Toast", type: "Feedback", status: "Ready", updated: "Jul 16" },
  { id: 6, name: "Tabs", type: "Navigation", status: "Ready", updated: "Jul 15" },
];

function WebDrawerStory({ variants = false }: { variants?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StoryRow>
        <WebButton onClick={() => setOpen(true)}>Open {variants ? "settings" : "drawer"}</WebButton>
        {variants && <WebButton variant="outline" onClick={() => setOpen(true)}>Open profile</WebButton>}
      </StoryRow>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title={variants ? "Workspace settings" : "Edit profile"}
        description="Make changes without leaving the current page."
        footer={<><WebButton variant="outline" onClick={() => setOpen(false)}>Cancel</WebButton><WebButton color="blue" onClick={() => setOpen(false)}>Save changes</WebButton></>}
      >
        <StoryStack>
          <label className="web-field"><span>Display name</span><input defaultValue="Taylor Kim" /></label>
          <label className="web-field"><span>Email</span><input type="email" defaultValue="taylor@example.com" /></label>
          <label className="web-field"><span>Role</span><select defaultValue="designer"><option value="designer">Designer</option><option value="developer">Developer</option></select></label>
        </StoryStack>
      </Drawer>
    </>
  );
}

function ButtonStory({ story }: { story: WebStoryKind }) {
  if (story === "sizes") return <StoryRow><WebButton size="small" color="blue">Small</WebButton><WebButton size="medium" color="blue">Medium</WebButton><WebButton size="large" color="blue">Large</WebButton><WebButton size="icon" color="blue" aria-label="Add item">＋</WebButton></StoryRow>;
  if (story === "colors") return <StoryRow><WebButton color="neutral">Neutral</WebButton><WebButton color="blue">Blue</WebButton><WebButton color="green">Green</WebButton><WebButton color="violet">Violet</WebButton><WebButton variant="destructive">Destructive</WebButton></StoryRow>;
  if (story === "states") return <StoryRow><WebButton color="blue">Default</WebButton><WebButton color="blue" loading>Loading</WebButton><WebButton color="blue" disabled>Disabled</WebButton><WebButton variant="outline">With icon <span aria-hidden="true">→</span></WebButton></StoryRow>;
  return <StoryRow><WebButton color="blue">Primary</WebButton><WebButton variant="secondary">Secondary</WebButton><WebButton variant="outline">Outline</WebButton><WebButton variant="ghost">Ghost</WebButton><WebButton variant="destructive">Delete</WebButton></StoryRow>;
}

function DisclosureItem({ title, children, defaultExpanded = false }: { title: string; children: ReactNode; defaultExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return <details open={expanded} onToggle={(event) => setExpanded(event.currentTarget.open)}><summary>{title}<span aria-hidden="true">＋</span></summary><p>{children}</p></details>;
}

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function WebCatalogPreview({ name, story = "default" }: { name: WebComponentName; story?: WebStoryKind }) {
  const variants = story === "variants";
  const reactId = useId();
  const instanceId = `web-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${reactId.replace(/:/g, "")}`;
  const [open, setOpen] = useState(variants);
  const [active, setActive] = useState(variants ? 1 : 0);
  const [count, setCount] = useState(2);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState(64);
  const [feedback, setFeedback] = useState("");
  const [monthOffset, setMonthOffset] = useState(variants ? 1 : 0);
  const [selectedDate, setSelectedDate] = useState(variants ? "2026-08-18" : "2026-07-16");
  const [resizeWidth, setResizeWidth] = useState(variants ? 38 : 30);
  const [switchStates, setSwitchStates] = useState([true, false, false]);
  const [dismissed, setDismissed] = useState<Set<string>>(() => new Set());
  const [otpValues, setOtpValues] = useState(() => Array.from({ length: 6 }, (_, index) => variants && index < 3 ? String(index + 2) : ""));

  const dismiss = (key: string) => setDismissed((current) => new Set([...current, key]));
  const resetDismissed = () => setDismissed(new Set());
  const announce = (message: string) => setFeedback(message);

  if (name === "Button") return <ButtonStory story={story} />;
  if (name === "Data Table") return <DataTable caption="Component inventory" columns={catalogColumns} data={catalogRows} pageSize={variants ? 3 : 4} selectable />;
  if (name === "Drawer") return <WebDrawerStory variants={variants} />;

  if (name === "Accordion" || name === "Collapsible") {
    const items = variants ? ["Account settings", "Team permissions", "Billing details"] : name === "Collapsible" ? ["Project details"] : ["Is it accessible?", "Can I customize it?"];
    return <div className="web-accordion">{items.map((item, index) => <DisclosureItem title={item} defaultExpanded={index === 0} key={item}>{index === 0 ? "Yes. It uses semantic HTML and supports keyboard navigation." : "Use design tokens to adapt spacing, color, and typography."}</DisclosureItem>)}</div>;
  }

  if (name === "Alert" || name === "Notification") {
    const tones = variants ? ["blue", "green", "amber", "red"] : ["blue"];
    return <StoryStack>{tones.map((tone) => <div className="web-alert" data-tone={tone} role={tone === "red" ? "alert" : "status"} key={tone}><span aria-hidden="true">{tone === "green" ? "✓" : tone === "amber" ? "!" : tone === "red" ? "×" : "i"}</span><div><strong>{tone === "green" ? "Changes saved" : tone === "amber" ? "Review required" : tone === "red" ? "Something went wrong" : "New version available"}</strong><p>You can continue working while this update is applied.</p></div></div>)}</StoryStack>;
  }

  if (name === "Alert Dialog" || name === "Dialog" || name === "File Dialog") {
    const titleId = `${instanceId}-dialog-title`;
    return <div className="web-dialog-story">
      {!open && <><WebButton color="blue" onClick={() => setOpen(true)}>Open {name.toLowerCase()}</WebButton><StoryFeedback>{feedback}</StoryFeedback></>}
      {open && <section className="web-dialog-card" role={name === "Alert Dialog" ? "alertdialog" : "dialog"} aria-labelledby={titleId}>
        <header><span className="web-dialog-icon" aria-hidden="true">{name === "File Dialog" ? "⇩" : "?"}</span><div><strong id={titleId}>{name === "File Dialog" ? "Export project" : variants ? "Delete workspace?" : "Save your changes?"}</strong><p>{variants ? "This action cannot be undone." : "Your updates will be visible to everyone in this workspace."}</p></div></header>
        <footer><WebButton variant="outline" onClick={() => setOpen(false)}>Cancel</WebButton><WebButton variant={variants ? "destructive" : "primary"} color="blue" onClick={() => { setOpen(false); announce(name === "File Dialog" ? "Export started." : variants ? "Workspace deleted." : "Changes saved."); }}>{name === "File Dialog" ? "Export" : variants ? "Delete" : "Save"}</WebButton></footer>
      </section>}
    </div>;
  }

  if (name === "Aspect Ratio") return <StoryRow>{(variants ? ["1 / 1", "4 / 3", "16 / 9"] : ["16 / 9"]).map((ratio) => <div className="web-ratio" style={{ aspectRatio: ratio }} role="img" aria-label={`${ratio.replace(" / ", " by ")} media placeholder`} key={ratio}><span>{ratio.replace(" / ", ":")}</span></div>)}</StoryRow>;

  if (name === "Attachment") {
    const files = variants ? ["Product-brief.pdf", "Research-notes.docx", "Dashboard.png"] : ["Product-brief.pdf"];
    const visibleFiles = files.filter((file) => !dismissed.has(file));
    return <StoryStack>{visibleFiles.map((file, index) => <div className="web-attachment" key={file}><span aria-hidden="true">{file.split(".").pop()?.toUpperCase()}</span><div><strong>{file}</strong><small>{index + 1}.8 MB · Uploaded</small></div><button type="button" aria-label={`Remove ${file}`} onClick={() => dismiss(file)}>×</button></div>)}{!visibleFiles.length && <div className="web-inline-empty" role="status"><span>All attachments removed.</span><button type="button" onClick={resetDismissed}>Undo</button></div>}</StoryStack>;
  }

  if (name === "Avatar") return <StoryRow>{(variants ? [["AK", "small"], ["RT", "medium"], ["JS", "large"], ["+4", "large"]] : [["AK", "medium"]]).map(([initials, size]) => <span className="web-avatar" data-size={size} role="img" aria-label={initials.startsWith("+") ? `${initials.slice(1)} more people` : `Avatar for ${initials}`} key={initials}>{initials}</span>)}</StoryRow>;
  if (name === "Badge") return <StoryRow>{(variants ? ["neutral", "blue", "green", "amber", "red", "violet"] : ["blue"]).map((tone) => <Badge tone={tone as BadgeTone} key={tone}>{tone === "neutral" ? "Draft" : tone === "green" ? "Active" : tone === "amber" ? "Pending" : tone === "red" ? "Blocked" : tone === "violet" ? "Beta" : "New"}</Badge>)}</StoryRow>;
  if (name === "Breadcrumb") return <nav className="web-breadcrumb" aria-label="Breadcrumb"><a href="#overview">Home</a><span aria-hidden="true">/</span>{variants ? <><button type="button" className="web-breadcrumb-ellipsis" aria-label="Show hidden path segments" onClick={() => announce("Hidden segments: Docs, Components.")}>…</button><span aria-hidden="true">/</span><a href="#overview">Navigation</a><span aria-hidden="true">/</span></> : <><a href="#overview">Components</a><span aria-hidden="true">/</span><a href="#overview">Navigation</a><span aria-hidden="true">/</span></>}<strong aria-current="page">Breadcrumb</strong><StoryFeedback>{feedback}</StoryFeedback></nav>;

  if (name === "Bubble" || name === "Message") return <div className="web-chat"><div><span className="web-avatar" data-size="small" role="img" aria-label="DesignKit assistant">AI</span><p>How can I help with your component library?</p></div><div className="mine"><p>{variants ? "Show me every available state." : "Document the web components for our team."}</p></div>{variants && <div><span className="web-avatar" data-size="small" role="img" aria-label="DesignKit assistant">AI</span><p>Done — each story now includes responsive web variants.</p></div>}</div>;

  if (name === "Button Group" || name === "Toggle Group") {
    const items = variants ? ["Day", "Week", "Month", "Year"] : ["List", "Grid", "Board"];
    return <div className="web-button-group" role="group" aria-label={name}>{items.map((item, index) => <button type="button" className={active === index ? "active" : ""} aria-pressed={active === index} onClick={() => setActive(index)} key={item}>{item}</button>)}</div>;
  }

  if (name === "Calendar") {
    const monthDate = new Date(2026, 6 + monthOffset, 1);
    const monthLabel = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(monthDate);
    const firstWeekday = monthDate.getDay();
    const dateLabel = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    return <div className="web-calendar"><header><button type="button" aria-label="Previous month" onClick={() => setMonthOffset((value) => value - 1)}>‹</button><strong aria-live="polite">{monthLabel}</strong><button type="button" aria-label="Next month" onClick={() => setMonthOffset((value) => value + 1)}>›</button></header><div role="grid" aria-label={monthLabel}>{weekDays.map((day) => <small aria-hidden="true" key={day}>{day}</small>)}{Array.from({ length: 35 }, (_, index) => { const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), index - firstWeekday + 1); const outsideMonth = date.getMonth() !== monthDate.getMonth(); const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; const isSelected = selectedDate === dateKey; return <button type="button" data-outside={outsideMonth || undefined} aria-label={dateLabel.format(date)} aria-pressed={isSelected} className={isSelected ? "active" : ""} onClick={() => setSelectedDate(dateKey)} key={dateKey}>{date.getDate()}</button>; })}</div></div>;
  }

  if (name === "Card") return <StoryRow>{(variants ? ["Default", "Interactive", "Elevated"] : ["Default"]).map((type) => <Card className="web-card" variant={type.toLowerCase() as CardVariant} key={type}><CardHeader><Badge tone="violet">{type}</Badge><CardTitle>Analytics workspace</CardTitle><CardDescription>Keep metrics, reports, and team decisions in one shared place.</CardDescription></CardHeader><CardFooter><a href="#button">Explore workspace →</a></CardFooter></Card>)}</StoryRow>;

  if (name === "Carousel") {
    const items = variants ? ["Research", "Design", "Build"] : ["Design", "Build"];
    const carouselIndex = active % items.length;
    return <div className="web-carousel" aria-roledescription="carousel" aria-label="Product workflow"><div>{items.map((item, index) => <article data-active={index === carouselIndex || undefined} aria-current={index === carouselIndex ? "true" : undefined} key={item}><small>0{index + 1}</small><strong>{item}</strong><p>A focused step in the product workflow.</p></article>)}</div><footer><button type="button" aria-label="Previous slide" onClick={() => setActive((value) => (value - 1 + items.length) % items.length)}>←</button><span aria-live="polite">{carouselIndex + 1} / {items.length}</span><button type="button" aria-label="Next slide" onClick={() => setActive((value) => (value + 1) % items.length)}>→</button></footer></div>;
  }

  if (name === "Chart") return <figure className="web-chart" aria-label={`${variants ? "24,892" : "12,480"} weekly visitors, up 12.4 percent`}><figcaption><span>Weekly visitors</span><strong>{variants ? "24,892" : "12,480"}</strong><small>+12.4%</small></figcaption><div aria-hidden="true">{[48, 72, 56, 88, 68, 94, 78].map((height, index) => <i style={{ height: `${variants ? Math.max(25, height - index * 3) : height}%` }} key={index} />)}</div></figure>;
  if (name === "Checkbox") return <StoryStack>{(variants ? ["Send weekly report", "Include team activity", "Archive after export"] : ["Send weekly report"]).map((label, index) => <label className="web-check" key={label}><input type="checkbox" defaultChecked={index === 0} disabled={variants && index === 2} /><span>{label}</span></label>)}</StoryStack>;

  if (name === "Combobox" || name === "Select" || name === "Native Select") {
    const datalistId = `${instanceId}-framework-options`;
    return <StoryStack><label className="web-field"><span>{name === "Combobox" ? "Framework" : "Workspace role"}</span>{name === "Combobox" ? <><input list={datalistId} placeholder="Search frameworks…" /><datalist id={datalistId}><option value="React" /><option value="Vue" /><option value="Svelte" /></datalist></> : <select defaultValue="editor"><option value="admin">Administrator</option><option value="editor">Editor</option><option value="viewer">Viewer</option></select>}<small>{variants ? "Choose the option that best matches this member." : "You can update this later."}</small></label>{variants && <label className="web-field"><span>Disabled</span><select disabled><option>Unavailable</option></select></label>}</StoryStack>;
  }

  if (name === "Command") {
    const commands = ["Create project", "Invite member", "Open settings"].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
    return <div className="web-command"><label><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a command…" aria-label="Command search" /></label><small>Suggestions</small>{commands.map((item, index) => <button type="button" onClick={() => announce(`${item} selected.`)} key={item}><span>{item}</span><kbd>⌘{index + 1}</kbd></button>)}{!commands.length && <p className="web-command-empty">No matching commands.</p>}<StoryFeedback>{feedback}</StoryFeedback></div>;
  }

  if (name === "Context Menu" || name === "Dropdown Menu" || name === "Menubar") {
    const triggerLabel = name === "Menubar" ? "File" : "Actions";
    const chooseAction = (action: string) => { announce(`${action} selected.`); setOpen(false); };
    return <div className="web-menu-story"><WebButton variant="outline" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{triggerLabel} <span aria-hidden="true">⌄</span></WebButton>{open && <div className="web-menu" role="menu" aria-label={`${triggerLabel} menu`}><button type="button" role="menuitem" onClick={() => chooseAction("Rename")}>Rename <kbd>↩</kbd></button><button type="button" role="menuitem" onClick={() => chooseAction("Duplicate")}>Duplicate <kbd>⌘D</kbd></button><hr /><button type="button" role="menuitem" onClick={() => chooseAction("Share")}>Share…</button><button type="button" role="menuitem" className="danger" onClick={() => chooseAction("Delete")}>Delete</button></div>}<StoryFeedback>{feedback}</StoryFeedback></div>;
  }

  if (name === "Date Picker" || name === "Date & Time") return variants || name === "Date & Time"
    ? <StoryRow><label className="web-field"><span>Check-in</span><input type="date" defaultValue="2026-07-24" /><small>Rooms are ready from 3:00 PM.</small></label><label className="web-field"><span>Check-out</span><input type="date" defaultValue="2026-07-28" /><small>Late checkout on request.</small></label>{name === "Date & Time" && <label className="web-field"><span>Arrival time</span><input type="time" defaultValue="15:30" /></label>}</StoryRow>
    : <label className="web-field"><span>Departure date</span><input type="date" defaultValue="2026-08-02" /><small>Flights are refundable up to 24 hours before departure.</small></label>;
  if (name === "Direction") return <div className="web-direction" dir={variants ? "rtl" : "ltr"}><Badge tone="blue">{variants ? "RTL" : "LTR"}</Badge><strong>{variants ? "مرحبًا بك" : "Welcome back"}</strong><p>{variants ? "يتكيف التخطيط مع اتجاه المحتوى." : "The layout follows the direction of its content."}</p></div>;
  if (name === "Empty") return <div className="web-empty"><span aria-hidden="true">⌕</span><strong>{feedback || (variants ? "No projects yet" : "No results found")}</strong><p>{feedback ? "The empty state action completed successfully." : variants ? "Create your first project to get started." : "Try adjusting your search or filters."}</p><WebButton color="blue" onClick={() => announce(variants ? "Project created" : "Filters cleared")}>{feedback ? "Reset example" : variants ? "Create project" : "Clear filters"}</WebButton></div>;

  if (["Field", "Input", "Label", "Textarea", "Form"].includes(name)) return <form className="web-form" onSubmit={(event) => { event.preventDefault(); announce("Workspace created successfully."); }}>{name === "Textarea" ? <label className="web-field"><span>Message</span><textarea rows={4} placeholder="Write your message…" /><small>Share the details your team needs.</small></label> : <Input type="email" label="Email address" placeholder="name@example.com" description={variants ? undefined : "We will never share your email."} error={variants ? "Enter a valid email address." : undefined} />}{(variants || name === "Form") && <Input label="Workspace name" defaultValue="Acme Studio" />}{name === "Form" && <WebButton type="submit" color="blue">Create workspace</WebButton>}<StoryFeedback>{feedback}</StoryFeedback></form>;

  if (name === "Input Group") {
    const inputId = `${instanceId}-url`;
    return <StoryStack><div className="web-input-group" role="group" aria-labelledby={`${inputId}-label`}><label className="web-visually-hidden" id={`${inputId}-label`} htmlFor={inputId}>Website URL</label><span aria-hidden="true">https://</span><input id={inputId} placeholder="example.com" /><button type="button" onClick={() => announce("URL copied.")}>Copy</button></div>{variants && <div className="web-input-group" role="group"><span aria-hidden="true">@</span><input aria-label="Username" placeholder="username" /><kbd>⌘K</kbd></div>}<StoryFeedback>{feedback}</StoryFeedback></StoryStack>;
  }

  if (name === "Input OTP") return <div className="web-otp" role="group" aria-label="One-time passcode">{otpValues.map((value, index) => <input aria-label={`Digit ${index + 1}`} inputMode="numeric" pattern="[0-9]*" maxLength={1} value={value} onChange={(event) => { const nextValue = event.target.value.replace(/\D/g, "").slice(-1); setOtpValues((current) => current.map((item, itemIndex) => itemIndex === index ? nextValue : item)); if (nextValue && event.currentTarget.nextElementSibling instanceof HTMLInputElement) event.currentTarget.nextElementSibling.focus(); }} onKeyDown={(event) => { if (event.key === "Backspace" && !value && event.currentTarget.previousElementSibling instanceof HTMLInputElement) event.currentTarget.previousElementSibling.focus(); }} key={index} />)}</div>;

  if (name === "Hover Card") {
    const cardId = `${instanceId}-hover-card`;
    return <div className="web-hover-demo">
      <p className="web-hover-context">Shipped the component gallery today —&nbsp;
        <span className={`web-hover-card ${variants ? "open" : ""}`}>
          <button type="button" aria-expanded={variants} aria-controls={cardId}>@designkit</button>
          <article id={cardId}>
            <header><span className="web-avatar" data-size="medium" role="img" aria-label="DesignKit avatar">DK</span><div><strong>DesignKit UI</strong><small>@designkit</small></div><WebButton size="small" variant="outline" onClick={() => announce("Following @designkit.")}>Follow</WebButton></header>
            <p>Apple-inspired React components, documented with practical product examples.</p>
            <footer><span><b>356</b> examples</span><span><b>4.2k</b> followers</span><span>Joined Dec 2024</span></footer>
          </article>
        </span>
        &nbsp;now covers every base component. {variants ? "Hover state shown." : "Hover the handle to preview the profile."}</p>
      <StoryFeedback>{feedback}</StoryFeedback>
    </div>;
  }

  if (name === "Item") {
    const items = variants ? ["Profile settings", "Team members", "Billing & plans"] : ["Profile settings"];
    return <div className="web-list">{items.map((item, index) => <button type="button" className={active === index ? "active" : ""} onClick={() => { setActive(index); announce(`${item} opened.`); }} key={item}><span className="web-list-icon" aria-hidden="true">{["◉", "♙", "◇"][index]}</span><span><strong>{item}</strong><small>{index ? "Manage workspace access" : "Update your public details"}</small></span><b aria-hidden="true">→</b></button>)}<StoryFeedback>{feedback}</StoryFeedback></div>;
  }

  if (name === "Kbd") {
    const shortcuts = variants
      ? [["Command palette", ["⌘", "K"]], ["Save changes", ["⌘", "S"]], ["Undo", ["⌘", "Z"]], ["Redo", ["⇧", "⌘", "Z"]], ["Toggle sidebar", ["⌘", "\\"]]] as const
      : [["Search", ["⌘", "K"]], ["Copy", ["⌘", "C"]], ["Paste", ["⌘", "V"]]] as const;
    return <div className="web-kbd-list" role="list" aria-label="Keyboard shortcuts">{shortcuts.map(([label, keys]) => <span className="web-kbd-item" role="listitem" key={label}><StoryLabel>{label}</StoryLabel><span>{keys.map((key, index) => <kbd key={index}>{key}</kbd>)}</span></span>)}</div>;
  }
  if (name === "Marker") return <div className="web-timeline">{(variants ? ["Project created", "Design approved", "Release published"] : ["Design system updated", "Review requested"]).map((item, index) => <div key={item}><i aria-hidden="true" /><span><strong>{item}</strong><small>{index === 0 ? "Today at 9:30" : `${index + 1} days ago`}</small></span></div>)}</div>;
  if (name === "Message Scroller" || name === "Scroll Area") return <div className="web-scroll-area" tabIndex={0} role="region" aria-label={name}>{Array.from({ length: variants ? 8 : 5 }, (_, index) => <div key={index}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{name === "Message Scroller" ? `Message ${index + 1}` : `Component ${index + 1}`}</strong><small>Reusable web interface pattern</small></p></div>)}</div>;

  if (name === "Navigation Menu" || name === "Navigation Bar") {
    const route = name === "Navigation Menu" ? "#navigation-menu" : "#navigation-bar";
    const links = ["Products", "Components", "Pricing", "Docs"];
    return <nav className="web-navigation" aria-label={`${name} example`}>
      <a className="brand" href={route} onClick={(event) => event.preventDefault()}>DesignKit</a>
      {links.map((item, index) => <a className={active === index ? "active" : ""} href={route} aria-current={active === index ? "page" : undefined} onClick={(event) => { event.preventDefault(); setActive(index); }} key={item}>{item}{variants && item === "Components" && <em className="web-nav-badge">New</em>}</a>)}
      <span />
      <a className="web-nav-signin" href={route} onClick={(event) => { event.preventDefault(); announce("Opening sign in."); }}>Sign in</a>
      <WebButton size="small" color="blue" onClick={() => announce("Welcome to DesignKit.")}>Get started</WebButton>
      <StoryFeedback>{feedback}</StoryFeedback>
    </nav>;
  }

  if (name === "Pagination" || name === "Page Indicator") return <nav className={name === "Pagination" ? "web-pagination" : "web-page-indicator"} aria-label={name}>{name === "Pagination" ? <><button type="button" aria-label="Previous page" disabled={active === 0} onClick={() => setActive((value) => Math.max(0, value - 1))}>←</button>{[1, 2, 3, 4, 5].map((page) => <button type="button" aria-current={active + 1 === page ? "page" : undefined} className={active + 1 === page ? "active" : ""} onClick={() => setActive(page - 1)} key={page}>{page}</button>)}<button type="button" aria-label="Next page" disabled={active === 4} onClick={() => setActive((value) => Math.min(4, value + 1))}>→</button></> : [0, 1, 2, 3, 4].map((page) => <button type="button" aria-label={`Page ${page + 1}`} aria-current={active === page ? "step" : undefined} className={active === page ? "active" : ""} onClick={() => setActive(page)} key={page} />)}</nav>;

  if (name === "Popover" || name === "Sheet") {
    const isSheet = name === "Sheet";
    return <div className="web-popover-story">
      <WebButton variant="outline" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Open"} {name.toLowerCase()}</WebButton>
      {open && <aside className={isSheet ? "sheet" : ""} role="dialog" aria-label={isSheet ? "Share document" : "Dimensions"}>
        <strong>{isSheet ? "Share “Q3 launch plan”" : "Dimensions"}</strong>
        <p>{isSheet ? "Invite people to collaborate or copy a public link." : "Adjust the size of the selected frame."}</p>
        {isSheet ? <>
          <div className="web-popover-inline"><label className="web-field"><span>Email</span><input type="email" defaultValue="taylor@example.com" /></label><label className="web-field"><span>Role</span><select defaultValue="editor"><option value="viewer">Can view</option><option value="editor">Can edit</option></select></label></div>
          <div className="web-popover-actions"><WebButton size="small" variant="outline" onClick={() => announce("Public link copied.")}>Copy link</WebButton><WebButton size="small" color="blue" onClick={() => { setOpen(false); announce("Invitation sent to taylor@example.com."); }}>Send invite</WebButton></div>
        </> : <>
          <div className="web-popover-grid">
            <label className="web-field"><span>Width</span><input defaultValue="100%" /></label>
            <label className="web-field"><span>Max. width</span><input defaultValue="320px" /></label>
            <label className="web-field"><span>Height</span><input defaultValue="25px" /></label>
            <label className="web-field"><span>Max. height</span><input defaultValue="none" /></label>
          </div>
          <div className="web-popover-actions"><WebButton size="small" color="blue" onClick={() => { setOpen(false); announce("Dimensions applied to the selected frame."); }}>Apply</WebButton></div>
        </>}
      </aside>}
      <StoryFeedback>{feedback}</StoryFeedback>
    </div>;
  }

  if (name === "Progress") return <StoryStack>{(variants ? [24, 58, 86] : [64]).map((value) => <div className="web-progress" role="progressbar" aria-label="Uploading files" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} key={value}><span><small>Uploading files</small><b>{value}%</b></span><i aria-hidden="true"><b style={{ width: `${value}%` }} /></i></div>)}</StoryStack>;
  if (name === "Radio Group") return <fieldset className="web-radio"><legend>Notification frequency</legend>{["Immediately", "Daily summary", "Never"].map((item, index) => <label key={item}><input type="radio" name={`${instanceId}-frequency`} defaultChecked={index === (variants ? 1 : 0)} /><span>{item}</span></label>)}</fieldset>;

  if (name === "Resizable") return <div className="web-resizable"><aside style={{ width: `${resizeWidth}%` }}>Navigation</aside><input className="web-resize-handle" type="range" min="20" max="70" value={resizeWidth} onChange={(event) => setResizeWidth(Number(event.target.value))} aria-label="Resize navigation panel" /><section role="region" aria-label="Content canvas">Content canvas</section></div>;
  if (name === "Separator") {
    if (variants) return <div className="web-separator-demo web-separator-demo--stack">
      {[["Appearance", "Match system light and dark mode"], ["Notifications", "Daily digest at 9:00 AM"], ["Language", "English (United States)"]].map(([title, detail], index) => <div key={title}>
        {index > 0 && <hr aria-orientation="horizontal" />}
        <div className="web-separator-setting"><div><strong>{title}</strong><small>{detail}</small></div><b aria-hidden="true">›</b></div>
      </div>)}
      <div className="web-separator-label" role="separator" aria-label="or continue with"><hr /><span>or continue with</span><hr /></div>
      <StoryRow><WebButton variant="outline"> Continue with Apple</WebButton><WebButton variant="outline">Continue with Google</WebButton></StoryRow>
    </div>;
    return <div className="web-separator-demo">
      <div className="web-separator-intro"><strong>DesignKit Primitives</strong><p>An Apple-inspired component library for product teams.</p></div>
      <hr aria-orientation="horizontal" />
      <nav aria-label="Project resources">
        <a href="#separator" onClick={(event) => event.preventDefault()}>Blog</a><i aria-hidden="true" />
        <a href="#separator" onClick={(event) => event.preventDefault()}>Docs</a><i aria-hidden="true" />
        <a href="#separator" onClick={(event) => event.preventDefault()}>Source</a><i aria-hidden="true" />
        <a href="#separator" onClick={(event) => event.preventDefault()}>Releases</a>
      </nav>
    </div>;
  }

  if (name === "Sidebar") {
    const items = ["Overview", "Projects", "Analytics", "Settings"];
    return <div className="web-app-shell"><aside aria-label="Workspace navigation"><strong>Workspace</strong>{items.map((item, index) => <button type="button" className={index === active ? "active" : ""} aria-current={index === active ? "page" : undefined} onClick={() => setActive(index)} key={item}>{item}</button>)}</aside><section role="region" aria-live="polite"><small>Dashboard</small><strong>{items[active]}</strong><div /></section></div>;
  }

  if (name === "Skeleton") return <StoryStack>{Array.from({ length: variants ? 3 : 1 }, (_, index) => <div className="web-skeleton" role="status" aria-label="Loading content" key={index}><i /><div><b /><span /><span /></div></div>)}</StoryStack>;
  if (name === "Slider") return <StoryStack><label className="web-slider"><span>Volume <b>{range}%</b></span><input type="range" value={range} onChange={(event) => setRange(Number(event.target.value))} /></label>{variants && <label className="web-slider"><span>Disabled <b>40%</b></span><input type="range" value="40" disabled readOnly /></label>}</StoryStack>;

  if (name === "Sonner" || name === "Toast") {
    const toastItems = variants ? [{ key: "success", tone: "green", title: "Changes saved", message: "Your profile was updated successfully." }, { key: "error", tone: "red", title: "Upload failed", message: "Check your connection and try again." }] : [{ key: "update", tone: "neutral", title: "Update available", message: "Refresh when you are ready to update." }];
    const visibleToasts = toastItems.filter((toast) => !dismissed.has(toast.key));
    return <StoryStack>{visibleToasts.map((toast) => <div className="web-toast" data-tone={toast.tone} role={toast.tone === "red" ? "alert" : "status"} key={toast.key}><span aria-hidden="true">{toast.tone === "green" ? "✓" : toast.tone === "red" ? "!" : "i"}</span><div><strong>{toast.title}</strong><p>{toast.message}</p></div><button type="button" aria-label={`Dismiss ${toast.title}`} onClick={() => dismiss(toast.key)}>×</button></div>)}{!visibleToasts.length && <div className="web-inline-empty" role="status"><span>Notifications dismissed.</span><button type="button" onClick={resetDismissed}>Show again</button></div>}</StoryStack>;
  }

  if (name === "Spinner") return <StoryRow>{["small", "medium", ...(variants ? ["large"] : [])].map((size) => <span className="web-spinner" data-size={size} role="status" aria-label={`${size} loading spinner`} key={size} />)}</StoryRow>;

  if (name === "Switch" || name === "Toggle") {
    const items = variants ? ["Email notifications", "Product updates", "Marketing emails"] : ["Email notifications"];
    return <StoryStack>{items.map((item, index) => <label className="web-switch" key={item}><span><strong>{item}</strong><small>{index === 0 ? "Receive important account activity." : "Optional communication preference."}</small></span><input type="checkbox" checked={switchStates[index]} onChange={(event) => setSwitchStates((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} disabled={variants && index === 2} /><i aria-hidden="true" /></label>)}</StoryStack>;
  }

  if (name === "Table") return <div className="web-simple-table"><table><caption className="web-visually-hidden">Workspace members</caption><thead><tr><th>Member</th><th>Role</th><th>Status</th></tr></thead><tbody>{(variants ? [["Alex Kim", "Admin", "Active"], ["Riley Tran", "Editor", "Pending"], ["Jamie Lee", "Viewer", "Active"]] : [["Alex Kim", "Admin", "Active"], ["Riley Tran", "Editor", "Pending"]]).map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 2 ? <Badge tone={cell === "Active" ? "green" : "amber"}>{cell}</Badge> : cell}</td>)}</tr>)}</tbody></table></div>;

  if (name === "Tabs") {
    const items = ["Overview", "Analytics", "Activity"];
    const activeIndex = Math.min(active, items.length - 1);
    return <div className="web-tabs"><nav role="tablist" aria-label="Workspace sections">{items.map((item, index) => <button id={`${instanceId}-tab-${index}`} type="button" role="tab" aria-selected={activeIndex === index} aria-controls={`${instanceId}-panel`} tabIndex={activeIndex === index ? 0 : -1} className={activeIndex === index ? "active" : ""} onClick={() => setActive(index)} onKeyDown={(event) => { if (event.key === "ArrowRight") setActive((activeIndex + 1) % items.length); if (event.key === "ArrowLeft") setActive((activeIndex - 1 + items.length) % items.length); }} key={item}>{item}</button>)}</nav><section id={`${instanceId}-panel`} role="tabpanel" aria-labelledby={`${instanceId}-tab-${activeIndex}`}><strong>{["Workspace overview", "Performance analytics", "Recent activity"][activeIndex]}</strong><p>{variants ? "This panel updates without navigating away from the current page." : "Organize related content into focused, keyboard-friendly views."}</p></section></div>;
  }

  if (name === "Tooltip") {
    if (variants) return <div className="web-tooltip-showcase">
      <span className="web-tooltip visible"><WebButton size="icon" variant="outline" aria-label="Share project" aria-describedby={`${instanceId}-tip-share`}>↗</WebButton><b id={`${instanceId}-tip-share`} role="tooltip">Share project</b></span>
      <span className="web-tooltip visible" data-side="bottom"><WebButton variant="outline" aria-describedby={`${instanceId}-tip-save`}>Save draft</WebButton><b id={`${instanceId}-tip-save`} role="tooltip">Saves automatically · <kbd>⌘</kbd><kbd>S</kbd></b></span>
    </div>;
    const tools = [["♡", "Add to favorites"], ["↗", "Share project"], ["⧉", "Duplicate"], ["⌫", "Move to trash"]] as const;
    return <div className="web-tooltip-row" role="toolbar" aria-label="Project actions">
      {tools.map(([icon, tip]) => <span className="web-tooltip" key={tip}><WebButton size="icon" variant="outline" aria-label={tip} aria-describedby={`${instanceId}-tip-${tip.replace(/\s+/g, "-")}`}>{icon}</WebButton><b id={`${instanceId}-tip-${tip.replace(/\s+/g, "-")}`} role="tooltip">{tip}</b></span>)}
    </div>;
  }

  if (name === "Typography") return <div className="web-type"><small>Display</small><h1>Build clear interfaces.</h1><h2>Section heading</h2><p>Body text is optimized for comfortable reading across viewport sizes, themes, and content densities.</p><span>Supporting caption · 12px</span></div>;

  if (name === "TipKit") return dismissed.has("tip") ? <div className="web-inline-empty" role="status"><span>Tip dismissed.</span><button type="button" onClick={resetDismissed}>Show tip</button></div> : <div className="web-tip"><span aria-hidden="true">⌘</span><div><strong>{variants ? "Keyboard shortcut" : "Quick tip"}</strong><p>{variants ? "Press Command K anywhere to search components." : "Use focused guidance to explain a new workflow at the moment it becomes useful."}</p><a href="#button">Learn more</a></div><button type="button" aria-label="Dismiss tip" onClick={() => dismiss("tip")}>×</button></div>;

  if (name === "Payment Button") return <StoryStack><StoryRow>{(variants ? ["neutral", "blue", "green"] : ["neutral"]).map((color) => <WebButton size="large" color={color as "neutral" | "blue" | "green"} onClick={() => announce(`${color} payment started.`)} key={color}><span aria-hidden="true">▣</span> Pay securely</WebButton>)}</StoryRow><StoryFeedback>{feedback}</StoryFeedback></StoryStack>;

  if (name === "Icon") return <StoryStack><StoryRow>{["⌕", "＋", "♡", "⚙", "↗", ...(variants ? ["⌫", "✓", "!"] : [])].map((icon, index) => <button type="button" className="web-icon" aria-label={`Example icon ${index + 1}`} onClick={() => announce(`Icon ${index + 1} selected.`)} key={`${icon}-${index}`}>{icon}</button>)}</StoryRow><StoryFeedback>{feedback}</StoryFeedback></StoryStack>;

  if (name === "Stepper") return <div className="web-stepper"><span><strong>{variants ? "Team seats" : "Quantity"}</strong><small>{variants ? "$12 per seat" : "Maximum 10 items"}</small></span><div><button type="button" onClick={() => setCount((value) => Math.max(0, value - 1))} aria-label="Decrease" disabled={count === 0}>−</button><b aria-live="polite">{count}</b><button type="button" onClick={() => setCount((value) => Math.min(10, value + 1))} aria-label="Increase" disabled={count === 10}>＋</button></div></div>;

  return <div className="web-fallback"><Badge tone="green">Web component</Badge><strong>{name}</strong><p>{variants ? "Default, hover, focus, and disabled states are documented." : "A browser-first component built with semantic HTML and responsive CSS."}</p><WebButton variant="outline">Example action</WebButton></div>;
}

export const storyDefinitions: Record<WebStoryKind, { label: string; description: string }> = {
  default: { label: "Default", description: "The recommended starting configuration." },
  variants: { label: "Variants & states", description: "Common visual variants and meaningful interface states." },
  sizes: { label: "Sizes", description: "Small, medium, large, and icon-only button sizes." },
  colors: { label: "Colors", description: "Semantic colors for hierarchy, success, emphasis, and destructive actions." },
  states: { label: "States", description: "Loading, disabled, icon, and interactive button states." },
};

export function createWebStories(name: WebComponentName) {
  const storyKinds: WebStoryKind[] = name === "Button" ? ["default", "sizes", "colors", "states"] : ["default", "variants"];
  return storyKinds.map((story) => ({
    label: storyDefinitions[story].label,
    description: storyDefinitions[story].description,
    code: `<${name.replace(/\s+/g, "")} variant="${story}" />`,
    render: () => <WebCatalogPreview name={name} story={story} />,
  }));
}
