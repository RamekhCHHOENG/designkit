// @vitest-environment node

import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Button,
  DataTable,
  Drawer,
  Input,
  type DataTableColumn,
} from "../src/lib";

type Row = { id: number; name: string };
const columns: DataTableColumn<Row>[] = [{ key: "name", header: "Name" }];

describe("server rendering", () => {
  it("renders the public entry without browser globals", () => {
    const html = renderToString(
      <div>
        <Button>Save</Button>
        <Input label="Name" />
        <DataTable caption="People" columns={columns} data={[{ id: 1, name: "Ada" }]} />
        <Drawer open onOpenChange={() => undefined} title="Settings">Content</Drawer>
      </div>,
    );

    expect(html).toContain("Save");
    expect(html).toContain("People");
    expect(html).toContain("Ada");
  });
});
