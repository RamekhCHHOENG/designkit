import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/lib/components/Button";
import { DataTable, type DataTableColumn } from "../src/lib/components/DataTable";
import { Drawer } from "../src/lib/components/Drawer";
import { Input } from "../src/lib/components/Input";
import { expectNoAccessibilityViolations } from "./accessibility";

describe("Button", () => {
  it("uses a safe form type and exposes its loading state", async () => {
    const { container, rerender } = render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });

    expect(button).toHaveAttribute("type", "button");

    rerender(<Button loading>Saving</Button>);
    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Saving" })).toHaveAttribute("aria-busy", "true");
    await expectNoAccessibilityViolations(container);
  });
});

describe("Input", () => {
  it("connects its label, description, and validation message", async () => {
    const { container } = render(
      <Input
        label="Email address"
        description="Use your work email."
        error="Enter a valid email address."
      />,
    );

    const input = screen.getByRole("textbox", { name: "Email address" });
    expect(input).toHaveAccessibleDescription("Use your work email. Enter a valid email address.");
    expect(input).toHaveAttribute("aria-invalid", "true");
    await expectNoAccessibilityViolations(container);
  });
});

type Person = { id: number; name: string; role: string };

const columns: DataTableColumn<Person>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role" },
];

const people: Person[] = [
  { id: 1, name: "Zoe", role: "Designer" },
  { id: 2, name: "Ada", role: "Engineer" },
];

describe("DataTable", () => {
  it("sorts, filters, and reports selection changes", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    const { container } = render(
      <DataTable
        caption="Team members"
        columns={columns}
        data={people}
        selectable
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Sort by Name" }));
    const rows = within(screen.getByRole("table", { name: "Team members" })).getAllByRole("row");
    expect(within(rows[1]).getAllByRole("cell")[1]).toHaveTextContent("Ada");

    await user.click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith(new Set([2]));

    await user.type(screen.getByRole("searchbox", { name: "Search table" }), "Zoe");
    expect(screen.getByText("Zoe")).toBeInTheDocument();
    expect(screen.queryByText("Ada")).not.toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });
});

function DrawerFixture() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open settings</button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Workspace settings"
        description="Update this workspace."
      >
        <button type="button">Save settings</button>
      </Drawer>
    </>
  );
}

describe("Drawer", () => {
  it("moves focus into the dialog, closes on Escape, and restores focus", async () => {
    const user = userEvent.setup();
    render(<DrawerFixture />);

    const trigger = screen.getByRole("button", { name: "Open settings" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Workspace settings" });
    await waitFor(() => expect(screen.getByRole("button", { name: "Close drawer" })).toHaveFocus());
    await expectNoAccessibilityViolations(dialog);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Workspace settings" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
