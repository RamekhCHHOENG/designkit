import axe from "axe-core";
import { expect } from "vitest";

export async function expectNoAccessibilityViolations(container: Element) {
  const result = await axe.run(container, {
    rules: {
      // jsdom does not calculate layout or rendered color contrast.
      "color-contrast": { enabled: false },
    },
  });

  expect(result.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.map((node) => node.html),
  }))).toEqual([]);
}
