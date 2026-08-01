# TASK 6 — QA Your Own Feature (capstone)

**Size:** 🟡 a few sessions · **When:** after one of your components is built AND Josh has integrated it into Hymnal · **Tool:** a browser-automation assistant (Josh sets you up with it when you reach this task)
**Where it lands:** not code — this one is you proving your shipped feature actually works in the live app, the way a professional would.
**Resume line (unusual for early-career):** "Built a feature, then tested it end-to-end in production using automated browser testing — designed, built, integrated, tested, fixed."

---

## The setup (everything here is safe — Grace is fake)
- You'll test against **Grace Community Church**, Hymnal's test tenant. **Every person, gift, kid, and event in Grace is randomly generated fake data.** There is nothing real to break or expose — poke at anything.
- **Josh gives you before you start:** (1) a staff login to Grace, (2) which feature/screen you're testing, (3) how to reach him if the app itself seems down. Don't start until you have all three.
- You do NOT need the codebase. QA runs against the running app — you test behavior, not source.
- **Tooling heads-up:** the browser-automation tooling is powerful but finicky — it stalls, times out, and disconnects sometimes. That's normal, not you. Keep notes as you go so you can resume without losing your place. Working around flaky tooling is, honestly, a real part of real QA work.

## The methodology — five beats, every feature, forever
1. **Baseline** — record the starting state before touching anything (counts, what's on screen). You can't prove a change without a before.
2. **Act** — use the feature exactly as a real user would.
3. **Verify** — did the expected thing happen?
4. **Verify it persisted** — refresh the page. Still right? Shows up everywhere it should (other pages, reports)? This catches the sneakiest bug class: "looked right but never saved."
5. **Clean up** — remove your test data. Leave the tenant how you found it; a tester who leaves a mess doesn't get the keys again.

## Your task
Run the five beats on your shipped feature, then hammer the edges — that's where real bugs live:
- **No data** — does the empty state appear (nice callback to Task 4), or does it break?
- **Lots of data** — pagination, performance, scrolling.
- **Weird input** — apostrophes in names (the data has O'Brien for exactly this reason), symbols in search, an empty required field, a filter matching nothing.
- **Phone width** — DevTools device toolbar; does the layout hold?
- **Refresh mid-flow** — does state survive where it should?

## What to deliver — a QA report (markdown, in your repo)
1. **What you tested** — feature + screen + date.
2. **Results table** — each check → PASS / FAIL → evidence (a count, a screenshot, a described behavior).
3. **Bugs found** — for each: steps to reproduce, expected, actual. *Finding bugs in your own feature is a WIN — it means the QA worked. The goal is "thoroughly checked, honest verdict," not "everything passed."*
4. **Edge cases tried** — including the ones that passed. Showing you *thought* to test the empty state is what reads as senior.

## Acceptance checklist
- [ ] All five beats executed and documented, with a recorded baseline.
- [ ] At least six edge cases attempted (the five categories above plus one you invent).
- [ ] Every claim in the results table has evidence attached.
- [ ] Test data cleaned up — the tenant looks like it did before you started.
- [ ] Report committed to your repo.

## The mindset
Try to break your own thing. The instinct to protect your work is the enemy of good QA — the best engineers are hardest on their own code. "It looked right" is not "it worked": refresh and re-check, every time. And write it down honestly: "found 3 bugs" is worth more than "all clear," because the honest report is the trustworthy one.

## Done =
report delivered, tenant clean, and — if you found bugs — fixes queued. Then you own the full loop: designed it, built it, shipped it, tested it, fixed it. That story is rare at any career stage.
