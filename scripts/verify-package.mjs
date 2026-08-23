import { access, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const requiredArtifacts = [
  "dist/index.js",
  "dist/index.cjs",
  "dist/lib/index.d.ts",
];

await Promise.all(requiredArtifacts.map((path) => access(new URL(path, root))));

const esmSource = await readFile(new URL("dist/index.js", root), "utf8");
if (!esmSource.startsWith('"use client";')) {
  throw new Error('dist/index.js must preserve the Next.js "use client" boundary.');
}

// One representative name per vendored primitive, plus the shared `cn`
// helper. This is a spot-check, not the full export list -- src/lib/index.ts
// is the source of truth -- so it stays cheap to maintain as Phase 5 adds
// more primitives; MIN_EXPORT_COUNT below is what actually guards against a
// wholesale barrel regression.
const expectedExports = [
  "Accordion", "Alert", "AlertDialog", "AspectRatio", "Attachment", "Avatar",
  "Badge", "Breadcrumb", "Bubble", "Button", "ButtonGroup", "Calendar",
  "Card", "Carousel", "ChartContainer", "Checkbox", "Collapsible", "Combobox",
  "Command", "ContextMenu", "Dialog", "DirectionProvider", "Drawer",
  "DropdownMenu", "Empty", "Field", "HoverCard", "Input", "InputGroup",
  "InputOTP", "Item", "Kbd", "Label", "Marker", "Menubar", "Message",
  "MessageScroller", "NativeSelect", "NavigationMenu", "Pagination",
  "Popover", "Progress", "Questionnaire", "RadioGroup", "ResizablePanel",
  "ScrollArea", "Select", "Separator", "Sheet", "Sidebar", "Skeleton",
  "Slider", "Toaster", "Spinner", "Switch", "Table", "Tabs", "Textarea",
  "Toast", "ToastToaster", "Toggle", "ToggleGroup", "Tooltip", "cn",
];

// A floor, not an exact count -- Phase 5 adds more primitives over time.
const MIN_EXPORT_COUNT = 370;

const esm = await import(new URL("dist/index.js", root));
const require = createRequire(import.meta.url);
const cjs = require(fileURLToPath(new URL("dist/index.cjs", root)));

for (const name of expectedExports) {
  if (!(name in esm)) throw new Error(`Missing ESM export: ${name}`);
  if (!(name in cjs)) throw new Error(`Missing CommonJS export: ${name}`);
}

const actualCount = Object.keys(esm).length;
if (actualCount < MIN_EXPORT_COUNT) {
  throw new Error(`Expected at least ${MIN_EXPORT_COUNT} runtime exports, found ${actualCount}.`);
}

console.log(`Package artifacts verified (${actualCount} public runtime exports).`);
