# TASK 4 — UI Polish Pack: Loading Skeletons + Empty States

**Size:** 🟢 ~1 week · **Folder:** `src/PolishPack/`
**Where it lands:** all over the app — every screen has a loading moment and an empty moment. Hymnal has the low-level primitives (a basic `Skeleton` bar, a generic `EmptyState` shell), but most screens still show a generic list-skeleton while loading and a generic empty message. What's missing are **composed** versions shaped like each screen's actual content. This is high-polish, zero-risk work: purely presentational, impossible to break anything, and it's what makes an app feel cared-for.
**Resume line:** "Built the loading-skeleton and empty-state system for a production SaaS."

---

## What you're building

**Part A — four composed skeletons** (gray placeholder layouts using Tailwind's `animate-pulse`; each shaped like the real content it stands in for):
1. `MemberRowSkeleton` — avatar circle + two text bars (name / contact line). Plus a `count` prop that renders N of them stacked (the list-loading look).
2. `GivingTableSkeleton` — a header bar + rows of 5 column-shaped bars, echoing a data table.
3. `StatCardSkeleton` — a small card: short label bar over a big number bar. Plus a row-of-4 variant.
4. `EventCardSkeleton` — title bar, date/location lines, and a capacity-bar-shaped strip (pairs with your Task 3 component).

**Part B — four composed empty states.** Each is: an icon (lucide-react) + a warm headline + one helpful sentence + a primary action button (the button takes an `onAction` callback prop; what it does is the parent's business):
1. "No giving records yet" → suggest recording a first gift or importing a CSV.
2. "No events scheduled" → suggest creating one.
3. "No one's registered yet" (an event with zero registrations) → suggest sharing the signup link.
4. "No results found" (a search/filter that matched nothing) → suggest clearing the filter — this one takes the search text as a prop and shows it ("No results for 'xyz'").

Build a demo page that shows all eight, with a toggle that flips the skeletons between "loading" and a resolved fake-content state so the shape-match is visible.

## Exact inputs you have
- `src/data/big-data.ts` + `src/data/events.ts` — for the "resolved" states in your demo.
- Ask Josh for screenshots of the Members list, Giving table, Dashboard cards, and an Event card — your skeletons should echo those shapes. (Ask early; this task depends on seeing them.)

## Requirements
1. Self-contained: plain `div`s + Tailwind (`animate-pulse`, `bg-gray-200`, `rounded`, `dark:` variants optional). Don't try to import Hymnal's primitives — you can't see them; Josh maps yours onto them at integration, and that mapping is his job, not yours.
2. Every component takes sensible props (`count`, `onAction`, `searchText`) with defaults, typed.
3. Empty-state copy is warm and specific, never blamey ("No giving records yet" — not "You haven't added any records").
4. Skeletons are `aria-hidden="true"` (screen readers shouldn't read placeholder noise); empty states are real content and fully readable.
5. Consistent sizing rhythm: if the member row is 56px tall, its skeleton is 56px tall — that's the entire trick of a good skeleton (no layout jump when content arrives).

## Acceptance checklist
- [ ] All 4 skeletons render, animate, and match the shape/height of the resolved content in your demo toggle (no visible layout jump when toggling).
- [ ] `MemberRowSkeleton count={8}` renders a believable loading list.
- [ ] All 4 empty states render with icon + headline + sentence + working action callback.
- [ ] The no-results state interpolates the search text.
- [ ] Skeletons are `aria-hidden`; empty-state buttons are keyboard-reachable with visible focus.
- [ ] Everything typed; no `any`; nothing breaks at phone width.

## Stretch goals
- A generic `<SkeletonGroup>` that takes a simple shape config, so future skeletons are declarative.
- A subtle staggered animation delay across list-skeleton rows.

## Done =
all boxes checked, `npm run build` clean, pushed, and the demo page toggle makes the shape-matching obvious to Josh in ten seconds.
