# Glossary — every term these docs use, in plain language

If a word in any spec isn't here and isn't obvious, that's a doc bug — tell Josh.

**Acceptance checklist / acceptance criteria** — The list of specific, checkable statements in each spec. When every box is true, the task is done. There are no hidden criteria beyond the list.

**a11y** — Abbreviation for "accessibility" (a + 11 letters + y). Making UI usable by people who use keyboards only, screen readers, or have low vision.

**ARIA** — A set of HTML attributes (`aria-label`, `role`, etc.) that tell screen readers what an element is and what state it's in.

**Component** — A reusable piece of UI written as a React function. Takes inputs (props), returns what to render.

**Commit** — A saved snapshot of your code in Git, with a message describing the change. "Commit as you go" = save a snapshot every time you finish a coherent piece of work.

**CSV** — Comma-separated values; a plain-text spreadsheet format. First line = column names (the "header row"), each following line = one record.

**Denormalized** — A value copied onto a record for convenience (like `donor_name` on a giving record) instead of only existing on the related record it came from.

**Edge case** — An unusual-but-possible input: empty list, one item, huge list, weird characters, missing fields. Specs list the edge cases you're expected to handle; handling them is what separates solid work from demo-ware.

**Empty state** — What a screen shows when there's no data yet ("No giving records yet") instead of a blank area.

**Focus / focus trap** — "Focus" is which element receives your keyboard input (shown by an outline). A modal "traps focus" when Tab cycles only through the modal's own controls until it closes.

**Header row** — The first line of a CSV, containing column names. In these docs, "CSV row 2" means the first DATA row, because the header is row 1 — the same way Excel numbers them.

**Hooks** — React functions starting with `use` (`useState`, `useMemo`) that give function components state and behavior.

**Integration** — Josh taking your finished component and wiring it into the real Hymnal codebase. Your job ends at "component works against sample data + spec"; integration is Josh's job.

**Pagination** — Showing a long list in pages (rows 1–10, then 11–20) instead of all at once.

**Primitive** — A small basic building-block component (Button, Input, Skeleton) that bigger components are composed from.

**Props** — The inputs a React component receives, like function arguments. "Props in → UI out" = the component only knows what it's handed; it never goes and fetches anything itself.

**Repo (repository)** — A project folder tracked by Git, usually mirrored on GitHub.

**Scaffold** — Auto-generating a project's starting files. (You won't need to — the `starter/` folder is pre-scaffolded.)

**Screen reader** — Software that reads the UI out loud for blind and low-vision users. Windows has Narrator built in; Mac has VoiceOver.

**Skeleton** — A gray placeholder shaped like the content that's still loading (bars where text will be, a circle where an avatar will be).

**Spec** — The document describing a task. The spec is the contract: build what it says, ask about anything it doesn't say.

**Stretch goal** — Optional extras after the acceptance checklist passes. Never required.

**Tenant** — One church's isolated space inside Hymnal. "Grace Community Church" is the test tenant — all of its data is fake.

**TypeScript / types / interface** — JavaScript plus declared shapes for data. An `interface` describes exactly what fields an object has. `any` turns the checking off — that's why we avoid it.

**Waitlisted** — Registered for a full event, waiting for a seat to open. Waitlisted people do NOT count toward seats taken.
