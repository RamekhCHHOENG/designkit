import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";

// Import from the built library distribution
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AspectRatio,
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Bubble,
  BubbleContent,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  ChartContainer,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxContent,
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DirectionProvider,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Input,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  Kbd,
  Label,
  Marker,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
  MessageGroup,
  MessageScroller,
  NativeSelect,
  NativeSelectOption,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Progress,
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireTitle,
  QuestionnaireDescription,
  QuestionnaireChoices,
  QuestionnaireChoice,
  QuestionnaireProgress,
  RadioGroup,
  RadioGroupItem,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  ScrollArea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Separator,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  cn,
} from "@/lib";

describe("Built Library Package Distribution Tests (Real Use Cases)", () => {
  it("1. verifies cn utility export", () => {
    expect(cn("class1", { class2: true, class3: false })).toBe("class1 class2");
  });

  it("2. renders Button and ButtonGroup", () => {
    render(
      <ButtonGroup>
        <Button variant="default">Save</Button>
        <Button variant="outline">Cancel</Button>
      </ButtonGroup>
    );
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("3. renders Card, Badge, and Avatar", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Account Information</CardDescription>
        </CardHeader>
        <CardContent>
          <Avatar>
            <AvatarImage src="/test.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Badge variant="secondary">Active</Badge>
        </CardContent>
      </Card>
    );
    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("4. renders Input, InputGroup, Label, and Field", () => {
    render(
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <InputGroup>
          <InputGroupInput placeholder="user@example.com" />
          <InputGroupAddon>@</InputGroupAddon>
        </InputGroup>
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    );
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("user@example.com")).toBeInTheDocument();
  });

  it("5. renders InputOTP", () => {
    render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("6. renders Accordion", () => {
    render(
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is DesignKit?</AccordionTrigger>
          <AccordionContent>A modern UI component kit.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText("What is DesignKit?")).toBeInTheDocument();
    expect(screen.getByText("A modern UI component kit.")).toBeInTheDocument();
  });

  it("7. renders Alert and AlertTitle", () => {
    render(
      <Alert>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();
  });

  it("8. renders Tabs and TabsContent", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByText("Tab 1 Content")).toBeInTheDocument();
  });

  it("9. renders Table and TableCells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Data 1</TableCell>
            <TableCell>Data 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Data 1")).toBeInTheDocument();
  });

  it("10. renders Switch, Slider, Progress, and Spinner", () => {
    render(
      <div>
        <Switch id="switch-1" />
        <Slider defaultValue={[50]} max={100} />
        <Progress value={75} />
        <Spinner />
      </div>
    );
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("11. renders Breadcrumb and Pagination", () => {
    render(
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink size="default" href="#" isActive>1</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("12. renders Message, Bubble, and Attachment", () => {
    render(
      <MessageGroup>
        <Message align="start">
          <MessageContent>
            <MessageHeader>Assistant</MessageHeader>
            <Bubble>
              <BubbleContent>Hello! How can I assist you?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Attachment state="done">
          <AttachmentContent>
            <AttachmentTitle>document.pdf</AttachmentTitle>
            <AttachmentDescription>1.2 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      </MessageGroup>
    );
    expect(screen.getByText("Hello! How can I assist you?")).toBeInTheDocument();
    expect(screen.getByText("document.pdf")).toBeInTheDocument();
  });

  it("13. renders Questionnaire", () => {
    render(
      <Questionnaire>
        <QuestionnaireProgress>Question 1</QuestionnaireProgress>
        <QuestionnaireItem name="q1">
          <QuestionnaireTitle>Choose an option</QuestionnaireTitle>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="opt1">Option 1</QuestionnaireChoice>
            <QuestionnaireChoice value="opt2">Option 2</QuestionnaireChoice>
          </QuestionnaireChoices>
        </QuestionnaireItem>
      </Questionnaire>
    );
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("14. renders Sidebar and SidebarTrigger", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <p>App Title</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Home</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <SidebarTrigger />
        </SidebarInset>
      </SidebarProvider>
    );
    expect(screen.getByText("App Title")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("15. renders Separator, Skeleton, and Kbd", () => {
    render(
      <div>
        <Separator />
        <Skeleton className="h-4 w-20" />
        <Kbd>⌘K</Kbd>
      </div>
    );
    expect(screen.getByText("⌘K")).toBeInTheDocument();
  });

  it("16. renders Dialog and AlertDialog", () => {
    render(
      <div>
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modal Dialog</DialogTitle>
              <DialogDescription>Dialog Description</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Alert Modal</AlertDialogTitle>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
    expect(screen.getByText("Modal Dialog")).toBeInTheDocument();
    expect(screen.getByText("Alert Modal")).toBeInTheDocument();
  });

  it("17. renders RadioGroup and Checkbox", () => {
    render(
      <div>
        <RadioGroup defaultValue="opt1">
          <RadioGroupItem value="opt1" id="r1" />
          <Label htmlFor="r1">Option A</Label>
        </RadioGroup>
        <Checkbox id="c1" defaultChecked />
      </div>
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("18. renders Toggle and ToggleGroup", () => {
    render(
      <div>
        <Toggle aria-label="Toggle it">Toggle</Toggle>
        <ToggleGroup defaultValue={["bold"]}>
          <ToggleGroupItem value="bold">B</ToggleGroupItem>
          <ToggleGroupItem value="italic">I</ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
    expect(screen.getByText("Toggle")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
  });

  it("19. renders NativeSelect and Textarea", () => {
    render(
      <div>
        <NativeSelect>
          <NativeSelectOption value="1">Choice 1</NativeSelectOption>
          <NativeSelectOption value="2">Choice 2</NativeSelectOption>
        </NativeSelect>
        <Textarea placeholder="Type remarks here..." />
      </div>
    );
    expect(screen.getByText("Choice 1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type remarks here...")).toBeInTheDocument();
  });

  it("20. renders AspectRatio and Marker", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <Marker>Location Tag</Marker>
      </AspectRatio>
    );
    expect(screen.getByText("Location Tag")).toBeInTheDocument();
  });

  it("21. renders Item and ItemMedia", () => {
    render(
      <Item>
        <ItemMedia>
          <span>Icon</span>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Item Heading</ItemTitle>
          <ItemDescription>Item Subtext</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="xs">Action</Button>
        </ItemActions>
      </Item>
    );
    expect(screen.getByText("Item Heading")).toBeInTheDocument();
    expect(screen.getByText("Item Subtext")).toBeInTheDocument();
  });

  it("22. renders Collapsible", () => {
    render(
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Toggle Collapsible</CollapsibleTrigger>
        <CollapsibleContent>Hidden Content Revealed</CollapsibleContent>
      </Collapsible>
    );
    expect(screen.getByText("Toggle Collapsible")).toBeInTheDocument();
    expect(screen.getByText("Hidden Content Revealed")).toBeInTheDocument();
  });
});
