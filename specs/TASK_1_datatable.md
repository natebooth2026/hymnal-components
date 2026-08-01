# TASK 1 — Reusable DataTable Component

**Size:** 🟡 1–2 weeks · **Folder:** `src/DataTable/`
**Where it lands:** Hymnal's Members, Giving, and Attendance list screens. I verified (July 2026) that Hymnal's `ui/` component library has **no generic table component** — every list screen is currently hand-built. One good `<DataTable>` replaces all that duplication. This is a real architecture win, and it's the component you'll reuse yourself in Task 2.
**Resume line:** "Built the reusable sortable/filterable data-table component used across a production SaaS."

---

## What you're building
A generic `<DataTable>` that ANY screen can use just by passing columns + rows:

```ts
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode; // optional custom cell (e.g. format money)
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  pageSize?: number;        // default 10
  onRowClick?: (row: T) => void;   // stretch
}
```

"Generic" is the whole point: nothing member-specific hardcoded anywhere. The same component must render members, gifts, or anything else.

## Exact inputs you have
- `src/data/big-data.ts` → `MEMBERS` (250 rows) and `GIVING` (5,319 rows). **Build against the big arrays, not the small samples** — pagination and sort performance mean nothing on 8 rows.
- `src/data/sample-data.ts` → the types.

## Requirements
1. **Sorting:** click a sortable column header → ascending; click again → descending; third click → back to unsorted. Show a ▲/▼ indicator on the active column. Sorting must be correct for numbers and dates, not just text (a naive string sort puts `1000` before `200` — that's the classic bug; avoid it).
2. **Search box** above the table: live-filters rows to those containing the typed text in any visible column (case-insensitive). Clearing restores everything.
3. **Pagination:** `pageSize` rows at a time (default 10), Previous/Next buttons, a "Page 3 of 25" indicator, correct behavior on the last partial page. Never render all 5,319 rows to the DOM at once.
4. **Filter + pagination interact correctly:** changing the search resets to page 1 (otherwise you can be stranded on an empty page 12).
5. **Empty states:** zero rows OR a search with no matches → a friendly message ("No results for 'xyz'"), never a blank table.
6. **Custom cells:** the `render` option works — demo it with a Giving table where `amount` renders as `$1,234.56` and `membership_status` renders as a colored badge in the Members table.
7. **Mobile:** at phone width the table scrolls horizontally inside its container rather than blowing out the page layout.

## Acceptance checklist
- [ ] Renders `MEMBERS` (name, email, city, status, member since) — all 250 rows reachable via pagination.
- [ ] Renders `GIVING` (donor, amount, date, fund, method) with the SAME component — 5,319 rows, paginated, no lag when typing in search.
- [ ] Sort asc → desc → off works with the visible indicator; numeric and date columns sort correctly.
- [ ] Search "kent" filters members live; clearing restores; searching always resets to page 1.
- [ ] Last page shows the correct remainder of rows; Next is disabled/hidden on it.
- [ ] Empty and no-match states show a friendly message.
- [ ] `render` demo works (money formatting + status badge).
- [ ] Horizontal scroll at 375px width; nothing overlaps or overflows the viewport.
- [ ] Fully typed with generics (`DataTable<T>`); no `any`.

## Edge cases to handle
- Rows with `null` fields (some members have no email — display a dash or blank, don't print "null").
- A single row; exactly one full page; pageSize larger than the row count.
- Search text with regex-special characters like `(` or `$` (don't crash — treat search text as plain text, not a regex).

## Stretch goals
- `onRowClick` callback.
- A "rows per page" selector (10 / 25 / 50).
- Column-specific search.

## Done =
all boxes checked, `npm run build` clean, pushed, and you can explain to Josh how your sort comparator handles numbers vs. dates vs. strings.
