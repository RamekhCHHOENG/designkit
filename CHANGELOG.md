# Changelog

## 1.3.0

### Minor Changes

- **Top 50 UI Systems Gap Closure & Dual-Framework Parity:**
  - Implemented 8 new universal primitives across React 19 and Vue 3 / Nuxt 4:
    - `AutoComplete`: Combobox with asynchronous search query, highlighted matches, and keyboard navigation.
    - `ChatContainer`: AI chat feed with automatic auto-scroll pinned to bottom, smooth user scrolling, and bottom anchor.
    - `CardChoice` (`RadioCard` & `CheckboxCard`): Interactive selection cards with icon, badge, title, description, and accessibility checked states.
    - `TimePicker`: 12h/24h time selection with AM/PM toggle and customizable stepping.
    - `ToolCallCard`: Collapsible AI agent tool-call execution card with duration, status badges, and expandable input/output payloads.
    - `TreeSelect`: Hierarchical tree browser embedded in popover dropdown with multi-select and path selection.
    - `Popconfirm`: Compact inline confirmation bubble wrapping triggers to prevent accidental destructive actions.
    - `Terminal`: macOS dark/light terminal window with tab navigation, copy button, status dots, and command stream output.
  - Expanded library primitives from 127 to 135 (with 615 items registered in `registry.json` and 617 shadcn CLI endpoints under `public/r/`).
  - Added interactive sample showcases for all new components with full-screen inspection modals and copy-to-clipboard code viewer.
  - New brand identity: redesigned modern Apple-inspired vector logo, favicon, and dark/light SVG assets.
  - Security audit and vulnerability fixes with zero critical vulnerabilities.
  - 100/100 Vitest tests passing and 1,866 Nuxt static routes prerendered cleanly.

## 1.2.0

### Minor Changes

- Enrich DesignKit with 26 enterprise and modern web UI primitives:
  - Form & Inputs: SegmentedControl, NumberInput, PasswordInput, PhoneInput, PaymentInput, TagsInput, ColorPicker, Rating, FileDropzone, MultiSelect.
  - Hierarchy & Navigation: Tree (TreeView/FileTree), Stepper, Timeline, Tour.
  - Data Display & Content: Statistic, Descriptions, RingProgress, CodeBlock, Tag, Spoiler, CopyButton.
  - Enterprise Operations & Feedback: QRCode, Watermark, Result, FloatButton, ImageCropper.
  - Rebuilt registry.json and 572 shadcn-compatible CLI artifacts under public/r/.
  - Added full test coverage (54 unit tests) and verified library packaging.

## 1.1.3

### Patch Changes

- Add complete React & Vue parity, full UI primitive suite, styles.css export, and hard test suites across 1,980 components and examples.

## 1.1.2

### Patch Changes

- 548c591: Publish the verified React component package to npm with automated versioning, changelog generation, and GitHub releases.

All notable changes to DesignKit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-07-18

### Added

- Initial public React package structure with ESM, CommonJS, CSS, and TypeScript declarations.
- Apple-inspired Button, Badge, Input, Card, Drawer, and DataTable components.
- Web documentation catalog with interactive component stories.
- Automated build validation and release-based npm publishing workflows.

[Unreleased]: https://github.com/RamekhCHHOENG/designkit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/RamekhCHHOENG/designkit/releases/tag/v0.1.0
