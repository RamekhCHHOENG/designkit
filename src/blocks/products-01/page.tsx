import { useMemo, useState } from "react"
import { ArrowUpDownIcon, EllipsisVerticalIcon, ListFilterIcon, PlusIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Status = "In Stock" | "Low Stock" | "Archived"
interface Product {
  id: string
  name: string
  price: number
  stock: number
  dateAdded: string
  status: Status
}

// Load from your database.
const products: Product[] = [
  { id: "1", name: "BJÖRKSNÄS Dining Table", price: 599.99, stock: 12, dateAdded: "2023-06-15", status: "In Stock" },
  { id: "2", name: "POÄNG Armchair", price: 249.99, stock: 28, dateAdded: "2023-07-22", status: "In Stock" },
  { id: "3", name: "MALM Bed Frame", price: 399.99, stock: 15, dateAdded: "2023-08-05", status: "In Stock" },
  { id: "4", name: "KALLAX Shelf Unit", price: 179.99, stock: 32, dateAdded: "2023-09-12", status: "In Stock" },
  { id: "5", name: "STOCKHOLM Rug", price: 299.99, stock: 8, dateAdded: "2023-10-18", status: "Low Stock" },
  { id: "6", name: "KIVIK Sofa", price: 899.99, stock: 6, dateAdded: "2023-11-02", status: "Low Stock" },
  { id: "7", name: "LISABO Coffee Table", price: 149.99, stock: 22, dateAdded: "2023-11-29", status: "In Stock" },
  { id: "8", name: "HEMNES Bookcase", price: 249.99, stock: 17, dateAdded: "2023-12-10", status: "In Stock" },
  { id: "9", name: "EKEDALEN Dining Chairs (Set of 2)", price: 199.99, stock: 14, dateAdded: "2024-01-05", status: "In Stock" },
  { id: "10", name: "FRIHETEN Sleeper Sofa", price: 799.99, stock: 9, dateAdded: "2024-01-22", status: "Low Stock" },
  { id: "11", name: "BRIMNES Wardrobe", price: 349.99, stock: 0, dateAdded: "2022-11-14", status: "Archived" },
  { id: "12", name: "LACK Side Table", price: 24.99, stock: 0, dateAdded: "2022-09-03", status: "Archived" },
]

const tabStatus: Record<string, Status | null> = {
  all: null,
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  archived: "Archived",
}

const statusClass: Record<Status, string> = {
  "In Stock": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  "Low Stock":
    "border-orange-500 bg-transparent text-orange-500 dark:border-orange-500 dark:bg-transparent dark:text-orange-500",
  Archived: "bg-muted text-muted-foreground",
}

const categories = [
  { value: "all", label: "All" },
  { value: "living", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "dining", label: "Dining" },
]
const prices = [
  { value: "all", label: "Any" },
  { value: "under-200", label: "Under $200" },
  { value: "200-500", label: "$200–$500" },
  { value: "over-500", label: "Over $500" },
]

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`))

const PAGE_SIZE = 5

export default function Page() {
  const [tab, setTab] = useState("all")
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    const status = tabStatus[tab]
    return status ? products.filter((p) => p.status === status) : products
  }, [tab])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const allOnPageSelected = rows.length > 0 && rows.every((p) => selected.has(p.id))

  const toggleAll = (checked: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      for (const p of rows) checked ? next.add(p.id) : next.delete(p.id)
      return next
    })
  const toggleRow = (id: string, checked: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev)
      checked ? next.add(id) : next.delete(id)
      return next
    })
  const goTo = (next: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    setPage(Math.min(Math.max(1, next), pageCount))
  }

  return (
    <div className="flex min-h-svh flex-1 flex-col gap-4 rounded-xl p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs
            value={tab}
            onValueChange={(value) => {
              setTab(String(value))
              setPage(1)
            }}
          >
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="in-stock">In Stock</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 **:data-[slot=button]:size-8 **:data-[slot=select-trigger]:h-8">
            <Select items={categories} defaultValue="all">
              <SelectTrigger>
                <span className="text-sm text-muted-foreground">Category:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select items={prices} defaultValue="all">
              <SelectTrigger>
                <span className="text-sm text-muted-foreground">Price:</span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {prices.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" aria-label="Filter">
              <ListFilterIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Sort">
              <ArrowUpDownIcon />
            </Button>
            <Button size="icon" aria-label="Add product">
              <PlusIcon />
            </Button>
          </div>
        </div>

        <div className="rounded-lg">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-0!">
                <TableHead className="w-12 rounded-l-lg px-4">
                  <Checkbox
                    checked={allOnPageSelected}
                    onCheckedChange={(checked) => toggleAll(checked === true)}
                    aria-label="Select all on page"
                  />
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="rounded-r-lg" />
              </TableRow>
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:py-2.5">
              {rows.map((product) => (
                <TableRow key={product.id} data-state={selected.has(product.id) ? "selected" : undefined}>
                  <TableCell className="px-4">
                    <Checkbox
                      checked={selected.has(product.id)}
                      onCheckedChange={(checked) => toggleRow(product.id, checked === true)}
                      aria-label={`Select ${product.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right tabular-nums">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right tabular-nums">{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusClass[product.status]}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(product.dateAdded)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" className="size-6" aria-label={`Actions for ${product.name}`} />
                        }
                      >
                        <EllipsisVerticalIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {selected.size} of {products.length} row(s) selected.
          </p>
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={goTo(page - 1)} aria-disabled={page === 1} />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink href="#" isActive={n === page} onClick={goTo(n)}>
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={goTo(page + 1)} aria-disabled={page === pageCount} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
