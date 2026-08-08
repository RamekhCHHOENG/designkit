# Graph Report - tipkit-react  (2026-08-08)

## Corpus Check
- 562 files · ~148,023 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2307 nodes · 5499 edges · 166 communities (119 shown, 47 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.52)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d5caabea`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Component Gallery and Primitives
- iOS Components
- TypeScript Configuration
- Project Scripts
- cn
- Frontend Dependencies
- command.tsx
- Date and Time Components
- visionOS Components
- TipKit Components
- App Icon Components
- Project Documentation
- Graphify Agent Guidance
- main.tsx
- sheet-04.tsx
- WebComponents.tsx
- button.tsx
- label.tsx
- autocomplete.tsx
- avatar.tsx
- separator.tsx
- badge.tsx
- utils.ts
- card-08.tsx
- calendar.tsx
- user-dropdown.tsx
- code-block.tsx
- devDependencies
- card.tsx
- kbd-03.tsx
- dialog.tsx
- combobox.tsx
- react
- about-us.tsx
- sidebar.tsx
- product-overview.tsx
- top-product-table.tsx
- collapsible-03.tsx
- alert.tsx
- field.tsx
- chart.tsx
- index.tsx
- spaceExamples.tsx
- Card
- carousel.tsx
- checkbox.tsx
- input-otp.tsx
- dropdown-menu.tsx
- navbar.tsx
- breadcrumb.tsx
- salesbycountrywidget.tsx
- popover-03.tsx
- context-menu.tsx
- animated-list-03.tsx
- card-14.tsx
- button-group.tsx
- pagination.tsx
- tooltip.tsx
- navbar.tsx
- testimonial.tsx
- radio-group-06.tsx
- multi-select.tsx
- marquee.tsx
- widget.tsx
- form.tsx
- skeleton.tsx
- drawer.tsx
- bentogrid.tsx
- footer.tsx
- card-09.tsx
- file-upload-01.tsx
- sonner-06.tsx
- product-card.tsx
- statistics.tsx
- command-07.tsx
- componentMaturity.ts
- animated-list-01.tsx
- team.tsx
- dropdown-menu-03.tsx
- index.ts
- apple-dock.tsx
- autocomplete-05.tsx
- contact-info.tsx
- product-category.tsx
- widget.tsx
- collapsible-04.tsx
- input-otp-09.tsx
- tabs-01.tsx
- toggle-group.tsx
- verify-package.mjs
- cta.tsx
- product-category.tsx
- index.tsx
- checkbox-09.tsx
- context-menu-01.tsx
- context-menu-02.tsx
- input-19.tsx
- motion-radio-group.tsx
- shine-border-04.tsx
- tooltip-01.tsx
- Q: i want to make this as package. i will has react, nuxtjs vue, and homepage document. can u help me with this. for now we focus on react or vite first
- Q: wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?
- Q: audit our design kit. what can we do better. i mean engineering behind and structure
- files
- animated-text-07.tsx
- cta.tsx
- index.tsx
- index.tsx
- hero.tsx
- spinner-07.tsx
- tabs-02.tsx
- badge-08.tsx
- number-ticker-01.tsx
- number-ticker-02.tsx
- number-ticker-03.tsx
- number-ticker-04.tsx
- spinning-text-01.tsx
- tooltip-03.tsx
- vercel.json
- axe-core
- @base-ui/react
- canvas-confetti
- class-variance-authority
- @iconify/react
- lucide-react
- motion
- @number-flow/react
- radix-ui
- react-day-picker
- react-resizable-panels
- recharts
- shiki
- tailwind-merge
- @tailwindcss/typography
- @testing-library/dom
- @testing-library/jest-dom
- @testing-library/react
- @types/canvas-confetti
- typescript
- vaul
- vite
- vitest
- verify-release-version.mjs
- Confetti
- navbar.tsx
- dropdown-menu-01.tsx
- shine-border-03.tsx
- Q: so when i redeploy will vercel show docs pages. can u run this project local as well.
- avatar-07.tsx
- animated-text-06.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 560 edges
2. `react` - 261 edges
3. `Button()` - 157 edges
4. `Label()` - 81 edges
5. `Badge()` - 69 edges
6. `Card()` - 64 edges
7. `CardContent()` - 60 edges
8. `Input()` - 44 edges
9. `Separator()` - 39 edges
10. `Avatar()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `AccordionDemo()` --calls--> `cn()`  [EXTRACTED]
  src/space/components/shadcn-space/accordion/accordion-01.tsx → src/space/lib/utils.ts
- `AccordionMultiLevelDemo()` --calls--> `cn()`  [EXTRACTED]
  src/space/components/shadcn-space/accordion/accordion-02.tsx → src/space/lib/utils.ts
- `AccordionFaqDemo()` --calls--> `cn()`  [EXTRACTED]
  src/space/components/shadcn-space/accordion/accordion-03.tsx → src/space/lib/utils.ts
- `AccordionCardDemo()` --calls--> `cn()`  [EXTRACTED]
  src/space/components/shadcn-space/accordion/accordion-04.tsx → src/space/lib/utils.ts
- `Notification()` --calls--> `cn()`  [EXTRACTED]
  src/space/components/shadcn-space/animated-list/animated-list-01.tsx → src/space/lib/utils.ts

## Import Cycles
- None detected.

## Communities (166 total, 47 thin omitted)

### Community 0 - "Component Gallery and Primitives"
Cohesion: 0.10
Nodes (16): CatalogSection, ComponentDoc, componentDocs, sectionGroups(), App(), Appearance, appearanceIcons, ComponentDetail() (+8 more)

### Community 1 - "iOS Components"
Cohesion: 0.33
Nodes (6): keywords, apple-inspired, components, design-system, typescript, ui

### Community 2 - "TypeScript Configuration"
Cohesion: 0.06
Nodes (35): DOM, DOM.Iterable, ES2020, src, src/space, ./src/space/shims/next-font-google.ts, ./src/space/shims/next-image.tsx, ./src/space/shims/next-link.tsx (+27 more)

### Community 3 - "Project Scripts"
Cohesion: 0.12
Nodes (16): scripts, build, build:docs, build:lib, dev, graph:index, graph:query, graph:update (+8 more)

### Community 4 - "cn"
Cohesion: 0.03
Nodes (62): Chart01(), Chart02(), EarningReportChart(), SalesOverviewChart(), SalesByCountryWidget(), Pricing(), Pricing(), Services() (+54 more)

### Community 5 - "Frontend Dependencies"
Cohesion: 0.29
Nodes (7): react, react-dom, peerDependencies, react, react-dom, react, react-dom

### Community 6 - "command.tsx"
Cohesion: 0.08
Nodes (41): techStack, regions, organizations, ComboboxTimezoneDemo(), getFormattedTimezones(), users, countries, CommandMenuGroup (+33 more)

### Community 7 - "Date and Time Components"
Cohesion: 0.08
Nodes (25): author, bugs, url, description, engines, node, exports, ./package.json (+17 more)

### Community 8 - "visionOS Components"
Cohesion: 0.15
Nodes (12): src/lib, ./tsconfig.json, compilerOptions, composite, declaration, declarationDir, declarationMap, emitDeclarationOnly (+4 more)

### Community 9 - "TipKit Components"
Cohesion: 0.40
Nodes (4): [0.1.0] - 2026-07-18, Added, Changelog, [Unreleased]

### Community 11 - "Project Documentation"
Cohesion: 0.17
Nodes (11): Button examples, Credits, DesignKit, Framework compatibility, Install, License, Local development, Public components (+3 more)

### Community 12 - "Graphify Agent Guidance"
Cohesion: 0.33
Nodes (5): Commands, Conventions, DesignKit contributor guide, Graphify, Source layout

### Community 14 - "main.tsx"
Cohesion: 0.10
Nodes (22): blockDocs, codeFor(), ComponentExample, ComponentStatus, descriptions, groupMembers, groupOrder, mappedSlugs (+14 more)

### Community 15 - "sheet-04.tsx"
Cohesion: 0.20
Nodes (14): SHEET_SIDES, initialItems, AVAILABILITY, CATEGORIES, RATINGS, Sheet(), SheetClose(), SheetContent() (+6 more)

### Community 17 - "WebComponents.tsx"
Cohesion: 0.09
Nodes (23): Badge, BadgeProps, BadgeTone, BadgeVariant, ButtonColor, ButtonProps, ButtonSize, ButtonVariant (+15 more)

### Community 19 - "button.tsx"
Cohesion: 0.05
Nodes (7): InteractiveHoverButton, InteractiveHoverButtonProps, Button(), ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants

### Community 20 - "label.tsx"
Cohesion: 0.08
Nodes (8): CardNumberInputMask(), formatCardNumber(), CardExpiryInputMask(), formatExpiry(), formatMac(), MacAddressInputMask(), Input(), Label()

### Community 21 - "autocomplete.tsx"
Cohesion: 0.06
Nodes (45): frameworks, groups, languages, AutocompleteDemo(), cities, AutocompleteDemo(), GROUP_ORDER, SPRING (+37 more)

### Community 22 - "avatar.tsx"
Cohesion: 0.12
Nodes (13): avatars, AvatarStack(), AvatarStackItem, AvatarStackProps, getInitials(), BadgeWithAvatarProps, reviewers, Avatar() (+5 more)

### Community 24 - "badge.tsx"
Cohesion: 0.06
Nodes (9): ServiceData, team, teamData, DashboardMetric, MainDashboardData, WidgetProps, ShineBorderProps, Badge() (+1 more)

### Community 25 - "utils.ts"
Cohesion: 0.04
Nodes (28): defaultSteps, SetupSteps(), SetupStepsProps, StepItem, AnimatedTextRoller(), greetings, TextShimmerWave(), TextShimmerWaveProps (+20 more)

### Community 26 - "card-08.tsx"
Cohesion: 0.10
Nodes (12): ContactFormData, currencies, socials, statuses, users, SelectContent(), SelectGroup(), SelectItem() (+4 more)

### Community 27 - "calendar.tsx"
Cohesion: 0.08
Nodes (16): endOfMonth, now, selectedDates, startOfMonth, bookedDays, endOfMonth, now, startOfMonth (+8 more)

### Community 28 - "user-dropdown.tsx"
Cohesion: 0.05
Nodes (47): MenuItem, NotificationDropdown(), PROFILE_ITEMS, Props, LOGOUT_ITEM, MenuItem, PROFILE_ITEMS, Props (+39 more)

### Community 29 - "code-block.tsx"
Cohesion: 0.07
Nodes (18): files, tabs, buildCommand(), CodeBlock(), CodeBlockProps, CodeRenderer(), FileEntry, injectStyles() (+10 more)

### Community 30 - "devDependencies"
Cohesion: 0.05
Nodes (37): clsx, cmdk, embla-carousel-react, @faker-js/faker, input-otp, jsdom, devDependencies, clsx (+29 more)

### Community 31 - "card.tsx"
Cohesion: 0.33
Nodes (3): pricingData, PricingPlan, ShineBorderProps

### Community 32 - "kbd-03.tsx"
Cohesion: 0.09
Nodes (16): Platform, Platform, Platform, Platform, KbdGeneratorDemo(), MAC_MODIFIERS, Platform, WIN_MODIFIERS (+8 more)

### Community 33 - "dialog.tsx"
Cohesion: 0.25
Nodes (9): Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle() (+1 more)

### Community 34 - "combobox.tsx"
Cohesion: 0.09
Nodes (26): AssignTaskCard(), User, users, ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent() (+18 more)

### Community 36 - "about-us.tsx"
Cohesion: 0.07
Nodes (20): SplashCursor(), AboutUs(), aboutusData, instrumentSerif, statisticsCounter, AboutAndStats01(), aboutusData, statisticsCounter (+12 more)

### Community 37 - "sidebar.tsx"
Cohesion: 0.14
Nodes (17): Sidebar(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroupAction(), SidebarGroupContent(), SidebarInput(), SidebarInset() (+9 more)

### Community 38 - "product-overview.tsx"
Cohesion: 0.10
Nodes (23): AccordionDemo(), data, AccordionMultiLevelDemo(), items, AccordionFaqDemo(), FAQ_DATA, AccordionCardDemo(), items (+15 more)

### Community 39 - "top-product-table.tsx"
Cohesion: 0.10
Nodes (24): ProjectData, TableAction, TopProductTable(), ProjectData, TableAction, TableComp(), SkillsProgress(), stats (+16 more)

### Community 40 - "collapsible-03.tsx"
Cohesion: 0.10
Nodes (21): changeConfig, ChangeType, CollapsibleChangelog(), Release, releases, CollapsibleDashboardSidebar(), NavChild, NavSection (+13 more)

### Community 41 - "alert.tsx"
Cohesion: 0.10
Nodes (16): ALERT_STYLES, AlertGradientDemoProps, AlertItem, DEFAULT_ALERTS, Alert(), AlertAction(), AlertDescription(), AlertTitle() (+8 more)

### Community 42 - "field.tsx"
Cohesion: 0.12
Nodes (11): LoginForm(), RegisterForm(), VerifyEmail(), CardDescription(), CardHeader(), Field(), FieldDescription(), FieldGroup() (+3 more)

### Community 43 - "chart.tsx"
Cohesion: 0.11
Nodes (17): chartData, chartData, chartData, chartData, chartData, CardTitle(), ChartConfig, ChartContainer() (+9 more)

### Community 44 - "index.tsx"
Cohesion: 0.11
Nodes (21): initialNotifications, NotificationItem(), NotificationType, typeConfig, tabs, TabsWithIconProps, tabs, TabsWithCountProps (+13 more)

### Community 45 - "spaceExamples.tsx"
Cohesion: 0.08
Nodes (27): categories, components, buildCategories(), copyText(), exampleLabel(), exampleModules, exampleSources, GlobModule (+19 more)

### Community 46 - "Card"
Cohesion: 0.07
Nodes (20): Features, Features, colorMap, events, formatTimeRange(), WithEventListDemo(), userImg, AudioState (+12 more)

### Community 47 - "carousel.tsx"
Cohesion: 0.10
Nodes (24): BrandList, brandList, defaultTestimonials, Testimonial01(), defaultTestimonials, Testimonial, Testimonial01Props, CarouselCustomDots() (+16 more)

### Community 48 - "checkbox.tsx"
Cohesion: 0.10
Nodes (3): socials, skills, Checkbox()

### Community 49 - "input-otp.tsx"
Cohesion: 0.23
Nodes (4): InputOTP(), InputOTPGroup(), InputOTPSeparator(), InputOTPSlot()

### Community 51 - "navbar.tsx"
Cohesion: 0.14
Nodes (16): Logo(), Header(), HeaderProps, CollaborateButton(), Navbar(), navigationData, NavigationSection, NavigationMenu() (+8 more)

### Community 52 - "breadcrumb.tsx"
Cohesion: 0.09
Nodes (22): DropdownMenuCheckboxItem(), DropdownMenuGroup(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+14 more)

### Community 53 - "salesbycountrywidget.tsx"
Cohesion: 0.17
Nodes (8): DashboardMetric, MainDashboardData, secondaryStatsData, StatisticsBlock(), StatisticsBlockProps, StatItem, Portfolio(), PortfolioData

### Community 54 - "popover-03.tsx"
Cohesion: 0.33
Nodes (4): stats, Popover(), PopoverContent(), PopoverTrigger()

### Community 55 - "context-menu.tsx"
Cohesion: 0.12
Nodes (16): Button, DataTable(), DataTableColumn, DataTableProps, SortDirection, Drawer(), DrawerProps, focusableSelector (+8 more)

### Community 56 - "animated-list-03.tsx"
Cohesion: 0.13
Nodes (12): buttonVariant, CARD_CONFIGS, createIcon(), iconVariant, popup1Variant, popup2Variant, popup3Variant, SPRING_TRANSITION (+4 more)

### Community 57 - "card-14.tsx"
Cohesion: 0.22
Nodes (6): ServiceItem, Services(), servicesData, ServicesProps, Image, NextImageProps

### Community 58 - "button-group.tsx"
Cohesion: 0.18
Nodes (12): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemFooter(), ItemGroup(), ItemHeader(), ItemMedia() (+4 more)

### Community 59 - "pagination.tsx"
Cohesion: 0.30
Nodes (10): FloatingPill(), PremiumRibbon(), Pagination(), PaginationContent(), PaginationEllipsis(), PaginationItem(), PaginationLink(), PaginationLinkProps (+2 more)

### Community 60 - "tooltip.tsx"
Cohesion: 0.17
Nodes (8): badgeVariant, FileEntry, files, FileType, iconConfig, profiles, ScrollArea(), ScrollBar()

### Community 62 - "navbar.tsx"
Cohesion: 0.29
Nodes (5): endOfMonth, from, now, startOfMonth, to

### Community 63 - "testimonial.tsx"
Cohesion: 0.40
Nodes (3): CTA(), CTAProps, defaultMarqueeItems

### Community 64 - "radio-group-06.tsx"
Cohesion: 0.25
Nodes (5): Example(), plans, RadioGroupListGroupDemo(), RadioGroup(), RadioGroupItem()

### Community 65 - "multi-select.tsx"
Cohesion: 0.20
Nodes (11): technologies, CommandEmpty(), GroupOption, isOptionsExist(), MultipleSelector(), MultipleSelectorProps, MultipleSelectorRef, Option (+3 more)

### Community 66 - "marquee.tsx"
Cohesion: 0.11
Nodes (7): Marquee(), MarqueeProps, BrandList, propertyFeatures, SeamlessCloud(), BrandList, BrandList

### Community 67 - "widget.tsx"
Cohesion: 0.18
Nodes (8): DEFAULT_DROPDOWN_ITEMS, DEFAULT_TRANS_DATA, DropdownItemProps, TransactionProps, Widget(), WidgetProps, Link, NextLinkProps

### Community 68 - "form.tsx"
Cohesion: 0.23
Nodes (10): FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext, FormItemContextValue, FormLabel() (+2 more)

### Community 69 - "skeleton.tsx"
Cohesion: 0.29
Nodes (7): fadeUp(), ProfileSkeleton(), fadeUp(), ProfileSkeleton(), fadeUp(), ListSkeleton(), Skeleton()

### Community 70 - "drawer.tsx"
Cohesion: 0.18
Nodes (6): DrawerContent(), DrawerDescription(), DrawerFooter(), DrawerHeader(), DrawerOverlay(), DrawerTitle()

### Community 71 - "bentogrid.tsx"
Cohesion: 0.24
Nodes (4): AnimatedUiBlock(), DATA, Item, ReminderCarousel()

### Community 73 - "card-09.tsx"
Cohesion: 0.36
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 74 - "file-upload-01.tsx"
Cohesion: 0.20
Nodes (7): EmptyState(), EmptyStateProps, FileItem(), FileItemProps, FileUploadProps, mainVariant, secondaryVariant

### Community 75 - "sonner-06.tsx"
Cohesion: 0.27
Nodes (3): TransactionToastContent(), FailedToastContent(), Spinner()

### Community 76 - "product-card.tsx"
Cohesion: 0.31
Nodes (4): ProductListingProps, PRODUCTS, ProductCard(), ProductCardProps

### Community 77 - "statistics.tsx"
Cohesion: 0.22
Nodes (6): DashboardMetric, MainDashboardData, secondaryStatsData, Statistics(), StatisticsBlock01Props, StatItem

### Community 78 - "command-07.tsx"
Cohesion: 0.22
Nodes (7): CommandCheckboxGroup, CommandCheckboxItem, CommandFilterGroup, CommandFilterOption, CommandFilterSearchProps, defaultCheckboxGroups, defaultFilterGroups

### Community 79 - "componentMaturity.ts"
Cohesion: 0.33
Nodes (5): DEFAULT_DROPDOWN_ITEMS, DEFAULT_TRANS_DATA, DropdownItemProps, TransactionProps, WidgetProps

### Community 80 - "animated-list-01.tsx"
Cohesion: 0.25
Nodes (6): AnimatedList, AnimatedListDemo(), AnimatedListProps, Item, Messages, Notification()

### Community 82 - "dropdown-menu-03.tsx"
Cohesion: 0.29
Nodes (7): AudioWaveIcon(), defaultParticipants, getAvatarPosition(), Participant, SpeakingRing(), VoiceChat(), VoiceChatProps

### Community 83 - "index.ts"
Cohesion: 0.32
Nodes (5): categories, BlockCategory, blocks, RegistryBlock, masterCategoriesArray

### Community 84 - "apple-dock.tsx"
Cohesion: 0.29
Nodes (6): AppleDock, AppleDockDemo(), AppleDockIcon(), AppleDockIconProps, AppleDockProps, appleDockVariants

### Community 85 - "autocomplete-05.tsx"
Cohesion: 0.16
Nodes (9): PreviewSliderProps, VolumeSlider(), emojis, labels, ReactionSlider(), getTempMeta(), TemperatureSlider(), LABELS (+1 more)

### Community 86 - "contact-info.tsx"
Cohesion: 0.33
Nodes (4): ContextMenu(), ContextMenuItem, ContextMenuProps, demoItems

### Community 87 - "product-category.tsx"
Cohesion: 0.29
Nodes (4): categories, Category, filters, ProductCategory()

### Community 88 - "widget.tsx"
Cohesion: 0.29
Nodes (4): DashboardMetric, MainDashboardData, Widget(), WidgetProps

### Community 89 - "collapsible-04.tsx"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: can u test test https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.0, Source Nodes

### Community 90 - "input-otp-09.tsx"
Cohesion: 0.33
Nodes (5): AnimatedOTPProps, CustomOTPSlot(), InputOTPDemo(), primaryColorMix(), SPRING_TRANSITION

### Community 91 - "tabs-01.tsx"
Cohesion: 0.29
Nodes (5): FadeInStack(), FadeInStackProps, Tab, tabs, TabsProps

### Community 93 - "toggle-group.tsx"
Cohesion: 0.43
Nodes (5): ToggleGroup(), ToggleGroupContext, ToggleGroupItem(), Toggle(), toggleVariants

### Community 94 - "verify-package.mjs"
Cohesion: 0.33
Nodes (5): cjs, expectedExports, require, requiredArtifacts, root

### Community 98 - "checkbox-09.tsx"
Cohesion: 0.33
Nodes (3): CheckboxProps, CheckedState, items

### Community 100 - "context-menu-02.tsx"
Cohesion: 0.33
Nodes (4): ContextMenuBubble(), ContextMenuBubbleItem, ContextMenuBubbleProps, demoItems

### Community 101 - "input-19.tsx"
Cohesion: 0.33
Nodes (5): AnimatedCheckmarkCircle(), AnimatedCheckmarkCircleProps, AnimatedFormProps, getStrokeColorClass(), InputWithAnimatedCheckmark()

### Community 102 - "motion-radio-group.tsx"
Cohesion: 0.47
Nodes (3): RadioGroup(), RadioGroupItem(), RadioGroupItemProps

### Community 103 - "shine-border-04.tsx"
Cohesion: 0.33
Nodes (4): ShineBorder(), ShineBorderProps, stats, StatsCard()

### Community 104 - "tooltip-01.tsx"
Cohesion: 0.53
Nodes (3): HoverCard(), HoverCardContent(), HoverCardTrigger()

### Community 105 - "Q: i want to make this as package. i will has react, nuxtjs vue, and homepage document. can u help me with this. for now we focus on react or vite first"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: i want to make this as package. i will has react, nuxtjs vue, and homepage document. can u help me with this. for now we focus on react or vite first, Source Nodes

### Community 106 - "Q: wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: wait i think if can make it as react, vue might be better right. so nuxt,next can be use this as well?, Source Nodes

### Community 107 - "Q: audit our design kit. what can we do better. i mean engineering behind and structure"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: audit our design kit. what can we do better. i mean engineering behind and structure, Source Nodes

### Community 108 - "files"
Cohesion: 0.40
Nodes (5): files, CHANGELOG.md, dist, LICENSE, README.md

### Community 109 - "animated-text-07.tsx"
Cohesion: 0.15
Nodes (19): AppSidebar(), navData, NavItem, NavMain(), SiteHeader(), NavMain(), navData, NavItem (+11 more)

### Community 113 - "hero.tsx"
Cohesion: 0.40
Nodes (4): ITEMS, TransitionPanel(), TransitionPanelProps, TransitionTabMotion()

### Community 114 - "spinner-07.tsx"
Cohesion: 0.40
Nodes (4): containerVariants, OrbitalSpinner, OrbitalSpinnerProps, sizeConfig

### Community 117 - "badge-08.tsx"
Cohesion: 0.50
Nodes (3): LETTER_VARIANTS, MotionBadge, PendingBadgeDemo()

### Community 125 - "vercel.json"
Cohesion: 0.50
Nodes (3): buildCommand, outputDirectory, $schema

### Community 164 - "navbar.tsx"
Cohesion: 0.20
Nodes (5): Navbar(), NavbarProps, navData, NavLinkItem, NavLinkProps

### Community 166 - "dropdown-menu-01.tsx"
Cohesion: 0.25
Nodes (5): LOGOUT_ITEM, MenuItem, PROFILE_ITEMS, Props, SETTINGS_ITEMS

### Community 170 - "shine-border-03.tsx"
Cohesion: 0.33
Nodes (4): FeatureCard(), features, ShineBorder(), ShineBorderProps

### Community 171 - "Q: so when i redeploy will vercel show docs pages. can u run this project local as well."
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: so when i redeploy will vercel show docs pages. can u run this project local as well., Source Nodes

## Knowledge Gaps
- **622 isolated node(s):** `name`, `version`, `description`, `type`, `main` (+617 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `package.json` (4× useful, score=3.997814315) _(code changed — re-verify)_
- `componentDocs.tsx` (3× useful, score=2.99792293)
- `WebCatalog.tsx` (3× useful, score=2.99792293)
- `styles.d.ts` (2× useful, score=1.99869168)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Component Gallery and Primitives`, `iOS Components`, `cn`, `command.tsx`, `main.tsx`, `sheet-04.tsx`, `WebComponents.tsx`, `button.tsx`, `label.tsx`, `autocomplete.tsx`, `avatar.tsx`, `badge.tsx`, `utils.ts`, `card-08.tsx`, `calendar.tsx`, `user-dropdown.tsx`, `code-block.tsx`, `card.tsx`, `kbd-03.tsx`, `dialog.tsx`, `combobox.tsx`, `about-us.tsx`, `sidebar.tsx`, `product-overview.tsx`, `top-product-table.tsx`, `collapsible-03.tsx`, `alert.tsx`, `field.tsx`, `chart.tsx`, `index.tsx`, `spaceExamples.tsx`, `Card`, `carousel.tsx`, `checkbox.tsx`, `input-otp.tsx`, `navbar.tsx`, `breadcrumb.tsx`, `popover-03.tsx`, `context-menu.tsx`, `animated-list-03.tsx`, `card-14.tsx`, `button-group.tsx`, `pagination.tsx`, `tooltip.tsx`, `navbar.tsx`, `radio-group-06.tsx`, `multi-select.tsx`, `marquee.tsx`, `widget.tsx`, `form.tsx`, `skeleton.tsx`, `drawer.tsx`, `bentogrid.tsx`, `file-upload-01.tsx`, `sonner-06.tsx`, `product-card.tsx`, `command-07.tsx`, `componentMaturity.ts`, `animated-list-01.tsx`, `dropdown-menu-03.tsx`, `index.ts`, `apple-dock.tsx`, `autocomplete-05.tsx`, `contact-info.tsx`, `product-category.tsx`, `input-otp-09.tsx`, `tabs-01.tsx`, `icons.tsx`, `toggle-group.tsx`, `cta.tsx`, `product-category.tsx`, `checkbox-09.tsx`, `context-menu-02.tsx`, `input-19.tsx`, `motion-radio-group.tsx`, `shine-border-04.tsx`, `animated-text-07.tsx`, `cta.tsx`, `hero.tsx`, `spinner-07.tsx`, `number-ticker-01.tsx`, `number-ticker-02.tsx`, `number-ticker-03.tsx`, `number-ticker-04.tsx`, `spinning-text-01.tsx`, `navbar.tsx`, `dropdown-menu-01.tsx`, `shine-border-03.tsx`, `avatar-07.tsx`, `animated-text-06.tsx`?**
  _High betweenness centrality (0.391) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `command.tsx`, `sheet-04.tsx`, `button.tsx`, `label.tsx`, `autocomplete.tsx`, `avatar.tsx`, `separator.tsx`, `badge.tsx`, `utils.ts`, `card-08.tsx`, `calendar.tsx`, `user-dropdown.tsx`, `code-block.tsx`, `card.tsx`, `kbd-03.tsx`, `dialog.tsx`, `combobox.tsx`, `react`, `about-us.tsx`, `sidebar.tsx`, `product-overview.tsx`, `top-product-table.tsx`, `collapsible-03.tsx`, `alert.tsx`, `field.tsx`, `chart.tsx`, `index.tsx`, `Card`, `carousel.tsx`, `checkbox.tsx`, `input-otp.tsx`, `navbar.tsx`, `breadcrumb.tsx`, `salesbycountrywidget.tsx`, `popover-03.tsx`, `animated-list-03.tsx`, `card-14.tsx`, `button-group.tsx`, `pagination.tsx`, `tooltip.tsx`, `radio-group-06.tsx`, `multi-select.tsx`, `marquee.tsx`, `widget.tsx`, `form.tsx`, `skeleton.tsx`, `drawer.tsx`, `card-09.tsx`, `file-upload-01.tsx`, `sonner-06.tsx`, `product-card.tsx`, `statistics.tsx`, `componentMaturity.ts`, `animated-list-01.tsx`, `dropdown-menu-03.tsx`, `apple-dock.tsx`, `autocomplete-05.tsx`, `contact-info.tsx`, `product-category.tsx`, `widget.tsx`, `input-otp-09.tsx`, `tabs-01.tsx`, `toggle-group.tsx`, `cta.tsx`, `index.tsx`, `context-menu-01.tsx`, `context-menu-02.tsx`, `input-19.tsx`, `motion-radio-group.tsx`, `shine-border-04.tsx`, `tooltip-01.tsx`, `animated-text-07.tsx`, `hero.tsx`, `spinner-07.tsx`, `badge-08.tsx`, `number-ticker-04.tsx`, `spinning-text-01.tsx`, `navbar.tsx`, `shine-border-03.tsx`, `avatar-07.tsx`, `animated-text-06.tsx`?**
  _High betweenness centrality (0.288) - this node is a cross-community bridge._
- **Why does `keywords` connect `iOS Components` to `react`, `Date and Time Components`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _622 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Component Gallery and Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.10333333333333333 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `Project Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._