import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "../src/components/ui/badge";
import { Button } from "../src/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../src/components/ui/avatar";
import { Input } from "../src/components/ui/input";
import { Separator } from "../src/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "../src/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/components/ui/tabs";
import { Toggle } from "../src/components/ui/toggle";
import { expectNoAccessibilityViolations } from "./accessibility";

describe("UI Primitives Suite", () => {
  it("renders Badge variants correctly", async () => {
    const { container } = render(<Badge variant="secondary">New Feature</Badge>);
    expect(screen.getByText("New Feature")).toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });

  it("renders Card structure correctly", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Project Settings</CardTitle>
          <CardDescription>Manage workspace settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Body content</p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>
    );
    expect(screen.getByText("Project Settings")).toBeInTheDocument();
    expect(screen.getByText("Manage workspace settings")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });

  it("renders Avatar fallback when image fails or is absent", async () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/invalid-image.png" alt="User Avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("JD")).toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });

  it("renders Input with placeholder and attributes", async () => {
    const { container } = render(<Input placeholder="Enter username" type="text" />);
    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    await expectNoAccessibilityViolations(container);
  });

  it("renders Separator component", async () => {
    const { container } = render(<Separator orientation="horizontal" />);
    expect(container.firstChild).toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });

  it("renders Alert and alert descriptions", async () => {
    const { container } = render(
      <Alert>
        <AlertTitle>System Alert</AlertTitle>
        <AlertDescription>Your deployment is complete.</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("System Alert")).toBeInTheDocument();
    expect(screen.getByText("Your deployment is complete.")).toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });

  it("renders Tabs component and switches active view", async () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Overview</TabsTrigger>
          <TabsTrigger value="tab2">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Overview Content</TabsContent>
        <TabsContent value="tab2">Analytics Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByText("Overview Content")).toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });

  it("renders Toggle button", async () => {
    const { container } = render(<Toggle aria-label="Toggle bold">B</Toggle>);
    expect(screen.getByLabelText("Toggle bold")).toBeInTheDocument();
    await expectNoAccessibilityViolations(container);
  });
});
