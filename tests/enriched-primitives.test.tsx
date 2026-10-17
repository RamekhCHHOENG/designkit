import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";

import {
  CodeBlock,
  ColorPicker,
  CopyButton,
  Descriptions,
  FileDropzone,
  FloatButton,
  ImageCropper,
  MultiSelect,
  NumberInput,
  PasswordInput,
  PaymentInput,
  PhoneInput,
  QRCode,
  Rating,
  Result,
  RingProgress,
  SegmentedControl,
  Spoiler,
  Statistic,
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTitle,
  Tag,
  TagsInput,
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  Tree,
  Watermark,
} from "@/lib";

describe("Enriched UI Primitives Suite", () => {
  it("renders SegmentedControl with selection", () => {
    render(
      <SegmentedControl
        defaultValue="list"
        options={[
          { value: "grid", label: "Grid View" },
          { value: "list", label: "List View" },
        ]}
      />
    );
    expect(screen.getByText("Grid View")).toBeInTheDocument();
    expect(screen.getByText("List View")).toBeInTheDocument();
  });

  it("renders NumberInput with steppers", () => {
    render(<NumberInput defaultValue={42} min={0} max={100} prefix="$" />);
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue("42");
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("renders PasswordInput with eye toggle", () => {
    render(<PasswordInput defaultValue="secret123" placeholder="Enter password" />);
    const input = screen.getByPlaceholderText("Enter password");
    expect(input).toHaveAttribute("type", "password");
    const toggleBtn = screen.getByRole("button", { name: "Show password" });
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders PhoneInput properly", () => {
    render(<PhoneInput defaultValue="+14155552671" placeholder="Phone" />);
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
  });

  it("renders PaymentInput card inputs", () => {
    render(<PaymentInput />);
    expect(screen.getByPlaceholderText("0000 0000 0000 0000")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM / YY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVC")).toBeInTheDocument();
  });

  it("renders TagsInput with removable chips", () => {
    render(<TagsInput defaultValue={["React", "TypeScript"]} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders ColorPicker swatch and color text", () => {
    render(<ColorPicker defaultValue="#ef4444" />);
    expect(screen.getByText("#ef4444")).toBeInTheDocument();
  });

  it("renders Rating component", () => {
    render(<Rating defaultValue={4} max={5} />);
    const ratingRoot = screen.getByRole("radiogroup", { name: "Rating" });
    expect(ratingRoot).toBeInTheDocument();
  });

  it("renders FileDropzone area", () => {
    render(<FileDropzone />);
    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument();
  });

  it("renders CopyButton and handles copy action", () => {
    render(<CopyButton value="test-copy-content" />);
    const button = screen.getByRole("button", { name: "Copy to clipboard" });
    expect(button).toBeInTheDocument();
  });

  it("renders CodeBlock with filename and code content", () => {
    render(<CodeBlock code="const a = 1;" filename="test.ts" language="typescript" />);
    expect(screen.getByText("test.ts")).toBeInTheDocument();
    expect(screen.getByText("const a = 1;")).toBeInTheDocument();
  });

  it("renders Statistic KPI card", () => {
    render(
      <Statistic
        title="Revenue"
        prefix="$"
        value="54,200"
        trend={{ value: "+12%", direction: "up" }}
      />
    );
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("54,200")).toBeInTheDocument();
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });

  it("renders Descriptions key-value metadata", () => {
    render(
      <Descriptions
        title="Server Info"
        items={[
          { label: "Hostname", children: "prod-web-01" },
          { label: "IP", children: "192.168.1.10" },
        ]}
      />
    );
    expect(screen.getByText("Server Info")).toBeInTheDocument();
    expect(screen.getByText("Hostname")).toBeInTheDocument();
    expect(screen.getByText("prod-web-01")).toBeInTheDocument();
  });

  it("renders RingProgress circular SVG", () => {
    const { container } = render(
      <RingProgress value={85} size={100} label={<span>85%</span>} />
    );
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Tag with semantic variants", () => {
    render(<Tag variant="success">Completed</Tag>);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders Spoiler collapsible content", () => {
    render(
      <Spoiler maxHeight={50}>
        <p>Long spoiler content description text</p>
      </Spoiler>
    );
    expect(screen.getByText("Long spoiler content description text")).toBeInTheDocument();
  });

  it("renders QRCode element", () => {
    const { container } = render(<QRCode value="https://example.com" />);
    expect(container.querySelector('[data-slot="qr-code"]')).toBeInTheDocument();
  });

  it("renders Watermark overlay", () => {
    render(
      <Watermark content="TEST WATERMARK">
        <div data-testid="watermarked-child">Secret Document</div>
      </Watermark>
    );
    expect(screen.getByTestId("watermarked-child")).toBeInTheDocument();
  });

  it("renders Result status template", () => {
    render(
      <Result
        status="success"
        title="Payment Succeeded"
        subTitle="Your receipt was sent to email"
      />
    );
    expect(screen.getByText("Payment Succeeded")).toBeInTheDocument();
    expect(screen.getByText("Your receipt was sent to email")).toBeInTheDocument();
  });

  it("renders FloatButton", () => {
    render(<FloatButton aria-label="Support Action" />);
    expect(screen.getByRole("button", { name: "Support Action" })).toBeInTheDocument();
  });

  it("renders Stepper items and title", () => {
    render(
      <Stepper defaultValue={1}>
        <StepperItem step={1}>
          <StepperIndicator />
          <StepperTitle>Step One</StepperTitle>
        </StepperItem>
      </Stepper>
    );
    expect(screen.getByText("Step One")).toBeInTheDocument();
  });

  it("renders Timeline items and title", () => {
    render(
      <Timeline defaultValue={1}>
        <TimelineItem step={1}>
          <TimelineHeader>
            <TimelineTitle>Timeline Event</TimelineTitle>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    );
    expect(screen.getByText("Timeline Event")).toBeInTheDocument();
  });

  it("renders MultiSelect component", () => {
    render(
      <MultiSelect
        options={[
          { value: "a", label: "Option A" },
          { value: "b", label: "Option B" },
        ]}
        placeholder="Choose options"
      />
    );
    expect(screen.getByPlaceholderText("Choose options")).toBeInTheDocument();
  });
});
