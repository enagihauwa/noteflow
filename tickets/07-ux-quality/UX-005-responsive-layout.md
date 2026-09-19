# UX-005 — Responsive layout

**Area:** UX and quality
**Depends on:** FND-004
**Blocks:** UX-006
**Size:** M
**Spec reference:** §4, §20, §23

## Goal

Every screen works from a 360px phone up to a wide desktop.

## Context

Notes get captured on phones more than anywhere else, so mobile is the case to get
right first, not the one to squeeze in afterwards. The note grid is one column on a
phone and two from the small breakpoint up; the reading column stays under 80
characters everywhere.

## Execution steps

1. Work mobile-first: write the base styles for narrow screens, add breakpoints upward.
2. Make the note grid `grid gap-4 sm:grid-cols-2`.
3. Keep the navbar single-row on mobile; shorten the greeting rather than wrapping.
4. Give the note textarea enough height on a phone to write more than a line at a time.
5. Ensure every tap target is at least 44px and that nothing needs a horizontal scroll.
6. Test at 360, 414, 768, 1024 and 1440px, and in landscape.

## Files touched

- `components/**`, `app/(dashboard)/**`, `app/globals.css`

## Acceptance criteria

- [ ] No horizontal scrolling at 360px on any screen.
- [ ] The notes grid reflows from one to two columns.
- [ ] Forms are comfortable to fill on a phone.
- [ ] Tap targets meet 44px.
- [ ] Long titles and URLs wrap without breaking layout.

## Out of scope

- A native mobile app: §21 Won't Have.
