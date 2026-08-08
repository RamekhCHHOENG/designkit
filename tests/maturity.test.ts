import { describe, expect, it } from "vitest";
import {
  maturityForReactComponent,
  stableReactComponents,
} from "../src/componentMaturity";

describe("component maturity", () => {
  it("keeps the stable React surface explicit", () => {
    expect(Object.keys(stableReactComponents)).toEqual([
      "Badge",
      "Button",
      "Card",
      "Data Table",
      "Drawer",
      "Input",
    ]);
  });

  it("treats documentation-only components as previews", () => {
    expect(maturityForReactComponent("Button")).toBe("stable");
    expect(maturityForReactComponent("Accordion")).toBe("preview");
  });
});
