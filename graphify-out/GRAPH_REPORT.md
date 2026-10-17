# Graph Report - designkit  (2026-09-26)

## Corpus Check
- 864 files · ~194,629 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3486 nodes · 9558 edges · 209 communities (148 shown, 61 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b5fd889d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- comp-484.tsx
- default/ui/navigation-menu.tsx
- default/ui/label.tsx
- default/ui/radio-group.tsx
- item-example.tsx
- default/ui/popover.tsx
- select-native.tsx
- default/ui/button.tsx
- default/ui/textarea.tsx
- comp-589.tsx
- default/ui/avatar.tsx
- input-example.tsx
- field-example.tsx
- dialog-example.tsx
- cn
- PopoverContent
- demo.tsx
- questionnaire-example.tsx
- field.tsx
- comp-485.tsx
- default/ui/select.tsx
- attachment-example.tsx
- input-group-example.tsx
- button-group-example.tsx
- card-example.tsx
- components/ui/dialog.tsx
- default/ui/dropdown-menu.tsx
- select-example.tsx
- all-components-consumer.test.tsx
- cn
- component-example.tsx
- primitives.test.tsx
- default/ui/checkbox.tsx
- devDependencies
- sidebar.tsx
- command-example.tsx
- context-menu-example.tsx
- TreeItem
- multiselect.tsx
- breadcrumb-example.tsx
- input-otp-example.tsx
- navigation-menu-example.tsx
- main.tsx
- default/ui/table.tsx
- event-calendar/index.ts
- default/ui/accordion.tsx
- tooltip-example.tsx
- lib/index.ts
- ExamplesSection.tsx
- marker-example.tsx
- default/ui/toggle-group.tsx
- catalog.ts
- kbd-example.tsx
- stepper.tsx
- example.tsx
- src/lib/utils.ts
- accordion-example.tsx
- resizable-example.tsx
- Card
- slider-example.tsx
- input-group.tsx
- useCharacterLimit
- hard-test-react.mjs
- aspect-ratio-example.tsx
- default/ui/badge.tsx
- timeline.tsx
- comp-582.tsx
- label-example.tsx
- test-consumers.mjs
- spinner-example.tsx
- registry/index.ts
- message-scroller.tsx
- components/ui/toggle-group.tsx
- comp-576.tsx
- hard-test-all.mjs
- useFileUpload
- custom.d.ts
- comp-46.tsx
- tree.tsx
- Q: done what next.
- Q: Release run failed because GitHub Actions is not permitted to create or approve pull requests. What next?
- Q: Please verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.2 and https://www.npmjs.com/package/@ramekhchhoeng/designkit?activeTab=readme
- files
- CardErrorBoundary
- components/ui/button.tsx
- Tree
- TreeItemLabel
- comp-573.tsx
- comp-575.tsx
- comp-594.tsx
- comp-310.tsx
- comp-566.tsx
- default/ui/tabs.tsx
- comp-567.tsx
- comp-570.tsx
- comp-571.tsx
- comp-572.tsx
- comp-574.tsx
- comp-597.tsx
- comp-598.tsx
- comp-599.tsx
- comp-56.tsx
- axe-core
- @base-ui/react
- @changesets/cli
- clsx
- concurrently
- date-fns
- @dnd-kit/sortable
- package.json
- @dnd-kit/utilities
- embla-carousel-react
- @fontsource-variable/geist
- @headless-tree/react
- cropper.tsx
- compilerOptions
- @internationalized/date
- chart-example.tsx
- hooks/use-toast.ts
- combobox-example.tsx
- lucide-react
- @origin-space/image-cropper
- radix-ui
- compilerOptions
- @radix-ui/react-icons
- react-aria-components
- react-intersection-observer
- react-phone-number-input
- table-example.tsx
- menubar-example.tsx
- react-resizable-panels
- @remixicon/react
- @shadcn/react
- mcp-server/package.json
- sonner
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/node
- @types/react
- @types/react-dom
- typescript
- use-mask-input
- vaul
- vitest
- @tailwindcss/vite
- components.json
- tailwind-merge
- scripts
- src/components/ui/carousel.tsx
- compilerOptions
- DesignKit
- config.json
- default/ui/hover-card.tsx
- keywords
- DesignKit contributor guide
- peerDependencies
- verify-package.mjs
- Changelog
- Q: i want to make this as package. i will has react, nuxtjs vue, and homepage document. can u help me with this. for now we focus on react or vite first
- Q: wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?
- Q: audit our design kit. what can we do better. i mean engineering behind and structure
- Q: so when i redeploy will vercel show docs pages. can u run this project local as well.
- Q: can u test test https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.0
- Q: so how other people use this package @ramekhchhoeng/designkit ?
- Q: how about vue or react?
- Q: verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.1
- Q: any way to better release
- Q: what we need to do now?
- vercel.json
- verify-release-version.mjs
- ResizeObserverPolyfill

## God Nodes (most connected - your core abstractions)
1. `react` - 431 edges
2. `cn()` - 364 edges
3. `cn()` - 250 edges
4. `Button()` - 218 edges
5. `Label()` - 206 edges
6. `Input()` - 77 edges
7. `Button()` - 63 edges
8. `ExampleWrapper()` - 61 edges
9. `Example()` - 61 edges
10. `SelectContent()` - 43 edges

## Surprising Connections (you probably didn't know these)
- `ButtonExamples()` --calls--> `buttonVariants`  [EXTRACTED]
  src/components/button-example.tsx → src/components/ui/button.tsx
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `ButtonGroupSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/button-group.tsx → src/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `DrawerOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/drawer.tsx → src/lib/utils.ts

## Import Cycles
- 2-file cycle: `src/registry/default/components/event-calendar/index.ts -> src/registry/default/components/event-calendar/month-view.tsx -> src/registry/default/components/event-calendar/index.ts`
- 2-file cycle: `src/registry/default/components/event-calendar/index.ts -> src/registry/default/components/event-calendar/week-view.tsx -> src/registry/default/components/event-calendar/index.ts`

## Communities (209 total, 61 thin omitted)

### Community 0 - "react"
Cohesion: 0.04
Nodes (4): react, tags, Calendar(), Switch()

### Community 1 - "comp-484.tsx"
Cohesion: 0.09
Nodes (35): PaginationProps, PaginationProps, Component(), PaginationProps, PaginationProps, PaginationProps, Component(), PaginationProps (+27 more)

### Community 2 - "default/ui/navigation-menu.tsx"
Cohesion: 0.09
Nodes (28): navigationLinks, Component(), navigationLinks, navigationLinks, navigationLinks, navigationLinks, navigationLinks, navigationLinks (+20 more)

### Community 3 - "default/ui/label.tsx"
Cohesion: 0.03
Nodes (12): Component(), Component(), Component(), Component(), SliderWithInput(), Component(), items, useSliderWithInput() (+4 more)

### Community 4 - "default/ui/radio-group.tsx"
Cohesion: 0.09
Nodes (3): items, RadioGroup(), RadioGroupItem()

### Community 5 - "item-example.tsx"
Cohesion: 0.06
Nodes (7): tags, works, ItemFooter(), ItemHeader(), ItemSeparator(), Image(), NextImageProps

### Community 6 - "default/ui/popover.tsx"
Cohesion: 0.09
Nodes (14): initialNotifications, initialNotifications, tips, tips, CardProps, TourStep, tourSteps, Component() (+6 more)

### Community 10 - "comp-589.tsx"
Cohesion: 0.20
Nodes (9): navigationLinks, SettingsMenu(), Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage() (+1 more)

### Community 11 - "default/ui/avatar.tsx"
Cohesion: 0.16
Nodes (3): Avatar(), AvatarFallback(), AvatarImage()

### Community 12 - "input-example.tsx"
Cohesion: 0.10
Nodes (5): FieldLabel(), NativeSelect(), NativeSelectOptGroup(), NativeSelectOption(), NativeSelectProps

### Community 13 - "field-example.tsx"
Cohesion: 0.09
Nodes (5): FieldLegend(), FieldSet(), RadioGroup(), RadioGroupItem(), Switch()

### Community 14 - "dialog-example.tsx"
Cohesion: 0.12
Nodes (12): accents, spokenLanguages, themes, voices, SelectContent(), SelectGroup(), SelectItem(), SelectScrollDownButton() (+4 more)

### Community 15 - "cn"
Cohesion: 0.15
Nodes (22): ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent(), ComboboxEmpty(), ComboboxGroup(), ComboboxInput() (+14 more)

### Community 16 - "PopoverContent"
Cohesion: 0.24
Nodes (14): frameworks, organizations, countries, items, Command(), CommandDialog(), CommandEmpty(), CommandGroup() (+6 more)

### Community 17 - "demo.tsx"
Cohesion: 0.16
Nodes (11): AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription(), AlertDialogFooter(), AlertDialogHeader(), AlertDialogMedia() (+3 more)

### Community 18 - "questionnaire-example.tsx"
Cohesion: 0.12
Nodes (18): questionnaireItems, taskItems, buttonVariants, Questionnaire(), QuestionnaireActions(), QuestionnaireChoice(), QuestionnaireChoiceDescription(), QuestionnaireChoices() (+10 more)

### Community 19 - "field.tsx"
Cohesion: 0.13
Nodes (7): Field(), FieldContent(), FieldDescription(), FieldSeparator(), FieldTitle(), fieldVariants, Label()

### Community 20 - "comp-485.tsx"
Cohesion: 0.19
Nodes (13): columns, Component(), Item, AlertDialog(), AlertDialogAction(), AlertDialogCancel(), AlertDialogContent(), AlertDialogDescription() (+5 more)

### Community 21 - "default/ui/select.tsx"
Cohesion: 0.10
Nodes (9): countries, Select(), SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectSeparator(), SelectTrigger() (+1 more)

### Community 22 - "attachment-example.tsx"
Cohesion: 0.14
Nodes (11): Attachment(), AttachmentAction(), AttachmentActions(), AttachmentContent(), AttachmentDescription(), AttachmentGroup(), AttachmentMedia(), attachmentMediaVariants (+3 more)

### Community 23 - "input-group-example.tsx"
Cohesion: 0.13
Nodes (8): FieldGroup(), Input(), Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle(), PopoverTrigger()

### Community 25 - "card-example.tsx"
Cohesion: 0.12
Nodes (6): spacingOptions, Avatar(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage()

### Community 26 - "components/ui/dialog.tsx"
Cohesion: 0.15
Nodes (13): HOVER_CARD_SIDES, Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+5 more)

### Community 27 - "default/ui/dropdown-menu.tsx"
Cohesion: 0.11
Nodes (20): options, Checked, Theme, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem() (+12 more)

### Community 29 - "all-components-consumer.test.tsx"
Cohesion: 0.16
Nodes (16): BubbleContent(), ChartContainer(), Message(), MessageAvatar(), MessageContent(), MessageFooter(), MessageGroup(), MessageHeader() (+8 more)

### Community 30 - "cn"
Cohesion: 0.05
Nodes (33): Square(), Component(), Component(), Component(), Component(), Slot(), Component(), Component() (+25 more)

### Community 31 - "component-example.tsx"
Cohesion: 0.10
Nodes (17): frameworks, roleItems, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel() (+9 more)

### Community 32 - "primitives.test.tsx"
Cohesion: 0.22
Nodes (11): FileTreeItem, CardAction(), CardContent(), CardFooter(), CardHeader(), CardTitle(), Tabs(), TabsContent() (+3 more)

### Community 33 - "default/ui/checkbox.tsx"
Cohesion: 0.06
Nodes (22): initialTree, TreeNode, initialAvatarImage, initialBgImage, Area, Component(), createImage(), getCroppedImg() (+14 more)

### Community 34 - "devDependencies"
Cohesion: 0.04
Nodes (47): class-variance-authority, cmdk, @dnd-kit/core, @dnd-kit/modifiers, emblor, @headless-tree/core, input-otp, jotai (+39 more)

### Community 35 - "sidebar.tsx"
Cohesion: 0.09
Nodes (40): Collapsible(), CollapsibleContent(), CollapsibleTrigger(), Item(), ItemActions(), ItemContent(), ItemDescription(), ItemGroup() (+32 more)

### Community 36 - "command-example.tsx"
Cohesion: 0.18
Nodes (9): Command(), CommandDialog(), CommandEmpty(), CommandGroup(), CommandInput(), CommandItem(), CommandList(), CommandSeparator() (+1 more)

### Community 37 - "context-menu-example.tsx"
Cohesion: 0.10
Nodes (14): ContextMenu(), ContextMenuCheckboxItem(), ContextMenuContent(), ContextMenuGroup(), ContextMenuItem(), ContextMenuLabel(), ContextMenuRadioGroup(), ContextMenuRadioItem() (+6 more)

### Community 39 - "TreeItem"
Cohesion: 0.33
Nodes (5): initialItems, Item, TreeDragLine(), TreeItem(), useTreeContext()

### Community 40 - "multiselect.tsx"
Cohesion: 0.18
Nodes (12): frameworks, frameworks, CommandEmpty(), GroupOption, isOptionsExist(), MultipleSelector(), MultipleSelectorProps, MultipleSelectorRef (+4 more)

### Community 41 - "breadcrumb-example.tsx"
Cohesion: 0.19
Nodes (9): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator(), Link() (+1 more)

### Community 42 - "input-otp-example.tsx"
Cohesion: 0.16
Nodes (5): FieldError(), InputOTP(), InputOTPGroup(), InputOTPSeparator(), InputOTPSlot()

### Community 43 - "navigation-menu-example.tsx"
Cohesion: 0.22
Nodes (11): components, NavigationMenuBasic(), NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink(), NavigationMenuList() (+3 more)

### Community 45 - "main.tsx"
Cohesion: 0.14
Nodes (8): Toaster(), App(), CodeBlock(), compModules, compSources, copyText(), PACKAGE_MANAGERS, useHashSlug()

### Community 46 - "default/ui/table.tsx"
Cohesion: 0.07
Nodes (38): items, items, items, items, items, programmingLanguages, items, items (+30 more)

### Community 47 - "event-calendar/index.ts"
Cohesion: 0.07
Nodes (55): sampleEvents, AgendaView(), AgendaViewProps, CalendarDndContext, CalendarDndContextType, CalendarDndProvider(), CalendarDndProviderProps, useCalendarDnd() (+47 more)

### Community 48 - "default/ui/accordion.tsx"
Cohesion: 0.05
Nodes (27): items, items, items, items, items, items, items, items (+19 more)

### Community 49 - "tooltip-example.tsx"
Cohesion: 0.16
Nodes (3): Tooltip(), TooltipContent(), TooltipTrigger()

### Community 50 - "lib/index.ts"
Cohesion: 0.23
Nodes (10): toast, ToastAction(), ToastClose(), ToastContent(), ToastDescription(), Toaster(), ToastPortal(), ToastProvider() (+2 more)

### Community 51 - "ExamplesSection.tsx"
Cohesion: 0.16
Nodes (9): categories, ComponentCategory, copyText(), EBProps, EBState, ExampleCard(), ExamplesSection(), ModuleMap (+1 more)

### Community 52 - "marker-example.tsx"
Cohesion: 0.05
Nodes (26): quickReplies, DRAWER_SIDES, PARAGRAPHS, SNAP_POINTS, Bubble(), BubbleGroup(), BubbleReactions(), bubbleReactionsVariants (+18 more)

### Community 53 - "default/ui/toggle-group.tsx"
Cohesion: 0.23
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 54 - "catalog.ts"
Cohesion: 0.15
Nodes (12): catalog, CatalogEntry, CatalogExample, catalogGroups, exampleComponents, examplesByOwner, exampleSources, GROUPS (+4 more)

### Community 56 - "stepper.tsx"
Cohesion: 0.07
Nodes (34): steps, steps, steps, steps, steps, steps, steps, steps (+26 more)

### Community 57 - "example.tsx"
Cohesion: 0.13
Nodes (3): ButtonExamples(), Example(), ExampleWrapper()

### Community 58 - "src/lib/utils.ts"
Cohesion: 0.19
Nodes (5): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Separator()

### Community 59 - "accordion-example.tsx"
Cohesion: 0.21
Nodes (5): Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), CardDescription()

### Community 60 - "resizable-example.tsx"
Cohesion: 0.24
Nodes (3): ResizableHandle(), ResizablePanel(), ResizablePanelGroup()

### Community 63 - "input-group.tsx"
Cohesion: 0.27
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupText(), InputGroupTextarea(), Textarea()

### Community 64 - "useCharacterLimit"
Cohesion: 0.33
Nodes (6): Component(), Component(), Component(), Component(), useCharacterLimit(), UseCharacterLimitProps

### Community 65 - "hard-test-react.mjs"
Cohesion: 0.22
Nodes (6): allReactFiles, __dirname, errors, __filename, rootDir, srcDir

### Community 68 - "timeline.tsx"
Cohesion: 0.09
Nodes (32): items, items, items, items, items, items, items, items (+24 more)

### Community 69 - "comp-582.tsx"
Cohesion: 0.12
Nodes (10): Component(), Component(), Component(), languages, navigationLinks, ThemeToggle(), Tooltip(), TooltipContent() (+2 more)

### Community 71 - "test-consumers.mjs"
Cohesion: 0.33
Nodes (6): consumerAppDir, __dirname, __filename, main(), rootDir, runStep()

### Community 72 - "spinner-example.tsx"
Cohesion: 0.05
Nodes (16): Alert(), AlertAction(), AlertDescription(), AlertTitle(), alertVariants, AvatarBadge(), Badge(), badgeVariants (+8 more)

### Community 73 - "registry/index.ts"
Cohesion: 0.09
Nodes (39): PORT, PUBLIC_BASE_URL, mcpRoutes, registryRoutes, resolveAndRespond(), app, ambiguousText(), createMcpServer() (+31 more)

### Community 74 - "message-scroller.tsx"
Cohesion: 0.29
Nodes (5): MessageScroller(), MessageScrollerButton(), MessageScrollerContent(), MessageScrollerItem(), MessageScrollerViewport()

### Community 75 - "components/ui/toggle-group.tsx"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 76 - "comp-576.tsx"
Cohesion: 0.29
Nodes (4): expandedItems, Item, items, pathToCurrent

### Community 77 - "hard-test-all.mjs"
Cohesion: 0.40
Nodes (5): __dirname, __filename, main(), rootDir, runStep()

### Community 78 - "useFileUpload"
Cohesion: 0.08
Nodes (38): Component(), Component(), Avatar(), ProfileBg(), Component(), Component(), Component(), Component() (+30 more)

### Community 79 - "custom.d.ts"
Cohesion: 0.33
Nodes (5): *.css, *.jpeg, *.jpg, *.png, *.svg

### Community 81 - "tree.tsx"
Cohesion: 0.33
Nodes (5): TreeContext, TreeContextValue, TreeItemLabelProps, TreeItemProps, TreeProps

### Community 82 - "Q: done what next."
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: done what next., Source Nodes

### Community 83 - "Q: Release run failed because GitHub Actions is not permitted to create or approve pull requests. What next?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Release run failed because GitHub Actions is not permitted to create or approve pull requests. What next?, Source Nodes

### Community 84 - "Q: Please verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.2 and https://www.npmjs.com/package/@ramekhchhoeng/designkit?activeTab=readme"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Please verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.2 and https://www.npmjs.com/package/@ramekhchhoeng/designkit?activeTab=readme, Source Nodes

### Community 85 - "files"
Cohesion: 0.40
Nodes (5): files, CHANGELOG.md, dist, LICENSE, README.md

### Community 87 - "components/ui/button.tsx"
Cohesion: 0.05
Nodes (14): SHEET_SIDES, Button(), Calendar(), CalendarDayButton(), Sheet(), SheetClose(), SheetContent(), SheetDescription() (+6 more)

### Community 88 - "Tree"
Cohesion: 0.40
Nodes (3): Item, items, Tree()

### Community 89 - "TreeItemLabel"
Cohesion: 0.40
Nodes (3): Item, items, TreeItemLabel()

### Community 90 - "comp-573.tsx"
Cohesion: 0.40
Nodes (3): doubleClickExpandFeature, Item, items

### Community 91 - "comp-575.tsx"
Cohesion: 0.50
Nodes (4): Component(), getFileIcon(), initialItems, Item

### Community 92 - "comp-594.tsx"
Cohesion: 0.40
Nodes (3): teams, AppToggle(), TeamSwitcher()

### Community 95 - "default/ui/tabs.tsx"
Cohesion: 0.13
Nodes (6): ScrollArea(), ScrollBar(), Tabs(), TabsContent(), TabsList(), TabsTrigger()

### Community 112 - "package.json"
Cohesion: 0.06
Nodes (32): author, bugs, url, dependencies, use-sync-external-store, description, react, react-dom (+24 more)

### Community 117 - "cropper.tsx"
Cohesion: 0.17
Nodes (9): Area, Area, Component(), createImage(), getCroppedImg(), Cropper(), CropperCropArea(), CropperDescription() (+1 more)

### Community 118 - "compilerOptions"
Cohesion: 0.06
Nodes (32): DOM.Iterable, ES2020, src/config, src/registry, ./src/shims/next-image.tsx, ./src/shims/next-link.tsx, tests, vitest.config.ts (+24 more)

### Community 120 - "chart-example.tsx"
Cohesion: 0.07
Nodes (22): areaChartConfig, areaChartData, barChartConfig, barChartData, lineChartConfig, lineChartData, pieChartConfig, pieChartData (+14 more)

### Community 121 - "hooks/use-toast.ts"
Cohesion: 0.11
Nodes (28): Component(), Component(), useProgressTimer(), UseProgressTimerProps, Action, ActionType, actionTypes, addToRemoveQueue() (+20 more)

### Community 122 - "combobox-example.tsx"
Cohesion: 0.07
Nodes (13): ComboboxMultiple(), ComboboxMultipleDisabled(), ComboboxMultipleInvalid(), ComboboxMultipleNoRemove(), countries, disabledFrameworks, frameworks, items (+5 more)

### Community 126 - "compilerOptions"
Cohesion: 0.06
Nodes (30): compilerOptions, allowImportingTsExtensions, allowJs, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+22 more)

### Community 131 - "table-example.tsx"
Cohesion: 0.09
Nodes (12): tableData, invoices, people, tasks, Table(), TableBody(), TableCaption(), TableCell() (+4 more)

### Community 132 - "menubar-example.tsx"
Cohesion: 0.10
Nodes (15): Menubar(), MenubarCheckboxItem(), MenubarContent(), MenubarGroup(), MenubarItem(), MenubarLabel(), MenubarMenu(), MenubarRadioGroup() (+7 more)

### Community 136 - "mcp-server/package.json"
Cohesion: 0.07
Nodes (28): hono, dependencies, hono, @modelcontextprotocol/sdk, react, react-dom, zod, description (+20 more)

### Community 156 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 167 - "scripts"
Cohesion: 0.09
Nodes (22): scripts, build, build:docs, build:lib, changeset, dev, dev:all, graph:index (+14 more)

### Community 175 - "src/components/ui/carousel.tsx"
Cohesion: 0.16
Nodes (13): Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem(), CarouselNext(), CarouselOptions (+5 more)

### Community 183 - "compilerOptions"
Cohesion: 0.12
Nodes (15): src/components/ui, src/custom.d.ts, src/hooks, src/lib, ./tsconfig.json, compilerOptions, composite, declaration (+7 more)

### Community 336 - "DesignKit"
Cohesion: 0.10
Nodes (18): Deploying (Coolify), designkit-mcp, Endpoints, How the registry is built, Install a component with the shadcn CLI, Run it locally, Use it as an MCP server, Credits (+10 more)

### Community 1038 - "config.json"
Cohesion: 0.20
Nodes (9): access, baseBranch, changelog, commit, fixed, ignore, linked, $schema (+1 more)

### Community 1200 - "default/ui/hover-card.tsx"
Cohesion: 0.40
Nodes (3): HoverCard(), HoverCardContent(), HoverCardTrigger()

### Community 1201 - "keywords"
Cohesion: 0.33
Nodes (6): keywords, apple-inspired, components, design-system, typescript, ui

### Community 1379 - "DesignKit contributor guide"
Cohesion: 0.33
Nodes (5): Commands, Conventions, DesignKit contributor guide, Graphify, Source layout

### Community 1380 - "peerDependencies"
Cohesion: 0.29
Nodes (7): react, react-dom, react, react-dom, peerDependencies, react, react-dom

### Community 1381 - "verify-package.mjs"
Cohesion: 0.33
Nodes (5): cjs, expectedExports, require, requiredArtifacts, root

### Community 1420 - "Changelog"
Cohesion: 0.22
Nodes (8): [0.1.0] - 2026-07-18, 1.1.2, 1.1.3, Added, Changelog, Patch Changes, Patch Changes, [Unreleased]

### Community 1421 - "Q: i want to make this as package. i will has react, nuxtjs vue, and homepage document. can u help me with this. for now we focus on react or vite first"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: i want to make this as package. i will has react, nuxtjs vue, and homepage document. can u help me with this. for now we focus on react or vite first, Source Nodes

### Community 1422 - "Q: wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?, Source Nodes

### Community 1423 - "Q: audit our design kit. what can we do better. i mean engineering behind and structure"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: audit our design kit. what can we do better. i mean engineering behind and structure, Source Nodes

### Community 1424 - "Q: so when i redeploy will vercel show docs pages. can u run this project local as well."
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: so when i redeploy will vercel show docs pages. can u run this project local as well., Source Nodes

### Community 1425 - "Q: can u test test https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.0"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: can u test test https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.0, Source Nodes

### Community 1426 - "Q: so how other people use this package @ramekhchhoeng/designkit ?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: so how other people use this package @ramekhchhoeng/designkit ?, Source Nodes

### Community 1427 - "Q: how about vue or react?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: how about vue or react?, Source Nodes

### Community 1428 - "Q: verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.1"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.1, Source Nodes

### Community 1429 - "Q: any way to better release"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: any way to better release, Source Nodes

### Community 1430 - "Q: what we need to do now?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: what we need to do now?, Source Nodes

### Community 1448 - "vercel.json"
Cohesion: 0.50
Nodes (3): buildCommand, outputDirectory, $schema

## Knowledge Gaps
- **629 isolated node(s):** `$schema`, `changelog`, `commit`, `fixed`, `linked` (+624 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **61 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `package.json` (12× useful, score=11.986318042) _(code changed — re-verify)_
- `publishConfig` (7× useful, score=6.99497924) _(code changed — re-verify)_
- `scripts` (4× useful, score=3.998397884) _(code changed — re-verify)_
- `verify-release-version.mjs` (4× useful, score=3.99718853)
- `styles.d.ts` (3× useful, score=2.994890263) _(code changed — re-verify)_
- `componentDocs.tsx` (3× useful, score=2.993912805) _(code changed — re-verify)_
- `WebCatalog.tsx` (3× useful, score=2.993912805) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `comp-484.tsx`, `default/ui/navigation-menu.tsx`, `default/ui/label.tsx`, `default/ui/radio-group.tsx`, `item-example.tsx`, `default/ui/popover.tsx`, `select-native.tsx`, `default/ui/button.tsx`, `default/ui/textarea.tsx`, `comp-589.tsx`, `default/ui/avatar.tsx`, `input-example.tsx`, `field-example.tsx`, `dialog-example.tsx`, `cn`, `PopoverContent`, `demo.tsx`, `questionnaire-example.tsx`, `field.tsx`, `comp-485.tsx`, `default/ui/select.tsx`, `attachment-example.tsx`, `input-group-example.tsx`, `card-example.tsx`, `components/ui/dialog.tsx`, `default/ui/dropdown-menu.tsx`, `all-components-consumer.test.tsx`, `cn`, `component-example.tsx`, `primitives.test.tsx`, `default/ui/checkbox.tsx`, `sidebar.tsx`, `command-example.tsx`, `context-menu-example.tsx`, `toggle-group-example.tsx`, `TreeItem`, `multiselect.tsx`, `breadcrumb-example.tsx`, `input-otp-example.tsx`, `navigation-menu-example.tsx`, `main.tsx`, `default/ui/table.tsx`, `event-calendar/index.ts`, `default/ui/accordion.tsx`, `lib/index.ts`, `ExamplesSection.tsx`, `marker-example.tsx`, `default/ui/toggle-group.tsx`, `catalog.ts`, `stepper.tsx`, `resizable-example.tsx`, `slider-example.tsx`, `input-group.tsx`, `useCharacterLimit`, `default/ui/badge.tsx`, `timeline.tsx`, `comp-582.tsx`, `spinner-example.tsx`, `message-scroller.tsx`, `components/ui/toggle-group.tsx`, `comp-576.tsx`, `useFileUpload`, `comp-46.tsx`, `tree.tsx`, `components/ui/button.tsx`, `Tree`, `TreeItemLabel`, `comp-573.tsx`, `comp-575.tsx`, `comp-310.tsx`, `comp-566.tsx`, `default/ui/tabs.tsx`, `comp-567.tsx`, `comp-570.tsx`, `comp-571.tsx`, `comp-572.tsx`, `comp-574.tsx`, `comp-597.tsx`, `comp-598.tsx`, `comp-599.tsx`, `comp-56.tsx`, `cropper.tsx`, `chart-example.tsx`, `hooks/use-toast.ts`, `combobox-example.tsx`, `table-example.tsx`, `menubar-example.tsx`, `comp-505.tsx`, `src/components/ui/carousel.tsx`, `default/ui/hover-card.tsx`, `keywords`?**
  _High betweenness centrality (0.581) - this node is a cross-community bridge._
- **Why does `keywords` connect `keywords` to `package.json`, `react`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `react`, `comp-484.tsx`, `default/ui/navigation-menu.tsx`, `default/ui/label.tsx`, `default/ui/radio-group.tsx`, `default/ui/popover.tsx`, `select-native.tsx`, `default/ui/button.tsx`, `default/ui/textarea.tsx`, `comp-589.tsx`, `default/ui/avatar.tsx`, `PopoverContent`, `comp-485.tsx`, `default/ui/select.tsx`, `default/ui/dropdown-menu.tsx`, `default/ui/checkbox.tsx`, `TreeItem`, `multiselect.tsx`, `default/ui/table.tsx`, `event-calendar/index.ts`, `default/ui/accordion.tsx`, `default/ui/hover-card.tsx`, `default/ui/toggle-group.tsx`, `stepper.tsx`, `default/ui/badge.tsx`, `timeline.tsx`, `comp-582.tsx`, `comp-46.tsx`, `tree.tsx`, `Tree`, `TreeItemLabel`, `default/ui/tabs.tsx`, `cropper.tsx`, `hooks/use-toast.ts`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `$schema`, `changelog`, `commit` to the rest of the system?**
  _629 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.044564890093345376 - nodes in this community are weakly interconnected._
- **Should `comp-484.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08583959899749373 - nodes in this community are weakly interconnected._
- **Should `default/ui/navigation-menu.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09216255442670537 - nodes in this community are weakly interconnected._