# messy-import.csv — answer key

Row numbers below are **CSV row numbers where the header line is row 1** (so the first data row is row 2). Spreadsheet apps count the same way.

| CSV row | Problem | Bad value |
|---|---|---|
| 7 | bad email | `not-an-email` |
| 12 | bad date | `June 7th` |
| 19 | missing name | `(blank)` |
| 33 | bad amount | `abc` |
| 45 | missing fund | `(blank)` |
| 58 | bad email | `jane@` |
| 64 | bad method | `bitcoin` |
| 71 | bad date | `13/45/2026` |
| 88 | bad amount | `$1,00` |
| 101 | missing name | `(blank)` |
| 133 | bad email | `bob@domain` |
| 148 | missing date | `(blank)` |
| 160 | missing amount | `(blank)` |
| 199 | bad date | `2026-02-30` |
| 214 | bad email | `a b@example.com` |
| 222 | missing fund | `(blank)` |
| 240 | missing method | `(blank)` |
| 250 | missing name | `(blank)` |
| 275 | negative amount | `-50.00` |
| 288 | bad date | `07-13` |
| 120 + 121 | exact duplicate pair | same donor, amount, date, fund |

**Row 90 is a trap that should NOT be flagged:** the donor name `Robert Smith, Jr.` contains a comma and is quoted in the file. A correct CSV parser handles it; a naive `split(',')` breaks on it.

Totals: 300 data rows, 20 invalid cells + 1 duplicate pair. Everything else is clean.
