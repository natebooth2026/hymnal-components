# TASK 5 — Accessibility Hardening Pass

**Size:** 🔴 2–3 weeks · **Folder:** `src/A11y/` (+ edits to your earlier components)
**Where it lands:** Hymnal's core UI components — Modal, form inputs, Select, buttons, and table headers — as focused accessibility improvements Josh applies to the real primitives. Nothing breaks if any single fix is missing (that's the definition of "hardening"), but together they decide whether an older volunteer or a screen-reader user can use the app at all. Churches skew older; this audience is exactly who accessibility is for.
**Resume line (rare and strong):** "Performed an accessibility audit and remediation on a production component library — WCAG AA, ARIA, keyboard navigation, focus management, screen-reader testing."

---

## What you're building
Accessible reference versions of five components, plus a written audit. Build them clean in your repo (you don't need Hymnal's source — the point is the *patterns*, which Josh then applies):

1. **Modal/Dialog** — on open, focus moves inside; Tab is trapped within it; Escape closes; on close, focus returns to the button that opened it; announced properly (`role="dialog"`, `aria-modal="true"`, labelled by its title).
2. **Form input with error** — a real `<label>` associated via `htmlFor`; error text linked with `aria-describedby` and announced when it appears; `aria-required` on required fields; `aria-invalid` when erroring.
3. **Button** — visible focus ring when tabbing; icon-only buttons have an `aria-label`; disabled state conveyed to assistive tech.
4. **Dropdown/Select** — fully keyboard operable (open with Enter/Space, navigate with arrows, select with Enter, dismiss with Escape), correct ARIA roles, focus stays managed throughout.
5. **Sortable table header** — announces sort state via `aria-sort` (`ascending` / `descending` / `none`). **Apply this one directly to your Task 1 DataTable** — hardening your own earlier work is deliberately part of this task.

Plus: **`ACCESSIBILITY.md` in your repo** — what you checked, what you fixed, how you tested each item. This write-up is itself the portfolio artifact; the reasoning is what makes it senior-flavored.

## Requirements
1. **Keyboard-only test:** genuinely unplug/ignore your mouse and operate every component with Tab, Shift+Tab, Enter, Space, arrows, Escape. Everything reachable, everything operable, focus always visible.
2. **Screen-reader test at least once:** Windows → Narrator (built in, free); Mac → VoiceOver. Confirm each component announces what it is and its state. Budget an afternoon; it will permanently change how you build UI.
3. **Automated scan:** run Lighthouse (built into Chrome DevTools) or the axe DevTools extension on your demo page; fix what it flags. Know its limits: automated tools catch roughly a third of real issues — the manual keyboard and screen-reader passes catch the rest, which is why the spec requires all three.
4. **Contrast:** all text meets WCAG AA (4.5:1 normal text, 3:1 large). Use any free contrast checker.
5. No wholesale library imports (no headlessui/radix) — the point is that YOU implement the focus trap and the keyboard handling, so you understand them. (In later real work you'd often reach for those libraries; learn the mechanics first.)

## Acceptance checklist
- [ ] Modal: focus enters on open, Tab cycles only inside, Escape closes, focus returns to trigger, screen reader announces title.
- [ ] Input: label reads on focus; triggering the error announces it; `aria-required`/`aria-invalid` present and correct.
- [ ] Buttons: focus ring visible; icon-only button announces its label.
- [ ] Select: complete open→navigate→choose→close cycle with keyboard only.
- [ ] Your Task 1 DataTable headers expose `aria-sort` that updates as you sort.
- [ ] Lighthouse/axe on the demo page: zero unresolved flags (or each remaining flag explained in ACCESSIBILITY.md with a reason).
- [ ] All contrast checks pass AA.
- [ ] ACCESSIBILITY.md covers: what you tested, what you changed and why, what the automated scan missed that manual testing caught.
- [ ] Everything typed; no `any`.

## Edge cases to handle
- Modal with only one focusable element (trap still works).
- Select with zero options (doesn't break keyboard flow).
- Error message that appears *after* first submit attempt (announcement still fires).

## Stretch goals
- A `useFocusTrap` hook extracted from the modal, reusable anywhere.
- Reduced-motion support (`prefers-reduced-motion`) on any animations from Task 4.

## Done =
all boxes checked, the write-up reads like something you'd hand a teammate, `npm run build` clean, pushed — and you can demo the modal focus trap to Josh with the mouse untouched.
