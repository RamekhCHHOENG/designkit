# Graph Report - tipkit-react  (2026-08-08)

## Corpus Check
- 569 files · ~148,835 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2348 nodes · 5533 edges · 180 communities (136 shown, 44 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.52)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `72e61d78`
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
- nav-main.tsx
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
- user-dropdown.tsx
- badge-08.tsx
- number-ticker-01.tsx
- number-ticker-02.tsx
- number-ticker-03.tsx
- number-ticker-04.tsx
- spinning-text-01.tsx
- tooltip-03.tsx
- index.tsx
- vercel.json
- team.tsx
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
- portfolio.tsx
- typescript
- vaul
- vite
- vitest
- verify-release-version.mjs
- Confetti
- navbar.tsx
- SpaceErrorBoundary
- dropdown-menu-01.tsx
- cmdk
- embla-carousel-react
- @faker-js/faker
- shine-border-03.tsx
- Q: so when i redeploy will vercel show docs pages. can u run this project local as well.
- avatar-07.tsx
- animated-text-06.tsx
- simplebar-react
- tailwindcss
- @tailwindcss/postcss
- tw-animate-css

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

## Communities (180 total, 44 thin omitted)

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
Cohesion: 0.11
Nodes (19): scripts, build, build:docs, build:lib, changeset, dev, graph:index, graph:query (+11 more)

### Community 4 - "cn"
Cohesion: 0.04
Nodes (58): ButtonDemo(), ButtonDemo(), DateAndTimePickerDemo(), InputEndInlineButtonDemo(), InputWithAnimatedCheckmark(), FloatingLabel(), OrbitingCircleIcons(), OrbitingCirclesDemo() (+50 more)

### Community 5 - "Frontend Dependencies"
Cohesion: 0.29
Nodes (7): react, react-dom, peerDependencies, react, react-dom, react, react-dom

### Community 6 - "command.tsx"
Cohesion: 0.07
Nodes (42): techStack, ComboboxDeploymentRegionDemo(), regions, ComboboxWithAddButtonDemo(), organizations, users, countries, CommandMenuGroup (+34 more)

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
Cohesion: 0.11
Nodes (18): blockDocs, codeFor(), ComponentExample, ComponentStatus, descriptions, groupMembers, groupOrder, mappedSlugs (+10 more)

### Community 15 - "sheet-04.tsx"
Cohesion: 0.22
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea()

### Community 17 - "WebComponents.tsx"
Cohesion: 0.06
Nodes (38): Badge, BadgeProps, BadgeTone, BadgeVariant, Button, ButtonColor, ButtonProps, ButtonSize (+30 more)

### Community 19 - "button.tsx"
Cohesion: 0.05
Nodes (8): InteractiveHoverButton, InteractiveHoverButtonProps, currencies, Button(), ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants

### Community 20 - "label.tsx"
Cohesion: 0.08
Nodes (9): react, CardNumberInputMask(), formatCardNumber(), CardExpiryInputMask(), formatExpiry(), formatMac(), MacAddressInputMask(), Input() (+1 more)

### Community 21 - "autocomplete.tsx"
Cohesion: 0.07
Nodes (38): frameworks, groups, languages, AutocompleteDemo(), cities, AutocompleteDemo(), GROUP_ORDER, SPRING (+30 more)

### Community 22 - "avatar.tsx"
Cohesion: 0.08
Nodes (18): SelectableAvatar, SelectableAvatarProps, avatars, AvatarStack(), AvatarStackItem, AvatarStackProps, getInitials(), BadgeWithAvatarProps (+10 more)

### Community 24 - "badge.tsx"
Cohesion: 0.08
Nodes (11): LETTER_VARIANTS, MotionBadge, SuccessBadgeDemo(), LETTER_VARIANTS, MotionBadge, PendingBadgeDemo(), FailedBadgeDemo(), LETTER_VARIANTS (+3 more)

### Community 25 - "utils.ts"
Cohesion: 0.04
Nodes (29): defaultSteps, SetupSteps(), SetupStepsProps, StepItem, AnimatedTextRoller(), greetings, TextShimmerWave(), TextShimmerWaveProps (+21 more)

### Community 26 - "card-08.tsx"
Cohesion: 0.11
Nodes (13): ContactFormData, socials, statuses, users, SelectContent(), SelectGroup(), SelectItem(), SelectLabel() (+5 more)

### Community 27 - "calendar.tsx"
Cohesion: 0.09
Nodes (16): endOfMonth, now, selectedDates, startOfMonth, bookedDays, endOfMonth, now, startOfMonth (+8 more)

### Community 28 - "user-dropdown.tsx"
Cohesion: 0.29
Nodes (7): Breadcrumb(), BreadcrumbEllipsis(), BreadcrumbItem(), BreadcrumbLink(), BreadcrumbList(), BreadcrumbPage(), BreadcrumbSeparator()

### Community 29 - "code-block.tsx"
Cohesion: 0.07
Nodes (18): files, tabs, buildCommand(), CodeBlock(), CodeBlockProps, CodeRenderer(), FileEntry, injectStyles() (+10 more)

### Community 30 - "devDependencies"
Cohesion: 0.05
Nodes (39): @base-ui/react, @changesets/cli, class-variance-authority, clsx, @iconify/react, input-otp, jsdom, lucide-react (+31 more)

### Community 31 - "card.tsx"
Cohesion: 0.11
Nodes (12): VerifyEmail(), ProductCard(), AudioState, data, pricingData, PricingPlan, ShineBorder(), ShineBorderProps (+4 more)

### Community 32 - "kbd-03.tsx"
Cohesion: 0.07
Nodes (16): Platform, Platform, Platform, Platform, KbdGeneratorDemo(), MAC_MODIFIERS, Platform, WIN_MODIFIERS (+8 more)

### Community 33 - "dialog.tsx"
Cohesion: 0.15
Nodes (14): endOfMonth, from, now, startOfMonth, to, Dialog(), DialogClose(), DialogContent() (+6 more)

### Community 34 - "combobox.tsx"
Cohesion: 0.14
Nodes (18): AssignTaskCard(), User, users, ComboboxChip(), ComboboxChips(), ComboboxChipsInput(), ComboboxClear(), ComboboxContent() (+10 more)

### Community 36 - "about-us.tsx"
Cohesion: 0.07
Nodes (20): SplashCursor(), AboutUs(), aboutusData, instrumentSerif, statisticsCounter, AboutAndStats01(), aboutusData, statisticsCounter (+12 more)

### Community 37 - "sidebar.tsx"
Cohesion: 0.14
Nodes (17): Sidebar(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroupAction(), SidebarGroupContent(), SidebarInput(), SidebarInset() (+9 more)

### Community 38 - "product-overview.tsx"
Cohesion: 0.13
Nodes (18): AccordionDemo(), data, AccordionFaqDemo(), FAQ_DATA, AccordionCardDemo(), items, items, items (+10 more)

### Community 39 - "top-product-table.tsx"
Cohesion: 0.10
Nodes (24): ProjectData, TableAction, TopProductTable(), ProjectData, TableAction, TableComp(), SkillsProgress(), stats (+16 more)

### Community 40 - "collapsible-03.tsx"
Cohesion: 0.10
Nodes (24): AccordionMultiLevelDemo(), items, changeConfig, ChangeType, CollapsibleChangelog(), Release, releases, CollapsibleDashboardSidebar() (+16 more)

### Community 41 - "alert.tsx"
Cohesion: 0.10
Nodes (16): ALERT_STYLES, AlertGradientDemoProps, AlertItem, DEFAULT_ALERTS, Alert(), AlertAction(), AlertDescription(), AlertTitle() (+8 more)

### Community 42 - "field.tsx"
Cohesion: 0.07
Nodes (11): LoginForm(), RegisterForm(), socials, skills, Checkbox(), Field(), FieldDescription(), FieldGroup() (+3 more)

### Community 43 - "chart.tsx"
Cohesion: 0.09
Nodes (20): Chart01(), chartData, Chart02(), chartData, chartData, chartData, EarningReportChart(), chartData (+12 more)

### Community 44 - "index.tsx"
Cohesion: 0.14
Nodes (17): tabs, TabsWithIconProps, tabs, TabsWithCountProps, tabs, TabsUnderline(), transition, variants (+9 more)

### Community 45 - "spaceExamples.tsx"
Cohesion: 0.10
Nodes (25): categories, components, buildCategories(), copyText(), exampleLabel(), exampleModules, exampleSources, GlobModule (+17 more)

### Community 46 - "Card"
Cohesion: 0.14
Nodes (11): colorMap, events, formatTimeRange(), WithEventListDemo(), RangeSelectionDemo(), contributors, colors, EcommerceProductCard() (+3 more)

### Community 47 - "carousel.tsx"
Cohesion: 0.11
Nodes (23): brandList, defaultTestimonials, Testimonial01(), defaultTestimonials, Testimonial, Testimonial01Props, CarouselCustomDots(), images (+15 more)

### Community 48 - "checkbox.tsx"
Cohesion: 0.13
Nodes (4): userImg, CreditCardDemo(), reviews, CardContent()

### Community 49 - "input-otp.tsx"
Cohesion: 0.23
Nodes (4): InputOTP(), InputOTPGroup(), InputOTPSeparator(), InputOTPSlot()

### Community 50 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (8): chartData, COLORS, MenuItem, NotificationDropdown(), PROFILE_ITEMS, Props, DropdownMenu(), DropdownMenuItem()

### Community 51 - "navbar.tsx"
Cohesion: 0.07
Nodes (35): Logo(), Header(), HeaderProps, Navbar(), NavbarProps, navData, NavLinkItem, NavLinkProps (+27 more)

### Community 52 - "breadcrumb.tsx"
Cohesion: 0.09
Nodes (22): DropdownMenuCheckboxItem(), DropdownMenuGroup(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+14 more)

### Community 53 - "salesbycountrywidget.tsx"
Cohesion: 0.29
Nodes (6): DashboardMetric, MainDashboardData, secondaryStatsData, StatisticsBlock(), StatisticsBlockProps, StatItem

### Community 54 - "popover-03.tsx"
Cohesion: 0.14
Nodes (16): ComboboxTimezoneDemo(), getFormattedTimezones(), DateRangePickerDemo(), initialNotifications, NotificationItem(), NotificationType, typeConfig, PopoverDownloadDemo() (+8 more)

### Community 55 - "context-menu.tsx"
Cohesion: 0.20
Nodes (8): Header(), NavbarProps, navData, Language, LANGUAGES, Props, DropdownMenuContent(), DropdownMenuTrigger()

### Community 56 - "animated-list-03.tsx"
Cohesion: 0.13
Nodes (12): buttonVariant, CARD_CONFIGS, createIcon(), iconVariant, popup1Variant, popup2Variant, popup3Variant, SPRING_TRANSITION (+4 more)

### Community 57 - "card-14.tsx"
Cohesion: 0.22
Nodes (6): ServiceItem, Services(), servicesData, ServicesProps, Image, NextImageProps

### Community 58 - "button-group.tsx"
Cohesion: 0.20
Nodes (9): access, baseBranch, changelog, commit, fixed, ignore, linked, $schema (+1 more)

### Community 59 - "pagination.tsx"
Cohesion: 0.30
Nodes (10): FloatingPill(), PremiumRibbon(), Pagination(), PaginationContent(), PaginationEllipsis(), PaginationItem(), PaginationLink(), PaginationLinkProps (+2 more)

### Community 60 - "tooltip.tsx"
Cohesion: 0.18
Nodes (7): badgeVariant, FileEntry, files, FileType, iconConfig, ScrollArea(), ScrollBar()

### Community 61 - "nav-main.tsx"
Cohesion: 0.24
Nodes (8): NavMain(), SidebarGroup(), SidebarGroupLabel(), SidebarMenuItem(), SidebarMenuSub(), SidebarMenuSubButton(), SidebarMenuSubItem(), usePathname()

### Community 62 - "navbar.tsx"
Cohesion: 0.24
Nodes (4): HeroPage(), NavLink(), NavLinkItem, NavLinkProps

### Community 63 - "testimonial.tsx"
Cohesion: 0.40
Nodes (3): CTA(), CTAProps, defaultMarqueeItems

### Community 64 - "radio-group-06.tsx"
Cohesion: 0.25
Nodes (5): Example(), plans, RadioGroupListGroupDemo(), RadioGroup(), RadioGroupItem()

### Community 65 - "multi-select.tsx"
Cohesion: 0.22
Nodes (10): technologies, CommandEmpty(), GroupOption, isOptionsExist(), MultipleSelector(), MultipleSelectorRef, Option, removePickedOption() (+2 more)

### Community 66 - "marquee.tsx"
Cohesion: 0.18
Nodes (5): Marquee(), MarqueeProps, BrandList, BrandList, BrandList

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
Cohesion: 0.36
Nodes (6): sourceFor(), ComponentMaturity, isStableReactComponent(), maturityForReactComponent(), StableReactComponentName, stableReactComponents

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
Cohesion: 0.29
Nodes (6): DEFAULT_DROPDOWN_ITEMS, DEFAULT_TRANS_DATA, DropdownItemProps, SalesByCountryWidget(), TransactionProps, WidgetProps

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

### Community 97 - "index.tsx"
Cohesion: 0.33
Nodes (3): Pricing(), pricingData, PricingPlan

### Community 98 - "checkbox-09.tsx"
Cohesion: 0.33
Nodes (3): CheckboxProps, CheckedState, items

### Community 99 - "context-menu-01.tsx"
Cohesion: 0.33
Nodes (3): Pricing(), pricingData, PricingPlan

### Community 100 - "context-menu-02.tsx"
Cohesion: 0.33
Nodes (4): ContextMenuBubble(), ContextMenuBubbleItem, ContextMenuBubbleProps, demoItems

### Community 101 - "input-19.tsx"
Cohesion: 0.40
Nodes (4): AnimatedCheckmarkCircle(), AnimatedCheckmarkCircleProps, AnimatedFormProps, getStrokeColorClass()

### Community 102 - "motion-radio-group.tsx"
Cohesion: 0.47
Nodes (3): RadioGroup(), RadioGroupItem(), RadioGroupItemProps

### Community 103 - "shine-border-04.tsx"
Cohesion: 0.11
Nodes (5): ShineBorder(), ShineBorderProps, stats, StatsCard(), Card()

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
Cohesion: 0.16
Nodes (11): AppSidebar(), navData, NavItem, SiteHeader(), NavMain(), navData, NavItem, SidebarContent() (+3 more)

### Community 111 - "index.tsx"
Cohesion: 0.29
Nodes (3): Features, Feature01(), featureData

### Community 112 - "index.tsx"
Cohesion: 0.29
Nodes (3): Features, Feature02(), featureData

### Community 113 - "hero.tsx"
Cohesion: 0.40
Nodes (4): ITEMS, TransitionPanel(), TransitionPanelProps, TransitionTabMotion()

### Community 114 - "spinner-07.tsx"
Cohesion: 0.32
Nodes (7): AutocompleteWithAsync(), matchesQuery(), Member, searchMembers(), SPRING, topMembers, AutocompleteStatus()

### Community 116 - "user-dropdown.tsx"
Cohesion: 0.29
Nodes (6): LOGOUT_ITEM, MenuItem, PROFILE_ITEMS, Props, SETTINGS_ITEMS, UserDropdown()

### Community 121 - "number-ticker-04.tsx"
Cohesion: 0.29
Nodes (6): LOGOUT_ITEM, MenuItem, PROFILE_ITEMS, ProfileDropdown(), Props, SETTINGS_ITEMS

### Community 122 - "spinning-text-01.tsx"
Cohesion: 0.29
Nodes (5): Collapsible04Props, containerVariants, defaultStats, itemVariants, StatRow

### Community 124 - "index.tsx"
Cohesion: 0.40
Nodes (3): productData, ProductOverviewBlock(), ProductOverviewData

### Community 125 - "vercel.json"
Cohesion: 0.50
Nodes (3): buildCommand, outputDirectory, $schema

### Community 128 - "@base-ui/react"
Cohesion: 0.33
Nodes (4): Dropdown(), MenuItem, PROFILE_ITEMS, Props

### Community 130 - "class-variance-authority"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: so how other people use this package @ramekhchhoeng/designkit ?, Source Nodes

### Community 131 - "@iconify/react"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: how about vue or react?, Source Nodes

### Community 132 - "lucide-react"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: verify https://github.com/RamekhCHHOENG/designkit/releases/tag/v1.1.1, Source Nodes

### Community 135 - "radix-ui"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: any way to better release, Source Nodes

### Community 138 - "recharts"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: what we need to do now?, Source Nodes

### Community 139 - "shiki"
Cohesion: 0.40
Nodes (3): defaultWords, TextMorph(), TextMorphProps

### Community 164 - "navbar.tsx"
Cohesion: 0.40
Nodes (4): AnalyticsCard(), DashboardMetric, MainDashboardData, WidgetProps

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
- **650 isolated node(s):** `$schema`, `changelog`, `commit`, `fixed`, `linked` (+645 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Work-memory lessons

**Preferred sources** — corroborated by past sessions; start here.
- `package.json` (10× useful, score=9.989901819) _(code changed — re-verify)_
- `publishConfig` (5× useful, score=4.996909451) _(code changed — re-verify)_
- `verify-release-version.mjs` (3× useful, score=2.998368093) _(code changed — re-verify)_
- `styles.d.ts` (3× useful, score=2.995882431)
- `componentDocs.tsx` (3× useful, score=2.99490465)
- `WebCatalog.tsx` (3× useful, score=2.99490465)
- `scripts` (2× useful, score=1.999335366) _(code changed — re-verify)_

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `label.tsx` to `Component Gallery and Primitives`, `iOS Components`, `cn`, `command.tsx`, `main.tsx`, `sheet-04.tsx`, `WebComponents.tsx`, `button.tsx`, `autocomplete.tsx`, `avatar.tsx`, `badge.tsx`, `utils.ts`, `card-08.tsx`, `calendar.tsx`, `user-dropdown.tsx`, `code-block.tsx`, `card.tsx`, `kbd-03.tsx`, `dialog.tsx`, `combobox.tsx`, `react`, `about-us.tsx`, `sidebar.tsx`, `product-overview.tsx`, `top-product-table.tsx`, `collapsible-03.tsx`, `alert.tsx`, `field.tsx`, `chart.tsx`, `index.tsx`, `spaceExamples.tsx`, `Card`, `carousel.tsx`, `checkbox.tsx`, `input-otp.tsx`, `dropdown-menu.tsx`, `navbar.tsx`, `breadcrumb.tsx`, `popover-03.tsx`, `context-menu.tsx`, `animated-list-03.tsx`, `card-14.tsx`, `pagination.tsx`, `tooltip.tsx`, `navbar.tsx`, `radio-group-06.tsx`, `multi-select.tsx`, `marquee.tsx`, `widget.tsx`, `form.tsx`, `skeleton.tsx`, `bentogrid.tsx`, `file-upload-01.tsx`, `sonner-06.tsx`, `product-card.tsx`, `command-07.tsx`, `componentMaturity.ts`, `animated-list-01.tsx`, `dropdown-menu-03.tsx`, `index.ts`, `apple-dock.tsx`, `autocomplete-05.tsx`, `contact-info.tsx`, `product-category.tsx`, `input-otp-09.tsx`, `tabs-01.tsx`, `icons.tsx`, `toggle-group.tsx`, `cta.tsx`, `product-category.tsx`, `checkbox-09.tsx`, `context-menu-02.tsx`, `input-19.tsx`, `motion-radio-group.tsx`, `shine-border-04.tsx`, `animated-text-07.tsx`, `cta.tsx`, `hero.tsx`, `spinner-07.tsx`, `user-dropdown.tsx`, `number-ticker-01.tsx`, `number-ticker-02.tsx`, `number-ticker-03.tsx`, `number-ticker-04.tsx`, `spinning-text-01.tsx`, `@base-ui/react`, `shiki`, `@tailwindcss/typography`, `dropdown-menu-01.tsx`, `shine-border-03.tsx`, `animated-text-03.tsx`?**
  _High betweenness centrality (0.396) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `command.tsx`, `sheet-04.tsx`, `button.tsx`, `label.tsx`, `autocomplete.tsx`, `avatar.tsx`, `separator.tsx`, `badge.tsx`, `utils.ts`, `card-08.tsx`, `calendar.tsx`, `user-dropdown.tsx`, `code-block.tsx`, `card.tsx`, `kbd-03.tsx`, `dialog.tsx`, `combobox.tsx`, `react`, `about-us.tsx`, `sidebar.tsx`, `product-overview.tsx`, `top-product-table.tsx`, `collapsible-03.tsx`, `alert.tsx`, `field.tsx`, `chart.tsx`, `index.tsx`, `Card`, `carousel.tsx`, `checkbox.tsx`, `input-otp.tsx`, `dropdown-menu.tsx`, `navbar.tsx`, `breadcrumb.tsx`, `salesbycountrywidget.tsx`, `popover-03.tsx`, `context-menu.tsx`, `animated-list-03.tsx`, `card-14.tsx`, `pagination.tsx`, `tooltip.tsx`, `nav-main.tsx`, `navbar.tsx`, `radio-group-06.tsx`, `multi-select.tsx`, `marquee.tsx`, `widget.tsx`, `form.tsx`, `skeleton.tsx`, `card-09.tsx`, `file-upload-01.tsx`, `sonner-06.tsx`, `product-card.tsx`, `statistics.tsx`, `componentMaturity.ts`, `animated-list-01.tsx`, `dropdown-menu-03.tsx`, `apple-dock.tsx`, `autocomplete-05.tsx`, `contact-info.tsx`, `product-category.tsx`, `widget.tsx`, `input-otp-09.tsx`, `tabs-01.tsx`, `toggle-group.tsx`, `cta.tsx`, `index.tsx`, `context-menu-01.tsx`, `context-menu-02.tsx`, `input-19.tsx`, `motion-radio-group.tsx`, `shine-border-04.tsx`, `tooltip-01.tsx`, `animated-text-07.tsx`, `hero.tsx`, `spinner-07.tsx`, `@base-ui/react`, `shiki`, `vite`, `navbar.tsx`, `shine-border-03.tsx`?**
  _High betweenness centrality (0.265) - this node is a cross-community bridge._
- **Why does `keywords` connect `iOS Components` to `label.tsx`, `Date and Time Components`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **What connects `$schema`, `changelog`, `commit` to the rest of the system?**
  _650 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Component Gallery and Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.10333333333333333 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
- **Should `Project Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._