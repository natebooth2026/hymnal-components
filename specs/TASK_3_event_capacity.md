# TASK 3 — Event Capacity Indicator ⭐ (the flagship)

**Size:** 🟡 ~1 week · **Folder:** `src/EventCapacity/`
**Where it lands:** the **Events page**, on every event card and detail view. This is the headliner of the whole kit: I verified (July 2026) that Hymnal has **no capacity display anywhere** — the events area has exactly one component (volunteer slots) and nothing that answers "is there room?" You are building a brand-new, user-visible feature, and it pairs with backend capacity work already planned on my side. When this ships, you'll be able to open the live app and point at your feature.
**Resume line:** "Designed and shipped the event-capacity feature in a production SaaS."

---

## What you're building
An `<EventCapacityIndicator>` component:

```ts
interface EventCapacityIndicatorProps {
  event: HymnalEvent;
  registrations: EventRegistration[]; // just this event's (filter by event_id)
  variant?: 'full' | 'badge';        // 'full' = bar + labels; 'badge' = compact "1 left" pill for list cards
}
```

Showing:
- **A capacity bar** — seats taken / max, colored green (room), amber (nearly full, ≥80%), red (full).
- **A status label** — "3 spots left" / "Full — waitlist only" / "Open registration" (for unlimited).
- **A waitlist line** when anyone's waitlisted — "3 on waitlist."

## ⚠️ The capacity math — this is the whole point, read twice
The types live in `src/data/sample-data.ts`. The math is easy to get subtly wrong, which is exactly why it's currently wrong in places Josh is fixing on the backend. Get it exactly right:

1. **A registration is a PARTY of N people** (`num_attendees`). Seats taken = **SUM of `num_attendees`**, NOT the number of registration rows. Three rows with party sizes 2, 4, 1 = **7 seats**, not 3.
2. **Only some statuses consume seats.** Sum only rows whose status is in `SEAT_CONSUMING_STATUSES` (`registered`, `confirmed`, `attended`). **`waitlisted` and `cancelled` take ZERO seats.** The sample data contains both, on purpose, to catch blind counting.
3. **`max_attendees` of `null` OR `0` means unlimited.** Show the "Open registration" treatment — never a bar at some meaningless percentage. (Both variants exist in the data: null AND 0.)
4. **Waitlist count** = sum of `num_attendees` over `waitlisted` rows only.
5. **Over-subscribed data exists in the real world** (that's part of the bug being fixed). If seats taken > max: cap the bar at 100%, show "Full", never a broken >100% bar or a negative "spots left."

Put this in a **separate pure function** — `computeCapacity(event, registrations)` returning something like `{ kind: 'limited' | 'unlimited'; taken: number; max: number | null; spotsLeft: number; waitlisted: number; full: boolean }` — with unit tests. If that function is right, the UI is the easy part.

## Exact inputs you have
- `src/data/events.ts` → `EVENTS` (24 events) and `REGISTRATIONS` (147 rows). Every scenario below is real data in those arrays.

## Acceptance checklist — verified numbers (your output must match exactly)
- [ ] **e01 Spring Retreat (cap 10):** 9 taken → "1 spot left", amber. 1 on waitlist. (Party sizes summed; the waitlisted and cancelled rows excluded. Any other number = your seat math is wrong.)
- [ ] **e02 Sunday Potluck (max null):** "Open registration" treatment, no percentage bar.
- [ ] **e05 Community Food Drive (max 0):** SAME unlimited treatment — 0 means unlimited, not "capacity zero."
- [ ] **e04 Volunteer Appreciation Dinner (cap 4):** 4 taken → "Full — waitlist only", red, **3 on waitlist**.
- [ ] **e14 New Member Class (cap 10):** 13 taken — over-subscribed. Bar caps at 100%, shows "Full", no negative spots-left.
- [ ] **e19 Deacon Training (cap 6):** 6 taken → Full, red, no waitlist line (nobody's waitlisted).
- [ ] **e21 Grief Support Group (cap 8):** 2 taken → "6 spots left", green.
- [ ] Rendering ALL 24 events in a grid (each with its filtered registrations) produces sensible output for every single one — no crashes, no NaN, no ">100%".
- [ ] An event with zero registrations shows "N spots left" with an empty bar.
- [ ] `computeCapacity` is a pure function with unit tests covering: party sums, status exclusions, null-unlimited, zero-unlimited, over-subscribed, empty registrations.
- [ ] The `badge` variant renders a compact pill ("1 left" / "Full" / "Open") suitable for a list card.
- [ ] Accessible: the bar's meaning is conveyed without color alone — e.g. `aria-label="9 of 10 spots filled"` and a visible number.
- [ ] Fully typed; no `any`; works at phone width.

## Edge cases to handle
- All registrations cancelled → 0 taken.
- `num_attendees` of exactly the remaining space → full, not over.
- Registrations array for the wrong event passed in by mistake — your component filters or asserts on `event_id`? (Pick one, document your choice in a comment. Either is defensible; deciding and saying why is the skill.)

## Stretch goals
- Tooltip/expandable list of who's registered (names + party sizes).
- A subtle fill animation when the bar first renders.

## Done =
all boxes checked, `npm run build` and `npm test` clean, pushed, and you can explain to Josh in two sentences why counting rows instead of summing party sizes is wrong — because that explanation is literally the display half of a real production bug.
