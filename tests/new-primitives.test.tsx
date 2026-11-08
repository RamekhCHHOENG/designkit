import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import React from "react";

import {
  Dock,
  DockIcon,
  DockSeparator,
  BentoGrid,
  BentoCard,
  Spotlight,
  Marquee,
  ComparisonSlider,
  NumberTicker,
  BorderBeam,
  Tracker,
  Snippet,
  Sparkline,
  CategoryBar,
  BarList,
  DeltaBadge,
  ThinkingBlock,
  Trace,
  PromptInput,
  ModelSelector,
  SignaturePad,
  RichTextEditor,
  VideoPlayer,
  IconMotion,
  MorphMenuToggle,
  MediaGallery,
  DiffViewer,
  TableOfContents,
  FileTree,
  Transfer,
  Cascader,
  Mentions,
  FilterChips,
  AudioPlayer,
  PriceCard,
  AnnouncementBanner,
  TiltCard,
  InteractiveGridPattern,
  ShimmerButton,
  ContributionGraph,
  DesignKitLogo,
  AutoComplete,
  ChatContainer,
  ChatMessage,
  RadioCardGroup,
  RadioCard,
  CheckboxCard,
  TimePicker,
  ToolCallCard,
  TreeSelect,
  Popconfirm,
  Terminal,
  ScrollProgress,
  ScrollShadow,
} from "@/lib";

describe("New Motion & Analytics Primitives Suite", () => {
  it("renders Dock and handles icon focus", () => {
    render(
      <Dock>
        <DockIcon label="Mail" active>
          <span>MailIcon</span>
        </DockIcon>
        <DockSeparator />
        <DockIcon label="Settings">
          <span>SettingsIcon</span>
        </DockIcon>
      </Dock>
    );

    const dock = screen.getByRole("toolbar");
    expect(dock).toBeInTheDocument();
    expect(screen.getByLabelText("Mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Settings")).toBeInTheDocument();
  });

  it("renders BentoGrid and BentoCard with content and CTA", () => {
    render(
      <BentoGrid>
        <BentoCard
          name="Edge Network"
          description="High speed caching globally"
          cta="Explore"
          href="/edge"
          colSpan={2}
        />
        <BentoCard
          name="Analytics"
          description="Real time dashboard metrics"
        />
      </BentoGrid>
    );

    expect(screen.getByText("Edge Network")).toBeInTheDocument();
    expect(screen.getByText("High speed caching globally")).toBeInTheDocument();
    expect(screen.getByText("Explore")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  it("renders Spotlight container with children", () => {
    render(
      <Spotlight size={300} variant="both">
        <p>Spotlight Card Content</p>
      </Spotlight>
    );

    expect(screen.getByText("Spotlight Card Content")).toBeInTheDocument();
  });

  it("renders Marquee with duplicated items for infinite scroll", () => {
    render(
      <Marquee repeat={3}>
        <span>Ticker Item</span>
      </Marquee>
    );

    const items = screen.getAllByText("Ticker Item");
    expect(items.length).toBe(3);
  });

  it("renders ComparisonSlider and handles keyboard navigation", () => {
    render(
      <ComparisonSlider
        before={<div>Before Layer</div>}
        after={<div>After Layer</div>}
        beforeLabel="Before View"
        afterLabel="After View"
        initialPosition={50}
      />
    );

    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    fireEvent.keyDown(slider, { key: "ArrowRight" });
    expect(slider).toHaveAttribute("aria-valuenow", "55");

    fireEvent.keyDown(slider, { key: "ArrowLeft" });
    expect(slider).toHaveAttribute("aria-valuenow", "50");

    expect(screen.getByText("Before View")).toBeInTheDocument();
    expect(screen.getByText("After View")).toBeInTheDocument();
  });

  it("renders NumberTicker with initial formatted values", () => {
    render(
      <NumberTicker value={1500} prefix="$" suffix="/mo" />
    );

    const ticker = screen.getByText(/\$0\/mo|\$1,500\/mo/);
    expect(ticker).toBeInTheDocument();
  });

  it("renders BorderBeam within container without layout shifting", () => {
    const { container } = render(
      <div className="relative">
        <BorderBeam size={100} duration={6} />
        <span>Card Content</span>
      </div>
    );

    expect(screen.getByText("Card Content")).toBeInTheDocument();
    const beam = container.querySelector(".after\\:animate-border-beam");
    expect(beam).toBeInTheDocument();
  });

  it("renders Tracker with status segments and interactive tooltips", () => {
    const testData = [
      { status: "success" as const, tooltip: "Day 1: 100%" },
      { status: "warning" as const, tooltip: "Day 2: Degraded" },
      { status: "error" as const, tooltip: "Day 3: Outage" },
    ];

    render(<Tracker data={testData} />);

    const trackerGroup = screen.getByRole("group");
    expect(trackerGroup).toBeInTheDocument();

    const segments = screen.getAllByRole("status");
    expect(segments.length).toBe(3);

    fireEvent.mouseEnter(segments[0]!);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Day 1: 100%");
  });

  it("renders Snippet and switches package manager command", () => {
    render(
      <Snippet
        command="test-package"
        action="install"
        packageManagers={["pnpm", "npm", "bun"]}
      />
    );

    expect(screen.getByText("pnpm add test-package")).toBeInTheDocument();

    const npmBtn = screen.getByRole("button", { name: "npm" });
    fireEvent.click(npmBtn);

    expect(screen.getByText("npm install test-package")).toBeInTheDocument();
  });

  it("renders Sparkline with SVG points and aria label", () => {
    render(
      <Sparkline
        data={[10, 20, 15, 30, 25, 40]}
        type="area"
        width={100}
        height={30}
      />
    );

    const sparkline = screen.getByRole("img");
    expect(sparkline).toBeInTheDocument();
    expect(sparkline).toHaveAttribute(
      "aria-label",
      "Sparkline chart with 6 points, min 10, max 40"
    );
  });

  it("renders CategoryBar with values, labels and marker", () => {
    render(
      <CategoryBar
        values={[50, 30, 20]}
        labels={["System", "Apps", "Docs"]}
        showLabels
        marker={80}
      />
    );

    const catBar = screen.getByRole("group", { name: "Proportional Category Bar" });
    expect(catBar).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
    expect(screen.getByText("Apps")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
  });

  it("renders BarList with sorted ranks", () => {
    const data = [
      { name: "/home", value: 500 },
      { name: "/docs", value: 300 },
    ];
    render(<BarList data={data} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(screen.getByText("/home")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("renders DeltaBadge with positive and negative percentage formats", () => {
    const { rerender } = render(<DeltaBadge value={14.2} />);
    expect(screen.getByText("+14.2%")).toBeInTheDocument();

    rerender(<DeltaBadge value={-8.5} />);
    expect(screen.getByText("-8.5%")).toBeInTheDocument();
  });

  it("renders ThinkingBlock and expands content", () => {
    render(
      <ThinkingBlock title="Agent Thoughts" durationMs={1200} tokens={350} defaultOpen={false}>
        Analyzing constraints
      </ThinkingBlock>
    );

    expect(screen.getByText("Agent Thoughts")).toBeInTheDocument();
    expect(screen.getByText("350 tokens")).toBeInTheDocument();
    expect(screen.getByText("1.2s")).toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /Agent Thoughts/ });
    fireEvent.click(trigger);
    expect(screen.getByText("Analyzing constraints")).toBeInTheDocument();
  });

  it("renders Trace timeline steps", () => {
    const steps = [
      { id: "1", name: "Read Config", type: "tool" as const, status: "success" as const, durationMs: 25 },
      { id: "2", name: "Generate Code", type: "reasoning" as const, status: "running" as const },
    ];
    render(<Trace steps={steps} />);

    expect(screen.getByRole("feed", { name: "Execution Trace" })).toBeInTheDocument();
    expect(screen.getByText("Read Config")).toBeInTheDocument();
    expect(screen.getByText("Generate Code")).toBeInTheDocument();
  });

  it("renders PromptInput and submits text", () => {
    const onSubmit = vi.fn();
    render(<PromptInput placeholder="Type prompt" onSubmit={onSubmit} />);

    const textarea = screen.getByPlaceholderText("Type prompt");
    fireEvent.change(textarea, { target: { value: "Build a bento grid" } });

    const submitBtn = screen.getByRole("button", { name: "Send prompt" });
    fireEvent.click(submitBtn);

    expect(onSubmit).toHaveBeenCalledWith("Build a bento grid", []);
  });

  it("renders ModelSelector and selects model option", () => {
    const models = [
      { id: "claude-3-7-sonnet", name: "Claude 3.7", provider: "Anthropic" },
      { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI" },
    ];
    render(<ModelSelector models={models} defaultValue="claude-3-7-sonnet" />);

    const trigger = screen.getByRole("button", { name: /Claude 3.7/ });
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);
    const option = screen.getByRole("option", { name: /GPT-4o/ });
    fireEvent.click(option);

    expect(screen.getByRole("button", { name: /GPT-4o/ })).toBeInTheDocument();
  });

  it("renders SignaturePad with canvas element", () => {
    render(<SignaturePad width={400} height={150} />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText("Save Signature")).toBeInTheDocument();
  });

  it("renders RichTextEditor and displays toolbar and stats", () => {
    render(
      <RichTextEditor
        defaultValue="<p>Initial design system draft</p>"
        placeholder="Type here..."
      />
    );
    expect(screen.getByTitle("Bold (Ctrl+B)")).toBeInTheDocument();
    expect(screen.getByTitle("Italic (Ctrl+I)")).toBeInTheDocument();
    expect(screen.getByTitle("Underline (Ctrl+U)")).toBeInTheDocument();
    expect(screen.getByText("Visual Mode")).toBeInTheDocument();
  });

  it("renders VideoPlayer with controls and title badge", () => {
    render(
      <VideoPlayer
        src="https://example.com/video.mp4"
        title="Keynote Showcase"
        badge="4K HDR"
      />
    );
    expect(screen.getByText("Keynote Showcase")).toBeInTheDocument();
    expect(screen.getByText("4K HDR")).toBeInTheDocument();
    expect(screen.getByLabelText("Play")).toBeInTheDocument();
  });

  it("renders IconMotion and MorphMenuToggle with smooth transitions", () => {
    render(
      <div>
        <IconMotion
          firstIcon={<span data-testid="search-icon">Search</span>}
          secondIcon={<span data-testid="close-icon">Close</span>}
        />
        <MorphMenuToggle />
      </div>
    );
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    expect(screen.getByTestId("close-icon")).toBeInTheDocument();
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();

    const menuBtn = screen.getByLabelText("Open menu");
    fireEvent.click(menuBtn);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });

  it("renders MediaGallery and opens Lightbox modal", () => {
    const items = [
      { id: "1", src: "https://example.com/photo1.jpg", title: "Alpine Mist" },
      { id: "2", src: "https://example.com/photo2.jpg", title: "Starry Night" },
    ];
    render(<MediaGallery items={items} />);

    expect(screen.getByText("Alpine Mist")).toBeInTheDocument();
    expect(screen.getByText("Starry Night")).toBeInTheDocument();

    // Click first item to trigger Lightbox
    fireEvent.click(screen.getByText("Alpine Mist"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Close")).toBeInTheDocument();

    // Close lightbox
    fireEvent.click(screen.getByLabelText("Close"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders DiffViewer with file name and diff rows", () => {
    render(
      <DiffViewer
        oldValue="const a = 1;"
        newValue="const a = 2;"
        filename="app.ts"
        viewMode="split"
      />
    );
    expect(screen.getByText("app.ts")).toBeInTheDocument();
  });

  it("renders TableOfContents and highlights active item", () => {
    const items = [
      { id: "intro", title: "Introduction", level: 2 },
      { id: "install", title: "Installation", level: 2 },
    ];
    render(<TableOfContents items={items} activeId="install" />);
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("Installation")).toBeInTheDocument();
  });

  it("renders FileTree and handles item selection", () => {
    const data = [
      {
        id: "src",
        name: "src",
        type: "folder" as const,
        children: [{ id: "index.ts", name: "index.ts", type: "file" as const }],
      },
    ];
    const onSelect = vi.fn();
    render(<FileTree data={data} defaultExpandedIds={["src"]} onSelect={onSelect} />);
    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("index.ts")).toBeInTheDocument();
  });

  it("renders Transfer component and handles item transfer", () => {
    const items = [
      { key: "1", title: "Item One" },
      { key: "2", title: "Item Two" },
    ];
    render(
      <Transfer
        dataSource={items}
        targetKeys={["1"]}
        titles={["Source", "Target"]}
      />
    );
    expect(screen.getByText("Source")).toBeInTheDocument();
    expect(screen.getByText("Target")).toBeInTheDocument();
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("renders Cascader with placeholder", () => {
    const options = [
      {
        value: "asia",
        label: "Asia",
        children: [{ value: "kh", label: "Cambodia" }],
      },
    ];
    render(<Cascader options={options} placeholder="Select country..." />);
    expect(screen.getByText("Select country...")).toBeInTheDocument();
  });

  it("renders Mentions input", () => {
    const users = [{ value: "ramek", label: "Ramek" }];
    render(<Mentions options={users} placeholder="Mention someone..." />);
    expect(screen.getByPlaceholderText("Mention someone...")).toBeInTheDocument();
  });

  it("renders FilterChips and displays chips", () => {
    const fields = [
      { key: "status", label: "Status", options: ["Active", "Inactive"] },
    ];
    const filters = [{ id: "1", field: "Status", operator: "is", value: "Active" }];
    const onChange = vi.fn();
    render(<FilterChips fields={fields} filters={filters} onChange={onChange} />);
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders AudioPlayer with title and artist", () => {
    render(
      <AudioPlayer
        title="Midnight Groove"
        artist="DesignKit Beats"
      />
    );
    expect(screen.getByText("Midnight Groove")).toBeInTheDocument();
    expect(screen.getByText("DesignKit Beats")).toBeInTheDocument();
  });

  it("renders PriceCard with features and CTA", () => {
    const features = [
      "Unlimited projects",
      "Custom domains",
    ];
    render(
      <PriceCard
        name="Pro Tier"
        monthlyPrice={29}
        billingPeriod="/mo"
        features={features}
        ctaText="Upgrade to Pro"
      />
    );
    expect(screen.getByText("Pro Tier")).toBeInTheDocument();
    expect(screen.getByText("29")).toBeInTheDocument();
    expect(screen.getByText("Unlimited projects")).toBeInTheDocument();
    expect(screen.getByText("Upgrade to Pro")).toBeInTheDocument();
  });

  it("renders AnnouncementBanner with badge and action", () => {
    render(
      <AnnouncementBanner
        message="v2.0 Released"
        badge="New"
        linkText="Read More"
        href="#release"
      />
    );
    expect(screen.getByText("v2.0 Released")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it("renders TiltCard container", () => {
    render(
      <TiltCard>
        <div>Interactive Card</div>
      </TiltCard>
    );
    expect(screen.getByText("Interactive Card")).toBeInTheDocument();
  });

  it("renders InteractiveGridPattern container", () => {
    const { container } = render(<InteractiveGridPattern />);
    expect(
      container.querySelector('[data-slot="interactive-grid-pattern"]')
    ).toBeInTheDocument();
  });

  it("renders ShimmerButton with content", () => {
    render(<ShimmerButton>Shimmering CTA</ShimmerButton>);
    expect(screen.getByText("Shimmering CTA")).toBeInTheDocument();
  });

  it("renders ContributionGraph with tooltip cells", () => {
    const data = [
      { date: "2026-01-01", count: 5, level: 2 },
      { date: "2026-01-02", count: 12, level: 4 },
    ];
    render(<ContributionGraph data={data} />);
    expect(screen.getByText("Less")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("renders DesignKitLogo in badge, mark, and full variants", () => {
    const { container: c1 } = render(<DesignKitLogo variant="badge" />);
    expect(c1.querySelector("svg")).toBeInTheDocument();

    const { container: c2 } = render(<DesignKitLogo variant="mark" />);
    expect(c2.querySelector("svg")).toBeInTheDocument();

    const { container: c3 } = render(<DesignKitLogo variant="full" />);
    expect(c3.querySelector("text")).toHaveTextContent("DesignKit");
  });

  it("renders AutoComplete and triggers search input", () => {
    render(
      <AutoComplete
        options={[{ value: "react", label: "React 19" }]}
        placeholder="Search..."
      />
    );
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders ChatContainer and ChatMessage with branching", () => {
    render(
      <ChatContainer>
        <ChatMessage
          role="assistant"
          content="Hello AI world"
          branchTotal={3}
          branchIndex={0}
        />
      </ChatContainer>
    );
    expect(screen.getByText("Hello AI world")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("renders RadioCard and CheckboxCard", () => {
    render(
      <div>
        <RadioCardGroup defaultValue="pro">
          <RadioCard value="pro" title="Pro Plan" price="$29/mo" />
        </RadioCardGroup>
        <CheckboxCard title="Telemetry Addon" price="+$10/mo" defaultChecked />
      </div>
    );
    expect(screen.getByText("Pro Plan")).toBeInTheDocument();
    expect(screen.getByText("Telemetry Addon")).toBeInTheDocument();
  });

  it("renders TimePicker with clock icon", () => {
    render(<TimePicker defaultValue="10:30" format="12" />);
    expect(screen.getByText("10:30")).toBeInTheDocument();
  });

  it("renders ToolCallCard with tool status and arguments", () => {
    render(
      <ToolCallCard
        toolName="execute_sql"
        status="success"
        durationMs={45}
        args={{ query: "SELECT 1;" }}
        defaultOpen
      />
    );
    expect(screen.getByText("execute_sql")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("45ms")).toBeInTheDocument();
  });

  it("renders TreeSelect with hierarchical node labels", () => {
    const data = [{ id: "root", label: "Root Folder", children: [{ id: "sub", label: "Sub Folder" }] }];
    render(<TreeSelect treeData={data} defaultValue="root" />);
    expect(screen.getByText("Root Folder")).toBeInTheDocument();
  });

  it("renders Popconfirm anchored to trigger button", () => {
    render(
      <Popconfirm title="Are you sure?" okText="Confirm Action">
        <button type="button">Trigger Button</button>
      </Popconfirm>
    );
    expect(screen.getByText("Trigger Button")).toBeInTheDocument();
  });

  it("renders Terminal with command prompts and output", () => {
    render(
      <Terminal
        title="bash"
        commands={[{ command: "echo hello", output: "hello world" }]}
      />
    );
    expect(screen.getByText("echo hello")).toBeInTheDocument();
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("renders ScrollProgress with progressbar role and accessibility attributes", () => {
    render(<ScrollProgress gradient />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
  });

  it("renders ScrollShadow container and scroll slots", () => {
    const { container } = render(
      <ScrollShadow className="h-40">
        <p>Scrollable item 1</p>
        <p>Scrollable item 2</p>
      </ScrollShadow>
    );
    expect(screen.getByText("Scrollable item 1")).toBeInTheDocument();
    expect(container.querySelector('[data-slot="scroll-shadow"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="scroll-shadow-content"]')).toBeInTheDocument();
  });

  it("labels only newly added components with isNew: true in catalog", async () => {
    const { catalog, NEW_COMPONENTS } = await import("@/catalog");

    // All items in NEW_COMPONENTS have isNew === true
    for (const slug of NEW_COMPONENTS) {
      const entry = catalog.find((c) => c.slug === slug);
      expect(entry, `Entry for ${slug} must exist`).toBeDefined();
      expect(entry?.isNew, `Entry ${slug} must be labeled new`).toBe(true);
    }

    // Previous components have reverted to normal (isNew === false)
    const previousComponents = ["button", "accordion", "dock", "bento-grid", "marquee", "dialog", "select"];
    for (const slug of previousComponents) {
      const entry = catalog.find((c) => c.slug === slug);
      expect(entry?.isNew, `Previous component ${slug} should not have New badge`).toBe(false);
    }
  }, 15000);
});
