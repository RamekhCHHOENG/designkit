import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DataTableColumn<T> = {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (row: T) => ReactNode;
};

export type DataTableProps<T extends { id: string | number }> = {
  columns: DataTableColumn<T>[];
  data: T[];
  caption?: string;
  searchPlaceholder?: string;
  searchLabel?: string;
  emptyMessage?: string;
  pageSize?: number;
  selectable?: boolean;
  getSearchText?: (row: T) => string;
  onSelectionChange?: (selectedIds: Set<T["id"]>) => void;
  className?: string;
};

type SortDirection = "ascending" | "descending";

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  caption = "Data table",
  searchPlaceholder = "Filter rows…",
  searchLabel = "Search table",
  emptyMessage = "No matching rows.",
  pageSize = 5,
  selectable = false,
  getSearchText,
  onSelectionChange,
  className = "",
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<(keyof T & string) | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("ascending");
  const [selected, setSelected] = useState<Set<T["id"]>>(() => new Set());
  const [page, setPage] = useState(0);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return data;

    return data.filter((row) => {
      const searchableText = getSearchText
        ? getSearchText(row)
        : columns.map((column) => String(row[column.key] ?? "")).join(" ");
      return searchableText.toLocaleLowerCase().includes(normalizedQuery);
    });
  }, [columns, data, getSearchText, query]);

  const sortedRows = useMemo(() => {
    if (!sortKey) return filteredRows;

    return [...filteredRows].sort((first, second) => {
      const comparison = String(first[sortKey] ?? "").localeCompare(
        String(second[sortKey] ?? ""),
        undefined,
        { numeric: true, sensitivity: "base" },
      );
      return sortDirection === "ascending" ? comparison : -comparison;
    });
  }, [filteredRows, sortDirection, sortKey]);

  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / safePageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const pageRows = sortedRows.slice(currentPage * safePageSize, (currentPage + 1) * safePageSize);
  const pageRowIds = pageRows.map((row) => row.id);
  const allPageRowsSelected = pageRowIds.length > 0 && pageRowIds.every((id) => selected.has(id));

  useEffect(() => {
    setPage(0);
  }, [query, sortKey, sortDirection]);

  const updateSelection = (updater: (current: Set<T["id"]>) => Set<T["id"]>) => {
    setSelected((current) => {
      const next = updater(current);
      onSelectionChange?.(new Set(next));
      return next;
    });
  };

  const updateSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;
    if (sortKey === column.key) {
      setSortDirection((direction) => direction === "ascending" ? "descending" : "ascending");
      return;
    }
    setSortKey(column.key);
    setSortDirection("ascending");
  };

  const toggleRow = (id: T["id"]) => {
    updateSelection((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const togglePageRows = () => {
    updateSelection((current) => {
      const next = new Set(current);
      pageRowIds.forEach((id) => {
        if (allPageRowsSelected) next.delete(id);
        else next.add(id);
      });
      return next;
    });
  };

  const firstVisibleRow = sortedRows.length ? currentPage * safePageSize + 1 : 0;
  const lastVisibleRow = Math.min((currentPage + 1) * safePageSize, sortedRows.length);

  return (
    <section className={`dk-data-table ${className}`.trim()} aria-label={caption}>
      <div className="dk-data-table__toolbar">
        <label className="dk-data-table__search">
          <span aria-hidden="true">⌕</span>
          <span className="dk-visually-hidden">{searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
          />
        </label>
        <span className="dk-data-table__summary" aria-live="polite">
          {selected.size > 0 ? `${selected.size} selected` : `${filteredRows.length} rows`}
        </span>
      </div>

      <div className="dk-data-table__viewport">
        <table>
          <caption className="dk-visually-hidden">{caption}</caption>
          <thead>
            <tr>
              {selectable && (
                <th className="dk-data-table__select" scope="col">
                  <input
                    type="checkbox"
                    aria-label="Select visible rows"
                    checked={allPageRowsSelected}
                    onChange={togglePageRows}
                    disabled={!pageRows.length}
                  />
                </th>
              )}
              {columns.map((column) => {
                const isActiveSort = sortKey === column.key;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={`dk-data-table__align-${column.align ?? "left"}`}
                    aria-sort={column.sortable ? (isActiveSort ? sortDirection : "none") : undefined}
                  >
                    {column.sortable ? (
                      <button type="button" onClick={() => updateSort(column)} aria-label={`Sort by ${column.header}`}>
                        <span>{column.header}</span>
                        <span aria-hidden="true">{isActiveSort ? (sortDirection === "ascending" ? "↑" : "↓") : "↕"}</span>
                      </button>
                    ) : column.header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr key={row.id} data-selected={selected.has(row.id) || undefined}>
                {selectable && (
                  <td className="dk-data-table__select">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${row.id}`}
                      checked={selected.has(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className={`dk-data-table__align-${column.align ?? "left"}`}>
                    {column.render ? column.render(row) : String(row[column.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {!pageRows.length && (
              <tr>
                <td className="dk-data-table__empty" colSpan={columns.length + (selectable ? 1 : 0)}>
                  <span aria-hidden="true">⌕</span>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="dk-data-table__footer">
        <span>{firstVisibleRow}–{lastVisibleRow} of {sortedRows.length}</span>
        <div>
          <button type="button" onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={currentPage === 0}>
            Previous
          </button>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages - 1, value + 1))} disabled={currentPage >= totalPages - 1}>
            Next
          </button>
        </div>
      </footer>
    </section>
  );
}
