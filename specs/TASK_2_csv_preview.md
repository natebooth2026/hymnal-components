# TASK 2 — CSV Preview & Validation Component

**Size:** 🟡 1–2 weeks · **Folder:** `src/CsvPreview/`
**Where it lands:** a new step inside Hymnal's Data Import wizard. I verified (July 2026) what the wizard does today: it analyzes the file's headers, suggests a column mapping, imports, and only THEN reports which rows failed. **What's missing — and what you're building — is the step in between: a client-side "here's every problem in your file" preview shown BEFORE the user commits to importing.** Churches fix the file first instead of cleaning up after. This slots into a real hole in a real flow that has caused Josh real pain.
**Resume line:** "Built the pre-import CSV validation preview for a production data-import pipeline."

---

## What you're building
A `<CsvPreview>` component:

```ts
interface CsvPreviewProps {
  rows: Record<string, string>[];   // already-parsed CSV rows (header row consumed)
  requiredFields: string[];         // e.g. ['donor_full_name', 'amount', 'date']
}
```

It renders:
1. **A summary banner:** "300 rows: 279 OK, 21 have issues." Green when everything's clean, amber when anything isn't.
2. **The rows in a table** — problem rows visually highlighted (e.g. red-tinted), with the specific bad cell marked and a plain-language message: "Row 33: amount 'abc' is not a number."
3. **A per-problem-type count:** "4 bad emails, 4 bad dates, 3 missing names…"

Keep `validateRows(rows, requiredFields)` as a **separate pure function** that returns structured results, and have the component render those results. Separating logic from display makes it testable and is how Josh will actually wire it into the wizard.

**If you built Task 1: render the preview with your own `<DataTable>`.** That's the intended payoff of building reusable components.

## Exact inputs you have
- `data/messy-import.csv` → **300 rows with deliberate problems.** Load it in (copy it into your project; parse it with a small parser you write, or ask Josh about adding PapaParse — see Notes).
- `data/MESSY_CSV_MANIFEST.md` → **the answer key.** It lists exactly which CSV rows are broken and how. Your validator's output must match the manifest — no more, no less. (Row numbers count the header line as row 1, same as Excel.)

## Validation rules (exactly these)
Flag a row when any apply:
1. A required field is missing/blank.
2. Email is present but invalid — must contain `@` with something before it, and a `.` with something after it in the domain part. (An EMPTY email is allowed — blank ≠ invalid.)
3. Amount isn't a plain positive number (`abc`, `$1,00`, blank, and negative amounts all fail).
4. Date doesn't parse from the accepted formats: `YYYY-MM-DD` or `MM/DD/YYYY`. Reject `June 7th`, impossible dates like `2026-02-30` or month `13`, blanks, and ambiguous fragments like `07-13`.
5. `payment_method` present but not one of `cash | check | online | other` (blank counts as missing if it's required).
6. **Exact duplicate rows** — flag the second occurrence as a probable duplicate (the manifest has one pair).

## Acceptance checklist
- [ ] Running your validator on `messy-import.csv` flags **exactly the rows in the manifest** — every listed row caught, zero false positives.
- [ ] In particular: **row 90 (`Robert Smith, Jr.`) is NOT flagged.** Its quoted comma is a parser test, not a data problem — if it shows up broken, your CSV parsing (not validation) is the bug.
- [ ] Summary banner shows correct counts and switches green/amber appropriately.
- [ ] Each flagged row's message names the field, the bad value, and the row number in plain language.
- [ ] Per-type problem counts are correct.
- [ ] An all-clean input (feed it `data/giving.csv` rows) → green banner, zero flags.
- [ ] An all-broken input renders without falling over.
- [ ] `validateRows` is a pure function with its own unit tests (`npm test`) covering each rule above.
- [ ] Fully typed; no `any`. Works at phone width (table scrolls horizontally).

## Edge cases to handle
- Blank email vs. invalid email are different (blank passes unless the field is required).
- Whitespace-only values count as blank.
- A row can have multiple problems — report all of them, not just the first.

## Stretch goals
- "Download only the problem rows" as a CSV (reuse your Task 0 download code) so the church can fix and re-upload just those.
- Configurable rules (pass in which checks run).

## Notes
- **Parsing:** writing a tiny CSV parser that handles quoted commas is a great exercise; using **PapaParse** is also a legitimate choice — but it's a new dependency, so per the README rule, ask Josh first (he'll say yes; the rule exists so he always knows what's coming).
- The real importer has more rules than these six; these are the ones your version ships with. Josh can share the full field requirements if a stretch goal takes you there.

## Done =
all boxes checked (the manifest match is the big one), `npm run build` and `npm test` clean, pushed, and you can explain the difference between a parsing bug and a validation failure using row 90 as the example.
