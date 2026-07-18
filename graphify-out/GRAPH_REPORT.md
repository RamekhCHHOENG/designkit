# Graph Report - tipkit-react  (2026-07-18)

## Corpus Check
- 21 files · ~7,785 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 211 nodes · 263 edges · 16 communities (15 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Component Gallery and Primitives
- iOS Components
- TypeScript Configuration
- Project Scripts
- Frontend Dependencies
- Date and Time Components
- visionOS Components
- TipKit Components
- App Icon Components
- Project Documentation
- Graphify Agent Guidance
- main.tsx
- WebComponents.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 11 edges
3. `react` - 10 edges
4. `DesignKit` - 9 edges
5. `compilerOptions` - 8 edges
6. `keywords` - 7 edges
7. `WebComponentName` - 6 edges
8. `files` - 5 edges
9. `DesignKit contributor guide` - 5 edges
10. `lib` - 4 edges

## Surprising Connections (you probably didn't know these)
- `codeFor()` --references--> `WebComponentName`  [EXTRACTED]
  src/componentDocs.tsx → src/WebCatalog.tsx
- `slugify()` --references--> `WebComponentName`  [EXTRACTED]
  src/componentDocs.tsx → src/WebCatalog.tsx

## Import Cycles
- None detected.

## Communities (16 total, 1 thin omitted)

### Community 0 - "Component Gallery and Primitives"
Cohesion: 0.15
Nodes (9): App(), Appearance, appearanceIcons, ComponentDetail(), copyText(), DetailTab, ExampleCard(), useAppearance() (+1 more)

### Community 1 - "iOS Components"
Cohesion: 0.33
Nodes (6): keywords, apple-inspired, components, design-system, typescript, ui

### Community 2 - "TypeScript Configuration"
Cohesion: 0.09
Nodes (22): DOM, DOM.Iterable, ES2020, src, compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop (+14 more)

### Community 3 - "Project Scripts"
Cohesion: 0.18
Nodes (11): scripts, build, build:docs, build:lib, dev, graph:index, graph:query, graph:update (+3 more)

### Community 5 - "Frontend Dependencies"
Cohesion: 0.12
Nodes (18): devDependencies, react, react-dom, @types/react, @types/react-dom, typescript, vite, @vitejs/plugin-react (+10 more)

### Community 7 - "Date and Time Components"
Cohesion: 0.06
Nodes (30): author, bugs, url, description, engines, node, exports, ./package.json (+22 more)

### Community 8 - "visionOS Components"
Cohesion: 0.15
Nodes (12): src/lib, ./tsconfig.json, compilerOptions, composite, declaration, declarationDir, declarationMap, emitDeclarationOnly (+4 more)

### Community 9 - "TipKit Components"
Cohesion: 0.40
Nodes (4): [0.1.0] - 2026-07-18, Added, Changelog, [Unreleased]

### Community 11 - "Project Documentation"
Cohesion: 0.20
Nodes (9): Button examples, DesignKit, Install, License, Local development, Public components, Quick start, Release (+1 more)

### Community 12 - "Graphify Agent Guidance"
Cohesion: 0.33
Nodes (5): Commands, Conventions, DesignKit contributor guide, Graphify, Source layout

### Community 14 - "main.tsx"
Cohesion: 0.14
Nodes (14): codeFor(), ComponentDoc, componentDocs, ComponentExample, componentGroups, ComponentStatus, descriptions, groupMembers (+6 more)

### Community 17 - "WebComponents.tsx"
Cohesion: 0.08
Nodes (33): react, Badge, BadgeProps, BadgeTone, BadgeVariant, Button, ButtonColor, ButtonProps (+25 more)

## Knowledge Gaps
- **103 isolated node(s):** `name`, `version`, `description`, `type`, `main` (+98 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `WebComponents.tsx` to `Component Gallery and Primitives`, `iOS Components`, `main.tsx`?**
  _High betweenness centrality (0.285) - this node is a cross-community bridge._
- **Why does `keywords` connect `iOS Components` to `WebComponents.tsx`, `Date and Time Components`?**
  _High betweenness centrality (0.260) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Frontend Dependencies` to `Date and Time Components`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _103 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Component Gallery and Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._