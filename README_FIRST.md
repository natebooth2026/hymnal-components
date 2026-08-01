# 🎧 Hymnal Contributor Kit - READ THIS FIRST

Hey Nate, welcome aboard. Everything you need is on this USB stick. This document is your single source of truth: read it top to bottom once, and it will answer most questions before you have them. Nothing in this kit is a trick or a test: **if anything seems ambiguous or contradictory, that is a bug in MY documentation, not a puzzle for you to solve. Tell me and I'll fix the doc. Don't stress, don't worry about making mistakes, don't worry about finishing as fast as you can or anything like that. This is meant to be a genuine way for you to earn real world experience and something you can put on your resume.**

---

## 1. The honest part (read this so nothing is confusing later)

Hymnal is a live product that stores **real people's private data**: church members' contact info, kids' check-in records, donation history. I'm legally and morally on the hook for keeping that locked down, so I can't give anyone access to the main repo or its data. That's not about trust in you; it's the rule for handling this kind of data, and it would apply to any contractor at any company.

Here's how you contribute anyway, and it's how a lot of real professional work happens:

1. **You build self-contained components in YOUR OWN repo**, against the specs and the 100%-fake sample data in this kit.
2. **I review your code.** We go back and forth like a normal code review.
3. **When it's solid, I integrate it into Hymnal.** You get "shipped in a production SaaS" on your resume, with the commit history in your own public GitHub to prove you built it.

Think of it like fabricating a well-specified part on your own bench; I install it in the machine. 

**Every task in this kit has been checked against Hymnal's actual current codebase**. None of them duplicate something that already exists. Each spec tells you exactly where your work will appear in the app.

---

## 2. What's on this USB

```
nate-usb/
├── README_FIRST.md          ← you are here
├── GLOSSARY.md              ← every term used in these docs, defined plainly
├── specs/                   ← one spec per task, all in the same format
│   ├── TASK_0_data_generator.md      (starter, do this first)
│   ├── TASK_1_datatable.md
│   ├── TASK_2_csv_preview.md
│   ├── TASK_3_event_capacity.md      (the flagship, a brand-new visible feature)
│   ├── TASK_4_ui_polish_pack.md
│   ├── TASK_5_accessibility.md
│   └── TASK_6_qa_your_feature.md     (capstone, after something you built ships)
├── data/                    ← raw data files (CSVs for import-related tasks)
│   ├── members.csv          (250 fake members)
│   ├── giving.csv           (5,319 fake gifts across 18 months)
│   ├── attendance.csv       (5,665 fake attendance rows)
│   ├── events.json + registrations.json
│   ├── messy-import.csv     (300 rows with deliberate problems)
│   ├── MESSY_CSV_MANIFEST.md (the answer key for messy-import.csv)
│   └── DATA_NOTES.md        (what's in each file and how it was made)
├── fix-it/                  ← how small real-bug fixes will work (read when curious)
└── starter/                 ← a ready-to-run project. Copy this to your computer.
```

---

## 3. Setup (one time, ~15 minutes, needs internet once)

You'll need installed: **Node.js 20+** (https://nodejs.org, pick LTS), **Git**, and an editor (**VS Code** recommended, with the ESLint and Prettier extensions but cursor or any other IDE you choose should work).

1. **Copy the whole `starter/` folder off the USB** to somewhere on your computer, e.g. `Documents/hymnal-components/`. Don't work directly on the USB stick.
2. Open a terminal in that folder and run:
   ```bash
   npm install     # needs internet; downloads the exact libraries Hymnal uses
   npm run dev     # starts the app at http://localhost:5173
   ```
3. Open http://localhost:5173 in your browser. You should see the starter page with the sample data already loading. If you do, setup is done.
4. **Make it a Git repo and put it on YOUR GitHub** (public is fine, it's your portfolio; there is nothing sensitive in it):
   ```bash
   git init
   git add -A
   git commit -m "Starter kit from Josh"
   ```
   Then create a repo called `hymnal-components` on github.com and push to it (GitHub shows the exact commands after you create it).

The starter project is already configured: Vite, React, TypeScript, Tailwind, and the data files are all wired up. You do NOT need to scaffold anything from scratch.

---

## 3.5 Seeing your component on the page (the loop you'll live in)

The page at http://localhost:5173 is your workbench. Here is exactly how your code gets onto it, using Task 0 as the example:

1. **Leave `npm run dev` running the whole time you work.** It is a live server, not a one-time command. You write code in your editor; the terminal just sits there watching your files.
2. **Build your component in its own folder.** For Task 0 that means a file like `src/DataGenerator/DataGenerator.tsx` containing `export function DataGenerator() { ... }`.
3. **Open `src/App.tsx` and wire it in.** Two edits:
   - At the top, with the other imports: `import { DataGenerator } from './DataGenerator/DataGenerator';`
   - Near the bottom of the page there is a dashed box that says "Your components render here." Put your tag there in its place: `<DataGenerator />`
4. **Save the file and look at your browser.** The page updates by itself within a second or two. This is called hot reload; you never need to re-run npm or manually refresh. From here on, testing is just: change code, save, look.

To test specific cases from a spec's acceptance checklist, change the props you pass in `App.tsx`, save, and look. Example from Task 1: to check the empty state, pass `rows={[]}` to your DataTable, save, and see what renders.

When something breaks you will usually see a red error overlay in the browser. Read it top to bottom; it names the exact file and line. Fix the code, save, and the overlay goes away on its own. If the page ever seems stuck or strange, refresh the browser; if it is still strange, click into the terminal, press Ctrl+C to stop the server, and run `npm run dev` again. That fixes 95% of mysteries.

---

## 4. The stack: use exactly these (compatibility matters)

Your code gets dropped into Hymnal, so it has to be written with the same tools and versions Hymnal uses. **The starter's `package.json` already pins all of these**; this table is so you know what they are and don't accidentally install something incompatible.

| Tool | Version | What it's for | Notes |
|---|---|---|---|
| React | 18.3.x | UI framework | Functional components + hooks ONLY. No class components. |
| TypeScript | 5.6.x | Types | Type every prop. Avoid `any`; if you feel forced into `any`, ask me instead. |
| Tailwind CSS | **3.4.x** | Styling | ⚠️ IMPORTANT: version 3, NOT version 4. If you ever set up a project yourself, `npm install tailwindcss` now gives you v4, which is configured completely differently. The starter already has v3 configured, another reason to use it. |
| Vite | 5.x | Dev server / build | `npm run dev` to work, `npm run build` to check it compiles. |
| lucide-react | 0.460.x | Icons | The ONLY icon library. Don't add react-icons, heroicons, etc. |
| recharts | 2.13.x | Charts | Only needed if a task involves charts. |
| date-fns | 4.x | Date handling | Use this instead of hand-rolling date math. |
| clsx + tailwind-merge | - | Combining CSS classes conditionally | Small helpers; examples in the starter. |
| vitest | 4.x | Unit tests | For the tasks that ask for tests. `npm test` runs them. |

**Do NOT add other dependencies without asking me first.** Every extra library is something I have to vet before your code can go into Hymnal. Ninety-nine percent of these tasks need nothing beyond the table above.

**Code style rules (these keep integration painless):**
- Components are **props in → UI out**. Data always arrives as props. Never fetch inside a component, never use global state, never assume a backend exists.
- One folder per task inside `src/` (e.g. `src/DataTable/`, `src/EventCapacity/`).
- Tailwind utility classes for all styling, no separate `.css` files.
- Named exports (`export function DataTable(...)`), TypeScript interfaces for all props.
- No real-looking personal data anywhere, ever. Fake data uses `@example.com` emails and `555` phone numbers; the kit's data already follows this; keep it that way in anything you generate.

---

## 5. The task board

Do them in order; each one builds skills (and sometimes literal code) that the next one uses. Every spec has the same structure: what you're building, why Hymnal needs it, exactly where it will appear in the app, the inputs you have, numbered requirements, an acceptance checklist, edge cases, and stretch goals.

The times are just estimates on how long it might take you. Not an expected timeline or anything. Genuinely take your time on these there's no rush at all for any of this. This is for you to learn and contribute. 

| # | Task | Size | Where it lands in Hymnal |
|---|---|---|---|
| 0 | Synthetic Data Generator | 🟢 a few evenings | Josh's testing toolkit (not in the app; it's the warm-up that teaches you the data shapes) |
| 1 | Reusable DataTable | 🟡 1-2 weeks | Members, Giving, and Attendance list screens |
| 2 | CSV Preview & Validation | 🟡 1-2 weeks | A new step inside the Data Import wizard |
| 3 | **Event Capacity Indicator** | 🟡 ~1 week | **The Events page: a brand-new feature that doesn't exist yet. This one's the headliner.** |
| 4 | UI Polish Pack (skeletons + empty states) | 🟢 ~1 week | Loading and empty screens across the whole app |
| 5 | Accessibility hardening | 🔴 2-3 weeks | Hymnal's core UI components (Modal, Input, Select, table headers) |
| 6 | QA Your Own Feature | 🟡 after one ships | Not code; you'll test your own shipped feature in the live test tenant |

Tasks 1-5 are all things that get **added into the app and are visible to users**, and none of them is load-bearing; if one takes longer than expected or doesn't pan out, nothing in Hymnal breaks. That's deliberate: real stakes, no time bombs.

---

## 6. How we work together

**The loop:** pick the next task → build it in your repo → commit as you go with clear messages (this history is your portfolio, make it readable) → tell me it's ready → I review → we iterate → I integrate it → you get shipped credit → next task.

**When you're stuck, use the 15-minute rule:** try to solve it yourself for 15 minutes (read the error, check the spec, search it). If you're still stuck after 15 minutes, ask me. This is not a bother; a clear question is a sign the process is working. The format that gets you the fastest answer:
1. What you're trying to do
2. What you expected to happen
3. What actually happened (paste the exact error text)
4. What you already tried


**What to ask me for as you go:** screenshots of the Hymnal screen your component will live on (so you can match the look), clarification on any spec line, and review whenever you want eyes on work-in-progress; you don't have to wait until "done."

---

## 7. Definition of done (applies to every task)

A task is done when ALL of these are true:
1. Every checkbox in the spec's acceptance checklist passes.
2. `npm run build` completes with no TypeScript errors.
3. It works at phone width (Chrome DevTools → device toolbar → iPhone SE) and desktop width.
4. The code is committed and pushed with proper commit messages.
5. You've told me it's ready and can walk me through how it works. ("Walk me through it" means: you can explain what each piece does and why you built it that way, not a formal presentation, just a conversation.)

---

## 8. One last thing

I put this kit together because these are things Hymnal genuinely needs and because each one is a real, demonstrable line on a resume: a data tool, two reusable production components, a brand-new shipped feature, a UI polish pack, an accessibility audit, and an end-to-end QA report. That's a portfolio, not a to-do list.

Take your time, be precise, and ask questions early. Start with `specs/TASK_0_data_generator.md`.

- Josh
