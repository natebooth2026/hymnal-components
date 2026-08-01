# How real-bug fixes will work (the "fix-it packet" system)

At some point you'll graduate from building new components to **fixing real bugs in Hymnal** — without ever needing repo access. Here's the system, so it's not mysterious when the first one arrives.

## The problem this solves
A real bug lives in real code next to real data. I can't hand you either. But almost every frontend bug can be **extracted**: the broken logic, recreated minimally with fake data, becomes a self-contained puzzle you can fix on your bench — and then I apply your fix to the real code.

## What you'll receive (a "fix-it packet")
One folder per bug, containing a filled-in copy of `FIX_TICKET_TEMPLATE.md`:

1. **Symptom** — what a user sees go wrong, in plain language.
2. **Expected vs. actual** — precisely what should happen and what happens instead.
3. **A minimal reproduction** — a small `.tsx`/`.ts` file (sanitized: fake names, no secrets, no schema internals) that exhibits the bug when you drop it into your starter app.
4. **Fake data that triggers it** — same style as this kit's data.
5. **"Done when" checklist** — the specific behaviors that prove it's fixed, including the cases that must NOT regress.

## What you do
1. Drop the repro into your starter app and confirm you can see the bug. (If you can't reproduce it, stop and tell me — a repro that doesn't reproduce is MY bug in the packet.)
2. Fix it. Smallest change that makes the checklist pass — resist the urge to rewrite everything around it.
3. Add a test that fails on the old code and passes on yours, when the bug is logic-shaped.
4. Push, and write two sentences: what the root cause was, and why your change fixes it. (That explanation is the deliverable I care about most — it's the difference between "made the symptom go away" and "understood the bug.")

## What stays on my side
Anything touching the database, authentication, permissions, or deployment. If a packet's fix turns out to need those, you'll fix the part you can see and I'll do the rest — that split is normal; frontend/backend pairs work this way everywhere.

## A preview of coming attractions
Your Task 3 capacity component is secretly the first half of one of these: the "count rows instead of summing party sizes" mistake it guards against is a real bug I'm fixing on the backend right now. Once you've shipped Task 3, you'll understand that bug better than most people who could read the source.
