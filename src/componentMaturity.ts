export type ComponentMaturity = "stable" | "preview" | "planned";

/**
 * The production React components that are part of the public npm API.
 * Documentation-only previews must not be added here until their API,
 * accessibility behavior, tests, and exported types are complete.
 */
export const stableReactComponents = {
  Badge: "lib/components/Badge.tsx",
  Button: "lib/components/Button.tsx",
  Card: "lib/components/Card.tsx",
  "Data Table": "lib/components/DataTable.tsx",
  Drawer: "lib/components/Drawer.tsx",
  Input: "lib/components/Input.tsx",
} as const;

export type StableReactComponentName = keyof typeof stableReactComponents;

export function isStableReactComponent(name: string): name is StableReactComponentName {
  return Object.prototype.hasOwnProperty.call(stableReactComponents, name);
}

export function maturityForReactComponent(name: string): ComponentMaturity {
  return isStableReactComponent(name) ? "stable" : "preview";
}
