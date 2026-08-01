# TASK 0 — Synthetic Church Data Generator (starter task)

**Size:** 🟢 a few evenings · **Folder:** `src/DataGenerator/` in your repo
**Where it lands:** Josh's testing toolkit. This is the one task that isn't a visible app feature — it's the warm-up that teaches you Hymnal's data shapes and pays Josh back immediately (he currently hand-makes test CSVs).

---

## What you're building
A single page in your starter app with:
1. A number input: "How many members?" (default 25, allow 5–1000).
2. A **Generate** button.
3. Three **Download CSV** buttons: Members, Giving, Attendance.
4. A preview table showing the first 10 rows of whatever was generated.

## The context you need
This USB already contains a big pre-generated dataset (`data/` folder — 250 members, 5,319 gifts, 5,665 attendance rows). **Your generator's job is to make MORE datasets like that, on demand, at any size.** Open the CSVs in the `data/` folder and study them — they are your reference for what realistic output looks like. Your tool succeeds if a stranger can't tell your output apart from those files.

## Exact inputs you have
- `src/data/sample-data.ts` → `CSV_HEADERS` (the exact column names, in order — match them exactly or Hymnal's importer rejects the file), `FUNDS`, `SERVICES`, and the `Member` / `GivingRecord` / `AttendanceRecord` types.
- `data/members.csv`, `data/giving.csv`, `data/attendance.csv` → reference output.

## Requirements
1. **Members:** names from your own arrays of ~40 first + ~40 last names (varied, realistic). About **15% of members get a blank email** (real churches have members with no email on file — everything downstream must survive that). Emails ALWAYS use `@example.com` — never generate a real-looking address. `membership_status` mostly `active`, some `inactive`, a few `visitor`. `member_since` = a random date in the past 8 years, format `YYYY-MM-DD`.
2. **Giving:** every gift ties to a generated member (their name + email). **Amounts follow a realistic curve, not uniform random:** roughly 70% in $10–$100, 25% in $100–$300, ~5% in $500–$2,000. Bonus realism: give each member a "usual amount" they repeat most weeks — that's how real giving looks. Dates spread across the last 6 months, clustered on Sundays. `fund_name` from `FUNDS` (weight General Fund heaviest), `payment_method` weighted toward `online`.
3. **Attendance:** ties to generated members; `service_name` from `SERVICES`; `service_date` falls on actual Sundays (or Wednesdays for Wednesday Night).
4. **CSV output rules (learned the hard way — these are real importer constraints):**
   - Header row first, columns exactly as in `CSV_HEADERS`, comma-delimited.
   - Quote a value only if it contains a comma.
   - **No trailing newline after the last row.** (A trailing blank line once created a phantom empty row that broke Hymnal's importer. Check the reference CSVs in a plain-text editor — they end without one.)
   - Download via a `Blob` + temporary `<a download>` link. No library needed; ask Josh for a pointer if the pattern is new to you.

## Acceptance checklist
- [ ] Generate 25 members → download all three CSVs → each opens cleanly in Excel/Google Sheets with exactly the right headers.
- [ ] ~15% of members have a blank email, and nothing crashed because of it.
- [ ] Every gift and attendance row maps back to a generated member.
- [ ] Giving amounts are visibly non-uniform (mostly small, a few big) — eyeball a histogram or just sort the column.
- [ ] Attendance dates land on real service days (Sundays / Wednesdays).
- [ ] No trailing blank line in any CSV (open in a text editor and check the last line).
- [ ] Generate 1000 members without the page freezing for more than a couple of seconds.
- [ ] Everything typed; no `any`.

## Edge cases to handle
- Count of 5 (minimum) and 1000 (maximum) both work.
- Regenerating replaces the previous dataset cleanly (no leftover rows in the preview).

## Stretch goals (optional)
- A **seed input**: the same seed always regenerates the identical dataset (reproducible test data — a genuinely professional touch, and it's how the USB's own dataset was made).
- Let the user toggle which funds/services exist.

## Done = 
all boxes checked, `npm run build` clean, pushed, and you can explain your amount-distribution approach to Josh in one paragraph.
