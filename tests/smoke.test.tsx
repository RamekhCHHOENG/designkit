import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../src/components/ui/button";
import { expectNoAccessibilityViolations } from "./accessibility";

// A minimal check that the shadcn/ui + Base UI + Tailwind vendoring pipeline
// actually works end to end, while the real component set is being redesigned.
describe("vendored shadcn/ui setup", () => {
  it("renders a vendored primitive with its variant classes applied", async () => {
    const { container } = render(<Button variant="outline">Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toHaveAttribute("type", "button");
    expect(button.className).toContain("border-border");
    await expectNoAccessibilityViolations(container);
  });
});
