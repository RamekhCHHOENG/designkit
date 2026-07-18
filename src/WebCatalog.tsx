import { useState, type ReactNode } from "react";
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

export function WebButton(props: ButtonProps) {
  return <Button {...props} />;
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

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function WebCatalogPreview({ name, story = "default" }: { name: WebComponentName; story?: WebStoryKind }) {
  const variants = story === "variants";
  const [open, setOpen] = useState(variants);
  const [checked, setChecked] = useState(true);
  const [active, setActive] = useState(variants ? 1 : 0);
  const [count, setCount] = useState(2);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState(64);

  if (name === "Button") return <ButtonStory story={story} />;
  if (name === "Data Table") return <DataTable caption="Component inventory" columns={catalogColumns} data={catalogRows} pageSize={variants ? 3 : 4} selectable />;
  if (name === "Drawer") return <WebDrawerStory variants={variants} />;

  if (name === "Accordion" || name === "Collapsible") return (
    <div className="web-accordion">
      {(variants ? ["Account settings", "Team permissions", "Billing details"] : ["Is it accessible?", "Can I customize it?"]).map((item, index) => (
        <details key={item} open={index === 0}><summary>{item}<span>＋</span></summary><p>{index === 0 ? "Yes. It uses semantic HTML and supports keyboard navigation." : "Use design tokens to adapt spacing, color, and typography."}</p></details>
      ))}
    </div>
  );

  if (name === "Alert" || name === "Notification") return (
    <StoryStack>{(variants ? ["blue", "green", "amber", "red"] : ["blue"]).map((tone) => <div className="web-alert" data-tone={tone} key={tone}><span>{tone === "green" ? "✓" : tone === "amber" ? "!" : tone === "red" ? "×" : "i"}</span><div><strong>{tone === "green" ? "Changes saved" : tone === "amber" ? "Review required" : tone === "red" ? "Something went wrong" : "New version available"}</strong><p>You can continue working while this update is applied.</p></div></div>)}</StoryStack>
  );

  if (name === "Alert Dialog" || name === "Dialog" || name === "File Dialog") return (
    <div className="web-dialog-story">
      {!open && <WebButton color="blue" onClick={() => setOpen(true)}>Open {name.toLowerCase()}</WebButton>}
      {open && <section className="web-dialog-card" role="dialog" aria-label={name}><header><span className="web-dialog-icon">{name === "File Dialog" ? "⇩" : "?"}</span><div><strong>{name === "File Dialog" ? "Export project" : variants ? "Delete workspace?" : "Save your changes?"}</strong><p>{variants ? "This action cannot be undone." : "Your updates will be visible to everyone in this workspace."}</p></div></header><footer><WebButton variant="outline" onClick={() => setOpen(false)}>Cancel</WebButton><WebButton variant={variants ? "destructive" : "primary"} color="blue" onClick={() => setOpen(false)}>{name === "File Dialog" ? "Export" : variants ? "Delete" : "Save"}</WebButton></footer></section>}
    </div>
  );

  if (name === "Aspect Ratio") return <StoryRow>{(variants ? ["1 / 1", "4 / 3", "16 / 9"] : ["16 / 9"]).map((ratio) => <div className="web-ratio" style={{ aspectRatio: ratio }} key={ratio}><span>{ratio.replace(" / ", ":")}</span></div>)}</StoryRow>;
  if (name === "Attachment") return <StoryStack>{(variants ? ["Product-brief.pdf", "Research-notes.docx", "Dashboard.png"] : ["Product-brief.pdf"]).map((file, index) => <div className="web-attachment" key={file}><span>{file.split(".").pop()?.toUpperCase()}</span><div><strong>{file}</strong><small>{index + 1}.8 MB · Uploaded</small></div><button aria-label={`Remove ${file}`}>×</button></div>)}</StoryStack>;
  if (name === "Avatar") return <StoryRow>{(variants ? [["AK", "small"], ["RT", "medium"], ["JS", "large"], ["+4", "large"]] : [["AK", "medium"]]).map(([initials, size]) => <span className="web-avatar" data-size={size} key={initials}>{initials}</span>)}</StoryRow>;
  if (name === "Badge") return <StoryRow>{(variants ? ["neutral", "blue", "green", "amber", "red", "violet"] : ["blue"]).map((tone) => <Badge tone={tone as "neutral" | "blue" | "green" | "amber" | "red" | "violet"} key={tone}>{tone === "neutral" ? "Draft" : tone === "green" ? "Active" : tone === "amber" ? "Pending" : tone === "red" ? "Blocked" : tone === "violet" ? "Beta" : "New"}</Badge>)}</StoryRow>;
  if (name === "Breadcrumb") return <nav className="web-breadcrumb" aria-label="Breadcrumb"><a href="#overview">Home</a><span>/</span>{variants && <><a href="#overview">Components</a><span>/</span></>}<strong>{variants ? "Breadcrumb" : "Settings"}</strong></nav>;

  if (name === "Bubble" || name === "Message") return <div className="web-chat"><div><span className="web-avatar" data-size="small">AI</span><p>How can I help with your component library?</p></div><div className="mine"><p>{variants ? "Show me every available state." : "Document the web components for our team."}</p></div>{variants && <div><span className="web-avatar" data-size="small">AI</span><p>Done — each story now includes responsive web variants.</p></div>}</div>;
  if (name === "Button Group" || name === "Toggle Group") return <div className="web-button-group">{(variants ? ["Day", "Week", "Month", "Year"] : ["List", "Grid", "Board"]).map((item, index) => <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={item}>{item}</button>)}</div>;

  if (name === "Calendar") return <div className="web-calendar"><header><button>‹</button><strong>{variants ? "August 2026" : "July 2026"}</strong><button>›</button></header><div>{weekDays.map((day) => <small key={day}>{day}</small>)}{Array.from({ length: 35 }, (_, index) => <button className={index === (variants ? 18 : 16) ? "active" : ""} key={index}>{(index + 28) % 31 + 1}</button>)}</div></div>;
  if (name === "Card") return <StoryRow>{(variants ? ["Default", "Interactive", "Elevated"] : ["Default"]).map((type) => <Card className="web-card" variant={type.toLowerCase() as CardVariant} key={type}><CardHeader><Badge tone="violet">{type}</Badge><CardTitle>Analytics workspace</CardTitle><CardDescription>Keep metrics, reports, and team decisions in one shared place.</CardDescription></CardHeader><CardFooter><a href="#button">Explore workspace →</a></CardFooter></Card>)}</StoryRow>;
  if (name === "Carousel") return <div className="web-carousel"><div>{(variants ? ["Research", "Design", "Build"] : ["Design", "Build"]).map((item) => <article key={item}><small>0{item.length % 3 + 1}</small><strong>{item}</strong><p>A focused step in the product workflow.</p></article>)}</div><footer><button>←</button><span>1 / {variants ? 3 : 2}</span><button>→</button></footer></div>;
  if (name === "Chart") return <figure className="web-chart"><figcaption><span>Weekly visitors</span><strong>{variants ? "24,892" : "12,480"}</strong><small>+12.4%</small></figcaption><div>{[48, 72, 56, 88, 68, 94, 78].map((height, index) => <i style={{ height: `${variants ? Math.max(25, height - index * 3) : height}%` }} key={index} />)}</div></figure>;

  if (name === "Checkbox") return <StoryStack>{(variants ? ["Send weekly report", "Include team activity", "Archive after export"] : ["Send weekly report"]).map((label, index) => <label className="web-check" key={label}><input type="checkbox" defaultChecked={index === 0} disabled={variants && index === 2} /><span>{label}</span></label>)}</StoryStack>;
  if (name === "Combobox" || name === "Select" || name === "Native Select") return <StoryStack><label className="web-field"><span>{name === "Combobox" ? "Framework" : "Workspace role"}</span>{name === "Combobox" ? <><input list="framework-options" placeholder="Search frameworks…" /><datalist id="framework-options"><option value="React" /><option value="Vue" /><option value="Svelte" /></datalist></> : <select defaultValue="editor"><option value="admin">Administrator</option><option value="editor">Editor</option><option value="viewer">Viewer</option></select>}<small>{variants ? "Choose the option that best matches this member." : "You can update this later."}</small></label>{variants && <label className="web-field"><span>Disabled</span><select disabled><option>Unavailable</option></select></label>}</StoryStack>;
  if (name === "Command") return <div className="web-command"><label>⌕<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a command…" /></label><small>Suggestions</small>{["Create project", "Invite member", "Open settings"].filter((item) => item.toLowerCase().includes(query.toLowerCase())).map((item, index) => <button key={item}><span>{item}</span><kbd>⌘{index + 1}</kbd></button>)}</div>;
  if (name === "Context Menu" || name === "Dropdown Menu" || name === "Menubar") return <div className="web-menu-story"><WebButton variant="outline" onClick={() => setOpen(!open)}>{name === "Menubar" ? "File" : "Actions"} <span aria-hidden="true">⌄</span></WebButton>{open && <menu><button>Rename <kbd>↩</kbd></button><button>Duplicate <kbd>⌘D</kbd></button><hr /><button>Share…</button><button className="danger">Delete</button></menu>}</div>;
  if (name === "Date Picker" || name === "Date & Time") return <StoryRow><label className="web-field"><span>Date</span><input type="date" defaultValue="2026-07-18" /></label>{(variants || name === "Date & Time") && <label className="web-field"><span>Time</span><input type="time" defaultValue="09:30" /></label>}</StoryRow>;
  if (name === "Direction") return <div className="web-direction" dir={variants ? "rtl" : "ltr"}><Badge tone="blue">{variants ? "RTL" : "LTR"}</Badge><strong>{variants ? "مرحبًا بك" : "Welcome back"}</strong><p>{variants ? "يتكيف التخطيط مع اتجاه المحتوى." : "The layout follows the direction of its content."}</p></div>;
  if (name === "Empty") return <div className="web-empty"><span>⌕</span><strong>{variants ? "No projects yet" : "No results found"}</strong><p>{variants ? "Create your first project to get started." : "Try adjusting your search or filters."}</p><WebButton color="blue">{variants ? "Create project" : "Clear filters"}</WebButton></div>;

  if (["Field", "Input", "Label", "Textarea", "Form"].includes(name)) return <form className="web-form" onSubmit={(event) => event.preventDefault()}>{name === "Textarea" ? <label className="web-field"><span>Message</span><textarea rows={4} placeholder="Write your message…" /><small>Share the details your team needs.</small></label> : <Input type="email" label="Email address" placeholder="name@example.com" description={variants ? undefined : "We will never share your email."} error={variants ? "Enter a valid email address." : undefined} />}{(variants || name === "Form") && <Input label="Workspace name" defaultValue="Acme Studio" />}{name === "Form" && <WebButton color="blue">Create workspace</WebButton>}</form>;
  if (name === "Input Group") return <StoryStack><label className="web-input-group"><span>https://</span><input placeholder="example.com" /><button>Copy</button></label>{variants && <label className="web-input-group"><span>@</span><input placeholder="username" /><kbd>⌘K</kbd></label>}</StoryStack>;
  if (name === "Input OTP") return <div className="web-otp">{Array.from({ length: 6 }, (_, index) => <input aria-label={`Digit ${index + 1}`} inputMode="numeric" maxLength={1} defaultValue={variants && index < 3 ? String(index + 2) : ""} key={index} />)}</div>;
  if (name === "Hover Card") return <div className="web-hover-card"><button>@tipkit</button><article><span className="web-avatar">TK</span><div><strong>TipKit UI</strong><p>Accessible React components for modern web products.</p><small>74 components</small></div></article></div>;
  if (name === "Item") return <div className="web-list">{(variants ? ["Profile settings", "Team members", "Billing & plans"] : ["Profile settings"]).map((item, index) => <button key={item}><span className="web-list-icon">{["◉", "♙", "◇"][index]}</span><span><strong>{item}</strong><small>{index ? "Manage workspace access" : "Update your public details"}</small></span><b>→</b></button>)}</div>;
  if (name === "Kbd") return <StoryRow><StoryLabel>Search</StoryLabel><kbd>⌘</kbd><kbd>K</kbd>{variants && <><StoryLabel>Save</StoryLabel><kbd>⌘</kbd><kbd>S</kbd></>}</StoryRow>;
  if (name === "Marker") return <div className="web-timeline">{(variants ? ["Project created", "Design approved", "Release published"] : ["Design system updated", "Review requested"]).map((item, index) => <div key={item}><i /><span><strong>{item}</strong><small>{index === 0 ? "Today at 9:30" : `${index + 1} days ago`}</small></span></div>)}</div>;
  if (name === "Message Scroller" || name === "Scroll Area") return <div className="web-scroll-area" tabIndex={0}>{Array.from({ length: variants ? 8 : 5 }, (_, index) => <div key={index}><span>{String(index + 1).padStart(2, "0")}</span><p><strong>{name === "Message Scroller" ? `Message ${index + 1}` : `Component ${index + 1}`}</strong><small>Reusable web interface pattern</small></p></div>)}</div>;

  if (name === "Navigation Menu" || name === "Navigation Bar") return <nav className="web-navigation"><a className="brand" href="#overview">TipKit</a>{["Products", "Components", "Pricing"].map((item, index) => <a className={active === index ? "active" : ""} href={`#${item.toLowerCase()}`} onClick={() => setActive(index)} key={item}>{item}</a>)}<span /><WebButton size="small" color="blue">Get started</WebButton></nav>;
  if (name === "Pagination" || name === "Page Indicator") return <nav className={name === "Pagination" ? "web-pagination" : "web-page-indicator"} aria-label={name}>{name === "Pagination" ? <><button>←</button>{[1, 2, 3, 4, 5].map((page) => <button className={active + 1 === page ? "active" : ""} onClick={() => setActive(page - 1)} key={page}>{page}</button>)}<button>→</button></> : [0, 1, 2, 3, 4].map((page) => <button aria-label={`Page ${page + 1}`} className={active === page ? "active" : ""} onClick={() => setActive(page)} key={page} />)}</nav>;
  if (name === "Popover" || name === "Sheet") return <div className="web-popover-story"><WebButton variant="outline" onClick={() => setOpen(!open)}>Open {name.toLowerCase()}</WebButton>{open && <aside className={name === "Sheet" ? "sheet" : ""}><strong>{name === "Sheet" ? "Share document" : "Dimensions"}</strong><p>{variants ? "Invite people or copy a public link." : "Adjust the size of the selected frame."}</p><label className="web-field"><span>{name === "Sheet" ? "Email" : "Width"}</span><input defaultValue={name === "Sheet" ? "team@example.com" : "1280"} /></label><WebButton size="small" color="blue">Apply</WebButton></aside>}</div>;
  if (name === "Progress") return <StoryStack>{(variants ? [24, 58, 86] : [64]).map((value) => <div className="web-progress" key={value}><span><small>Uploading files</small><b>{value}%</b></span><i><b style={{ width: `${value}%` }} /></i></div>)}</StoryStack>;
  if (name === "Radio Group") return <fieldset className="web-radio"><legend>Notification frequency</legend>{["Immediately", "Daily summary", "Never"].map((item, index) => <label key={item}><input type="radio" name={`frequency-${story}`} defaultChecked={index === (variants ? 1 : 0)} /><span>{item}</span></label>)}</fieldset>;
  if (name === "Resizable") return <div className="web-resizable"><aside style={{ width: variants ? "38%" : "30%" }}>Navigation</aside><i /><main>Content canvas</main></div>;
  if (name === "Separator") return <div className={variants ? "web-separators" : "web-separator-row"}><span>Overview</span><i /><span>Activity</span>{variants && <><hr /><p>Use separators to organize related content without adding heavy visual weight.</p></>}</div>;
  if (name === "Sidebar") return <div className="web-app-shell"><aside><strong>Workspace</strong>{["Overview", "Projects", "Analytics", "Settings"].map((item, index) => <button className={index === active ? "active" : ""} onClick={() => setActive(index)} key={item}>{item}</button>)}</aside><main><small>Dashboard</small><strong>Welcome back</strong><div /></main></div>;
  if (name === "Skeleton") return <StoryStack>{Array.from({ length: variants ? 3 : 1 }, (_, index) => <div className="web-skeleton" key={index}><i /><div><b /><span /><span /></div></div>)}</StoryStack>;
  if (name === "Slider") return <StoryStack><label className="web-slider"><span>Volume <b>{range}%</b></span><input type="range" value={range} onChange={(event) => setRange(Number(event.target.value))} /></label>{variants && <label className="web-slider"><span>Disabled <b>40%</b></span><input type="range" value="40" disabled readOnly /></label>}</StoryStack>;
  if (name === "Sonner" || name === "Toast") return <StoryStack><div className="web-toast" data-tone={variants ? "green" : "neutral"}><span>{variants ? "✓" : "i"}</span><div><strong>{variants ? "Changes saved" : "Update available"}</strong><p>{variants ? "Your profile was updated successfully." : "Refresh when you are ready to update."}</p></div><button aria-label="Dismiss">×</button></div>{variants && <div className="web-toast" data-tone="red"><span>!</span><div><strong>Upload failed</strong><p>Check your connection and try again.</p></div><button aria-label="Dismiss">×</button></div>}</StoryStack>;
  if (name === "Spinner") return <StoryRow>{["small", "medium", ...(variants ? ["large"] : [])].map((size) => <span className="web-spinner" data-size={size} aria-label={`${size} loading spinner`} key={size} />)}</StoryRow>;
  if (name === "Switch" || name === "Toggle") return <StoryStack>{(variants ? ["Email notifications", "Product updates", "Marketing emails"] : ["Email notifications"]).map((item, index) => <label className="web-switch" key={item}><span><strong>{item}</strong><small>{index === 0 ? "Receive important account activity." : "Optional communication preference."}</small></span><input type="checkbox" checked={index === 0 ? checked : false} onChange={() => index === 0 && setChecked(!checked)} disabled={variants && index === 2} /><i /></label>)}</StoryStack>;
  if (name === "Table") return <div className="web-simple-table"><table><thead><tr><th>Member</th><th>Role</th><th>Status</th></tr></thead><tbody>{(variants ? [["Alex Kim", "Admin", "Active"], ["Riley Tran", "Editor", "Pending"], ["Jamie Lee", "Viewer", "Active"]] : [["Alex Kim", "Admin", "Active"], ["Riley Tran", "Editor", "Pending"]]).map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={cell}>{index === 2 ? <Badge tone={cell === "Active" ? "green" : "amber"}>{cell}</Badge> : cell}</td>)}</tr>)}</tbody></table></div>;
  if (name === "Tabs") return <div className="web-tabs"><nav>{["Overview", "Analytics", "Activity"].map((item, index) => <button className={active === index ? "active" : ""} onClick={() => setActive(index)} key={item}>{item}</button>)}</nav><section><strong>{["Workspace overview", "Performance analytics", "Recent activity"][active]}</strong><p>{variants ? "This panel updates without navigating away from the current page." : "Organize related content into focused, keyboard-friendly views."}</p></section></div>;
  if (name === "Tooltip") return <StoryRow><span className="web-tooltip"><WebButton size="icon" variant="outline" aria-label="Add to favorites">♡</WebButton><b role="tooltip">Add to favorites</b></span>{variants && <span className="web-tooltip visible"><WebButton size="icon" variant="outline" aria-label="Share">↗</WebButton><b role="tooltip">Share project</b></span>}</StoryRow>;
  if (name === "Typography") return <div className="web-type"><small>Display</small><h1>Build clear interfaces.</h1><h2>Section heading</h2><p>Body text is optimized for comfortable reading across viewport sizes, themes, and content densities.</p><span>Supporting caption · 12px</span></div>;
  if (name === "TipKit") return <div className="web-tip"><span>⌘</span><div><strong>{variants ? "Keyboard shortcut" : "Quick tip"}</strong><p>{variants ? "Press Command K anywhere to search components." : "Use focused guidance to explain a new workflow at the moment it becomes useful."}</p><a href="#button">Learn more</a></div><button aria-label="Dismiss tip">×</button></div>;
  if (name === "Payment Button") return <StoryRow>{(variants ? ["neutral", "blue", "green"] : ["neutral"]).map((color) => <WebButton size="large" color={color as "neutral" | "blue" | "green"} key={color}><span aria-hidden="true">▣</span> Pay securely</WebButton>)}</StoryRow>;
  if (name === "Icon") return <StoryRow>{["⌕", "＋", "♡", "⚙", "↗", ...(variants ? ["⌫", "✓", "!"] : [])].map((icon, index) => <button className="web-icon" aria-label={`Example icon ${index + 1}`} key={`${icon}-${index}`}>{icon}</button>)}</StoryRow>;
  if (name === "Stepper") return <div className="web-stepper"><span><strong>{variants ? "Team seats" : "Quantity"}</strong><small>{variants ? "$12 per seat" : "Maximum 10 items"}</small></span><div><button onClick={() => setCount(Math.max(0, count - 1))} aria-label="Decrease">−</button><b>{count}</b><button onClick={() => setCount(count + 1)} aria-label="Increase">＋</button></div></div>;

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
